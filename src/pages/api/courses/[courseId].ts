import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../auth/options";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { courseId } = req.query;

    if (!courseId || typeof courseId !== "string") {
        return res.status(400).json({ error: "Course ID is required" });
    }

    try {
        switch (req.method) {
            case "GET":
                await handleGet(courseId, res);
                break;
            case "PUT":
                await handlePut(courseId, req, res);
                break;
            case "DELETE":
                await handleDelete(courseId, req, res);
                break;
            default:
                res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("Course API error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}

async function handleGet(courseId: string, res: NextApiResponse) {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                orderBy: { order: "asc" },
                include: {
                    lessons: {
                        orderBy: { order: "asc" },
                    },
                },
            },
            _count: {
                select: {
                    enrollments: true,
                    assignments: true,
                },
            },
        },
    });

    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ course });
}

async function handlePut(courseId: string, req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is admin or instructor
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
        return res.status(403).json({ error: "Forbidden: Admin or Instructor role required" });
    }

    const { title, description, imageUrl, difficulty, category, isPublished, duration, prerequisites } = req.body;

    const course = await prisma.course.update({
        where: { id: courseId },
        data: {
            ...(title && { title }),
            ...(description !== undefined && { description }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(difficulty && { difficulty }),
            ...(category && { category }),
            ...(isPublished !== undefined && { isPublished }),
            ...(duration !== undefined && { duration }),
            ...(prerequisites !== undefined && { prerequisites }),
        },
        include: {
            modules: {
                orderBy: { order: "asc" },
            },
        },
    });

    res.status(200).json({ course });
}

async function handleDelete(courseId: string, req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user || user.role !== "ADMIN") {
        return res.status(403).json({ error: "Forbidden: Admin role required" });
    }

    await prisma.course.delete({
        where: { id: courseId },
    });

    res.status(200).json({ message: "Course deleted successfully" });
}
