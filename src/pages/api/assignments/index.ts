import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/assignments
 *
 * Get assignments for a specific course
 * Query: courseId (required)
 */
async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { courseId } = req.query;

    if (!courseId || typeof courseId !== 'string') {
      return res.status(400).json({ error: 'courseId is required' });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const assignments = await prisma.assignment.findMany({
      where: { courseId },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { dueDate: 'asc' },
    });

    res.json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
}

/**
 * POST /api/assignments
 *
 * Create a new assignment (Admin/Instructor only)
 * Body: { courseId, title, description, type, requirements, totalPoints, dueDate }
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      courseId,
      title,
      description,
      type,
      requirements,
      totalPoints,
      dueDate,
    } = req.body;

    // Validate required fields
    if (!courseId || !title || !type) {
      return res.status(400).json({
        error: 'Missing required fields: courseId, title, type',
      });
    }

    // Validate assignment type
    const validTypes = ['PROJECT', 'HOMEWORK', 'CAPSTONE', 'QUIZ'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid assignment type. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create assignment
    const assignment = await prisma.assignment.create({
      data: {
        courseId,
        title,
        description: description || null,
        type,
        requirements: requirements || null,
        totalPoints: totalPoints || 100,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    res.status(201).json({ assignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(handlePost)(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
