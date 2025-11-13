import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/progress
 *
 * Get progress for an enrollment
 * Query params: enrollmentId (required)
 *
 * Response:
 * {
 *   enrollment: Enrollment with course and progress,
 *   progressRecords: Progress[]
 * }
 */
async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { enrollmentId } = req.query;
    const userId = req.user!.id;

    if (!enrollmentId || typeof enrollmentId !== 'string') {
      return res.status(400).json({ error: 'Enrollment ID is required' });
    }

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get all progress records for this user and course
    const progressRecords = await prisma.progress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            courseId: enrollment.courseId,
          },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    // Create progress map
    const progressMap = new Map(
      progressRecords.map((p) => [p.lessonId, p])
    );

    // Build response with progress
    const modulesWithProgress = enrollment.course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        progress: progressMap.get(lesson.id) || null,
      })),
    }));

    res.json({
      enrollment: {
        ...enrollment,
        course: {
          ...enrollment.course,
          modules: modulesWithProgress,
        },
      },
      progressRecords,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
}

/**
 * POST /api/progress
 *
 * Update lesson progress
 * Body:
 * {
 *   enrollmentId: string,
 *   lessonId: string,
 *   completed?: boolean,
 *   timeSpent?: number (in minutes)
 * }
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { enrollmentId, lessonId, completed, timeSpent } = req.body;
    const userId = req.user!.id;

    // Validation
    if (!enrollmentId || !lessonId) {
      return res.status(400).json({
        error: 'Enrollment ID and Lesson ID are required',
      });
    }

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Upsert progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        ...(completed !== undefined && { completed }),
        ...(completed && { completedAt: new Date() }),
        ...(timeSpent !== undefined && { timeSpent }),
      },
      create: {
        userId,
        lessonId,
        completed: completed ?? false,
        completedAt: completed ? new Date() : null,
        timeSpent: timeSpent ?? 0,
      },
    });

    // Update enrollment progress percentage
    const totalLessons = await prisma.lesson.count({
      where: {
        module: {
          courseId: enrollment.courseId,
        },
      },
    });

    const completedLessons = await prisma.progress.count({
      where: {
        enrollmentId,
        completed: true,
      },
    });

    const progressPercentage =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress: progressPercentage,
        lastActivity: new Date(),
        ...(progressPercentage === 100 && !enrollment.completedAt
          ? { completedAt: new Date(), status: 'COMPLETED' }
          : {}),
      },
    });

    res.json({
      progress,
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
