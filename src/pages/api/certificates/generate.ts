import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/rbac";
import { createCertificate } from "@/lib/certificates";
import { sendEmail, courseCompletionEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Require authentication
        const user = await requireAuth(req, res);
        if (!user) {
            return; // Response already sent by requireAuth
        }

        const { enrollmentId } = req.body;

        if (!enrollmentId || typeof enrollmentId !== "string") {
            return res.status(400).json({ error: "Enrollment ID is required" });
        }

        // Verify the enrollment belongs to the user
        const enrollment = await prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            include: {
                user: true,
                course: true,
            },
        });

        if (!enrollment) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        if (enrollment.userId !== user.id) {
            return res.status(403).json({ error: "You can only generate certificates for your own enrollments" });
        }

        // Generate certificate
        const certificate = await createCertificate(enrollmentId);

        // Send completion email if not already sent
        if (user.email) {
            const emailTemplate = courseCompletionEmail(
                user.name || "Student",
                enrollment.course.title
            );

            sendEmail({
                to: user.email,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
            }).catch((error) => {
                console.error("Failed to send completion email:", error);
                // Don't fail the request if email fails
            });
        }

        res.status(200).json({
            success: true,
            certificate,
        });
    } catch (error) {
        console.error("Error generating certificate:", error);

        if (error instanceof Error) {
            if (error.message.includes("not eligible")) {
                return res.status(400).json({ error: error.message });
            }
        }

        res.status(500).json({ error: "Internal server error" });
    }
}
