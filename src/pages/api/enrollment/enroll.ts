import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/enrollment/enroll
 * Fetch user's enrollments
 *
 * POST /api/enrollment/enroll
 * Enroll user in a course
 * Body: { courseId: string }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const userId = req.user!.id;

  // GET - Fetch user's enrollments
  if (req.method === 'GET') {
    try {
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
              difficulty: true,
              category: true,
            },
          },
        },
        orderBy: {
          enrolledAt: 'desc',
        },
      });

      return res.status(200).json({ enrollments });
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId } = req.body;

    // Validation
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!course.isPublished) {
      return res.status(400).json({ error: 'Course is not published' });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return res.status(400).json({
        error: 'Already enrolled in this course',
        enrollment: existingEnrollment,
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'ACTIVE',
        progress: 0,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
      },
    });

    res.status(201).json({ enrollment });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});
