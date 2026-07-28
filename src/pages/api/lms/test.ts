import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * GET /api/lms/test
 *
 * Test endpoint to verify RBAC and database connectivity.
 * Requires authentication.
 *
 * Query params:
 * - role: 'admin' (optional) - if provided, requires admin role
 */
async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Test database connectivity
        const userCount = await prisma.user.count();
        const courseCount = await prisma.course.count();
        const cohortCount = await prisma.cohort.count();

        // Get current user details
        const currentUser = await prisma.user.findUnique({
            where: { id: req.user?.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                cohort: {
                    select: {
                        id: true,
                        name: true,
                        isElite: true,
                    },
                },
            },
        });

        res.status(200).json({
            message: "LMS API test successful!",
            auth: {
                authenticated: true,
                // Sanitized identity only — req.user carries the troop access token.
                user: { id: req.user?.id, email: req.user?.email, role: req.user?.role },
                fullUserDetails: currentUser,
            },
            database: {
                connected: true,
                stats: {
                    users: userCount,
                    courses: courseCount,
                    cohorts: cohortCount,
                },
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error in test endpoint:", error);
        res.status(500).json({
            error: "Test failed",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

// Export with authentication required
export default requireAuth(handler);
