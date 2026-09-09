import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { checkLength, checkParams, contactErrors } from "@/lib/api-helpers";
import { classifyContact } from "@/lib/api-helpers/classify-contact";
import { enforceRateLimit } from "@/lib/rate-limit";

interface ParsedBody {
    /** Honeypot. Any value means a bot filled a field humans never see. */
    website?: string;
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    [key: string]: string | undefined;
}

async function postToSlack(parsedBody: ParsedBody): Promise<void> {
    const { name, email, phone, subject, message, role, reason } = parsedBody;

    const lines: string[] = [
        `Name: \`${name ?? "Sent from footer form."}\``,
        `\nEmail: \`${email ?? "Not provided."}\``,
        `\nPhone: \`${phone ?? "Not provided."}\``,
    ];
    if (subject) {
        lines.push(`\nSubject: \`${subject}\``);
    }
    // Routing metadata, so the channel can triage without reading the whole message.
    if (role) {
        lines.push(`\nRole: \`${role}\``);
    }
    if (reason) {
        lines.push(`\nReason: \`${reason}\``);
    }
    lines.push(`\nMessage: \n\`\`\`${message ?? "No message provided."}\`\`\``);

    const text: string = lines.join("");

    const payload: string = JSON.stringify({ text });

    const axiosConfig: AxiosRequestConfig = {
        method: "POST",
        baseURL: "https://hooks.slack.com",
        url: `/services/${(process.env.CONTACT_WEBHOOK_ID as string) ?? ""}`,
        data: payload,
    };

    await axios(axiosConfig);
}

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit the contact form
 *     description: Validates the submission, filters spam, and forwards it to Slack. Rate limited to 5 requests per minute per IP.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message accepted
 *       400:
 *         description: Message too short
 *       422:
 *         description: Missing required fields
 *       429:
 *         description: Rate limit exceeded. Retry after the number of seconds in the Retry-After header.
 *       500:
 *         description: Failed to deliver the message
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 5 req/min per IP — strict, this endpoint triggers AI classification and Slack posts.
    if (!enforceRateLimit(req, res, { name: "contact", maxRequests: 5, windowMs: 60 * 1000 })) {
        return;
    }

    const parsedBody: ParsedBody = req.body as ParsedBody;

    // Honeypot: a field hidden off-screen that no human fills in. Bots fill every
    // input they find. Checked before the classifier so obvious bots cost nothing,
    // and answered with 200 so they can't tell the submission was dropped.
    if (parsedBody.website) {
        return res.status(200).json({ message: "Message received", filtered: true });
    }

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
        subject: parsedBody.subject ?? "",
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
