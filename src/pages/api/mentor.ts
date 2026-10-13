import { postJson } from "@utils/post-json";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkParams } from "@/lib/api-helpers";
import { enforceRateLimit } from "@/lib/rate-limit";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 3 req/10 min per IP, one bucket shared with /api/mentee — both post to the same webhook.
    if (!enforceRateLimit(req, res, { name: "mentor", maxRequests: 3, windowMs: 10 * 60 * 1000 })) {
        return;
    }

    try {
        const parsedBody = req.body as ParsedBody; // Cast to ensure body matches ParsedBody interface
        const requiredParams: (keyof ParsedBody)[] = [
            "name",
            "email",
            "branch-of-service",
            "technical-expertise",
            "github-portfolio-or-linkedin",
            "location",
            "employer-restrictions",
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
            `Technical Expertise: \`${parsedBody["technical-expertise"]}\``,
            `Github, Portfolio or LinkedIn: \`${parsedBody["github-portfolio-or-linkedin"]}\``,
            `Location: \`${parsedBody.location}\``,
            `Employer Restrictions: \`${parsedBody["employer-restrictions"]}\``,
        ].join("\n");

        // Send the constructed message to Slack
        await postJson(`https://hooks.slack.com/services/${process.env.MENTOR_WEBHOOK_ID ?? ""}`, {
            text,
        }).catch(() => {
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
