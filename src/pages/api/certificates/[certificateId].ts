import { NextApiRequest, NextApiResponse } from "next";
import { getCertificateById } from "@/lib/certificates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { certificateId } = req.query;

        if (!certificateId || typeof certificateId !== "string") {
            return res.status(400).json({ error: "Certificate ID is required" });
        }

        const certificate = await getCertificateById(certificateId);

        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        res.status(200).json({ certificate });
    } catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
