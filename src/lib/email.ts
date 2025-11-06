import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY not configured, skipping email");
        return null;
    }

    try {
        const data = await resend.emails.send({
            from: process.env.EMAIL_FROM || "Vets Who Code <noreply@vetswhocode.io>",
            to,
            subject,
            html,
        });

        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

// Email Templates

export function enrollmentConfirmationEmail(userName: string, courseName: string, courseId: string) {
    return {
        subject: `Welcome to ${courseName}!`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 You're Enrolled!</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${userName},</p>
                        <p>Congratulations! You've successfully enrolled in <strong>${courseName}</strong>.</p>
                        <p>You now have full access to all course materials, including modules, lessons, and assignments. Start learning at your own pace and track your progress along the way.</p>
                        <p style="text-align: center;">
                            <a href="${process.env.NEXTAUTH_URL}/courses/web-development/${courseId}" class="button">Start Learning</a>
                        </p>
                        <p><strong>What's Next?</strong></p>
                        <ul>
                            <li>Visit your dashboard to see your enrolled courses</li>
                            <li>Complete lessons to track your progress</li>
                            <li>Submit assignments to get feedback from instructors</li>
                        </ul>
                        <p>We're excited to have you on this learning journey!</p>
                    </div>
                    <div class="footer">
                        <p>Vets Who Code - Empowering Veterans Through Tech Education</p>
                        <p>If you have questions, reply to this email or visit our support page.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };
}

export function assignmentGradedEmail(
    userName: string,
    assignmentTitle: string,
    score: number,
    maxPoints: number,
    feedback: string,
    assignmentId: string
) {
    const percentage = Math.round((score / maxPoints) * 100);

    return {
        subject: `Your assignment "${assignmentTitle}" has been graded`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .score-box { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
                    .score { font-size: 48px; font-weight: bold; color: #667eea; margin: 0; }
                    .feedback-box { background: white; padding: 20px; margin: 20px 0; border-radius: 4px; border: 1px solid #ddd; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📝 Assignment Graded</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${userName},</p>
                        <p>Your assignment <strong>"${assignmentTitle}"</strong> has been reviewed and graded.</p>

                        <div class="score-box">
                            <p style="margin: 0; color: #666; font-size: 14px;">YOUR SCORE</p>
                            <p class="score">${score}/${maxPoints}</p>
                            <p style="margin: 0; color: #666;">${percentage}%</p>
                        </div>

                        ${
                            feedback
                                ? `
                        <div class="feedback-box">
                            <h3 style="margin-top: 0;">Instructor Feedback:</h3>
                            <p>${feedback}</p>
                        </div>
                        `
                                : ""
                        }

                        <p style="text-align: center;">
                            <a href="${process.env.NEXTAUTH_URL}/assignments/submit/${assignmentId}" class="button">View Submission</a>
                        </p>

                        ${
                            percentage < 70
                                ? `<p><em>If you'd like to improve your score, please reach out to your instructor about resubmission options.</em></p>`
                                : `<p><strong>Great work!</strong> Keep up the excellent progress.</p>`
                        }
                    </div>
                    <div class="footer">
                        <p>Vets Who Code - Empowering Veterans Through Tech Education</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };
}

export function courseCompletionEmail(userName: string, courseName: string) {
    return {
        subject: `🎓 Congratulations! You completed ${courseName}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .celebration { font-size: 80px; text-align: center; margin: 20px 0; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎓 Course Completed!</h1>
                    </div>
                    <div class="content">
                        <div class="celebration">🎉</div>
                        <p>Hi ${userName},</p>
                        <p><strong>Congratulations!</strong> You've successfully completed <strong>${courseName}</strong>!</p>
                        <p>This is a significant achievement and demonstrates your commitment to learning and professional growth. You've worked through all the modules, completed the lessons, and submitted your assignments.</p>
                        <p style="text-align: center;">
                            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View Your Dashboard</a>
                        </p>
                        <p><strong>What's Next?</strong></p>
                        <ul>
                            <li>Explore more courses to continue learning</li>
                            <li>Apply your new skills to real-world projects</li>
                            <li>Share your achievement with your network</li>
                            <li>Connect with other graduates in our community</li>
                        </ul>
                        <p>Keep up the excellent work, and thank you for being part of Vets Who Code!</p>
                    </div>
                    <div class="footer">
                        <p>Vets Who Code - Empowering Veterans Through Tech Education</p>
                        <p>Semper Discentes - Always Learning</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };
}
