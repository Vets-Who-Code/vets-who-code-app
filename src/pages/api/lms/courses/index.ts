import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * GET /api/lms/courses
 *
 * Returns all published courses with their modules and lesson counts.
 * Requires authentication.
 *
 * Response:
 * {
 *   user: { id, email, role },
 *   courses: [...]
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const courses = await prisma.course.findMany({
            where: {
                isPublished: true,
            },
            include: {
                modules: {
                    include: {
                        lessons: {
                            select: {
                                id: true,
                                title: true,
                                type: true,
                                duration: true,
                                order: true,
                            },
                        },
                    },
                    orderBy: {
                        order: "asc",
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                        assignments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Calculate total lessons per course
        const coursesWithStats = courses.map((course) => ({
            ...course,
            stats: {
                totalModules: course.modules.length,
                totalLessons: course.modules.reduce(
                    (sum, module) => sum + module.lessons.length,
                    0
                ),
                totalEnrollments: course._count.enrollments,
                totalAssignments: course._count.assignments,
            },
        }));

        res.status(200).json({
            user: req.user,
            courses: coursesWithStats,
            message: "Courses retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});
