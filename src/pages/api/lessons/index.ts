import { NextApiResponse } from 'next';
import { requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * POST /api/lessons
 *
 * Create a new lesson (Admin/Instructor only)
 * Body: { moduleId, title, content, type, videoUrl, duration, order, codeExample, resources }
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      moduleId,
      title,
      content,
      type,
      videoUrl,
      duration,
      order,
      codeExample,
      resources,
    } = req.body;

    // Validate required fields
    if (!moduleId || !title || !type) {
      return res.status(400).json({
        error: 'Missing required fields: moduleId, title, type',
      });
    }

    // Validate lesson type
    const validTypes = ['CONTENT', 'VIDEO', 'EXERCISE', 'QUIZ', 'PROJECT'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid lesson type. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    // Check if module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Get the next order number if not provided
    let lessonOrder = order;
    if (lessonOrder === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { moduleId },
        orderBy: { order: 'desc' },
      });
      lessonOrder = lastLesson ? lastLesson.order + 1 : 0;
    }

    // Create lesson
    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        content: content || '',
        type,
        videoUrl: videoUrl || null,
        duration: duration || null,
        order: lessonOrder,
        codeExample: codeExample || null,
        resources: resources || null,
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

    res.status(201).json({ lesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
}

export default requireRole(['ADMIN', 'INSTRUCTOR'])(handlePost);
