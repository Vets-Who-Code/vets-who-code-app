import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { options as authOptions } from '../auth/options';
import { searchImages, ListImagesResult } from '@/lib/cloudinary';

interface SearchResponse extends Partial<ListImagesResult> {
  success: boolean;
  error?: string;
}

/**
 * API endpoint to search images in Cloudinary
 * GET /api/cloudinary/search?expression=folder:vets-who-code&max_results=30
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
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

    const { expression, max_results, next_cursor, sort_by } = req.query as Record<
      string,
      string
    >;

    if (!expression) {
      return res.status(400).json({
        success: false,
        error: 'Search expression is required',
      });
    }

    const options: {
      max_results?: number;
      next_cursor?: string;
      sort_by?: Array<{ [key: string]: 'asc' | 'desc' }>;
    } = {};

    if (max_results) {
      options.max_results = parseInt(max_results, 10);
    }

    if (next_cursor) {
      options.next_cursor = next_cursor;
    }

    if (sort_by) {
      try {
        options.sort_by = JSON.parse(sort_by);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: 'Invalid sort_by format. Must be valid JSON array.',
        });
      }
    }

    const result = await searchImages(expression, options);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Search images error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search images',
    });
  }
}
