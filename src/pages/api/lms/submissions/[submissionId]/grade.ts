import { NextApiResponse } from 'next';
import { requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * PUT /api/lms/submissions/[submissionId]/grade
 *
 * Grade a submission. Updates score, feedback, status, and gradedAt timestamp.
 * Requires INSTRUCTOR, ADMIN, or MENTOR role.
 *
 * Request body:
 * {
 *   score: number (required, 0 to assignment.maxPoints),
 *   feedback?: string,
 *   status?: 'GRADED' | 'NEEDS_REVISION' (default 'GRADED')
 * }
 *
 * Response:
 * {
 *   submission: {...},
 *   message: string
 * }
 */
async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { submissionId } = req.query;
    const { score, feedback, status = 'GRADED' } = req.body;

    // Validate submissionId
    if (!submissionId || typeof submissionId !== 'string') {
      return res.status(400).json({ error: 'Invalid submission ID' });
    }

    // Validate score is provided
    if (score === undefined || score === null) {
      return res.status(400).json({ error: 'Score is required' });
    }

    // Validate score is a number
    const scoreNum = Number(score);
    if (isNaN(scoreNum)) {
      return res.status(400).json({ error: 'Score must be a number' });
    }

    // Validate status
    if (status && !['GRADED', 'NEEDS_REVISION'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be GRADED or NEEDS_REVISION'
      });
    }

    // Fetch submission with assignment data
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
            courseId: true,
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

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Validate score is within valid range
    if (scoreNum < 0) {
      return res.status(400).json({ error: 'Score cannot be negative' });
    }

    if (scoreNum > submission.assignment.maxPoints) {
      return res.status(400).json({
        error: `Score cannot exceed maximum points (${submission.assignment.maxPoints})`
      });
    }

    // Check if submission is in a valid state for grading
    if (submission.status === 'DRAFT') {
      return res.status(400).json({
        error: 'Cannot grade a draft submission'
      });
    }

    // Update submission with grade
    const gradedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        score: scoreNum,
        feedback: feedback || submission.feedback,
        status,
        gradedAt: new Date(),
      },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            description: true,
            maxPoints: true,
            dueDate: true,
            type: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Calculate percentage
    const percentage = (scoreNum / submission.assignment.maxPoints) * 100;

    res.status(200).json({
      submission: {
        ...gradedSubmission,
        percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
      },
      message: 'Submission graded successfully',
      gradedBy: {
        id: req.user!.id,
        name: req.user!.name,
        role: req.user!.role,
      },
    });
  } catch (error) {
    console.error('Error grading submission:', error);
    res.status(500).json({ error: 'Failed to grade submission' });
  }
}

// Require INSTRUCTOR, ADMIN, or MENTOR role
export default requireRole(['INSTRUCTOR', 'ADMIN', 'MENTOR'])(handler);
