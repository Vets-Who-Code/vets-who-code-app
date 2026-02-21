import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "5mb",
        },
    },
};

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

    try {
        const { pdf, fileType } = req.body as ParseRequest;

        if (!pdf) {
            return res.status(400).json({ error: "No file data provided" });
        }

        // Decode base64 to buffer
        const buffer = Buffer.from(pdf, "base64");

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
