import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ListImagesResult, listImages } from "@/lib/cloudinary";
import { options as authOptions } from "../auth/options";

interface ListRequest {
    folder?: string;
    max_results?: number;
    next_cursor?: string;
}

interface ListResponse extends Partial<ListImagesResult> {
    success: boolean;
    error?: string;
}

/**
 * API endpoint to list images from Cloudinary
 * GET /api/cloudinary/list?folder=path&max_results=30&next_cursor=abc
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ListResponse>) {
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

        const { folder, max_results, next_cursor } = req.query as Record<string, string>;

        const options: ListRequest = {};

        if (folder) {
            options.folder = folder;
        }

        if (max_results) {
            options.max_results = parseInt(max_results, 10);
        }

        if (next_cursor) {
            options.next_cursor = next_cursor;
        }

        const result = await listImages(options);

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("List images error:", error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to list images",
        });
    }
}
