import crypto from "crypto";

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
