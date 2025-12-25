import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/modules/[moduleId]
 *
 * Returns module details with lessons
 */
async function handleGet(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  moduleId: string
) {
  try {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            isPublished: true,
          },
        },
        lessons: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { lessons: true },
        },
      },
    });

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json({ module });
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Failed to fetch module' });
  }
}

/**
 * PUT /api/modules/[moduleId]
 *
 * Update module (Admin/Instructor only)
 * Body: { title, description, order }
 */
async function handlePut(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  moduleId: string
) {
  try {
    const { title, description, order } = req.body;

    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!existingModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Update module
    const module = await prisma.module.update({
      where: { id: moduleId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
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

    res.json({ module });
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Failed to update module' });
  }
}

/**
 * DELETE /api/modules/[moduleId]
 *
 * Delete module (Admin/Instructor only)
 * Cascades to lessons and progress tracking
 */
async function handleDelete(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  moduleId: string
) {
  try {
    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });

    if (!existingModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Warn if module has lessons
    if (existingModule._count.lessons > 0) {
      return res.status(400).json({
        error: `Cannot delete module with ${existingModule._count.lessons} lessons. Delete lessons first.`,
      });
    }

    // Delete module
    await prisma.module.delete({
      where: { id: moduleId },
    });

    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Failed to delete module' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { moduleId } = req.query;

  if (!moduleId || typeof moduleId !== 'string') {
    return res.status(400).json({ error: 'Invalid module ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, moduleId);
    case 'PUT':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handlePut(req, res, moduleId)
      )(req, res);
    case 'DELETE':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handleDelete(req, res, moduleId)
      )(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
