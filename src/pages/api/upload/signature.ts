import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getUploadSignature } from "@/lib/cloudinary";
import { options as authOptions } from "../auth/options";

interface SignatureRequestBody {
    folder?: string;
    public_id?: string;
    transformation?: string;
}

interface SignatureResponse {
    signature: string;
    timestamp: number;
    cloudName: string;
    apiKey: string;
    folder?: string;
    error?: string;
}

/**
 * API endpoint to generate a signature for client-side Cloudinary uploads
 * This allows secure uploads directly from the browser to Cloudinary
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignatureResponse>
) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            signature: "",
            timestamp: 0,
            cloudName: "",
            apiKey: "",
            error: "Method not allowed",
        });
    }

    try {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({
                signature: "",
                timestamp: 0,
                cloudName: "",
                apiKey: "",
                error: "Unauthorized",
            });
        }

        const { folder, public_id, transformation } = req.body as SignatureRequestBody;

        // Prepare parameters to sign
        const paramsToSign: Record<string, string> = {
            folder: folder || "vets-who-code",
        };

        if (public_id) {
            paramsToSign.public_id = public_id;
        }

        if (transformation) {
            paramsToSign.transformation = transformation;
        }

        // Generate signature
        const { signature, timestamp } = getUploadSignature(paramsToSign);

        // Return signature and credentials needed for upload
        return res.status(200).json({
            signature,
            timestamp,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
            apiKey: process.env.CLOUDINARY_API_KEY as string,
            folder: paramsToSign.folder,
        });
    } catch (error) {
        console.error("Signature generation error:", error);
        return res.status(500).json({
            signature: "",
            timestamp: 0,
            cloudName: "",
            apiKey: "",
            error: error instanceof Error ? error.message : "Failed to generate signature",
        });
    }
}
