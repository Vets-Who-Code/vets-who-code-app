import type { NextApiRequest, NextApiResponse } from "next";
import { enforceRateLimit } from "@/lib/rate-limit";
import { version } from "../../../package.json";

interface HealthResponse {
    status: "healthy";
    version: string;
    timestamp: string;
    uptime: number;
}

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Service health check
 *     description: Reports that the app is up, with its version and uptime. Rate limited to 30 requests per minute per IP.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *       405:
 *         description: Method not allowed
 *       429:
 *         description: Rate limit exceeded. Retry after the number of seconds in the Retry-After header.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HealthResponse | { error: string }>
) {
    // 30 req/min per IP.
    if (!enforceRateLimit(req, res, { name: "health", maxRequests: 30, windowMs: 60 * 1000 })) {
        return;
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    return res.status(200).json({
        status: "healthy",
        version,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
}
