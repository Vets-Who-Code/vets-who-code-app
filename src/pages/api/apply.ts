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
    zipCode?: number;
    country?: string;
    branchOfService?: string;
    yearJoined?: number;
    yearSeparated?: number;
    hasAttendedPreviousCourse?: boolean;
    previousCourses?: string;
    willAttendAnotherCourse?: boolean;
    otherCourses?: string;
    linkedInAccountName?: string;
    githubAccountName?: string;
    preworkLink?: string;
    preworkRepo?: string;
}

function getRequiredParams(): (keyof ParsedBody)[] {
    return [
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
        "hasAttendedPreviousCourse",
        "willAttendAnotherCourse",
        "linkedInAccountName",
        "githubAccountName",
        "preworkLink",
        "preworkRepo",
    ];
}

function validateBody(parsedBody: ParsedBody): boolean {
    const requiredParams = getRequiredParams();
    return checkParams(parsedBody, requiredParams);
}

function formatPreviousCourses(parsedBody: ParsedBody): string | null {
    if (parsedBody.hasAttendedPreviousCourse && parsedBody.previousCourses !== "") {
        return `\`\`\`${parsedBody.previousCourses}\`\`\``;
    }
    return null;
}

function formatOtherCourses(parsedBody: ParsedBody): string | null {
    if (parsedBody.willAttendAnotherCourse && parsedBody.otherCourses !== "") {
        return `\`\`\`${parsedBody.otherCourses}\`\`\``;
    }
    return null;
}

function formatField(label: string, value: string | number | undefined): string {
    return `${label}: \`${value ?? ""}\``;
}

function formatBooleanField(label: string, value: boolean | undefined): string {
    return `${label}: \`${value ? "Yes" : "No"}\``;
}

function buildSlackMessage(parsedBody: ParsedBody): string {
    const items = [
        formatField("First Name", parsedBody.firstName),
        formatField("Last Name", parsedBody.lastName),
        formatField("Email", parsedBody.email),
        formatField("City", parsedBody.city),
        formatField("State", parsedBody.state),
        formatField("Zip Code", parsedBody.zipCode),
        formatField("Country", parsedBody.country),
        formatField("Branch of Service", parsedBody.branchOfService),
        formatField("Year Joined", parsedBody.yearJoined),
        formatField("Year Separated", parsedBody.yearSeparated),
        formatBooleanField(
            "Has attended previous bootcamp/programs",
            parsedBody.hasAttendedPreviousCourse
        ),
        formatPreviousCourses(parsedBody),
        formatBooleanField(
            "Will do other courses/programs concurrently",
            parsedBody.willAttendAnotherCourse
        ),
        formatOtherCourses(parsedBody),
        formatField("LinkedIn Account Name", parsedBody.linkedInAccountName),
        formatField("GitHub Account Name", parsedBody.githubAccountName),
        formatField("Prework Link", parsedBody.preworkLink),
        formatField("Prework Repository", parsedBody.preworkRepo),
    ].filter(Boolean);

    return items.join("\n");
}

async function postToSlack(text: string): Promise<void> {
    await axios.post(
        `https://hooks.slack.com/services/${process.env.APPLY_WEBHOOK_ID ?? ""}`,
        JSON.stringify({ text })
    );
}

export default async function handler(req: Request, res: Response) {
    try {
        const parsedBody = req.body as ParsedBody;

        const hasErrors = validateBody(parsedBody);

        if (hasErrors) {
            return res.status(422).json({ error: "Missing or incorrect required property" });
        }

        const text = buildSlackMessage(parsedBody);

        await postToSlack(text);

        return res.status(200).json({ message: "SUCCESS" });
    } catch (_err) {
        return res.status(500).json({ message: "Failed to post to #apply channel" });
    }
}
