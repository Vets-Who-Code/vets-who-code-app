import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

/**
 * GET /api/certificates/[certificateId]
 *
 * Get certificate details by ID
 * This endpoint is public to allow certificate verification
 * No authentication required
 */
async function handleGet(
  _req: NextApiRequest,
  res: NextApiResponse,
  certificateId: string
) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            estimatedHours: true,
            category: true,
          },
        },
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Format response
    const response = {
      id: certificate.id,
      certificateNumber: certificate.id, // Using ID as certificate number
      student: {
        name: certificate.user.name || 'Unknown',
        email: certificate.user.email,
      },
      course: {
        title: certificate.course.title,
        description: certificate.course.description,
        difficulty: certificate.course.difficulty,
        estimatedHours: certificate.course.estimatedHours,
        category: certificate.course.category,
      },
      issuedAt: certificate.issuedAt,
      certificateUrl: certificate.certificateUrl,
    };

    res.json({ certificate: response });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { certificateId } = req.query;

  if (!certificateId || typeof certificateId !== 'string') {
    return res.status(400).json({ error: 'Invalid certificate ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, certificateId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
};
