import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';
import {
  checkCertificateEligibility,
  generateCertificateNumber,
} from '@/lib/certificates';
import {
  generateCertificatePDF,
  generateCertificateFilename,
} from '@/lib/pdf-certificate';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * POST /api/lms/certificates/generate
 *
 * Generate a certificate for a completed course
 *
 * Request body:
 * {
 *   courseId: string
 * }
 *
 * Response:
 * {
 *   certificate: {
 *     id: string,
 *     certificateNumber: string,
 *     certificateUrl: string,
 *     issuedAt: Date
 *   }
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId } = req.body;
    const userId = req.user!.id;

    // Validation
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Check eligibility
    const eligibility = await checkCertificateEligibility(userId, courseId);

    if (!eligibility.eligible) {
      return res.status(400).json({
        error: 'Not eligible for certificate',
        reason: eligibility.reason,
      });
    }

    // Fetch user and course data
    const [user, course, enrollment] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      }),
      prisma.course.findUnique({
        where: { id: courseId },
        select: {
          id: true,
          title: true,
          estimatedHours: true,
        },
      }),
      prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        select: {
          completedAt: true,
        },
      }),
    ]);

    if (!user || !course || !enrollment) {
      return res.status(404).json({ error: 'User, course, or enrollment not found' });
    }

    // Generate certificate number
    const certificateNumber = await generateCertificateNumber();

    // Generate PDF
    const pdfBytes = await generateCertificatePDF({
      studentName: user.name || user.email,
      courseName: course.title,
      completionDate: enrollment.completedAt || new Date(),
      certificateNumber,
      estimatedHours: course.estimatedHours || undefined,
    });

    // Generate filename
    const filename = generateCertificateFilename(
      user.name || user.email,
      course.title,
      certificateNumber
    );

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'certificates',
            public_id: filename.replace('.pdf', ''),
            resource_type: 'raw',
            format: 'pdf',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as { secure_url: string; public_id: string });
            }
          }
        );

        uploadStream.end(Buffer.from(pdfBytes));
      }
    );

    // Create certificate record in database
    const certificate = await prisma.certificate.create({
      data: {
        userId,
        courseId,
        certificateUrl: uploadResult.secure_url,
        certificateNumber,
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
            difficulty: true,
            estimatedHours: true,
          },
        },
      },
    });

    res.status(201).json({
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        certificateUrl: certificate.certificateUrl,
        issuedAt: certificate.issuedAt,
        user: certificate.user,
        course: certificate.course,
      },
      message: 'Certificate generated successfully',
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({
      error: 'Failed to generate certificate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
