import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/enrollment/status
 *
 * Check enrollment status for a course
 * Query params: courseId (required)
 *
 * Response:
 * {
 *   isEnrolled: boolean,
 *   enrollment: Enrollment | null
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId } = req.query;
    const userId = req.user!.id;

    if (!courseId || typeof courseId !== 'string') {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
    });
  } catch (error) {
    console.error('Error checking enrollment status:', error);
    res.status(500).json({ error: 'Failed to check enrollment status' });
  }
});
