import { BRANCHES, GOALS, HOURS, JOURNEY, PREWORK } from "@data/apply-form";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface ParsedBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    timezone?: string;
    branch?: string;
    yearJoined?: string;
    yearSeparated?: string;
    mos?: string;
    priorBootcamp?: boolean;
    priorList?: string;
    concurrent?: boolean;
    concurrentList?: string;
    hours?: string;
    github?: string;
    linkedin?: string;
    prework?: string;
    preworkLink?: string;
    preworkRepo?: string;
    journey?: string;
    goal?: string;
    interests?: string[];
    why?: string;
}

const REQUIRED: (keyof ParsedBody)[] = [
    "firstName",
    "lastName",
    "email",
    "city",
    "state",
    "zip",
    "country",
    "branch",
    "yearJoined",
    "hours",
    "github",
    "prework",
    "journey",
    "goal",
    "why",
];

function lookupLabel(list: { id: string; label?: string; t?: string }[], id?: string): string {
    if (!id) return "";
    const found = list.find((o) => o.id === id);
    return found?.label ?? found?.t ?? id;
}

function field(label: string, value?: string | number): string {
    return `${label}: \`${value ?? ""}\``;
}

function boolField(label: string, value?: boolean): string {
    return `${label}: \`${value ? "Yes" : "No"}\``;
}

function block(label: string, value?: string): string | null {
    if (!value) return null;
    return `${label}:\n\`\`\`${value}\`\`\``;
}

function buildSlackMessage(b: ParsedBody): string {
    const branch = lookupLabel(BRANCHES, b.branch);
    const hours = lookupLabel(HOURS, b.hours);
    const prework = lookupLabel(PREWORK, b.prework);
    const journey = lookupLabel(JOURNEY, b.journey);
    const goal = lookupLabel(GOALS, b.goal);

    const items: (string | null)[] = [
        "*— APPLICANT —*",
        field("Name", `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim()),
        field("Email", b.email),
        field("Phone", b.phone),
        "",
        "*— LOCATION —*",
        field("City", b.city),
        field("State", b.state),
        field("Zip", b.zip),
        field("Country", b.country),
        field("Timezone", b.timezone),
        "",
        "*— SERVICE —*",
        field("Branch", branch),
        field("Year joined", b.yearJoined),
        field("Year separated", b.yearSeparated),
        field("MOS / Rate / AFSC", b.mos),
        "",
        "*— TRAINING —*",
        boolField("Prior bootcamp", b.priorBootcamp),
        b.priorBootcamp ? block("Prior programs", b.priorList) : null,
        boolField("Concurrent program", b.concurrent),
        b.concurrent ? block("Concurrent details", b.concurrentList) : null,
        field("Hours/week", hours),
        "",
        "*— PROFILES —*",
        field("GitHub", b.github),
        field("LinkedIn", b.linkedin),
        field("Prework status", prework),
        field("Prework live URL", b.preworkLink),
        field("Prework repo URL", b.preworkRepo),
        "",
        "*— FIT —*",
        field("Journey", journey),
        field("Goal", goal),
        field("Tech interests", b.interests?.join(", ")),
        block("Why VWC", b.why),
    ];

    return items.filter((item) => item !== null).join("\n");
}

async function postToSlack(text: string): Promise<void> {
    await axios.post(
        `https://hooks.slack.com/services/${process.env.APPLY_WEBHOOK_ID ?? ""}`,
        JSON.stringify({ text })
    );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body as ParsedBody;

    const missing = REQUIRED.filter((k) => {
        const v = body[k];
        return v === undefined || v === null || v === "";
    });

    if (missing.length > 0) {
        return res.status(422).json({
            error: "Missing required fields",
            fields: missing,
        });
    }

    try {
        await postToSlack(buildSlackMessage(body));
        return res.status(200).json({ message: "SUCCESS" });
    } catch (_err) {
        return res.status(500).json({ message: "Failed to post to #apply channel" });
    }
}
