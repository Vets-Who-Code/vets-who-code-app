import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { type AuthenticatedRequest, requireAuth } from "@/lib/rbac";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

// J0dI3 issues UUIDs for troop IDs (see ensure-troop.ts). Reject anything
// that isn't shaped like one before making the external call, so a stale
// session or bad migration surfaces as a clear user-actionable error
// instead of an opaque 4xx/5xx from the backend.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function redactTroopId(value: string): string {
    if (value.length <= 8) return `${value.slice(0, 2)}…`;
    return `${value.slice(0, 4)}…${value.slice(-4)}`;
}

export function j0di3Proxy(method: Method, path: string | ((req: NextApiRequest) => string)) {
    return requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
        const url = typeof path === "function" ? path(req) : path;
        const troopId = req.user!.troopId;

        if (!troopId) {
            return res
                .status(400)
                .json({ error: "No J0dI3 troop profile linked. Please sign out and back in." });
        }

        if (!UUID_RE.test(troopId)) {
            console.warn(
                "[j0di3-proxy] Rejected malformed troopId for user",
                req.user!.id,
                redactTroopId(troopId)
            );
            return res.status(400).json({
                error: "Your troop profile is invalid. Please sign out and sign back in to refresh it.",
            });
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
