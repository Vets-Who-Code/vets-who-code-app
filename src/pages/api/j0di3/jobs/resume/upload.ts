import axios from "axios";
import FormData from "form-data";
import type { NextApiResponse } from "next";
import j0di3 from "@/lib/j0di3-client";
import { type AuthenticatedRequest, requireAuth } from "@/lib/rbac";

export const config = {
    api: { bodyParser: { sizeLimit: "5mb" } },
};

interface UploadRequest {
    file: string; // base64
    filename?: string;
    contentType?: string;
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const troopId = req.user!.troopId;
    if (!troopId) return res.status(400).json({ error: "No J0dI3 troop profile linked." });

    const { file, filename, contentType } = req.body as UploadRequest;
    if (!file) return res.status(400).json({ error: "Missing file" });

    try {
        const buffer = Buffer.from(file, "base64");
        const form = new FormData();
        form.append("file", buffer, {
            filename: filename || "resume.pdf",
            contentType: contentType || "application/pdf",
        });
        form.append("troop_id", troopId);

        const { data } = await j0di3.post("/api/v1/jobs/resume/upload", form, {
            headers: form.getHeaders(),
            maxContentLength: Number.POSITIVE_INFINITY,
            maxBodyLength: Number.POSITIVE_INFINITY,
        });
        return res.json(data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({
                error: error.response.data?.detail || "J0dI3 upload failed",
            });
        }
        console.error("[resume/upload] error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
