import axios from "axios";
import type { NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { type AuthenticatedRequest, requireAuth } from "@/lib/rbac";

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    const sessionId = req.query.sessionId;
    if (typeof sessionId !== "string") {
        return res.status(400).json({ error: "Missing sessionId" });
    }

    try {
        const response = await j0di3.get(`/api/v1/jobs/resume/download/${sessionId}`, {
            responseType: "arraybuffer",
        });
        const contentType = response.headers["content-type"] || "application/octet-stream";
        const disposition =
            response.headers["content-disposition"] || `attachment; filename="resume-${sessionId}"`;
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", disposition);
        return res.send(Buffer.from(response.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({
                error: "Download failed",
            });
        }
        console.error("[resume/download] error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
