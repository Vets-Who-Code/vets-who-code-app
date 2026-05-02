import { readFileSync } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const specPath = join(process.cwd(), "public", "swagger-spec.json");
    const spec = JSON.parse(readFileSync(specPath, "utf-8"));
    res.status(200).json(spec);
}
