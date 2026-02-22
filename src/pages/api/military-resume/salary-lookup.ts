import type { NextApiRequest, NextApiResponse } from "next";
import { fetchLaborMarketData } from "@/lib/labor-market";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const SOC_FORMAT = /^\d{2}-\d{4}$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Rate limit: 30 salary lookups per 15 minutes per IP
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip, 30, 15 * 60 * 1000);
    res.setHeader("X-RateLimit-Remaining", limit.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(limit.resetAt / 1000));
    if (!limit.allowed) {
        return res.status(429).json({
            error: "Too many requests. Please try again in a few minutes.",
        });
    }

    const { socCode } = req.body as { socCode?: string };

    if (!socCode || !SOC_FORMAT.test(socCode)) {
        return res.status(400).json({
            error: "Invalid SOC code format. Expected format: XX-XXXX (e.g., 15-1244)",
        });
    }

    try {
        const salary = await fetchLaborMarketData(socCode, 0, "Unknown");
        return res.status(200).json({ salary });
    } catch (error) {
        console.error("Salary lookup error:", error);
        return res.status(500).json({ error: "Failed to fetch salary data" });
    }
}
