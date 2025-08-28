import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "../auth/options";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user?.email) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId,
                },
            },
        });

        if (existingEnrollment) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }

        // Create enrollment
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId,
                status: "ACTIVE",
                progress: 0,
                enrolledAt: new Date(),
            },
        });

        res.status(201).json({
            success: true,
            enrollment: {
                id: enrollment.id,
                courseId: enrollment.courseId,
                status: enrollment.status,
                progress: enrollment.progress,
                enrolledAt: enrollment.enrolledAt,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
