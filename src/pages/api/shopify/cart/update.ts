import type { NextApiRequest, NextApiResponse } from 'next';
import { updateCartLines } from '@lib/shopify';

/**
 * POST /api/shopify/cart/update
 * Update cart line quantities
 * Body: {
 *   cartId: string
 *   lines: Array<{ id: string; quantity: number }>
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
      if (!line.id || typeof line.id !== 'string') {
        return res.status(400).json({ error: 'Each line must have an id' });
      }
      if (typeof line.quantity !== 'number' || line.quantity < 0) {
        return res.status(400).json({ error: 'Each line must have a valid quantity' });
      }
    }

    const cart = await updateCartLines(cartId, lines);

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({
      error: 'Failed to update cart',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
