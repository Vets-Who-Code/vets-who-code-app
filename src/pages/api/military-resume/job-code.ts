import type { NextApiRequest, NextApiResponse } from "next";
import type { BranchKey } from "@/types/job-codes";
import descriptions from "@data/job-codes-descriptions.json";

const data = descriptions as Record<string, string>;

const VALID_BRANCHES = new Set<string>([
	"army",
	"navy",
	"air_force",
	"marine_corps",
	"coast_guard",
]);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { branch, code } = req.query;

	if (typeof branch !== "string" || typeof code !== "string") {
		return res.status(400).json({ error: "branch and code query params are required" });
	}

	if (!VALID_BRANCHES.has(branch)) {
		return res.status(400).json({ error: "Invalid branch" });
	}

	const key = `${branch}:${code}`;
	const description = data[key];

	if (!description) {
		return res.status(404).json({ error: "Job code not found" });
	}

	return res.status(200).json({
		code,
		branch: branch as BranchKey,
		description,
	});
}
