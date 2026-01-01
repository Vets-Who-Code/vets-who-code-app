import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/lms/submissions
 * Fetch user's submissions (optionally filtered by courseId or assignmentId)
 *
 * Query params:
 * - courseId?: string - Filter by course
 * - assignmentId?: string - Filter by specific assignment
 *
 * POST /api/lms/submissions
 * Submit an assignment. Students can create or update their submissions.
 * Only one submission per user per assignment (enforced by unique constraint).
 *
 * Request body:
 * {
 *   assignmentId: string,
 *   githubUrl?: string,
 *   liveUrl?: string,
 *   notes?: string,
 *   files?: string (JSON array of file URLs)
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const userId = req.user!.id;

  // GET - Fetch user's submissions
  if (req.method === 'GET') {
    try {
      const { courseId, assignmentId } = req.query;

      const where: any = { userId };

      if (assignmentId) {
        where.assignmentId = assignmentId as string;
      } else if (courseId) {
        where.assignment = {
          courseId: courseId as string,
        };
      }

      const submissions = await prisma.submission.findMany({
        where,
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              description: true,
              dueDate: true,
              maxPoints: true,
              course: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          submittedAt: 'desc',
        },
      });

      return res.status(200).json({ submissions });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  }

  // POST - Create/update submission
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { assignmentId, githubUrl, liveUrl, notes, files } = req.body;

    // Validate required fields
    if (!assignmentId) {
      return res.status(400).json({ error: 'Assignment ID is required' });
    }

    // Validate assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        course: {
          include: {
            enrollments: {
              where: {
                userId,
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Verify user is enrolled in the course
    if (assignment.course.enrollments.length === 0) {
      return res.status(403).json({
        error: 'You must be enrolled in the course to submit assignments'
      });
    }

    // Validate URL formats if provided
    const urlRegex = /^https?:\/\/.+/;
    if (githubUrl && !urlRegex.test(githubUrl)) {
      return res.status(400).json({ error: 'Invalid GitHub URL format' });
    }
    if (liveUrl && !urlRegex.test(liveUrl)) {
      return res.status(400).json({ error: 'Invalid live demo URL format' });
    }

    // Check assignment requirements
    if (assignment.githubRepo && !githubUrl) {
      return res.status(400).json({
        error: 'GitHub repository URL is required for this assignment'
      });
    }
    if (assignment.liveDemo && !liveUrl) {
      return res.status(400).json({
        error: 'Live demo URL is required for this assignment'
      });
    }

    // Check for existing submission
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        userId_assignmentId: {
          userId,
          assignmentId,
        },
      },
    });

    let submission;

    if (existingSubmission) {
      // Update existing submission (allow resubmission before grading)
      if (existingSubmission.status === 'GRADED') {
        return res.status(400).json({
          error: 'Cannot resubmit a graded assignment'
        });
      }

      submission = await prisma.submission.update({
        where: {
          id: existingSubmission.id,
        },
        data: {
          githubUrl: githubUrl ?? existingSubmission.githubUrl,
          liveUrl: liveUrl ?? existingSubmission.liveUrl,
          notes: notes ?? existingSubmission.notes,
          files: files ?? existingSubmission.files,
          status: 'SUBMITTED',
          submittedAt: new Date(),
        },
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              maxPoints: true,
              dueDate: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } else {
      // Create new submission
      submission = await prisma.submission.create({
        data: {
          userId,
          assignmentId,
          githubUrl,
          liveUrl,
          notes,
          files,
          status: 'SUBMITTED',
        },
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              maxPoints: true,
              dueDate: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }

    res.status(existingSubmission ? 200 : 201).json({
      submission,
      message: existingSubmission
        ? 'Submission updated successfully'
        : 'Submission created successfully',
    });
  } catch (error) {
    console.error('Error creating/updating submission:', error);
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});
