import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";
import { options as authOptions } from "../auth/options";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "15mb",
        },
    },
};

// Wider allow-list than /api/upload/image — covers what students typically
// submit alongside (or instead of) a GitHub link.
const DEFAULT_ALLOWED_FORMATS = [
    "pdf",
    "zip",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "txt",
    "md",
    "doc",
    "docx",
];

interface UploadedFile {
    name?: string;
    data: string;
}

interface UploadRequestBody {
    file?: string;
    files?: UploadedFile[] | string[];
    folder?: string;
    public_id?: string;
    allowedFormats?: string[];
}

interface FileResult {
    url: string;
    public_id: string;
    format?: string;
    bytes?: number;
    original_filename?: string;
}

interface UploadResponse {
    success: boolean;
    files?: FileResult[];
    error?: string;
}

async function uploadOne(
    file: string,
    folder: string,
    allowedFormats: string[],
    public_id?: string
): Promise<FileResult> {
    const result = await cloudinary.uploader.upload(file, {
        folder,
        public_id,
        resource_type: "auto",
        allowed_formats: allowedFormats,
    });
    return {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
        original_filename: result.original_filename,
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UploadResponse>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
        const { file, files, folder, public_id, allowedFormats } = req.body as UploadRequestBody;
        const allow = allowedFormats?.length ? allowedFormats : DEFAULT_ALLOWED_FORMATS;
        const targetFolder = folder || "vets-who-code/uploads";

        if (file) {
            const result = await uploadOne(file, targetFolder, allow, public_id);
            return res.status(200).json({ success: true, files: [result] });
        }

        if (Array.isArray(files) && files.length > 0) {
            // Accept both shapes — bare base64 strings or { name, data } pairs.
            const dataStrings: string[] = files.map((f) => (typeof f === "string" ? f : f.data));
            const results = await Promise.all(
                dataStrings.map((data) => uploadOne(data, targetFolder, allow))
            );
            return res.status(200).json({ success: true, files: results });
        }

        return res.status(400).json({ success: false, error: "No file or files provided" });
    } catch (error) {
        console.error("[upload/file] Upload error:", error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to upload",
        });
    }
}
