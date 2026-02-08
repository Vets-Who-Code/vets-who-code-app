import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * GET /api/enrollment
 *
 * Get all enrollments for current user
 * Query params:
 * - status: Filter by status (ACTIVE, COMPLETED, DROPPED)
 *
 * Response:
 * {
 *   enrollments: Array<Enrollment & { stats: {...} }>
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const userId = req.user?.id;
        const { status } = req.query;

        // Build where clause
        const where: any = { userId };

        if (status) {
            where.status = status as string;
        }

        const enrollments = await prisma.enrollment.findMany({
            where,
            include: {
                course: {
                    include: {
                        _count: {
                            select: {
                                modules: true,
                            },
                        },
                    },
                },
            },
            orderBy: { enrolledAt: "desc" },
        });

        // Aggregate total lessons for all relevant courses
        const courseIds = enrollments.map((e) => e.courseId);

        // Get total lessons per courseId
        const lessons = await prisma.lesson.findMany({
            where: {
                module: {
                    courseId: { in: courseIds },
                },
            },
            select: {
                id: true,
                module: {
                    select: {
                        courseId: true,
                    },
                },
            },
        });
        const totalLessonsByCourse: Record<string, number> = {};
        for (const lesson of lessons) {
            const { courseId } = lesson.module;
            totalLessonsByCourse[courseId] = (totalLessonsByCourse[courseId] || 0) + 1;
        }

        // Get completed lessons per courseId for this user
        const progresses = await prisma.progress.findMany({
            where: {
                userId,
                completed: true,
                lesson: {
                    module: {
                        courseId: { in: courseIds },
                    },
                },
            },
            select: {
                lesson: {
                    select: {
                        module: {
                            select: {
                                courseId: true,
                            },
                        },
                    },
                },
            },
        });
        const completedLessonsByCourse: Record<string, number> = {};
        for (const progress of progresses) {
            const { courseId } = progress.lesson.module;
            completedLessonsByCourse[courseId] = (completedLessonsByCourse[courseId] || 0) + 1;
        }

        // Merge stats into enrollments
        const enrollmentsWithProgress = enrollments.map((enrollment) => {
            const totalLessons = totalLessonsByCourse[enrollment.courseId] || 0;
            const completedLessons = completedLessonsByCourse[enrollment.courseId] || 0;
            return {
                ...enrollment,
                stats: {
                    totalLessons,
                    completedLessons,
                    progressPercentage:
                        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
                },
            };
        });

        res.json({ enrollments: enrollmentsWithProgress });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ error: "Failed to fetch enrollments" });
    }
});
