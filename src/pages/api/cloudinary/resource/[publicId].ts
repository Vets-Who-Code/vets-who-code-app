import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { CloudinaryResource, getImageByPublicId } from "@/lib/cloudinary";
import { options as authOptions } from "../../auth/options";

interface ResourceResponse {
    success: boolean;
    resource?: CloudinaryResource;
    error?: string;
}

/**
 * API endpoint to get a single image resource by public ID
 * GET /api/cloudinary/resource/[publicId]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResourceResponse>) {
    // Only allow GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    try {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        const { publicId } = req.query;

        if (!publicId || typeof publicId !== "string") {
            return res.status(400).json({
                success: false,
                error: "Public ID is required",
            });
        }

        // Decode the public ID (it might be URL encoded)
        const decodedPublicId = decodeURIComponent(publicId);

        const resource = await getImageByPublicId(decodedPublicId);

        return res.status(200).json({
            success: true,
            resource,
        });
    } catch (error) {
        console.error("Get image resource error:", error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to get image resource",
        });
    }
}
