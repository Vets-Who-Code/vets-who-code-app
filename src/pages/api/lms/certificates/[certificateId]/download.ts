import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/lms/certificates/[certificateId]/download
 *
 * Download a certificate PDF
 * This endpoint redirects to the Cloudinary URL with proper download headers
 * Or optionally streams the PDF directly
 *
 * Access: Certificate owner or admins only
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { certificateId } = req.query;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (!certificateId || typeof certificateId !== 'string') {
      return res.status(400).json({ error: 'Invalid certificate ID' });
    }

    // Fetch certificate with user and course info
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
          },
        },
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Check access: owner or admin
    if (certificate.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Ensure certificate URL exists
    if (!certificate.certificateUrl) {
      return res.status(404).json({
        error: 'Certificate PDF not available',
        message: 'The certificate has not been generated yet',
      });
    }

    // For Cloudinary URLs, we can add download transformation
    // This forces the browser to download instead of displaying inline
    let downloadUrl = certificate.certificateUrl;

    // If it's a Cloudinary URL, add fl_attachment flag to force download
    if (downloadUrl.includes('cloudinary.com')) {
      // Parse the URL and insert the transformation
      const urlParts = downloadUrl.split('/upload/');
      if (urlParts.length === 2) {
        downloadUrl = `${urlParts[0]}/upload/fl_attachment/${urlParts[1]}`;
      }
    }

    // Redirect to the download URL
    // The browser will download the file with the proper filename
    res.redirect(302, downloadUrl);
  } catch (error) {
    console.error('Error downloading certificate:', error);
    res.status(500).json({
      error: 'Failed to download certificate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
