import { NextApiRequest, NextApiResponse } from "next";
import { verifyCertificate } from "@/lib/certificates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { certificateNumber } = req.query;

        if (!certificateNumber || typeof certificateNumber !== "string") {
            return res.status(400).json({ error: "Certificate number is required" });
        }

        const result = await verifyCertificate(certificateNumber);

        if (!result) {
            return res.status(404).json({
                verified: false,
                error: "Certificate not found",
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error verifying certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
