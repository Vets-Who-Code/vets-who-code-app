# VetsWhoCode LMS - Complete Guide 🎓

## 🚀 Quick Start (Local Development)

### 1. Sign In
**URL:** `http://localhost:3000/login`

**Two Options:**
- **Dev Login**: Click "Dev Login (Jerome Only)" - instant admin access (local only)
- **GitHub OAuth**: Click "Sign in with GitHub" - production-like authentication

---

## 📍 Navigation Map

### For Students 👨‍🎓

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/dashboard` | View your enrolled courses, progress stats, and next lessons |
| **All Courses** | `/courses` | Browse all available courses |
| **Web Dev Course** | `/courses/web-development` | View course details and enroll |
| **Course Detail** | `/courses/[courseId]` | View specific course modules and lessons |
| **Submit Assignment** | `/assignments/submit/[assignmentId]` | Submit your assignment with GitHub URL |

### For Instructors 👨‍🏫

| Page | URL | Description |
|------|-----|-------------|
| **Grading Dashboard** | `/instructor/grading` | Review and grade pending student submissions |

### For Admins 👨‍💼

| Page | URL | Description |
|------|-----|-------------|
| **Course Management** | `/admin/courses` | View, filter, and manage all courses |
| **Create Course** | `/admin/courses/create` | Create a new course with all details |
| **User Management** | `/admin/users` | View and manage all users |
| **Edit Course** | `/admin/courses/[courseId]` | Edit specific course details |

---

## 🎯 User Roles & Permissions

### STUDENT
- ✅ View published courses
- ✅ Enroll in courses
- ✅ Track progress
- ✅ Submit assignments
- ✅ View grades and feedback
- ✅ Access dashboard

### INSTRUCTOR
- ✅ All student permissions
- ✅ Create and edit courses
- ✅ Create assignments
- ✅ Grade student submissions
- ✅ View pending submissions

### MENTOR
- ✅ All student permissions
- ✅ Grade student submissions
- ✅ Provide feedback

### ADMIN
- ✅ All permissions
- ✅ Delete courses
- ✅ Manage users
- ✅ Access all admin tools

---

## 🧪 Test Accounts (Seeded Database)

| Email | Role | Password |
|-------|------|----------|
| jerome@vetswhocode.io | ADMIN | (GitHub OAuth or Dev Login) |
| admin@vetswhocode.io | ADMIN | (GitHub OAuth) |
| instructor@vetswhocode.io | INSTRUCTOR | (GitHub OAuth) |
| student@vetswhocode.io | STUDENT | (GitHub OAuth) |

---

## 📚 Sample Course Content

### Web Development Fundamentals
**Status:** Published
**Difficulty:** BEGINNER
**Duration:** 120 hours
**Modules:** 5

#### Module 1: HTML Fundamentals
- Introduction to HTML
- Semantic HTML Elements
- Forms and Inputs
- HTML Best Practices

#### Module 2: CSS Styling
- CSS Basics
- Flexbox Layout
- CSS Grid
- Responsive Design
- Advanced Selectors

#### Module 3: JavaScript Fundamentals
- Variables and Data Types
- Functions and Scope
- DOM Manipulation
- Events and Event Handling
- ES6+ Features

#### Module 4: React Basics
- Components and Props
- State Management
- React Hooks
- Event Handling
- Conditional Rendering

#### Module 5: Node.js and APIs
- Node.js Fundamentals
- Express.js Basics
- RESTful APIs
- Database Integration
- Authentication

**Assignments:** 4 total
- HTML Portfolio Project
- CSS Responsive Website
- JavaScript Interactive App
- React + Node.js Full Stack Project

---

## 🔧 API Endpoints Reference

### Course Management
- `GET /api/courses` - List all courses (with filters)
- `POST /api/courses` - Create new course (Admin/Instructor)
- `GET /api/courses/[courseId]` - Get course details
- `PUT /api/courses/[courseId]` - Update course (Admin/Instructor)
- `DELETE /api/courses/[courseId]` - Delete course (Admin only)

### Module Management
- `POST /api/modules` - Create module (Admin/Instructor)
- `GET /api/modules/[moduleId]` - Get module details
- `PUT /api/modules/[moduleId]` - Update module (Admin/Instructor)
- `DELETE /api/modules/[moduleId]` - Delete module (Admin/Instructor)

### Lesson Management
- `POST /api/lessons` - Create lesson (Admin/Instructor)
- `GET /api/lessons/[lessonId]` - Get lesson details
- `PUT /api/lessons/[lessonId]` - Update lesson (Admin/Instructor)
- `DELETE /api/lessons/[lessonId]` - Delete lesson (Admin/Instructor)

### Assignment Management
- `GET /api/assignments?courseId=[id]` - Get assignments for course
- `POST /api/assignments` - Create assignment (Admin/Instructor)
- `GET /api/assignments/[assignmentId]` - Get assignment details
- `PUT /api/assignments/[assignmentId]` - Update assignment (Admin/Instructor)
- `DELETE /api/assignments/[assignmentId]` - Delete assignment (Admin/Instructor)

### Enrollment
- `POST /api/enrollment/enroll` - Enroll in course
- `GET /api/enrollment` - Get user's enrollments
- `GET /api/enrollment/status?courseId=[id]` - Check enrollment status

### Progress Tracking
- `GET /api/progress?enrollmentId=[id]` - Get progress for enrollment
- `POST /api/progress` - Update lesson progress

### Submissions & Grading
- `POST /api/lms/submissions` - Submit assignment
- `GET /api/lms/submissions/pending` - Get pending submissions (Instructor/Mentor/Admin)
- `PUT /api/lms/submissions/[id]/grade` - Grade submission (Instructor/Mentor/Admin)

### Certificates
- `POST /api/certificates/generate` - Generate certificate
- `GET /api/certificates/[certificateId]` - View certificate
- `GET /api/certificates/verify?certificateId=[id]` - Verify certificate

---

## 🎬 Common Workflows

### Student: Enroll in Course and Complete Lesson
1. Browse courses at `/courses`
2. Click on "Web Development" course
3. Click "Enroll Now"
4. Go to `/dashboard` to see your enrollment
5. Click "Continue Learning"
6. Complete lessons and mark progress

### Student: Submit Assignment
1. Navigate to assignment page
2. Enter GitHub repository URL
3. (Optional) Add live demo URL
4. Add notes about your submission
5. Click "Submit Assignment"
6. Wait for instructor feedback

### Instructor: Grade Submission
1. Go to `/instructor/grading`
2. Review student submission (GitHub URL, live demo, notes)
3. Enter score (out of total points)
4. Provide detailed feedback
5. Click "Submit Grade"

### Admin: Create New Course
1. Go to `/admin/courses`
2. Click "New Course"
3. Fill in course details:
   - Title
   - Description
   - Category
   - Difficulty level
   - Estimated hours
   - Prerequisites
   - Tags
4. Toggle "Publish" if ready
5. Click "Create Course"
6. Add modules and lessons using API or future UI

---

## 📊 Dashboard Features

### Student Dashboard (`/dashboard`)

**Quick Stats:**
- Total courses enrolled
- Courses completed
- Total lessons completed
- Average progress percentage

**Current Courses Section:**
- Course title and description
- Progress bar with percentage
- "Continue Learning" button
- Enrollment date

**Sidebar:**
- Upcoming assignments with due dates
- Recent activity timeline
- Quick links (Jobs, Profile, Courses, Support)

---

## 🔒 Authentication & Authorization

### Local Development
- Use "Dev Login" button at `/login`
- Bypasses GitHub OAuth
- Instantly logs in as Jerome (Admin)

### Production (Vercel)
- Uses GitHub OAuth
- Requires valid GitHub account
- Role assigned from database based on email
- Jerome's GitHub account (`jeromehardaway`) gets admin access

---

## 🌐 Deployment to Vercel

### Required Environment Variables

Add these to your Vercel project settings:

```bash
# Database
DATABASE_URL=your_neon_postgresql_url
DIRECT_URL=your_neon_postgresql_url

