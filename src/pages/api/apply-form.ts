import axios from "axios";
import { checkParams } from "./api-helpers";

export default async function handler(req, res) {
    const parsedBody = JSON.parse(req.body);
    const {
        firstName,
        lastName,
        email,
        city,
        state,
        zipCode,
        country,
        branchOfService,
        yearJoined,
        yearSeparated,
        linkedInAccountName,
        githubAccountName,
        preworkLink,
        preworkRepo,
    } = parsedBody;

    const requiredParams = [
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

    const hasErrors = checkParams(parsedBody, requiredParams);

    if (hasErrors) {
        return res.status(422).json({
            message: "Missing or incorrect required property",
            errors: hasErrors,
        });
    }

    const text = [
        `First Name: \`${firstName}\``,
        `\nLast Name: \`${lastName}\``,
        `\nEmail: \`${email}\``,
        `\nCity: \`${city}\``,
        `\nState: \`${state}\``,
        `\nZip Code: \`${zipCode}\``,
        `\nCountry: \`${country}\``,
        `\nBranch of Service: \`${branchOfService}\``,
        `\nYear Joined: \`${yearJoined}\``,
        `\nYear Separated: \`${yearSeparated}\``,
        `\nLinkedIn Account Name: \`${linkedInAccountName}\``,
        `\nGithub Account Name: \`${githubAccountName}\``,
        `\nPre Work Link: \`${preworkLink}\``,
        `\nPre Work Repo: \`${preworkRepo}\``,
    ].join();

    const payload = JSON.stringify({ text });

    try {
        await axios({
            method: "POST",
            baseURL: "https://hooks.slack.com",
            url: `/services/${process.env.APPLY_WEBHOOK_ID}`,
            data: payload,
        }).catch((err) => {
            throw new Error(err.message);
        });

        return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Failed post to #apply channel" });
    }
}
