import axios from "axios";
import { Request, Response } from "express";
import type { NextApiRequest, NextApiResponse } from "next";
import { applyRateLimit } from "@/lib/rate-limit";
import { checkParams } from "./api-helpers";

// Define the ParsedBody type for mentee
interface ParsedBody {
    name: string;
    email: string;
    "branch-of-service": string;
    "desired-skills": string;
    "github-portfolio-or-linkedin": string;
    location: string;
    "career-goals": string;
    availability: string;
}

export default async function handler(req: Request, res: Response) {
    try {
        const rl = applyRateLimit(
            req as unknown as NextApiRequest,
            res as unknown as NextApiResponse,
            { scope: "mentee", max: 5, windowMs: 60 * 60 * 1000 }
        );
        if (!rl.allowed) {
            return res.status(429).json({
                message: "Too many mentee signups. Please try again in an hour.",
            });
        }

        const parsedBody = req.body as ParsedBody; // Cast to ensure body matches ParsedBody interface

        const requiredParams: (keyof ParsedBody)[] = [
            "name",
            "email",
            "branch-of-service",
            "desired-skills",
            "github-portfolio-or-linkedin",
            "location",
            "career-goals",
            "availability",
        ];

        // Leverage TypeScript's type inference for generic parameters
        const hasErrors = checkParams(parsedBody, requiredParams);

        if (hasErrors) {
            return res.status(422).json({
                error: "Missing or incorrect required property",
            });
        }

        // Construct the message text
        const text = [
            `Name: \`${parsedBody.name}\``,
            `Email: \`${parsedBody.email}\``,
            `Branch of Service: \`${parsedBody["branch-of-service"]}\``,
            `Desired Skills: \`${parsedBody["desired-skills"]}\``,
            `Github, Portfolio or LinkedIn: \`${parsedBody["github-portfolio-or-linkedin"]}\``,
            `Location: \`${parsedBody.location}\``,
            `Career Goals: \`${parsedBody["career-goals"]}\``,
            `Availability: \`${parsedBody.availability}\``,
        ].join("\n");

        // Send the constructed message to Slack (using the same mentor webhook)
        await axios
            .post(
                `https://hooks.slack.com/services/${process.env.MENTOR_WEBHOOK_ID ?? ""}`,
                JSON.stringify({ text })
            )
            .catch(() => {
                throw new Error("Failed to post to Slack");
            });

        // Respond with a success message
        return res.status(200).json({ message: "SUCCESS" });
    } catch (_err) {
        // Log the error for debugging and respond with an error message
        // console.error("Handler error:", err);
        return res.status(500).json({ message: "Failed to post to #mentor channel" });
    }
}
