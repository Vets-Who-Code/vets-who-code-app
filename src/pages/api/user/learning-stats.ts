import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import type { LearningStatsData } from "@/types/profile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: "Method not allowed" });
    }

    const session = await getSession({ req });
    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    try {
        const [enrollments, progressAgg, certificates, recentProgress] = await Promise.all([
            // Enrollments with course info
            prisma.enrollment.findMany({
                where: { userId },
                include: {
                    course: { select: { title: true, category: true } },
                },
                orderBy: { lastActivity: "desc" },
            }),

            // Aggregate completed lessons and time spent
            prisma.progress.aggregate({
                where: { userId, completed: true },
                _count: { id: true },
                _sum: { timeSpent: true },
            }),

            // Certificates
            prisma.certificate.findMany({
                where: { userId },
                include: {
                    course: { select: { title: true } },
                },
                orderBy: { issuedAt: "desc" },
            }),

            // Recent lesson activity (last 10)
            prisma.progress.findMany({
                where: { userId },
                include: {
                    lesson: {
                        select: {
                            title: true,
                            module: {
                                select: {
                                    title: true,
                                    course: { select: { title: true } },
                                },
                            },
                        },
                    },
                },
                orderBy: { startedAt: "desc" },
                take: 10,
            }),
        ]);

        const data: LearningStatsData = {
            enrollments: enrollments.map((e) => ({
                id: e.id,
                courseTitle: e.course.title,
                courseCategory: e.course.category,
                progress: e.progress,
                status: e.status,
                enrolledAt: e.enrolledAt.toISOString(),
                lastActivity: e.lastActivity.toISOString(),
            })),
            completedLessons: progressAgg._count.id,
            totalTimeSpent: progressAgg._sum.timeSpent || 0,
            certificates: certificates.map((c) => ({
                id: c.id,
                courseTitle: c.course.title,
                certificateNumber: c.certificateNumber,
                issuedAt: c.issuedAt.toISOString(),
            })),
            recentActivity: recentProgress.map((p) => ({
                lessonTitle: p.lesson.title,
                moduleTitle: p.lesson.module.title,
                courseTitle: p.lesson.module.course.title,
                completedAt: p.completedAt?.toISOString() || null,
                timeSpent: p.timeSpent,
            })),
        };

        return res.status(200).json(data);
    } catch (error) {
        console.error("[Learning Stats] Error:", error);
        return res.status(500).json({ error: "Failed to fetch learning stats" });
    }
}
