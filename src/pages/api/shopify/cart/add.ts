import type { NextApiRequest, NextApiResponse } from 'next';
import { addToCart } from '@lib/shopify';

/**
 * POST /api/shopify/cart/add
 * Add items to cart
 * Body: {
 *   cartId: string
 *   lines: Array<{ merchandiseId: string; quantity: number }>
 * }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cartId, lines } = req.body;

    if (!cartId || typeof cartId !== 'string') {
      return res.status(400).json({ error: 'Cart ID is required' });
    }

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({ error: 'Lines array is required' });
    }

    // Validate lines format
    for (const line of lines) {
      if (!line.merchandiseId || typeof line.merchandiseId !== 'string') {
        return res.status(400).json({ error: 'Each line must have a merchandiseId' });
      }
      if (!line.quantity || typeof line.quantity !== 'number' || line.quantity < 1) {
        return res.status(400).json({ error: 'Each line must have a valid quantity' });
      }
    }

    const cart = await addToCart(cartId, lines);

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({
      error: 'Failed to add items to cart',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
