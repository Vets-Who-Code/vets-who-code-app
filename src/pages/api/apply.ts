import axios from "axios";
import { Request, Response } from "express";
import { checkParams } from "./api-helpers";

// Define the ParsedBody interface to type-check the request body
interface ParsedBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    branchOfService?: string;
    yearJoined?: string;
    yearSeparated?: string;
    linkedInAccountName?: string;
    githubAccountName?: string;
    preworkLink?: string;
    preworkRepo?: string;
}

export default async function handler(req: Request, res: Response) {
    try {
        const parsedBody = req.body as ParsedBody; // Ensure body matches ParsedBody interface
        const requiredParams: (keyof ParsedBody)[] = [
            "firstName",
            "lastName",
            "email",
            "city",
            "state",
            "zipCode",
            "country",
            "branchOfService",
            "yearJoined",
            "yearSeparated",
            "linkedInAccountName",
            "githubAccountName",
            "preworkLink",
            "preworkRepo",
        ];

        // Validate required fields in the parsed body
        const hasErrors = checkParams(parsedBody, requiredParams);

        if (hasErrors) {
            return res
                .status(422)
                .json({ error: "Missing or incorrect required property" });
        }

        // Construct the text message to be sent
        const text = [
            `First Name: \`${parsedBody.firstName ?? ""}\``,
            `Last Name: \`${parsedBody.lastName ?? ""}\``,
            `Email: \`${parsedBody.email ?? ""}\``,
            `City: \`${parsedBody.city ?? ""}\``,
            `State: \`${parsedBody.state ?? ""}\``,
            `Zip Code: \`${parsedBody.zipCode ?? ""}\``,
            `Country: \`${parsedBody.country ?? ""}\``,
            `Branch of Service: \`${parsedBody.branchOfService ?? ""}\``,
            `Year Joined: \`${parsedBody.yearJoined ?? ""}\``,
            `Year Separated: \`${parsedBody.yearSeparated ?? ""}\``,
            `LinkedIn Account Name: \`${
                parsedBody.linkedInAccountName ?? ""
            }\``,
            `GitHub Account Name: \`${parsedBody.githubAccountName ?? ""}\``,
            `Prework Link: \`${parsedBody.preworkLink ?? ""}\``,
            `Prework Repository: \`${parsedBody.preworkRepo ?? ""}\``,
        ].join("\n");

        // Send the payload to the configured Slack webhook URL
        await axios.post(
            `https://hooks.slack.com/services/${
                process.env.APPLY_WEBHOOK_ID ?? ""
            }`,
            JSON.stringify({ text })
        );

        // Respond with success message
        return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        // Log the error for debugging and respond with an error message
        // console.error("Failed to post to #mentor channel:", err);
        return res
            .status(500)
            .json({ message: "Failed to post to #mentor channel" });
    }
}
