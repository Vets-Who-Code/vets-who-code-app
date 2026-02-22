import { generateText } from "ai";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAIModelWithFallback } from "@/lib/ai-provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

interface ExtractFieldsRequest {
    text: string;
}

interface ExtractedFields {
    branch: string;
    rank: string;
    jobTitle: string;
    duties: string;
    achievements: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Rate limit: 10 field extractions per 15 minutes per IP
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip, 10, 15 * 60 * 1000);
    res.setHeader("X-RateLimit-Remaining", limit.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(limit.resetAt / 1000));
    if (!limit.allowed) {
        return res.status(429).json({
            error: "Too many requests. Please try again in a few minutes.",
        });
    }

    try {
        const { text } = req.body as ExtractFieldsRequest;

        if (!text || text.trim().length < 20) {
            return res
                .status(400)
                .json({ error: "Insufficient text to extract fields from." });
        }

        const aiModel = await getAIModelWithFallback();

        if (!aiModel) {
            return res.status(503).json({
                error: "AI service unavailable.",
            });
        }

        const prompt = `You are a military resume parser. Extract structured fields from the following raw resume text.

RAW RESUME TEXT:
${text}

Extract the following fields. If a field cannot be determined, return an empty string.

OUTPUT FORMAT — respond with ONLY this JSON, no other text:
{
  "branch": "branch of service (e.g., U.S. Army, U.S. Navy, U.S. Marine Corps, U.S. Air Force, U.S. Space Force, U.S. Coast Guard, U.S. National Guard)",
  "rank": "military rank (e.g., Sergeant, Petty Officer First Class)",
  "jobTitle": "MOS/Rating/AFSC code or military job title (e.g., 11B, 68W, 3P0X1, Infantry Squad Leader)",
  "duties": "key duties and responsibilities, one per line",
  "achievements": "achievements and awards, one per line"
}

RULES:
- For duties and achievements, put each item on its own line
- Keep duties factual and specific — do not embellish or translate to civilian terms
- If the resume lists education or certifications, do NOT include them in duties or achievements
- If you find a MOS/Rating code, use that as the jobTitle`;

        const { text: responseText } = await generateText({
            model: aiModel.model,
            prompt,
            temperature: 0.3,
        });

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return res
                .status(422)
                .json({ error: "Failed to extract structured fields." });
        }

        const fields: ExtractedFields = JSON.parse(jsonMatch[0]);

        return res.status(200).json(fields);
    } catch (error) {
        console.error("Field extraction error:", error);
        return res.status(500).json({
            error: "Failed to extract fields from resume text.",
        });
    }
}
