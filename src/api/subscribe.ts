/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";

const { MAILCHIMP_SUBSCRIBE_URL, MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY } =
    process.env;
const AUTHORIZATION = `Basic ${Buffer.from(
    `anystring:${MAILCHIMP_API_KEY}`
).toString("base64")}`;

export default async function handler(data: any): Promise<void> {
    const payload = {
        email_address: data.email,
        status: "subscribed",
    };

    try {
        await axios({
            method: "POST",
            url: `${MAILCHIMP_SUBSCRIBE_URL}/${MAILCHIMP_LIST_ID}/members`,
            headers: {
                Accept: "application/json",
                Authorization: AUTHORIZATION,
            },
            data: payload,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log({
            message: "Failed to post to subscribed user to mailchimp",
        });
    }
}
