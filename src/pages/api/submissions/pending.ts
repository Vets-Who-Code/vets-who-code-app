import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireInstructor } from "@/lib/rbac";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Require ADMIN or INSTRUCTOR role
        const instructor = await requireInstructor(req, res);
        if (!instructor) {
            return; // Response already sent by requireInstructor
        }

        const { courseId } = req.query;

        // Build where clause
        const whereClause: any = {
            status: "SUBMITTED",
        };

        // If courseId is provided, filter by course
        if (courseId && typeof courseId === "string") {
            whereClause.assignment = {
                courseId,
            };
        }

        // Fetch pending submissions
        const submissions = await prisma.submission.findMany({
            where: whereClause,
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
                        maxPoints: true,
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
                submittedAt: "asc", // Oldest first
            },
        });

        res.status(200).json({
            submissions,
            count: submissions.length,
        });
    } catch (error) {
        console.error("Error fetching pending submissions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
