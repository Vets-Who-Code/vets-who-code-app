import type { NextApiResponse } from "next";
import { requireAuth, type AuthenticatedRequest } from "@/lib/rbac";
import j0di3 from "@/lib/j0di3-client";

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const troopId = req.user!.troopId;

    if (!troopId) {
        return res.status(400).json({ error: "No J0dI3 troop profile linked." });
    }

    try {
        if (req.method === "GET") {
            const { data } = await j0di3.get(`/api/v1/troops/${troopId}`);
            return res.json(data);
        }

        if (req.method === "PATCH") {
            const { data } = await j0di3.patch(`/api/v1/troops/${troopId}`, req.body);
            return res.json(data);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error: unknown) {
        const axios = await import("axios");
        if (axios.default.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({
                error: error.response.data?.detail || "J0dI3 request failed",
            });
        }
        console.error("[troops/me] Unexpected error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
