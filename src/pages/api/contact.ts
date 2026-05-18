import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { applyRateLimit } from "@/lib/rate-limit";
import { checkLength, checkParams, contactErrors } from "./api-helpers";
import { classifyContact } from "./api-helpers/classify-contact";

interface ParsedBody {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    [key: string]: string | undefined;
}

async function postToSlack(parsedBody: ParsedBody): Promise<void> {
    const { name, email, phone, message } = parsedBody;

    const text: string = [
        `Name: \`${name ?? "Sent from footer form."}\``,
        `\nEmail: \`${email ?? "Not provided."}\``,
        `\nPhone: \`${phone ?? "Not provided."}\``,
        `\nMessage: \n\`\`\`${message ?? "No message provided."}\`\`\``,
    ].join("");

    const payload: string = JSON.stringify({ text });

    const axiosConfig: AxiosRequestConfig = {
        method: "POST",
        baseURL: "https://hooks.slack.com",
        url: `/services/${(process.env.CONTACT_WEBHOOK_ID as string) ?? ""}`,
        data: payload,
    };

    await axios(axiosConfig);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Per-IP rate limit on the contact form. The Gemini classifier handles
    // semantic spam; this caps the volume that classifier even has to score.
    const rl = applyRateLimit(req, res, { scope: "contact", max: 5, windowMs: 15 * 60 * 1000 });
    if (!rl.allowed) {
        return res.status(429).json({
            error: "Too many messages sent recently. Please try again in a few minutes.",
        });
    }

    const parsedBody: ParsedBody = req.body as ParsedBody;
    const { name, email, message } = parsedBody;
    const requiredParams: string[] = ["email", "message"];

    const hasErrors: boolean = checkParams(parsedBody, requiredParams);
    const isPossiblySpam: boolean = checkLength(message ?? "");

    if (hasErrors) {
        return res.status(422).json({
            error: contactErrors.missingOrRequired,
        });
    }

    if (isPossiblySpam) {
        return res.status(400).json({
            error: contactErrors.tooShort,
        });
    }

    // Gemini spam classification (fail-open)
    const classification = await classifyContact({
        name: name ?? "Unknown",
        email: email ?? "",
        message: message ?? "",
    });

    if (classification && !classification.sendToSlack) {
        return res.status(200).json({
            message: "Message received",
            filtered: true,
            reason: classification.reason,
        });
    }

    try {
        await postToSlack(parsedBody);
        return res.status(200).json({ message: "SUCCESS" });
    } catch (err: unknown) {
        const errorMessage: string =
            err instanceof Error
                ? `Failed post to #contact channel: ${err.message}`
                : "An unexpected error occurred.";
        return res.status(500).json({ message: errorMessage });
    }
}
