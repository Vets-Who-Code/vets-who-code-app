import { generateText } from "ai";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getAIModelWithFallback } from "@/lib/ai-provider";

export interface TranslateRequest {
    jobTitle: string;
    rank: string;
    branch: string;
    duties: string;
    achievements: string;
}

export interface TranslateResponse {
    jobTitle: string;
    summary: string;
    keyResponsibilities: string[];
    achievements: string[];
    suggestions: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check authentication
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { jobTitle, rank, branch, duties, achievements } = req.body as TranslateRequest;

        // Get AI model with fallback
        const aiModel = await getAIModelWithFallback();

        if (!aiModel) {
            return res.status(503).json({
                error: "AI service unavailable. Please configure AI provider API keys.",
            });
        }

        // Create comprehensive prompt for translation
        const prompt = `You are a professional resume translator helping military veterans translate their military experience into civilian-friendly resume language.

Military Profile:
- Job Title/MOS: ${jobTitle}
- Rank: ${rank}
- Branch: ${branch}
- Duties: ${duties}
- Achievements: ${achievements}

Please translate this military profile into civilian resume language. Provide:
1. A civilian job title equivalent
2. A professional summary (2-3 sentences)
3. Key responsibilities (translate each duty into civilian language, preserving numbers/metrics)
4. Achievements (translate military achievements into civilian language)
5. 3 specific suggestions for improving the resume

Format your response as JSON with this structure:
{
  "jobTitle": "civilian job title",
  "summary": "professional summary",
  "keyResponsibilities": ["responsibility 1", "responsibility 2", ...],
  "achievements": ["achievement 1", "achievement 2", ...],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Important guidelines:
- Replace military jargon with business terminology
- Keep all numbers and metrics
- Use strong action verbs (led, managed, developed, etc.)
- Focus on transferable skills
- Make it ATS-friendly (no military acronyms without explanation)`;

        // Generate translation using AI
        const { text } = await generateText({
            model: aiModel.model,
            prompt,
            temperature: 0.7,
        });

        // Parse AI response
        let translatedProfile: TranslateResponse;

        try {
            // Try to parse JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                translatedProfile = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found in response");
            }
        } catch (parseError) {
            // Fallback: create structured response from text
            console.error("Failed to parse AI response:", parseError);

            translatedProfile = {
                jobTitle,
                summary:
                    "Experienced professional with proven leadership and operational experience",
                keyResponsibilities: duties.split("\n").filter((d) => d.trim()),
                achievements: achievements ? achievements.split("\n").filter((a) => a.trim()) : [],
                suggestions: [
                    "Add specific numbers and metrics to quantify your impact",
                    "Start each bullet point with a strong action verb",
                    "Include the results or outcomes of your work",
                ],
            };
        }

        return res.status(200).json(translatedProfile);
    } catch (error) {
        console.error("Translation error:", error);
        return res.status(500).json({
            error: "Failed to translate resume. Please try again.",
        });
    }
}
