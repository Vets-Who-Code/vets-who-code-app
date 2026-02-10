import { render } from "@react-email/render";
import CertificateEmail from "@/emails/CertificateEmail";
import { isEmailConfigured, sendEmail } from "./email";

interface SendCertificateEmailOptions {
    to: string;
    studentName: string;
    courseName: string;
    certificateUrl: string;
    certificateNumber: string;
    completionDate: Date;
}

/**
 * Send a certificate email to the student
 *
 * @param options - Certificate email options
 * @returns Promise that resolves when email is sent, or null if email is not configured
 */
export async function sendCertificateEmail(
    options: SendCertificateEmailOptions
): Promise<{ success: boolean; error?: string }> {
    try {
        // Check if email service is configured
        if (!isEmailConfigured()) {
            console.warn(
                "Email service not configured. Skipping certificate email.",
                "Please set RESEND_API_KEY in your environment variables."
            );
            return {
                success: false,
                error: "Email service not configured",
            };
        }

        // Render the email template
        const emailHtml = await render(
            CertificateEmail({
                studentName: options.studentName,
                courseName: options.courseName,
                certificateUrl: options.certificateUrl,
                certificateNumber: options.certificateNumber,
                completionDate: options.completionDate,
            })
        );

        // Send the email
        await sendEmail({
            to: options.to,
            subject: `Congratulations! Your ${options.courseName} Certificate is Ready`,
            html: emailHtml,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send certificate email:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
