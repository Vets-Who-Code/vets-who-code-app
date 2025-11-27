import type { NextApiRequest, NextApiResponse } from 'next';
import { getCart } from '@lib/shopify';

/**
 * GET /api/shopify/cart/[cartId]
 * Get cart details by ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cartId } = req.query;

    if (!cartId || typeof cartId !== 'string') {
      return res.status(400).json({ error: 'Cart ID is required' });
    }

    const cart = await getCart(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({
      error: 'Failed to fetch cart',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
