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

        // Find the user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get all enrollments for the user
        const enrollments = await prisma.enrollment.findMany({
            where: {
                userId: user.id,
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        imageUrl: true,
                        difficulty: true,
                        category: true,
                        duration: true,
                    },
                },
            },
            orderBy: {
                enrolledAt: "desc",
            },
        });

        res.status(200).json({
            enrollments: enrollments.map(enrollment => ({
                id: enrollment.id,
                courseId: enrollment.courseId,
                status: enrollment.status,
                progress: enrollment.progress,
                enrolledAt: enrollment.enrolledAt,
                completedAt: enrollment.completedAt,
                lastActivity: enrollment.lastActivity,
                course: enrollment.course,
            })),
        });
    } catch (error) {
        console.error("Enrollments fetch error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
