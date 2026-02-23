import type { NextApiRequest, NextApiResponse } from "next";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "5mb",
        },
    },
};

// Max decoded buffer size: 5 MB (base64 inflates ~33%, so 5MB body ≈ 3.75MB decoded)
const MAX_DECODED_BYTES = 5 * 1024 * 1024;
// Cap extracted text to 500KB to prevent memory issues from decompression bombs
const MAX_TEXT_LENGTH = 500 * 1024;

interface ParseRequest {
    pdf: string; // base64-encoded PDF or DOCX
    fileType?: "pdf" | "docx";
}

interface ParseResponse {
    text: string;
    pageCount: number;
}

interface ParseError {
    error: string;
}

// DOCX files start with PK magic bytes (ZIP format)
const PK_MAGIC = [0x50, 0x4b, 0x03, 0x04];

function isDocxBuffer(buffer: Buffer): boolean {
    if (buffer.length < 4) return false;
    return PK_MAGIC.every((byte, i) => buffer[i] === byte);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ParseResponse | ParseError>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Rate limit: 10 file parses per 15 minutes per IP
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip, 10, 15 * 60 * 1000);
    res.setHeader("X-RateLimit-Remaining", limit.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(limit.resetAt / 1000));
    if (!limit.allowed) {
        return res.status(429).json({
            error: "Too many upload requests. Please try again in a few minutes.",
        });
    }

    try {
        const { pdf, fileType } = req.body as ParseRequest;

        if (!pdf) {
            return res.status(400).json({ error: "No file data provided" });
        }

        // Decode base64 to buffer
        const buffer = Buffer.from(pdf, "base64");

        if (buffer.length > MAX_DECODED_BYTES) {
            return res.status(400).json({
                error: `File too large (${(buffer.length / 1024 / 1024).toFixed(1)}MB). Maximum file size is 5MB.`,
            });
        }

        // Determine file type from explicit param or magic bytes
        const isDocx = fileType === "docx" || (!fileType && isDocxBuffer(buffer));
        const isPdf = fileType === "pdf" || (!fileType && buffer.length >= 4 && buffer.toString("ascii", 0, 4) === "%PDF");

        if (!isDocx && !isPdf) {
            return res
                .status(400)
                .json({ error: "Invalid file. Please upload a valid PDF or DOCX file." });
        }

        let text: string;
        let pageCount: number;

        if (isDocx) {
            const mammoth = await import("mammoth");
            const result = await mammoth.extractRawText({ buffer });
            text = result.value?.trim() || "";
            pageCount = 1; // mammoth doesn't provide page counts
        } else {
            // Validate PDF magic bytes (%PDF)
            if (buffer.length < 4 || buffer.toString("ascii", 0, 4) !== "%PDF") {
                return res
                    .status(400)
                    .json({ error: "Invalid file. Please upload a valid PDF." });
            }

            const { PDFParse } = await import("pdf-parse");
            const parser = new PDFParse({ data: new Uint8Array(buffer) });
            const result = await parser.getText();

            text = result.text?.trim() || "";
            pageCount = result.total;

            await parser.destroy();
        }

        if (!text || text.length < 20) {
            return res.status(422).json({
                error: "Could not extract text from this file. It may be a scanned document or image-only file. Please copy and paste your resume text instead.",
            });
        }

        // Truncate if the extracted text is abnormally large (decompression bomb defense)
        if (text.length > MAX_TEXT_LENGTH) {
            console.warn(`Extracted text truncated: ${text.length} chars -> ${MAX_TEXT_LENGTH} chars`);
            text = text.slice(0, MAX_TEXT_LENGTH);
        }

        return res.status(200).json({
            text,
            pageCount,
        });
    } catch (error) {
        console.error("File parse error:", error);
        return res.status(500).json({
            error: "Failed to parse file. Please try again or paste your resume text manually.",
        });
    }
}
