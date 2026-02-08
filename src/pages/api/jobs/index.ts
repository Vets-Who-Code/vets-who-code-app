import { getJobs } from "@lib/jobboardly";
import { requireAuth } from "@lib/rbac";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * GET /api/jobs
 * Fetch all jobs from Job Boardly RSS feed
 * Requires authentication
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const jobs = await getJobs();

        return res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            error: "Failed to fetch jobs",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export default requireAuth(handler);
