import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireRole } from "@/lib/rbac";

/**
 * GET /api/lms/submissions/pending
 *
 * Get all pending (ungraded) submissions.
 * Requires INSTRUCTOR, ADMIN, or MENTOR role.
 *
 * Query params:
 * - courseId?: string (optional filter by course)
 * - limit?: number (default 50)
 * - offset?: number (default 0)
 *
 * Response:
 * {
 *   submissions: [...],
 *   total: number,
 *   hasMore: boolean
 * }
 */
async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { courseId, limit = "50", offset = "0" } = req.query;
        const limitNum = parseInt(limit as string, 10);
        const offsetNum = parseInt(offset as string, 10);

        // Build where clause
        const where: any = {
            status: "SUBMITTED", // Only ungraded submissions
        };

        if (courseId) {
            where.assignment = {
                courseId: courseId as string,
            };
        }

        // Get total count
        const total = await prisma.submission.count({ where });

        // Get submissions with related data
        const submissions = await prisma.submission.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        maxPoints: true,
                        dueDate: true,
                        type: true,
                        courseId: true,
                        course: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                submittedAt: "asc", // Oldest first (FIFO)
            },
            take: limitNum,
            skip: offsetNum,
        });

        // Calculate if submission is late
        const submissionsWithStatus = submissions.map((submission) => ({
            ...submission,
            isLate: submission.assignment.dueDate
                ? submission.submittedAt > submission.assignment.dueDate
                : false,
        }));

        res.status(200).json({
            submissions: submissionsWithStatus,
            total,
            hasMore: offsetNum + limitNum < total,
            pagination: {
                limit: limitNum,
                offset: offsetNum,
                total,
            },
        });
    } catch (error) {
        console.error("Error fetching pending submissions:", error);
        res.status(500).json({ error: "Failed to fetch pending submissions" });
    }
}

// Require INSTRUCTOR, ADMIN, or MENTOR role
export default requireRole(["INSTRUCTOR", "ADMIN", "MENTOR"])(handler);
