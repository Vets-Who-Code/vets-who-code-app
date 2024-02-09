import axios from "axios";
import { Request, Response } from "express";
import { checkParams } from "./api-helpers";

// Define the ParsedBody type
interface ParsedBody {
    name: string;
    email: string;
    "branch-of-service": string;
    "technical-expertise": string;
    "github-portfolio-or-linkedin": string;
    location: string;
    "employer-restrictions": string;
}

export default async function handler(req: Request, res: Response) {
    try {
        const parsedBody: ParsedBody = req.body;
        // Correctly typed requiredParams to leverage TypeScript's type checking
        const requiredParams: (keyof ParsedBody)[] = [
            "name",
            "email",
            "branch-of-service",
            "technical-expertise",
            "github-portfolio-or-linkedin",
            "location",
            "employer-restrictions",
        ];
        
        // Assuming checkParams is now properly generic
        const hasErrors = checkParams<ParsedBody>(parsedBody, requiredParams);

        if (hasErrors) {
            return res.status(422).json({
                error: "Missing or incorrect required property",
            });
        }

        const text = [
            `Name: \`${parsedBody.name}\``,
            `\nEmail: \`${parsedBody.email}\``,
            `\nBranch of Service: \`${parsedBody["branch-of-service"]}\``,
            `\nTechnical Expertise: \`${parsedBody["technical-expertise"]}\``,
            `\nGithub, Portfolio or LinkedIn: \`${parsedBody["github-portfolio-or-linkedin"]}\``,
            `\nLocation: \`${parsedBody.location}\``,
            `\nEmployer Restrictions: \`${parsedBody["employer-restrictions"]}\``,
        ].join("");

        const payload = JSON.stringify({ text });

        await axios({
            method: "POST",
            baseURL: "https://hooks.slack.com",
            url: `/services/${process.env.MENTOR_WEBHOOK_ID ?? ""}`,
            data: payload,
        }).catch((err: unknown) => {
            // More specific error handling could be applied here
            console.error("Error posting to Slack:", err);
            throw new Error("Failed to post to Slack");
        });

        return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        console.error("Handler error:", err);
        return res.status(500).json({ message: "Failed post to #mentor channel" });
    }
}
