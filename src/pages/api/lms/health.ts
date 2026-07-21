import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/**
 * GET /api/lms/health
 *
 * Public liveness check for the LMS database connection. Deliberately returns
 * NO operational data (user/course counts, sample records, schema/feature lists)
 * — a public endpoint must not disclose that. It only reports reachability.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Lightweight connectivity probe — no counts, no row data.
        await prisma.$queryRaw`SELECT 1`;
        return res.status(200).json({
            status: "healthy",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("LMS health check failed:", error);
        }
        // No error details in the response body.
        return res.status(503).json({
            status: "unhealthy",
            database: "disconnected",
            timestamp: new Date().toISOString(),
        });
    }
}
