import { handleApiError } from "@lib/api-error-handler";
import { setPublicCache } from "@lib/cache-control";
import { getCollections } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiLogging } from "@/lib/api-logger";

/**
 * GET /api/shopify/collections
 * Get all collections from Shopify
 * Query params:
 *   - limit: number of collections to fetch (default: 100)
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;

        const collections = await getCollections(limit);

        setPublicCache(res, 300, 600);
        return res.status(200).json({ collections });
    } catch (error) {
        handleApiError(error, res, "Failed to fetch collections");
        return;
    }
}

export default withApiLogging(handler);
