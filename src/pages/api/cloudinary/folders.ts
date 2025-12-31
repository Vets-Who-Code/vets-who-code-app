import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { listFolders, getSubfolders } from '@/lib/cloudinary';
import { options as authOptions } from '../auth/options';

interface FoldersResponse {
  success: boolean;
  folders?: Array<{
    name: string;
    path: string;
  }>;
  error?: string;
}

/**
 * API endpoint to list folders in Cloudinary
 * GET /api/cloudinary/folders
 * GET /api/cloudinary/folders?path=parent-folder (for subfolders)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FoldersResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { path } = req.query as Record<string, string>;

    let folders;

    if (path) {
      // Get subfolders
      folders = await getSubfolders(path);
    } else {
      // Get root folders
      folders = await listFolders();
    }

    return res.status(200).json({
      success: true,
      folders,
    });
  } catch (error) {
    console.error('List folders error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list folders',
    });
  }
}
