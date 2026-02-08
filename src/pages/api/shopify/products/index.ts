import { getProducts } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * GET /api/shopify/products
 * Get all products from Shopify
 * Query params:
 *   - limit: number of products to fetch (default: 100)
 *   - query: Shopify query string for filtering
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;
        const query = req.query.query as string | undefined;

        const products = await getProducts(limit, query);

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            error: "Failed to fetch products",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
