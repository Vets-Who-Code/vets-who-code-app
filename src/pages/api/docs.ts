import type { NextApiRequest, NextApiResponse } from "next";
import { getApiDocs } from "../../swagger";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const spec = getApiDocs();
    res.status(200).json(spec);
}
