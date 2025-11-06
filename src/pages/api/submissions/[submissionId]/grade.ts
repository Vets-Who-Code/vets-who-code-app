import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireInstructor } from "@/lib/rbac";
import { sendEmail, assignmentGradedEmail } from "@/lib/email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Require ADMIN or INSTRUCTOR role
        const grader = await requireInstructor(req, res);
        if (!grader) {
            return; // Response already sent by requireInstructor
        }

        const { submissionId } = req.query;
        const { score, feedback } = req.body;

        if (!submissionId || typeof submissionId !== "string") {
            return res.status(400).json({ error: "Submission ID is required" });
        }

        if (typeof score !== "number") {
            return res.status(400).json({ error: "Score is required and must be a number" });
        }

        // Fetch the submission with assignment and student details
        const submission = await prisma.submission.findUnique({
            where: { id: submissionId },
            include: {
                assignment: {
                    select: {
                        title: true,
                        maxPoints: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!submission) {
            return res.status(404).json({ error: "Submission not found" });
        }

        // Validate score doesn't exceed max points
        if (score > submission.assignment.maxPoints || score < 0) {
            return res.status(400).json({
                error: `Score must be between 0 and ${submission.assignment.maxPoints}`,
            });
        }

        // Update submission with grade
        const gradedSubmission = await prisma.submission.update({
            where: { id: submissionId },
            data: {
                score,
                feedback: feedback || null,
                status: "GRADED",
                gradedAt: new Date(),
            },
            include: {
                assignment: true,
            },
        });

        // Send email notification to student (async, don't block response)
        if (submission.user.email) {
            const emailTemplate = assignmentGradedEmail(
                submission.user.name || "Student",
                submission.assignment.title,
                score,
                submission.assignment.maxPoints,
                feedback || "",
                submission.assignmentId
            );

            sendEmail({
                to: submission.user.email,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
            }).catch((error) => {
                console.error("Failed to send grading email:", error);
                // Don't fail the request if email fails
            });
        }

        res.status(200).json({
            success: true,
            submission: gradedSubmission,
        });
    } catch (error) {
        console.error("Error grading submission:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
