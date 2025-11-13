import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

/**
 * GET /api/lms/health
 *
 * Public health check endpoint to verify LMS infrastructure.
 * Does NOT require authentication.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test database connectivity
    const [userCount, courseCount, cohortCount, moduleCount, lessonCount] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.cohort.count(),
      prisma.module.count(),
      prisma.lesson.count(),
    ]);

    // Get sample course data
    const sampleCourse = await prisma.course.findFirst({
      where: { isPublished: true },
      include: {
        modules: {
          take: 1,
          include: {
            lessons: {
              take: 1,
            },
          },
        },
      },
    });

    res.status(200).json({
      status: 'healthy',
      message: '✅ Phase 1 LMS Foundation is operational!',
      database: {
        connected: true,
        provider: 'PostgreSQL (Neon)',
      },
      stats: {
        users: userCount,
        courses: courseCount,
        cohorts: cohortCount,
        modules: moduleCount,
        lessons: lessonCount,
      },
      sampleData: sampleCourse ? {
        courseTitle: sampleCourse.title,
        difficulty: sampleCourse.difficulty,
        moduleCount: sampleCourse.modules.length,
        hasLessons: sampleCourse.modules[0]?.lessons.length > 0,
      } : null,
      features: {
        authentication: 'NextAuth with GitHub OAuth',
        rbac: 'Role-based access control (ADMIN, INSTRUCTOR, MENTOR, STUDENT)',
        models: ['User', 'Course', 'Module', 'Lesson', 'Enrollment', 'Progress', 'Assignment', 'Submission', 'Certificate', 'Cohort', 'Bookmark', 'Note'],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Health check failed:', error);
    }
    res.status(500).json({
      status: 'unhealthy',
      error: 'Database connection or query failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
