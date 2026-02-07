import { getCollections } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * GET /api/shopify/collections
 * Get all collections from Shopify
 * Query params:
 *   - limit: number of collections to fetch (default: 100)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;

        const collections = await getCollections(limit);

        return res.status(200).json({ collections });
    } catch (error) {
        console.error("Error fetching collections:", error);
        return res.status(500).json({
            error: "Failed to fetch collections",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
