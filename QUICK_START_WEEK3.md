# Quick Start Guide - Week 3 Features

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Add to your `.env.local`:
```bash
# Email Service
RESEND_API_KEY="re_your_key_here"
EMAIL_FROM="Vets Who Code <noreply@vetswhocode.io>"
```

### 3. Run Database Migrations (if not already done)
```bash
npx prisma generate
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```

---

## Quick Feature Overview

### 📧 Email Notifications

**When emails are sent**:
- Student enrolls in a course → Welcome email
- Assignment is graded → Grade notification email
- Course is completed → Congratulations email

**To test**:
1. Ensure `RESEND_API_KEY` is set
2. Enroll in a course
3. Check your email inbox

**No API key?** Emails will be skipped gracefully (won't break functionality)

---

### 📚 Course Creation

**Access**: `/admin/courses`

**Steps**:
1. Click "New Course" button
2. Fill out the form:
   - Title (required)
   - Category (required)
   - Description, difficulty, duration (optional)
3. Check "Publish" to make it immediately available
4. Click "Create Course"

**Who can use it**: Admins and Instructors only

---

### ✅ Grading System

**Access**: `/admin/grading`

**Steps**:
1. View pending submissions in left sidebar
2. Click a submission to review
3. Check GitHub repo and live demo
4. Enter score and feedback
5. Click "Submit Grade & Notify Student"
6. Student receives email automatically

**Who can use it**: Admins and Instructors only

---

## User Roles

| Role | Can Enroll | Can Create Courses | Can Grade | Can Manage Users |
|------|-----------|-------------------|-----------|-----------------|
| STUDENT | ✓ | ✗ | ✗ | ✗ |
| MENTOR | ✓ | ✗ | ✗ | ✗ |
| INSTRUCTOR | ✓ | ✓ | ✓ | ✗ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |

---

## API Endpoints (for developers)

### Email-Enabled Endpoints
```typescript
// Enrollment (sends welcome email)
POST /api/enrollment/enroll
Body: { courseId: string }

// Grading (sends grade notification)
PUT /api/submissions/[id]/grade
Body: { score: number, feedback?: string }
```

### New Grading Endpoints
```typescript
// Get pending submissions
GET /api/submissions/pending
Query: ?courseId=optional

// Grade a submission
PUT /api/submissions/[submissionId]/grade
Body: { score: number, feedback?: string }
Auth: Instructor/Admin
```

### Course Management
```typescript
// Create course
POST /api/courses
Body: {
  title: string,
  category: string,
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  description?: string,
  duration?: number,
  imageUrl?: string,
  isPublished?: boolean
}
Auth: Instructor/Admin
```

---

## RBAC (Role-Based Access Control)

### Using in API Routes

```typescript
import { requireAuth, requireInstructor, requireAdmin } from "@/lib/rbac";

// Require any authenticated user
const user = await requireAuth(req, res);
if (!user) return; // 401 sent automatically

// Require instructor or admin
const user = await requireInstructor(req, res);
if (!user) return; // 403 sent automatically

// Require admin only
const user = await requireAdmin(req, res);
if (!user) return; // 403 sent automatically
```

### Dev Mode Support

In **development** (`NODE_ENV=development`):
- Can use `x-dev-user-id` header for testing
- `/api/dev/*` endpoints are accessible

In **production**:
- Dev headers are ignored
- `/api/dev/*` endpoints return 403
- Only NextAuth sessions work

---

## Email Templates

Located in: `src/lib/email.ts`

### Available Templates

1. **enrollmentConfirmationEmail(userName, courseName, courseId)**
2. **assignmentGradedEmail(userName, title, score, maxPoints, feedback, assignmentId)**
3. **courseCompletionEmail(userName, courseName)**

### Customize Templates

Edit HTML in `src/lib/email.ts`. Each template includes:
- Responsive design
- Professional styling
- VWC branding
- Clear CTAs

---

## Troubleshooting

### Emails Not Sending

**Check**:
1. Is `RESEND_API_KEY` in `.env.local`?
2. Is the API key valid?
3. Check console for error messages

**Note**: Emails fail silently - operations continue even if email fails

### Can't Access Admin Pages

**Check**:
1. Are you logged in?
2. Is your user role ADMIN or INSTRUCTOR?
3. Check browser console for auth errors

### Dev Headers Not Working

**Check**:
1. Is `NODE_ENV=development`?
2. Are you using the header correctly? `x-dev-user-id: user-id-here`

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Testing Checklist

### Email System
- [ ] Send test enrollment email
- [ ] Send test grading email
- [ ] Verify HTML renders correctly
- [ ] Test with missing API key (should not break)

### Course Creation
- [ ] Create course with all fields
- [ ] Create course with minimal fields
- [ ] Toggle publish status
- [ ] Verify non-admins can't access

### Grading
- [ ] View pending submissions
- [ ] Grade a submission
- [ ] Check email received
- [ ] Verify submission marked as graded

### Security
- [ ] Test without auth (should get 401)
- [ ] Test as student accessing admin endpoint (should get 403)
- [ ] Verify dev endpoints blocked in production

---

## Common Tasks

### Adding a New User Role

1. Update `prisma/schema.prisma`:
   ```prisma
   enum UserRole {
     STUDENT
     INSTRUCTOR
     ADMIN
     MENTOR
     YOUR_NEW_ROLE  // Add here
   }
   ```

2. Run migration:
   ```bash
   npx prisma migrate dev --name add_new_role
   ```

3. Update RBAC helpers in `src/lib/rbac.ts`

### Adding a New Email Template

1. Open `src/lib/email.ts`
2. Add new function:
   ```typescript
   export function yourNewEmail(params) {
     return {
       subject: "Your Subject",
       html: `Your HTML template`
     };
   }
   ```
3. Use in API endpoint:
   ```typescript
   import { sendEmail, yourNewEmail } from "@/lib/email";

   const template = yourNewEmail(params);
   await sendEmail({ to, ...template });
   ```

### Changing Email Provider

Currently using Resend. To switch:

1. Install new provider SDK
2. Update `src/lib/email.ts`:
   - Replace Resend client
   - Update `sendEmail()` function
3. Update `.env.example`
4. Update this documentation

---

## Files Reference

### New Files
```
src/lib/email.ts                                    # Email utilities
src/lib/rbac.ts                                     # RBAC middleware
src/pages/admin/grading.tsx                         # Grading UI
src/pages/admin/courses/create.tsx                  # Course creation UI
src/pages/api/submissions/[submissionId]/grade.ts  # Grade API
src/pages/api/submissions/pending.ts                # Pending API
```

### Modified Files
```
src/pages/api/enrollment/enroll.ts      # Added email
src/pages/api/courses/index.ts          # RBAC
src/pages/api/user/profile.ts           # RBAC
src/pages/api/user/assessment.ts        # RBAC
src/pages/api/dev/init-user.ts          # Secured
src/pages/admin/index.tsx               # Quick actions
src/pages/admin/courses.tsx             # Create link
.env.example                            # Email vars
```

---

## Resources

- **Resend Docs**: https://resend.com/docs
- **RBAC Pattern**: Check `src/lib/rbac.ts` for examples
- **Email Templates**: Check `src/lib/email.ts` for examples
- **Week 3 Full Report**: See `WEEK3_POLISH_COMPLETION.md`

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
