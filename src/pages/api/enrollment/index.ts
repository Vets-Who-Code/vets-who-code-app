import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/enrollment
 *
 * Get all enrollments for current user
 * Query params:
 * - status: Filter by status (ACTIVE, COMPLETED, DROPPED)
 *
 * Response:
 * {
 *   enrollments: Array<Enrollment & { stats: {...} }>
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user!.id;
    const { status } = req.query;

    // Build where clause
    const where: any = { userId };

    if (status) {
      where.status = status as string;
    }

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        course: {
          include: {
            _count: {
              select: {
                modules: true,
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    // Calculate total lessons for each course
    const enrollmentsWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons = await prisma.lesson.count({
          where: {
            module: {
              courseId: enrollment.courseId,
            },
          },
        });

        // Get completed lessons for this user
        const completedLessons = await prisma.progress.count({
          where: {
            enrollmentId: enrollment.id,
            completed: true,
          },
        });

        return {
          ...enrollment,
          stats: {
            totalLessons,
            completedLessons,
            progressPercentage:
              totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
          },
        };
      })
    );

    res.json({ enrollments: enrollmentsWithProgress });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});
