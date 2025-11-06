import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "../auth/options";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user?.email) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        switch (req.method) {
            case "GET":
                await handleGet(user.id, req, res);
                break;
            case "POST":
                await handlePost(user.id, req, res);
                break;
            default:
                res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("Progress API error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}

async function handleGet(userId: string, req: NextApiRequest, res: NextApiResponse) {
    const { lessonId, courseId } = req.query;

    if (lessonId && typeof lessonId === "string") {
        // Get progress for a specific lesson
        const progress = await prisma.progress.findUnique({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
        });

        return res.status(200).json({ progress });
    }

    if (courseId && typeof courseId === "string") {
        // Get all progress for a course
        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                modules: {
                    include: {
                        lessons: true,
                    },
                },
            },
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const lessonIds = course.modules.flatMap(module => module.lessons.map(lesson => lesson.id));

        const progress = await prisma.progress.findMany({
            where: {
                userId,
                lessonId: {
                    in: lessonIds,
                },
            },
        });

        return res.status(200).json({ progress });
    }

    // Get all progress for user
    const progress = await prisma.progress.findMany({
        where: { userId },
        include: {
            lesson: {
                select: {
                    id: true,
                    title: true,
                    moduleId: true,
                },
            },
        },
        orderBy: {
            startedAt: "desc",
        },
    });

    res.status(200).json({ progress });
}

async function handlePost(userId: string, req: NextApiRequest, res: NextApiResponse) {
    const { lessonId, completed, timeSpent } = req.body;

    if (!lessonId) {
        return res.status(400).json({ error: "Lesson ID is required" });
    }

    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
            module: {
                include: {
                    course: true,
                },
            },
        },
    });

    if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
    }

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: lesson.module.course.id,
            },
        },
    });

    if (!enrollment) {
        return res.status(403).json({ error: "Not enrolled in this course" });
    }

    // Upsert progress
    const progress = await prisma.progress.upsert({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
        update: {
            completed: completed ?? undefined,
            timeSpent: timeSpent !== undefined ? { increment: timeSpent } : undefined,
            completedAt: completed ? new Date() : undefined,
        },
        create: {
            userId,
            lessonId,
            completed: completed || false,
            timeSpent: timeSpent || 0,
            completedAt: completed ? new Date() : null,
        },
    });

    // Update enrollment progress
    await updateEnrollmentProgress(userId, lesson.module.course.id);

    res.status(200).json({ progress });
}

async function updateEnrollmentProgress(userId: string, courseId: string) {
    // Get all lessons in the course
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                include: {
                    lessons: true,
                },
            },
        },
    });

    if (!course) return;

    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);

    if (totalLessons === 0) return;

    // Get completed lessons
    const lessonIds = course.modules.flatMap(module => module.lessons.map(lesson => lesson.id));

    const completedCount = await prisma.progress.count({
        where: {
            userId,
            lessonId: { in: lessonIds },
            completed: true,
        },
    });

    const progressPercentage = Math.round((completedCount / totalLessons) * 100);

    // Update enrollment
    await prisma.enrollment.update({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
        data: {
            progress: progressPercentage,
            lastActivity: new Date(),
            completedAt: progressPercentage === 100 ? new Date() : null,
            status: progressPercentage === 100 ? "COMPLETED" : "ACTIVE",
        },
    });
}
