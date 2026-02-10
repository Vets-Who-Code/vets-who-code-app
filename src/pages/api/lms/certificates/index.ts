import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * GET /api/lms/certificates
 *
 * Get all certificates for the authenticated user
 *
 * Query params:
 * - courseId?: string - Filter by specific course
 *
 * Response:
 * {
 *   certificates: Certificate[]
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const userId = req.user?.id;
        const { courseId } = req.query;

        // Build where clause
        const where: any = { userId };

        if (courseId && typeof courseId === "string") {
            where.courseId = courseId;
        }

        // Fetch certificates
        const certificates = await prisma.certificate.findMany({
            where,
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        difficulty: true,
                        estimatedHours: true,
                        category: true,
                    },
                },
            },
            orderBy: {
                issuedAt: "desc",
            },
        });

        res.json({ certificates });
    } catch (error) {
        console.error("Error fetching certificates:", error);
        res.status(500).json({ error: "Failed to fetch certificates" });
    }
});
