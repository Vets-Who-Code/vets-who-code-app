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

    // Ownership: scope the download to the caller's troop. Previously this proxied
    // with only the app API key, so any authenticated user could download another
    // user's resume by guessing a sessionId. Forwarding troop_id + X-Troop-Token
    // lets J0dI3 enforce that the session belongs to the requesting troop.
    const troopId = req.user?.troopId;
    const troopToken = req.user?.troopToken;
    if (!troopId || !troopToken) {
        return res
            .status(400)
            .json({ error: "No J0dI3 troop profile linked. Please sign out and back in." });
    }

    try {
        const response = await j0di3.get(`/api/v1/jobs/resume/download/${sessionId}`, {
            responseType: "arraybuffer",
            params: { troop_id: troopId },
            headers: { "X-Troop-Token": troopToken },
        });
        const contentType = response.headers["content-type"] || "application/octet-stream";
        const disposition =
            response.headers["content-disposition"] || `attachment; filename="resume-${sessionId}"`;
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", disposition);
        return res.send(Buffer.from(response.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            // Surface J0dI3's authorization decision (e.g. 403/404 for a session
            // the troop does not own) rather than masking it as a generic failure.
            return res.status(error.response.status).json({ error: "Download failed" });
        }
        console.error("[resume/download] error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
