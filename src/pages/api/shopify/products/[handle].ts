import type { NextApiRequest, NextApiResponse } from 'next';
import { getProduct } from '@lib/shopify';

/**
 * GET /api/shopify/products/[handle]
 * Get a single product by handle
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { handle } = req.query;

    if (!handle || typeof handle !== 'string') {
      return res.status(400).json({ error: 'Product handle is required' });
    }

    const product = await getProduct(handle);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      error: 'Failed to fetch product',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
