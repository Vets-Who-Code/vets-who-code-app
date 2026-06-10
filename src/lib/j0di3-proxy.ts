import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { type AuthenticatedRequest, requireAuth, requireRole } from "@/lib/rbac";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface ProxyOptions {
    injectTroopId?: boolean;
}

async function dispatch(
    req: AuthenticatedRequest,
    res: NextApiResponse,
    method: Method,
    url: string,
    injectTroopId: boolean
) {
    const troopId = req.user!.troopId;
    const troopToken = req.user!.troopToken;

    if (injectTroopId && !troopId) {
        return res
            .status(400)
            .json({ error: "No J0dI3 troop profile linked. Please sign out and back in." });
    }

    if (injectTroopId && !troopToken) {
        return res.status(400).json({
            error: "Missing J0dI3 troop access token. Please sign out and back in to refresh.",
        });
    }

    try {
        const body =
            method !== "GET"
                ? injectTroopId
                    ? { ...req.body, troop_id: troopId }
                    : req.body
                : undefined;

        const params =
            method === "GET"
                ? injectTroopId
                    ? { ...req.query, troop_id: troopId }
                    : req.query
                : undefined;

        const headers: Record<string, string> = {};
        if (injectTroopId && troopToken) {
            headers["X-Troop-Token"] = troopToken;
        }
        // Forward idempotency + correlation headers when the caller supplies them.
        const idempotencyKey = req.headers?.["idempotency-key"];
        if (typeof idempotencyKey === "string") {
            headers["Idempotency-Key"] = idempotencyKey;
        }
        const requestId = req.headers?.["x-request-id"];
        if (typeof requestId === "string") {
            headers["X-Request-ID"] = requestId;
        }

        const response = await j0di3({ method, url, data: body, params, headers });

        // J0dI3 echoes X-Request-ID back; surface it for support correlation.
        const echoedRequestId = response.headers?.["x-request-id"];
        if (typeof echoedRequestId === "string") {
            res.setHeader("X-Request-ID", echoedRequestId);
        }

        res.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const message =
                error.response.data?.detail || error.response.data?.error || "J0dI3 request failed";
            return res.status(status).json({ error: message });
        }
        console.error("[j0di3-proxy] Unexpected error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export function j0di3Proxy(
    method: Method,
    path: string | ((req: NextApiRequest) => string),
    options: ProxyOptions = {}
) {
    const injectTroopId = options.injectTroopId !== false;
    return requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
        const url = typeof path === "function" ? path(req) : path;
        return dispatch(req, res, method, url, injectTroopId);
    });
}

export function j0di3AdminProxy(method: Method, path: string | ((req: NextApiRequest) => string)) {
    return requireRole("ADMIN")(async (req: AuthenticatedRequest, res: NextApiResponse) => {
        const url = typeof path === "function" ? path(req) : path;
        return dispatch(req, res, method, url, false);
    });
}
