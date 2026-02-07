import { createCart } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * POST /api/shopify/cart/create
 * Create a new shopping cart
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const cart = await createCart();

        return res.status(201).json({ cart });
    } catch (error) {
        console.error("Error creating cart:", error);
        return res.status(500).json({
            error: "Failed to create cart",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
