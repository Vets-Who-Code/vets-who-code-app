import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/lessons/[lessonId]
 *
 * Returns lesson details
 */
async function handleGet(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  lessonId: string
) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
            course: {
              select: {
                id: true,
                title: true,
                isPublished: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
}

/**
 * PUT /api/lessons/[lessonId]
 *
 * Update lesson (Admin/Instructor only)
 * Body: { title, description, content, type, videoUrl, duration, order }
 */
async function handlePut(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  lessonId: string
) {
  try {
    const {
      title,
      description,
      content,
      type,
      videoUrl,
      duration,
      order,
    } = req.body;

    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!existingLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Validate lesson type if provided
    if (type) {
      const validTypes = ['CONTENT', 'VIDEO', 'EXERCISE', 'QUIZ', 'PROJECT'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: `Invalid lesson type. Must be one of: ${validTypes.join(', ')}`,
        });
      }
    }

    // Update lesson
    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(type && { type }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(duration !== undefined && { duration }),
        ...(order !== undefined && { order }),
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
      },
    });

    res.json({ lesson });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
}

/**
 * DELETE /api/lessons/[lessonId]
 *
 * Delete lesson (Admin/Instructor only)
 * Also deletes associated progress tracking, bookmarks, and notes
 */
async function handleDelete(
  _req: AuthenticatedRequest,
  res: NextApiResponse,
  lessonId: string
) {
  try {
    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        _count: {
          select: {
            progress: true,
            bookmarks: true,
            notes: true,
          },
        },
      },
    });

    if (!existingLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Delete lesson (cascades to progress, bookmarks, notes)
    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    res.json({
      message: 'Lesson deleted successfully',
      affectedRecords: {
        progress: existingLesson._count.progress,
        bookmarks: existingLesson._count.bookmarks,
        notes: existingLesson._count.notes,
      },
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { lessonId } = req.query;

  if (!lessonId || typeof lessonId !== 'string') {
    return res.status(400).json({ error: 'Invalid lesson ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, lessonId);
    case 'PUT':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handlePut(req, res, lessonId)
      )(req, res);
    case 'DELETE':
      return requireRole(['ADMIN', 'INSTRUCTOR'])(
        (req, res) => handleDelete(req, res, lessonId)
      )(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
