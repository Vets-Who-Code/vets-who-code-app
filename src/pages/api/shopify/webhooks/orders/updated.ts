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

/**
 * How long after an order was created an orders/updated delivery can still be
 * losing a race with orders/create. Inside the window a missing row is worth a
 * retry; outside it the row is never coming (the order predates webhook
 * registration, or its orders/create exhausted Shopify's retries).
 */
const CREATE_RACE_WINDOW_MS = 60 * 60 * 1000;

/** True while a missing Order row could still be an orders/create that hasn't landed. */
function isCreateRace(createdAt: unknown): boolean {
    const ms = Date.parse(typeof createdAt === "string" ? createdAt : "");
    return Number.isFinite(ms) && Date.now() - ms < CREATE_RACE_WINDOW_MS;
}

/** Pull out only the status fields the payload actually carries. */
function statusUpdate(order: { financial_status?: unknown; fulfillment_status?: unknown }) {
    // financialStatus is NOT NULL, so defaulting a missing value would clobber a paid
    // order back to "pending"; fulfillment_status is legitimately null when unfulfilled.
    const data: { financialStatus?: string; fulfillmentStatus?: string | null } = {};
    if (typeof order.financial_status === "string" && order.financial_status) {
        data.financialStatus = order.financial_status;
    }
    if (order.fulfillment_status !== undefined) {
        data.fulfillmentStatus = (order.fulfillment_status as string | null) ?? null;
    }
    return data;
}

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

        // Prisma drops `undefined` filter values instead of matching nothing, so an
        // id-less payload would collapse the where clause to {} and updateMany would
        // rewrite the status columns on every Order row. Reject it before the query.
        const shopifyId = order?.id == null ? "" : String(order.id);
        if (!shopifyId) {
            console.error("[shopify-webhook] order update payload has no id");
            return res.status(400).json({ error: "Missing order id" });
        }

        const data = statusUpdate(order);
        if (Object.keys(data).length === 0) {
            return res.status(200).json({ received: true, noop: true });
        }

        const { count } = await prisma.order.updateMany({
            where: { shopifyId },
            data,
        });

        if (count === 0) {
            // A fresh order is probably an orders/updated delivery that beat
            // orders/create, so fail loud and let Shopify's retry resolve the race. An
            // older one is never going to appear, and 500ing it forever burns the full
            // 48-hour retry schedule on every status change and risks Shopify removing
            // the subscription — ack it instead.
            const retry = isCreateRace(order.created_at);
            console.error("[shopify-webhook] order updated for unknown shopifyId", {
                shopifyId,
                retry,
            });
            return retry
                ? res.status(500).json({ received: false, error: "Order not found" })
                : res.status(200).json({ received: true, skipped: "unknown order" });
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
