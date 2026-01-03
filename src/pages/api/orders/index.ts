import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

/**
 * GET /api/orders
 *
 * Fetch all orders for the authenticated user
 *
 * Response:
 * {
 *   orders: [
 *     {
 *       id: string,
 *       shopifyId: string,
 *       orderNumber: string,
 *       totalPrice: string,
 *       currency: string,
 *       financialStatus: string,
 *       fulfillmentStatus: string,
 *       orderCreatedAt: Date,
 *       items: OrderItem[]
 *     }
 *   ]
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user!.id;
    const userEmail = req.user!.email;

    // Fetch orders for this user
    // Match by userId OR by email (for orders before user logged in)
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId },
          { customerEmail: userEmail },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        orderCreatedAt: 'desc', // Most recent first
      },
    });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
