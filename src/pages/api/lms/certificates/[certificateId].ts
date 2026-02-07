import { NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * GET /api/lms/certificates/[certificateId]
 *
 * Get a specific certificate (accessible by the owner or admins)
 *
 * Response:
 * {
 *   certificate: Certificate
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { certificateId } = req.query;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        if (!certificateId || typeof certificateId !== "string") {
            return res.status(400).json({ error: "Invalid certificate ID" });
        }

        // Fetch certificate
        const certificate = await prisma.certificate.findUnique({
            where: { id: certificateId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
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
        });

        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        // Check access: owner or admin
        if (certificate.userId !== userId && userRole !== "ADMIN") {
            return res.status(403).json({ error: "Access denied" });
        }

        res.json({ certificate });
    } catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ error: "Failed to fetch certificate" });
    }
});
