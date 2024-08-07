import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { firstName, lastName, birthDate, ssn } = req.body;

    if (!firstName || !lastName || !birthDate || !ssn) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await axios.post(
            "https://sandbox-api.va.gov/services/veteran-confirmation/v1/status",
            {
                firstName,
                lastName,
                birthDate,
                ssn,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.VA_API_KEY,
                },
            }
        );

        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch veteran status" });
    }
}
