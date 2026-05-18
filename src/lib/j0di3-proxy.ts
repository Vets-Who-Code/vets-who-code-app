import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { applyRateLimit } from "@/lib/rate-limit";
import { type AuthenticatedRequest, requireAuth } from "@/lib/rbac";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export function j0di3Proxy(method: Method, path: string | ((req: NextApiRequest) => string)) {
    return requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
        const url = typeof path === "function" ? path(req) : path;

        // Per-user rate limit. Every call hits a paid AI backend, so a
        // misbehaving client or stolen session should not be able to drive
        // cost up arbitrarily.
        const rl = applyRateLimit(req, res, {
            scope: "j0di3",
            key: req.user!.id,
            max: 30,
            windowMs: 60_000,
        });
        if (!rl.allowed) {
            return res.status(429).json({
                error: "You're making requests to J0dI3 too quickly. Please wait a moment and try again.",
            });
        }

        const troopId = req.user!.troopId;

        if (!troopId) {
            return res
                .status(400)
                .json({ error: "No J0dI3 troop profile linked. Please sign out and back in." });
        }

        try {
            const body = method !== "GET" ? { ...req.body, troop_id: troopId } : undefined;

            const { data } = await j0di3({
                method,
                url,
                data: body,
                params: method === "GET" ? { ...req.query, troop_id: troopId } : undefined,
            });

            res.json(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                const message =
                    error.response.data?.detail ||
                    error.response.data?.error ||
                    "J0dI3 request failed";
                return res.status(status).json({ error: message });
            }
            console.error("[j0di3-proxy] Unexpected error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
