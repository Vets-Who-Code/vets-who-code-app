import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { options as authOptions } from '../auth/options';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
};

interface UploadRequestBody {
  file?: string; // Base64 encoded image
  files?: string[]; // Array of base64 encoded images
  folder?: string;
  public_id?: string;
}

interface UploadResponse {
  success: boolean;
  url?: string;
  urls?: string[];
  public_id?: string;
  public_ids?: string[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { file, files, folder, public_id } = req.body as UploadRequestBody;

    // Validate input
    if (!file && !files) {
      return res.status(400).json({
        success: false,
        error: 'No file or files provided',
      });
    }

    const uploadOptions = {
      folder: folder || 'vets-who-code',
      public_id,
    };

    // Handle single file upload
    if (file && !files) {
      const result = await uploadImage(file, uploadOptions);
      return res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // Handle multiple file uploads
    if (files && Array.isArray(files)) {
      const results = await uploadMultipleImages(files, uploadOptions);
      return res.status(200).json({
        success: true,
        urls: results.map((r) => r.secure_url),
        public_ids: results.map((r) => r.public_id),
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Invalid request format',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    });
  }
}
