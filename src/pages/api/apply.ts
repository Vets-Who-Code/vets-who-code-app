import axios from "axios";
import { Request, Response } from "express";
import { checkParams } from "./api-helpers";

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
        const parsedBody: ParsedBody = req.body;
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
        
        // Note: Type argument removed since TypeScript infers <ParsedBody> from the argument types
        const hasErrors = checkParams(parsedBody, requiredParams);

        if (hasErrors) {
            return res.status(422).json({
                error: "Missing or incorrect required property",
            });
        }

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
            `LinkedIn Account Name: \`${parsedBody.linkedInAccountName ?? ""}\``,
            `GitHub Account Name: \`${parsedBody.githubAccountName ?? ""}\``,
            `Prework Link: \`${parsedBody.preworkLink ?? ""}\``,
            `Prework Repository: \`${parsedBody.preworkRepo ?? ""}\``,
        ].join("\n");

        const payload = JSON.stringify({ text });

        await axios({
            method: "POST",
            baseURL: "https://hooks.slack.com",
            url: `/services/${process.env.APPLY_WEBHOOK_ID ?? ""}`,
            data: payload,
        });

        return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        return res.status(500).json({ message: "Failed to post to #mentor channel" });
    }
}
