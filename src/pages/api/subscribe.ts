import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface ISubscribeRequestBody {
    email: string;
}

export default async function subscribe(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body as ISubscribeRequestBody;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const response = await axios.post(
            `https://usX.api.mailchimp.com/3.0/lists/{YOUR_LIST_ID}/members`,
            {
                email_address: email,
                status: "subscribed",
            },
            {
                auth: {
                    username: "anystring",
                    password: process.env.MAILCHIMP_API_KEY || "",
                },
            }
        );

        if (response.status === 200) {
            return res
                .status(200)
                .json({ message: "Successfully subscribed!" });
        }
        throw new Error("Failed to subscribe");
    } catch (error) {
        console.error("Mailchimp subscription error:", error);
        return res
            .status(500)
            .json({ error: "Failed to subscribe. Please try again later." });
    }
}