# NextAuth
NEXTAUTH_SECRET=generate_random_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app

# GitHub OAuth (Required for Production)
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# Optional
GITHUB_ORG=Vets-Who-Code
```

### Setting Up GitHub OAuth

1. **Create GitHub OAuth App:**
   - Go to: https://github.com/settings/developers
   - Click "New OAuth App"
   - **Application name:** VetsWhoCode LMS
   - **Homepage URL:** `https://your-domain.vercel.app`
   - **Authorization callback URL:** `https://your-domain.vercel.app/api/auth/callback/github`
   - Click "Register application"

2. **Get Credentials:**
   - Copy the **Client ID**
   - Generate a new **Client Secret**
   - Add both to Vercel environment variables

3. **How Sign In Works on Vercel:**
   - User goes to `/login`
   - Clicks "Sign in with GitHub"
   - Redirected to GitHub to authorize
   - Returns to your app
   - Session created with role from database

### Assign Admin Role for Production

After deploying, assign yourself admin role:

```bash
# Connect to your production database
# Using Prisma Studio or direct SQL

UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'jerome@vetswhocode.io';
```

Or use the Neon console SQL editor.

---

## 🐛 Troubleshooting

### "Access Denied" on Admin Pages
- Check your user role in database
- Ensure you're signed in with correct account
- Verify RBAC is working (check browser console for errors)

### "Failed to fetch courses"
- Check database connection
- Verify Prisma client is generated
- Check API endpoint logs

### "Cannot enroll in course"
- Ensure course is published (`isPublished: true`)
- Check if already enrolled
- Verify authentication

### GitHub OAuth Not Working
- Verify callback URL matches exactly
- Check environment variables are set
- Ensure GitHub OAuth app is active

---

## 📝 Database Schema Overview

### Core Tables
- **User** - User accounts with roles
- **Course** - Course information
- **Module** - Course modules
- **Lesson** - Individual lessons
- **Assignment** - Course assignments
- **Enrollment** - User course enrollments
- **Progress** - Lesson completion tracking
- **Submission** - Assignment submissions
- **Certificate** - Course completion certificates
- **Cohort** - Student cohorts

### Relationships
- Course → Modules → Lessons
- Course → Assignments
- User → Enrollments → Course
- User → Progress → Lesson
- User → Submissions → Assignment

---

## 🎓 Next Steps

### Immediate Tasks
1. Sign in and explore the dashboard
2. Test course enrollment flow
3. Submit a test assignment
4. Grade a submission as instructor
5. Create a new course as admin

### Future Enhancements
- File upload for assignments
- Live video integration
- Discussion forums
- Email notifications
- Certificate PDF generation
- Advanced analytics
- Mobile responsive improvements

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/Vets-Who-Code/vets-who-code-app/issues)
- Email: jerome@vetswhocode.io

---

**Built with ❤️ for #VetsWhoCode**
