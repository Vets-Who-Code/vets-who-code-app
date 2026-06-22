/**
 * In-memory IP-based rate limiter for API routes.
 * Limits requests per IP within a sliding time window.
 * Suitable for single-instance deployments; for multi-instance,
 * swap the Map for Redis or similar.
 */

import type { NextApiRequest, NextApiResponse } from "next";

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const ipBuckets = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;
    for (const [ip, entry] of ipBuckets) {
        if (now > entry.resetAt) {
            ipBuckets.delete(ip);
        }
    }
}

export function getClientIp(req: NextApiRequest): string {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
    if (Array.isArray(forwarded)) return forwarded[0];
    return req.socket?.remoteAddress || "unknown";
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt: number;
}

/**
 * Check and consume a rate limit token for an IP.
 * @param ip - Client IP address
 * @param maxRequests - Max requests allowed in the window (default: 20)
 * @param windowMs - Time window in milliseconds (default: 15 minutes)
 */
export function checkRateLimit(
    ip: string,
    maxRequests = 20,
    windowMs = 15 * 60 * 1000
): RateLimitResult {
    cleanup();

    const now = Date.now();
    const entry = ipBuckets.get(ip);

    if (!entry || now > entry.resetAt) {
        ipBuckets.set(ip, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
    }

    if (entry.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count++;
    return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * One-line opt-in rate limiting for API routes.
 * Buckets are namespaced by `name` so endpoints with different limits
 * never share counters. Defaults to keying by client IP; pass `key`
 * to key by something else (e.g. troopId or user id).
 * When the limit is exceeded, sends a 429 with a Retry-After header
 * and returns false — the caller should stop handling the request.
 */
export function enforceRateLimit(
    req: NextApiRequest,
    res: NextApiResponse,
    options: { name: string; maxRequests: number; windowMs: number; key?: string }
): boolean {
    const bucket = `${options.name}:${options.key ?? getClientIp(req)}`;
    const result = checkRateLimit(bucket, options.maxRequests, options.windowMs);

    res.setHeader("X-RateLimit-Remaining", result.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(result.resetAt / 1000));

    if (!result.allowed) {
        const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
        res.setHeader("Retry-After", retryAfter);
        res.status(429).json({ error: "Too many requests. Please try again later." });
        return false;
    }

    return true;
}
