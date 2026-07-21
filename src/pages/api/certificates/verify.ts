import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { enforceRateLimit } from "@/lib/rate-limit";

/**
 * GET /api/certificates/verify?number=CERT_NUMBER
 *
 * Verify a certificate by its certificate number
 * This endpoint is public to allow employers and others to verify certificates
 * No authentication required
 *
 * Query params:
 * - number: Certificate number (same as certificate ID)
 *
 * Returns:
 * - valid: boolean indicating if certificate exists
 * - certificate: Certificate details if valid
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { number } = req.query;

        if (!number || typeof number !== "string") {
            return res.status(400).json({
                error: "Missing required query parameter: number",
            });
        }

        // Look up certificate by ID (which is the certificate number)
        const certificate = await prisma.certificate.findUnique({
            where: { id: number },
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
            return res.json({
                valid: false,
                message: "Certificate not found. This certificate number is not valid.",
            });
        }

        // Certificate is valid
        res.json({
            valid: true,
            message: "Certificate is valid and authenticated.",
            certificate: {
                certificateNumber: certificate.id,
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
            },
        });
    } catch (error) {
        console.error("Error verifying certificate:", error);
        res.status(500).json({ error: "Failed to verify certificate" });
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Public + unauthenticated: throttle per IP so the endpoint can't be enumerated.
    if (!enforceRateLimit(req, res, { name: "cert-verify", maxRequests: 30, windowMs: 60_000 })) {
        return undefined;
    }

    return handleGet(req, res);
};
