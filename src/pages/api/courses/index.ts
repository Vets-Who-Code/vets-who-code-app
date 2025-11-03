import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../auth/options";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                await handleGet(req, res);
                break;
            case "POST":
                await handlePost(req, res);
                break;
            default:
                res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("Courses API error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { published, category, difficulty } = req.query;

    const where: any = {};

    if (published === "true") {
        where.isPublished = true;
    }

    if (category && typeof category === "string") {
        where.category = category;
    }

    if (difficulty && typeof difficulty === "string") {
        where.difficulty = difficulty;
    }

    const courses = await prisma.course.findMany({
        where,
        include: {
            _count: {
                select: {
                    enrollments: true,
                    modules: true,
                    assignments: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    res.status(200).json({ courses });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
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

    const { id, title, description, imageUrl, difficulty, category, isPublished, duration, prerequisites } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    if (!category) {
        return res.status(400).json({ error: "Category is required" });
    }

    const course = await prisma.course.create({
        data: {
            ...(id && { id }),
            title,
            description,
            imageUrl,
            difficulty: difficulty || "BEGINNER",
            category,
            isPublished: isPublished || false,
            duration,
            prerequisites,
        },
    });

    res.status(201).json({ course });
}
