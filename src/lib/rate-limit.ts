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

export interface ApplyRateLimitOptions {
    /** Bucket key. Defaults to client IP. Use a user/session id for per-user limits. */
    key?: string;
    /** Max requests allowed in the window. */
    max: number;
    /** Window length in milliseconds. */
    windowMs: number;
    /** Optional prefix added to the key (avoids collisions across endpoints sharing a key strategy). */
    scope?: string;
}

/**
 * Apply a rate limit and set the standard headers (X-RateLimit-* and
 * Retry-After when blocked). The caller is responsible for short-circuiting
 * with `res.status(429).json(...)` when `allowed === false`.
 */
export function applyRateLimit(
    req: NextApiRequest,
    res: NextApiResponse,
    options: ApplyRateLimitOptions
): RateLimitResult {
    const rawKey = options.key || getClientIp(req);
    const bucketKey = options.scope ? `${options.scope}:${rawKey}` : rawKey;
    const limit = checkRateLimit(bucketKey, options.max, options.windowMs);

    res.setHeader("X-RateLimit-Limit", options.max);
    res.setHeader("X-RateLimit-Remaining", limit.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(limit.resetAt / 1000));
    if (!limit.allowed) {
        const retryAfterSec = Math.max(0, Math.ceil((limit.resetAt - Date.now()) / 1000));
        res.setHeader("Retry-After", retryAfterSec);
    }
    return limit;
}

/**
 * Exposed for unit tests — clears the in-memory bucket so test order does not
 * accumulate state. Do not call from production code.
 */
export function _resetRateLimitForTests(): void {
    ipBuckets.clear();
    lastCleanup = Date.now();
}
