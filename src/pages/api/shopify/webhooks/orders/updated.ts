import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getShopifyWebhookSecret, readRawBody, verifyShopifyHmac } from "@/lib/shopify-webhook";

/**
 * Webhook handler for Shopify order status changes
 *
 * POST /api/shopify/webhooks/orders/updated
 *
 * Register the `orders/updated`, `orders/paid`, `orders/fulfilled`, and
 * `orders/cancelled` topics at this URL — all four POST the full Order payload.
 * Only the financial and fulfillment status are synced; the rest of the row stays
 * as the orders/create handler wrote it.
 *
 * Setup in Shopify:
 * 1. Go to Settings → Notifications → Webhooks
 * 2. Create a webhook for each topic listed above
 * 3. URL: https://your-domain.com/api/shopify/webhooks/orders/updated
 * 4. Format: JSON
 */

// Disable body parsing, we need the raw body for signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    let rawBody = "";
    try {
        rawBody = await readRawBody(req);
        const hmacHeader = req.headers["x-shopify-hmac-sha256"] as string;

        if (!hmacHeader) {
            console.error("[shopify-webhook] missing HMAC header on order update");
            return res.status(401).json({ error: "Unauthorized" });
        }

        const secret = getShopifyWebhookSecret();
        if (!secret) {
            console.error(
                "[shopify-webhook] secret not configured. Set SHOPIFY_WEBHOOK_SECRET, SHOPIFY_API_SECRET, or SHOPIFY_CLIENT_SECRET"
            );
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!verifyShopifyHmac(rawBody, hmacHeader, secret)) {
            console.error("[shopify-webhook] invalid HMAC signature on order update");
            return res.status(401).json({ error: "Unauthorized" });
        }

        const order = JSON.parse(rawBody);

        // Only copy the status fields the payload actually carries. financialStatus is
        // NOT NULL, so defaulting a missing value would clobber a paid order back to
        // "pending"; fulfillment_status is legitimately null on unfulfilled orders.
        const data: { financialStatus?: string; fulfillmentStatus?: string | null } = {};
        if (typeof order.financial_status === "string" && order.financial_status) {
            data.financialStatus = order.financial_status;
        }
        if (order.fulfillment_status !== undefined) {
            data.fulfillmentStatus = order.fulfillment_status ?? null;
        }

        if (Object.keys(data).length === 0) {
            return res.status(200).json({ received: true, noop: true });
        }

        const { count } = await prisma.order.updateMany({
            where: { shopifyId: order.id?.toString() },
            data,
        });

        if (count === 0) {
            // The order isn't in Neon yet — most likely an orders/updated delivery that
            // beat orders/create. Fail loud so Shopify retries and the race resolves.
            console.error("[shopify-webhook] order updated for unknown shopifyId", {
                shopifyId: order.id,
            });
            return res.status(500).json({ received: false, error: "Order not found" });
        }

        return res.status(200).json({ received: true, updated: count });
    } catch (error) {
        console.error("[shopify-webhook] order update failed:", {
            shopifyId: (() => {
                try {
                    return JSON.parse(rawBody)?.id;
                } catch {
                    return undefined;
                }
            })(),
            error: error instanceof Error ? error.message : String(error),
        });
        return res.status(500).json({ received: false, error: "Order update failed" });
    }
}
