import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth, requireRole } from "@/lib/rbac";

/**
 * GET /api/courses/[courseId]
 *
 * Returns detailed course information with modules, lessons, and assignments
 */
async function handleGet(_req: AuthenticatedRequest, res: NextApiResponse, courseId: string) {
    try {
        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                modules: {
                    include: {
                        lessons: {
                            orderBy: { order: "asc" },
                        },
                    },
                    orderBy: { order: "asc" },
                },
                assignments: {
                    orderBy: { createdAt: "desc" },
                },
                _count: {
                    select: {
                        enrollments: true,
                        certificates: true,
                    },
                },
            },
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json({ course });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "Failed to fetch course" });
    }
}

/**
 * PUT /api/courses/[courseId]
 *
 * Update course (Admin/Instructor only)
 * Body: Partial course data
 */
async function handlePut(req: AuthenticatedRequest, res: NextApiResponse, courseId: string) {
    try {
        const {
            title,
            description,
            category,
            difficulty,
            estimatedHours,
            prerequisites,
            tags,
            isPublished,
            imageUrl,
        } = req.body;

        // Check if course exists
        const existingCourse = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!existingCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Validate difficulty if provided
        if (difficulty && !["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(difficulty)) {
            return res.status(400).json({
                error: "Invalid difficulty level. Must be BEGINNER, INTERMEDIATE, or ADVANCED",
            });
        }

        // Update course
        const course = await prisma.course.update({
            where: { id: courseId },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(category && { category }),
                ...(difficulty && { difficulty }),
                ...(estimatedHours !== undefined && { estimatedHours }),
                ...(prerequisites && { prerequisites }),
                ...(tags && { tags }),
                ...(isPublished !== undefined && { isPublished }),
                ...(imageUrl !== undefined && { imageUrl }),
            },
            include: {
                _count: {
                    select: {
                        modules: true,
                        enrollments: true,
                        assignments: true,
                    },
                },
            },
        });

        res.json({ course });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Failed to update course" });
    }
}

/**
 * DELETE /api/courses/[courseId]
 *
 * Delete course (Admin only)
 * Prevents deletion if course has enrollments
 */
async function handleDelete(_req: AuthenticatedRequest, res: NextApiResponse, courseId: string) {
    try {
        // Check if course exists
        const existingCourse = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                _count: {
                    select: { enrollments: true },
                },
            },
        });

        if (!existingCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Warn if course has enrollments
        if (existingCourse._count.enrollments > 0) {
            return res.status(400).json({
                error: `Cannot delete course with ${existingCourse._count.enrollments} active enrollments`,
            });
        }

        // Delete course (cascades to modules, lessons, etc.)
        await prisma.course.delete({
            where: { id: courseId },
        });

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Failed to delete course" });
    }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { courseId } = req.query;

    if (!courseId || typeof courseId !== "string") {
        return res.status(400).json({ error: "Invalid course ID" });
    }

    switch (req.method) {
        case "GET":
            return handleGet(req, res, courseId);
        case "PUT":
            return requireRole(["ADMIN", "INSTRUCTOR"])((req, res) =>
                handlePut(req, res, courseId)
            )(req, res);
        case "DELETE":
            return requireRole("ADMIN")((req, res) => handleDelete(req, res, courseId))(req, res);
        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
});
