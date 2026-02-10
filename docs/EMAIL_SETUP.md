# Certificate Email Setup Guide

This guide explains how to configure and use the automated certificate email system in the Vets Who Code LMS.

## Overview

When a student completes a course, the system:
1. Generates a PDF certificate
2. Uploads it to Cloudinary
3. Sends a professional email to the student with:
   - Certificate download link
   - Course completion details
   - Next steps and resources
   - Verification link

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "VWC Production")
5. Copy the API key (you won't be able to see it again)

### 3. Configure Environment Variables

Add these variables to your `.env` file:

```bash
# Required
RESEND_API_KEY="re_your_api_key_here"

# Optional (defaults to noreply@vetswhocode.io)
EMAIL_FROM="noreply@vetswhocode.io"
```

### 4. Verify Your Domain (Optional but Recommended)

For production, you should verify your sending domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `vetswhocode.io`
4. Add the provided DNS records to your domain
5. Wait for verification (usually a few minutes)

Once verified, you can send from `noreply@vetswhocode.io` or any address at your domain.

**Without domain verification:** Emails will be sent from `onboarding@resend.dev` with a reply-to address.

## How It Works

### Automatic Email on Course Completion

When a student completes all lessons in a course:

```typescript
POST /api/lms/progress
{
  "lessonId": "last-lesson-id",
  "completed": true
}
```

If this completes the course (100% progress):
1. Certificate is generated
2. PDF is uploaded to Cloudinary
3. Email is automatically sent to student
4. Response includes `emailSent: true`

### Manual Certificate Generation

Admins or students can manually generate certificates:

```typescript
POST /api/lms/certificates/generate
{
  "courseId": "course-id"
}
```

This will:
1. Check eligibility (course must be 100% complete)
2. Generate and upload certificate
3. Send email to student
4. Return `{ certificate: {...}, emailSent: true }`

## Email Template

The email includes:

- **VWC branding** (Navy, Red, Gold colors)
- **Student name** and course name
- **Completion date** and certificate number
- **Download button** for the PDF
- **Verification link** to prove authenticity
- **Next steps** (LinkedIn, more courses, mentoring)
- **Professional signature** from Jerome Hardaway

### Preview

The email looks like this:

```
┌─────────────────────────────────────────────┐
│          VETS WHO CODE                      │
│      (Navy background header)               │
└─────────────────────────────────────────────┘

Congratulations, [Student Name]!

We are thrilled to inform you that you have
successfully completed [Course Name] on [Date].

         🎓
   Certificate of Completion

   [Download Your Certificate]  ← Big red button

Certificate No: VWC-2024-001234

Verify at: vetswhocode.io/verify/VWC-2024-001234

-------------------------------------------

What's Next?
• Share your achievement on LinkedIn
• Explore more courses
• Join our Slack community
• Give back by mentoring others

Jerome Hardaway
Executive Director, Vets Who Code
```

## Testing

### Test Email Sending Locally

1. Set up your Resend API key in `.env.local`
2. Complete a course or use the generate endpoint
3. Check your email inbox

### Test Without Sending

If `RESEND_API_KEY` is not set:
- Certificate generation works normally
- Email sending is skipped (gracefully)
- Console logs: "Email service not configured"
- Returns `emailSent: false`

This allows development without requiring email setup.

## Troubleshooting

### Emails not sending?

**Check API key:**
```bash
# In your app
console.log(process.env.RESEND_API_KEY ? 'Set' : 'Not set')
```

**Check logs:**
- Success: `Certificate email sent successfully to user@example.com`
- Failure: `Failed to send certificate email: [error message]`

**Common issues:**
- API key not in environment variables
- API key starts with `re_` prefix
- Domain not verified (sends from resend.dev instead)
- Rate limit exceeded (free tier: 3,000/month)

### Emails going to spam?

1. **Verify your domain** in Resend
2. Add **SPF and DKIM records** from Resend
3. Consider adding **DMARC record**
4. Check email content for spam triggers

### Email template not rendering?

The React Email template uses inline styles (required for email clients).
If you see warnings about inline styles, they're expected and necessary.

## Customization

### Change Email Content

Edit `/src/emails/CertificateEmail.tsx`:

```typescript
<Text style={paragraph}>
  Your custom message here
</Text>
```

### Change Colors

Update the style constants:

```typescript
const vwcRed = rgb(0.76, 0.11, 0.13);   // #C21C21
const vwcNavy = rgb(0.11, 0.15, 0.25);  // #1C263F
const vwcGold = rgb(0.85, 0.65, 0.13);  // #D9A621
```

### Change "From" Name

In `/src/lib/email.ts`:

```typescript
const from = `Vets Who Code <${options.from || process.env.EMAIL_FROM}>`;
```

## API Response Format

### Successful Certificate with Email

```json
{
  "certificate": {
    "id": "cert-123",
    "certificateNumber": "VWC-2024-001234",
    "certificateUrl": "https://res.cloudinary.com/...",
    "issuedAt": "2024-01-02T12:00:00Z"
  },
  "emailSent": true,
  "message": "Certificate generated successfully"
}
```

### Email Failed (Certificate Still Created)

```json
{
  "certificate": { ... },
  "emailSent": false,
  "message": "Certificate generated successfully"
}
```

The system is designed to never fail certificate generation due to email issues.

## Production Checklist

Before deploying to production:

- [ ] Resend API key added to production environment
- [ ] Domain verified in Resend
- [ ] SPF/DKIM/DMARC records configured
- [ ] Test email sent successfully
- [ ] Email lands in inbox (not spam)
- [ ] Email renders correctly in major clients:
  - [ ] Gmail
  - [ ] Outlook
  - [ ] Apple Mail
  - [ ] Mobile devices

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Email Testing Tools](https://www.mail-tester.com/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Resend dashboard for delivery status
3. Check application logs for error messages
4. Contact the development team

---

**Last Updated:** January 2, 2024
