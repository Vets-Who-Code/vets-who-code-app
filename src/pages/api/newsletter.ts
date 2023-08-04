import { NextApiRequest, NextApiResponse } from "next";

const MAILCHIMP_API_SERVER = "https://us4.api.mailchimp.com/3.0/lists";
const MAILCHIMP_LIST_ID = process.env?.MAILCHIMP_LIST_ID ?? "";
const MAILCHIMP_API_KEY = process.env?.MAILCHIMP_API_KEY ?? "";

type RequestData = {
    newsletter_email: string;
};
// Response structure for a successful operation
interface MailchimpSuccessResponse {
    id: string;
    status: string;
}

// Response structure for an error in the Mailchimp API
interface MailchimpErrorResponse {
    status: number;
    title: string;
    detail: string;
    message: string;
}

// Response structure for a Mailchimp member
interface MailchimpMember {
    email_address: string;
    status: string;
}

// Response structure for a Mailchimp campaign
interface MailchimpCampaign {
    id: string;
    type: string;
}

type Mailchimp =
    | MailchimpSuccessResponse
    | MailchimpErrorResponse
    | MailchimpMember
    | MailchimpCampaign;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    let requestData: RequestData;

    try {
        requestData = JSON.parse(req.body as string) as RequestData;
    } catch (error) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }

    const { newsletter_email: email } = requestData;

    // Validate the email address
    if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Invalid email address" });
    }

    // Subscribe the email using Mailchimp API
    try {
        const response = await fetch(
            `${MAILCHIMP_API_SERVER}/${MAILCHIMP_LIST_ID}/members`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${Buffer.from(
                        `apikey:${MAILCHIMP_API_KEY}`
                    ).toString("base64")}`,
                },
                body: JSON.stringify({
                    // email_address: email,
                    email_address: email,
                    status: "subscribed",
                }),
            }
        );

        let data: Mailchimp;

        try {
            data = (await response.json()) as Mailchimp;
        } catch (error) {
            // Handle JSON parsing error
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (response.ok) {
            // Successful subscription
            return res
                .status(200)
                .json({ message: "Email subscribed successfully", ok: true });
        }

        // Error from Mailchimp API
        if (data) {
            const errorRes = data as MailchimpErrorResponse;
            return res.status(errorRes.status).json({
                error: errorRes.title,
                ok: false,
                detail: errorRes.detail,
            });
        }

        // Other error
        return res.status(500).json({ error: "Internal Server Error" });
    } catch (error: unknown) {
        const errorRes = error as MailchimpErrorResponse;
        // Error handling
        if (
            typeof errorRes === "object" &&
            errorRes !== null &&
            "status" in errorRes
        ) {
            // Error from Mailchimp API
            return res
                .status(errorRes.status)
                .json({ error: errorRes.message });
        }
        // Other error
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
