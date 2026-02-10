import { getCollection } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * GET /api/shopify/collections/[handle]
 * Get a single collection by handle with its products
 * Query params:
 *   - productsLimit: number of products to fetch (default: 100)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { handle } = req.query;
        const productsLimit = req.query.productsLimit
            ? parseInt(req.query.productsLimit as string, 10)
            : 100;

        if (!handle || typeof handle !== "string") {
            return res.status(400).json({ error: "Collection handle is required" });
        }

        const collection = await getCollection(handle, productsLimit);

        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        return res.status(200).json({ collection });
    } catch (error) {
        console.error("Error fetching collection:", error);
        return res.status(500).json({
            error: "Failed to fetch collection",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
