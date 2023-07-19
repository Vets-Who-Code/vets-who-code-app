import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { checkParams, checkLength, contactErrors } from "./api-helpers";

interface ParsedBody {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    [key: string]: string | undefined;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const parsedBody: ParsedBody = req.body as ParsedBody;
    const { name, email, phone, message } = parsedBody;
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

    const safeMessage: string = message ?? "No message provided.";

    const text: string = [
        `Name: \`${name ?? "Sent from footer form."}\``,
        `\nEmail: \`${email ?? "Not provided."}\``,
        `\nPhone: \`${phone ?? "Not provided."}\``,
        `\nMessage: \n\`\`\`${safeMessage}\`\`\``,
    ].join("");

    const payload: string = JSON.stringify({ text });

    const axiosConfig: AxiosRequestConfig = {
        method: "POST",
        baseURL: "https://hooks.slack.com",
        url: `/services/${process.env.CONTACT_WEBHOOK_ID}`,
        data: payload,
    };

    try {
        await axios(axiosConfig);
        return res.status(200).json({ message: "SUCCESS" });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({
                message: `Failed post to #contact channel: ${err.message}`,
            });
        }
        return res.status(500).json({
            message: "An unexpected error occurred.",
        });
    }
}
