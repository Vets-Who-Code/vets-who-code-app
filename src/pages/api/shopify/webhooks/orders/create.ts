import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

/**
 * Webhook handler for Shopify order creation
 *
 * POST /api/shopify/webhooks/orders/create
 *
 * Shopify sends this webhook when an order is created.
 * We verify the HMAC signature and store the order in our database.
 *
 * Setup in Shopify:
 * 1. Go to Settings → Notifications → Webhooks
 * 2. Create webhook for "Order creation"
 * 3. URL: https://your-domain.com/api/shopify/webhooks/orders/create
 * 4. Format: JSON
 */

// Disable body parsing, we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Verify Shopify HMAC signature
function verifyShopifyWebhook(rawBody: string, hmacHeader: string): boolean {
  // Use the Shopify API Secret Key (Client Secret) for webhook verification
  // Try multiple possible env var names for flexibility
  const shopifySecret =
    process.env.SHOPIFY_WEBHOOK_SECRET ||
    process.env.SHOPIFY_API_SECRET ||
    process.env.SHOPIFY_CLIENT_SECRET;

  if (!shopifySecret) {
    console.error('Shopify API Secret not configured. Set SHOPIFY_WEBHOOK_SECRET, SHOPIFY_API_SECRET, or SHOPIFY_CLIENT_SECRET');
    return false;
  }

  const hash = crypto
    .createHmac('sha256', shopifySecret)
    .update(rawBody, 'utf8')
    .digest('base64');

  return hash === hmacHeader;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    const hmacHeader = req.headers['x-shopify-hmac-sha256'] as string;

    // Verify webhook signature
    if (!hmacHeader) {
      console.error('Missing HMAC header');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isValid = verifyShopifyWebhook(rawBody, hmacHeader);

    if (!isValid) {
      console.error('Invalid HMAC signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse the order data
    const order = JSON.parse(rawBody);

    console.log('Received Shopify order:', {
      id: order.id,
      orderNumber: order.order_number,
      email: order.email,
      totalPrice: order.total_price,
    });

    // Find or link to user by email
    let userId: string | null = null;
    if (order.email) {
      const user = await prisma.user.findUnique({
        where: { email: order.email.toLowerCase() },
        select: { id: true },
      });

      if (user) {
        userId = user.id;
      }
    }

    // Check if order already exists (prevent duplicates)
    const existingOrder = await prisma.order.findUnique({
      where: { shopifyId: order.id.toString() },
    });

    if (existingOrder) {
      console.log('Order already exists, skipping:', order.id);
      return res.status(200).json({ received: true, existing: true });
    }

    // Create order record
    const createdOrder = await prisma.order.create({
      data: {
        shopifyId: order.id.toString(),
        orderNumber: order.order_number?.toString() || order.name || `#${order.id}`,
        userId,
        customerEmail: order.email || 'unknown@example.com',
        customerName: order.customer
          ? `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim()
          : order.billing_address?.name || null,
        totalPrice: order.total_price || '0.00',
        currency: order.currency || 'USD',
        financialStatus: order.financial_status || 'pending',
        fulfillmentStatus: order.fulfillment_status || null,
        tags: order.tags ? order.tags.split(', ') : [],
        note: order.note || null,
        orderCreatedAt: new Date(order.created_at),
        items: {
          create: order.line_items?.map((item: any) => ({
            shopifyProductId: item.product_id?.toString() || 'unknown',
            shopifyVariantId: item.variant_id?.toString() || 'unknown',
            productTitle: item.title || 'Unknown Product',
            variantTitle: item.variant_title || null,
            quantity: item.quantity || 1,
            price: item.price || '0.00',
            totalPrice: (parseFloat(item.price || '0') * (item.quantity || 1)).toFixed(2),
            sku: item.sku || null,
            vendor: item.vendor || null,
            imageUrl: null, // Shopify doesn't include image URLs in webhook payload
          })) || [],
        },
      },
      include: {
        items: true,
      },
    });

    console.log('Order created successfully:', {
      id: createdOrder.id,
      shopifyId: createdOrder.shopifyId,
      itemCount: createdOrder.items.length,
    });

    // Return success response
    return res.status(200).json({
      received: true,
      orderId: createdOrder.id,
    });
  } catch (error) {
    console.error('Error processing Shopify webhook:', error);

    // Still return 200 to prevent Shopify from retrying
    // Log the error for manual investigation
    return res.status(200).json({
      received: true,
      error: 'Internal error logged',
    });
  }
}
