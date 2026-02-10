import { removeFromCart } from "@lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * POST /api/shopify/cart/remove
 * Remove items from cart
 * Body: {
 *   cartId: string
 *   lineIds: string[]
 * }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { cartId, lineIds } = req.body;

        if (!cartId || typeof cartId !== "string") {
            return res.status(400).json({ error: "Cart ID is required" });
        }

        if (!lineIds || !Array.isArray(lineIds) || lineIds.length === 0) {
            return res.status(400).json({ error: "Line IDs array is required" });
        }

        // Validate lineIds format
        for (const lineId of lineIds) {
            if (typeof lineId !== "string") {
                return res.status(400).json({ error: "Each line ID must be a string" });
            }
        }

        const cart = await removeFromCart(cartId, lineIds);

        return res.status(200).json({ cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({
            error: "Failed to remove items from cart",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
