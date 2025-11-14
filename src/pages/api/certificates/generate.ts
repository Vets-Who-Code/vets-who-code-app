import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';
import { checkCertificateEligibility } from '@/lib/certificates';

/**
 * POST /api/certificates/generate
 *
 * Generate a certificate for a user who has completed a course
 * Body:
 * {
 *   userId: string,
 *   courseId: string
 * }
 *
 * Permissions:
 * - ADMIN/INSTRUCTOR can generate certificates for any user
 * - Students can only generate certificates for themselves
 */
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { userId, courseId } = req.body;

    // Validation
    if (!userId || !courseId) {
      return res.status(400).json({
        error: 'Missing required fields: userId, courseId',
      });
    }

    // Authorization check: students can only generate their own certificates
    if (
      req.user?.role === 'STUDENT' &&
      req.user.id !== userId
    ) {
      return res.status(403).json({
        error: 'Students can only generate certificates for themselves',
      });
    }

    // Check eligibility
    const eligibility = await checkCertificateEligibility(userId, courseId);

    if (!eligibility.eligible) {
      return res.status(400).json({
        error: eligibility.reason || 'Not eligible for certificate',
      });
    }

    // Generate certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId,
        courseId,
        // certificateUrl can be generated later by a background job
        // For now, we'll leave it null and generate it on-demand
      },
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
          },
        },
      },
    });

    res.status(201).json({
      message: 'Certificate generated successfully',
      certificate,
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return handlePost(req, res);
});
