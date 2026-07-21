import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { enforceRateLimit } from "@/lib/rate-limit";

/**
 * GET /api/certificates/[certificateId]
 *
 * Get certificate details by ID
 * This endpoint is public to allow certificate verification
 * No authentication required
 */
async function handleGet(_req: NextApiRequest, res: NextApiResponse, certificateId: string) {
    try {
        const certificate = await prisma.certificate.findUnique({
            where: { id: certificateId },
            include: {
                user: {
                    // Public endpoint — expose name only, never the student's email.
                    select: {
                        id: true,
                        name: true,
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

        // Format response
        const response = {
            id: certificate.id,
            certificateNumber: certificate.id, // Using ID as certificate number
            student: {
                name: certificate.user.name || "Unknown",
            },
            course: {
                title: certificate.course.title,
                description: certificate.course.description,
                difficulty: certificate.course.difficulty,
                estimatedHours: certificate.course.estimatedHours,
                category: certificate.course.category,
            },
            issuedAt: certificate.issuedAt,
            certificateUrl: certificate.certificateUrl,
        };

        res.json({ certificate: response });
    } catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ error: "Failed to fetch certificate" });
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { certificateId } = req.query;

    if (!certificateId || typeof certificateId !== "string") {
        return res.status(400).json({ error: "Invalid certificate ID" });
    }

    // Public + unauthenticated: throttle per IP so certificates can't be enumerated.
    if (!enforceRateLimit(req, res, { name: "cert-verify", maxRequests: 30, windowMs: 60_000 })) {
        return undefined;
    }

    switch (req.method) {
        case "GET":
            return handleGet(req, res, certificateId);
        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
};
