import { NextApiRequest, NextApiResponse } from "next";
import { getCertificateByNumber } from "@/lib/certificates";

/**
 * @swagger
 * /api/certificates/verify:
 *   get:
 *     summary: Verify a certificate
 *     description: Public endpoint to verify a certificate by its printed certificate number (e.g. VWC-2026-000123). Legacy certificate ids are also accepted. No authentication required.
 *     tags:
 *       - Certificates
 *     parameters:
 *       - in: query
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *         description: Printed certificate number (VWC-YYYY-XXXXXX) or legacy certificate id
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 certificate:
 *                   type: object
 *                   properties:
 *                     certificateNumber:
 *                       type: string
 *                     student:
 *                       type: object
 *                     course:
 *                       type: object
 *                     issuedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required query parameter
 *       405:
 *         description: Method not allowed
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { number } = req.query;

        if (!number || typeof number !== "string") {
            return res.status(400).json({
                error: "Missing required query parameter: number",
            });
        }

        const certificate = await getCertificateByNumber(number);

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
                certificateNumber: certificate.certificateNumber ?? certificate.id,
                student: {
                    name: certificate.user.name || "Unknown",
                    email: certificate.user.email,
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

    return handleGet(req, res);
};
