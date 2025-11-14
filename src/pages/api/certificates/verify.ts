import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

/**
 * GET /api/certificates/verify?number=CERT_NUMBER
 *
 * Verify a certificate by its certificate number
 * This endpoint is public to allow employers and others to verify certificates
 * No authentication required
 *
 * Query params:
 * - number: Certificate number (same as certificate ID)
 *
 * Returns:
 * - valid: boolean indicating if certificate exists
 * - certificate: Certificate details if valid
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { number } = req.query;

    if (!number || typeof number !== 'string') {
      return res.status(400).json({
        error: 'Missing required query parameter: number',
      });
    }

    // Look up certificate by ID (which is the certificate number)
    const certificate = await prisma.certificate.findUnique({
      where: { id: number },
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
      return res.json({
        valid: false,
        message: 'Certificate not found. This certificate number is not valid.',
      });
    }

    // Certificate is valid
    res.json({
      valid: true,
      message: 'Certificate is valid and authenticated.',
      certificate: {
        certificateNumber: certificate.id,
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
      },
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ error: 'Failed to verify certificate' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return handleGet(req, res);
};
