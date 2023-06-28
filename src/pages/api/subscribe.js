import axios from "axios";
import { checkParams } from "./api-helpers";

const isTest = process.env.NODE_ENV === "test";
const MAILCHIMP_SUBSCRIBE_URL = "https://us4.api.mailchimp.com/3.0/lists";
const baseURL = MAILCHIMP_SUBSCRIBE_URL;
const MAILCHIMP_LIST_ID = isTest
    ? "mock-list-id-1111"
    : process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_API_KEY = isTest
    ? "mock-api-key-2222"
    : process.env.MAILCHIMP_API_KEY;
const AUTHORIZATION = `Basic ${Buffer.from(
    `anystring:${MAILCHIMP_API_KEY}`
).toString("base64")}`;

export default async function handler(req, res) {
    const parsedBody = JSON.parse(req.body);
    const hasErrors = checkParams(parsedBody, ["email"]);

    if (hasErrors) {
        return res.status(422).json({
            error: "Missing or incorrect required property",
        });
    }

    const payload = {
        // eslint-disable-next-line camelcase
        email_address: parsedBody.email,
        status: "subscribed",
    };

    try {
        await axios({
            method: "POST",
            baseURL,
            url: `/${MAILCHIMP_LIST_ID}/members`,
            headers: {
                Accept: "application/json",
                Authorization: AUTHORIZATION,
            },
            data: payload,
        }).catch((err) => {
            throw new Error(err.message);
        });

        return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to post to subscribed user to mailchimp",
        });
    }
}
