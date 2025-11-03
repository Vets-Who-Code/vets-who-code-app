import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "../auth/options";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user?.email) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { courseId } = req.query;

        if (!courseId || typeof courseId !== "string") {
            return res.status(400).json({ error: "Course ID is required" });
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check enrollment
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId,
                },
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        if (!enrollment) {
            return res.status(200).json({
                enrolled: false,
                enrollment: null,
            });
        }

        res.status(200).json({
            enrolled: true,
            enrollment: {
                id: enrollment.id,
                courseId: enrollment.courseId,
                status: enrollment.status,
                progress: enrollment.progress,
                enrolledAt: enrollment.enrolledAt,
                completedAt: enrollment.completedAt,
                lastActivity: enrollment.lastActivity,
                course: enrollment.course,
            },
        });
    } catch (error) {
        console.error("Enrollment status error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
