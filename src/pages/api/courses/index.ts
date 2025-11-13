import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/courses
 *
 * Returns courses with filtering, pagination, and counts.
 * Query params:
 * - category: Filter by category
 * - difficulty: Filter by difficulty (BEGINNER, INTERMEDIATE, ADVANCED)
 * - isPublished: Filter by published status (true/false)
 * - search: Search in title/description
 * - limit: Number of results (default: 10)
 * - offset: Pagination offset (default: 0)
 */
async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      category,
      difficulty,
      isPublished,
      search,
      limit = '10',
      offset = '0',
    } = req.query;

    // Build where clause
    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (difficulty) {
      where.difficulty = difficulty as string;
    }

    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Get courses with counts
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              modules: true,
              enrollments: true,
              assignments: true,
            },
          },
        },
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    // Calculate total lessons for each course
    const coursesWithCounts = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await prisma.lesson.count({
          where: {
            module: {
              courseId: course.id,
            },
          },
        });

        return {
          ...course,
          _count: {
            ...course._count,
            lessons: lessonCount,
          },
        };
      })
    );

    res.json({
      courses: coursesWithCounts,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        hasMore: parseInt(offset as string) + courses.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
}

/**
 * POST /api/courses
 *
 * Create new course (Admin/Instructor only)
 * Body:
 * {
 *   title: string,
 *   description: string,
 *   category: string,
 *   difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
 *   estimatedHours?: number,
 *   prerequisites?: string[],
 *   tags?: string[],
 *   isPublished?: boolean,
 *   imageUrl?: string
 * }
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedHours = 0,
      prerequisites = [],
      tags = [],
      isPublished = false,
      imageUrl,
    } = req.body;

    // Validation
    if (!title || !description || !category || !difficulty) {
      return res.status(400).json({
        error: 'Missing required fields: title, description, category, difficulty',
      });
    }

    if (!['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty level. Must be BEGINNER, INTERMEDIATE, or ADVANCED',
      });
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        difficulty,
        estimatedHours,
        prerequisites,
        tags,
        isPublished,
        imageUrl,
      },
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true,
            assignments: true,
          },
        },
      },
    });

    res.status(201).json({ course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      // Only admins and instructors can create courses
      return requireRole(['ADMIN', 'INSTRUCTOR'])(handlePost)(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
