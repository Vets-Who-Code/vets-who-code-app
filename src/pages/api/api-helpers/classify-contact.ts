import { GoogleGenAI, Type } from "@google/genai";

export interface ContactClassification {
    sendToSlack: boolean;
    category: "relevant" | "spam" | "unclear";
    confidence: number;
    reason: string;
}

interface ClassificationInput {
    name: string;
    email: string;
    message: string;
}

const CLASSIFICATION_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        sendToSlack: {
            type: Type.BOOLEAN,
            description: "Whether this message should be forwarded to Slack",
        },
        category: {
            type: Type.STRING,
            enum: ["relevant", "spam", "unclear"],
            description: "Classification category",
        },
        confidence: {
            type: Type.NUMBER,
            description: "Confidence score between 0 and 1",
        },
        reason: {
            type: Type.STRING,
            description: "Brief explanation of the classification decision",
        },
    },
    required: ["sendToSlack", "category", "confidence", "reason"],
};

const CLASSIFICATION_PROMPT = `You are a spam filter for a nonprofit coding bootcamp contact form (Vets Who Code).

Classify the following contact form submission.

Rules:
- "relevant": Genuine inquiries about the program, mentorship, donations, partnerships, volunteering, hiring veterans, or personal messages to the team.
- "spam": SEO pitches, backlink or guest post requests, marketing/advertising services, unsolicited sales, crypto/forex/gambling, adult content, link-building requests, auto-generated gibberish, or phishing attempts.
- "unclear": The message is ambiguous or you cannot determine intent with reasonable confidence.

For sendToSlack:
- true if category is "relevant" or "unclear" (err on the side of delivering)
- false only if category is "spam" with confidence >= 0.8

Name: {name}
Email: {email}
Message:
{message}`;

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function classifyContact(
    input: ClassificationInput
): Promise<ContactClassification | null> {
    const apiKey: string | undefined = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        console.warn("GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY not configured, skipping spam classification");
        return null;
    }

    const model: string = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;

    try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt: string = CLASSIFICATION_PROMPT
            .replace("{name}", input.name)
            .replace("{email}", input.email)
            .replace("{message}", input.message);

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: CLASSIFICATION_SCHEMA,
                temperature: 0,
            },
        });

        const text: string | undefined = response.text;

        if (!text) {
            console.error("Gemini returned empty response, failing open");
            return null;
        }

        const classification: ContactClassification = JSON.parse(text) as ContactClassification;

        console.info(
            "Contact classification:",
            JSON.stringify({
                category: classification.category,
                confidence: classification.confidence,
                sendToSlack: classification.sendToSlack,
            })
        );

        return classification;
    } catch (error: unknown) {
        console.error(
            "Gemini classification failed, failing open:",
            error instanceof Error ? error.message : "Unknown error"
        );
        return null;
    }
}
