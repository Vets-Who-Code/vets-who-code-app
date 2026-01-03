import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
  }>;
}

/**
 * Send an email using Resend
 *
 * @param options - Email sending options
 * @returns Promise that resolves when email is sent
 */
export async function sendEmail(options: SendEmailOptions) {
  try {
    // Default from address - using Resend's default or custom domain
    const from = options.from || process.env.EMAIL_FROM || 'noreply@vetswhocode.io';

    const data = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments,
    });

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
