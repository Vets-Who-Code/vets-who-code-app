import crypto from "crypto";
import type { NextApiRequest } from "next";

/**
 * Verify a Shopify webhook HMAC using a timing-safe comparison. `hmacHeader` is
 * the base64 value from `X-Shopify-Hmac-Sha256`. A length mismatch short-circuits
 * to false (timingSafeEqual throws on unequal-length buffers).
 */
export function verifyShopifyHmac(rawBody: string, hmacHeader: string, secret: string): boolean {
    if (!secret || !hmacHeader) return false;

    const digest = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest();

    let provided: Buffer;
    try {
        provided = Buffer.from(hmacHeader, "base64");
    } catch {
        return false;
    }

    if (digest.length !== provided.length) return false;
    return crypto.timingSafeEqual(digest, provided);
}

/** Canonical email form for consistent storage and lookup (trimmed + lowercased). */
export function normalizeEmail(email: string | null | undefined): string {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
}

/**
 * Read the unparsed request body. Webhook routes disable Next's body parser so the
 * HMAC can be checked against the exact bytes Shopify signed.
 */
export async function readRawBody(req: NextApiRequest): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        req.on("error", reject);
    });
}

/** The Shopify API Secret Key used to sign webhooks, under any of the accepted env names. */
export function getShopifyWebhookSecret(): string | undefined {
    return (
        process.env.SHOPIFY_WEBHOOK_SECRET ||
        process.env.SHOPIFY_API_SECRET ||
        process.env.SHOPIFY_CLIENT_SECRET
    );
}
