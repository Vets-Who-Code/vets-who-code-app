import { NextApiResponse } from 'next';
import { requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * POST /api/modules
 *
 * Create a new module (Admin/Instructor only)
 * Body: { courseId, title, description, order }
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { courseId, title, description, order } = req.body;

    // Validate required fields
    if (!courseId || !title) {
      return res.status(400).json({
        error: 'Missing required fields: courseId, title',
      });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get the next order number if not provided
    let moduleOrder = order;
    if (moduleOrder === undefined) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId },
        orderBy: { order: 'desc' },
      });
      moduleOrder = lastModule ? lastModule.order + 1 : 0;
    }

    // Create module
    const module = await prisma.module.create({
      data: {
        courseId,
        title,
        description: description || null,
        order: moduleOrder,
      },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { lessons: true },
        },
      },
    });

    res.status(201).json({ module });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ error: 'Failed to create module' });
  }
}

export default requireRole(['ADMIN', 'INSTRUCTOR'])(handlePost);
