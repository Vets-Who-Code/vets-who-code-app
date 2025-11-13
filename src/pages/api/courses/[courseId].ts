import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Course data that matches our UI
const courseData = {
    "web-development": {
        id: "web-development",
        title: "Web Development",
        description: "Build modern, responsive web applications from frontend to backend",
        imageUrl: "/images/courses/web-development.jpg",
        difficulty: "BEGINNER" as const,
        category: "Web Development",
        isPublished: true,
        estimatedHours: 158,
        prerequisites: ["Basic computer literacy", "Willingness to learn"],
        tags: ["web", "frontend", "backend", "beginner"],
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { courseId } = req.query;

        if (!courseId || typeof courseId !== "string") {
            return res.status(400).json({ error: "Course ID is required" });
        }

        try {
            // Find or create the course
            const courseInfo = courseData[courseId as keyof typeof courseData];
            if (!courseInfo) {
                return res.status(404).json({ error: "Course not found" });
            }

            let course = await prisma.course.findUnique({
                where: { id: courseId },
            });

            if (!course) {
                // Create the course if it doesn't exist
                course = await prisma.course.create({
                    data: courseInfo,
                });
            }

            res.status(200).json({ course });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
