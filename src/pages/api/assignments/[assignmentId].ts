import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/assignments/[assignmentId]
 *
 * Returns assignment details with submissions count
 */
async function handleGet(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  assignmentId: string
) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            isPublished: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ assignment });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
}

/**
 * PUT /api/assignments/[assignmentId]
 *
 * Update assignment (Admin/Instructor only)
 * Body: { title, description, type, requirements, totalPoints, dueDate }
 */
async function handlePut(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  assignmentId: string
) {
  try {
    const {
      title,
      description,
      type,
      requirements,
      totalPoints,
      dueDate,
    } = req.body;

    // Check if assignment exists
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!existingAssignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Validate assignment type if provided
    if (type) {
      const validTypes = ['PROJECT', 'HOMEWORK', 'CAPSTONE', 'QUIZ'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: `Invalid assignment type. Must be one of: ${validTypes.join(', ')}`,
        });
      }
    }

    // Update assignment
    const assignment = await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(type && { type }),
        ...(requirements !== undefined && { requirements }),
        ...(totalPoints !== undefined && { totalPoints }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
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

    res.json({ assignment });
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: 'Failed to update assignment' });
  }
}

/**
 * DELETE /api/assignments/[assignmentId]
 *
 * Delete assignment (Admin/Instructor only)
 * Prevents deletion if assignment has submissions
 */
async function handleDelete(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  assignmentId: string
) {
  try {
    // Check if assignment exists
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    });

    if (!existingAssignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Warn if assignment has submissions
    if (existingAssignment._count.submissions > 0) {
      return res.status(400).json({
        error: `Cannot delete assignment with ${existingAssignment._count.submissions} submissions`,
      });
    }

    // Delete assignment
    await prisma.assignment.delete({
      where: { id: assignmentId },
    });

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { assignmentId } = req.query;

  if (!assignmentId || typeof assignmentId !== 'string') {
    return res.status(400).json({ error: 'Invalid assignment ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, assignmentId);
    case 'PUT':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handlePut(req, res, assignmentId)
      )(req, res);
    case 'DELETE':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handleDelete(req, res, assignmentId)
      )(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
