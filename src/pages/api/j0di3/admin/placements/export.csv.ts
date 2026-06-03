import axios from "axios";
import type { NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { type AuthenticatedRequest, requireRole } from "@/lib/rbac";

export default requireRole("ADMIN")(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const response = await j0di3.get("/api/v1/admin/placements/export.csv", {
            responseType: "arraybuffer",
            params: req.query,
        });
        res.setHeader("Content-Type", response.headers["content-type"] || "text/csv");
        res.setHeader(
            "Content-Disposition",
            response.headers["content-disposition"] || "attachment; filename=placements.csv"
        );
        return res.send(Buffer.from(response.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({ error: "Export failed" });
        }
        console.error("[admin/placements/export.csv] error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
