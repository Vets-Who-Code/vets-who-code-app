# Dev Login Guide

Quick guide to accessing the VWC LMS locally using the dev-login feature.

---

## Quick Start

1. **Visit Dev Login Page**: http://localhost:3002/dev-login

2. **Fill in the form**:
   - **Name**: Any name you want (e.g., "Dev User", "Jerome Hardaway")
   - **Email**: Any valid email format (e.g., "dev@vetswhocode.io")
   - **Role**: Choose from:
     - **Student** - Access to courses and lessons
     - **Instructor** - Can grade assignments + student features
     - **Admin** - Full access to all features

3. **Click "Login as [Role]"** - This will:
   - Create a user in your local database
   - Set up a real NextAuth session
   - Redirect you to the courses page

---

## Testing the New Modern Lesson Player

### Step 1: Dev Login
1. Go to http://localhost:3002/dev-login
2. Use these example credentials:
   ```
   Name: Test Student
   Email: student@test.com
   Role: ADMIN (so you can test all features)
   ```
3. Click "Login as Admin"

### Step 2: Access the Modern Lesson Player
After logging in, you can access the new UI in two ways:

**Option A: Direct URL**
- Visit: http://localhost:3002/courses/web-development/1/1-new
- This opens the modern lesson player immediately

**Option B: Through Courses (when you connect it)**
- Visit: http://localhost:3002/courses
- Click on a course
- Navigate to lessons

---

## Features to Test

### 1. Keyboard Shortcuts
Press these keys while on the lesson player:
- `S` - Toggle sidebar
- `N` - Next lesson
- `P` - Previous lesson
- `M` - Mark lesson as complete

### 2. Sidebar Features
- Click hamburger icon (☰) to toggle sidebar
- Click module headers to expand/collapse lesson lists
- Click on any lesson to navigate
- Watch progress bar update as you complete lessons
- See checkmarks on completed lessons
- View keyboard shortcuts guide at bottom

### 3. Video Player
- 16:9 aspect ratio video player
- Full-width responsive design
- Embedded YouTube/Vimeo support

### 4. Tabbed Content
- Switch between "Lesson Notes" and "Transcript" tabs
- Notes display formatted HTML content
- Transcript section (placeholder for now)

### 5. Navigation
- Previous/Next buttons in top bar
- Green "Mark Complete" button
- Lesson title and duration display

### 6. Dark Theme
- Professional dark gray background
- Blue accents for active elements
- Green for completion indicators
- Good contrast for readability

---

## URLs for Testing

| Feature | URL |
|---------|-----|
| **Dev Login** | http://localhost:3002/dev-login |
| **Modern Lesson Player** | http://localhost:3002/courses/web-development/1/1-new |
| **Home** | http://localhost:3002 |
| **Courses** | http://localhost:3002/courses |
| **Dashboard** | http://localhost:3002/dashboard |
| **Profile** | http://localhost:3002/profile |
| **Admin Panel** | http://localhost:3002/admin (Admin only) |
| **Grading** | http://localhost:3002/admin/grading (Admin/Instructor) |
| **Course Creation** | http://localhost:3002/admin/courses/create (Admin/Instructor) |

---

## Different User Roles

### Student Role
```
Name: Student User
Email: student@vetswhocode.io
Role: STUDENT
```
**Can access:**
- Course catalog
- Lesson player
- Dashboard
- Profile

**Cannot access:**
- Admin panel
- Grading interface
- Course creation

### Instructor Role
```
Name: Instructor User
Email: instructor@vetswhocode.io
Role: INSTRUCTOR
```
**Can access:**
- All student features
- Grading interface
- Course creation
- View submissions

**Cannot access:**
- User management (admin only)

### Admin Role
```
Name: Admin User
Email: admin@vetswhocode.io
Role: ADMIN
```
**Can access:**
- Everything!
- Admin dashboard
- User management
- All instructor features
- All student features

---

## Database

Your dev-login users are stored in:
```
prisma/dev.db
```

### View Your Users
Open Prisma Studio to see all created users:
```bash
npx prisma studio
```
Then go to http://localhost:5555 to browse your database.

### Reset Database
If you want to start fresh:
```bash
npx prisma migrate reset
```
This will clear all data and re-run seeds.

---

## Troubleshooting

### Can't Access Lesson Page
**Problem**: Getting "Authentication Required" message

**Solution**:
1. Make sure you completed dev-login
2. Check browser console for errors
3. Try clearing cookies and logging in again
4. Verify session in Prisma Studio (check Session table)

### Session Not Persisting
**Problem**: Logged out after page refresh

**Solution**:
1. Check if cookies are enabled in your browser
2. Verify `NEXTAUTH_SECRET` is set in `.env.local`
3. Check browser console for cookie warnings
4. Try a different browser

### Database Errors
**Problem**: Prisma errors when logging in

**Solution**:
```bash
# Generate Prisma Client
npx prisma generate

# Reset database
npx prisma migrate reset

# Restart dev server
# (Stop with Ctrl+C, then)
npm run dev
```

### Page Not Found
**Problem**: 404 error on lesson page

**Solution**:
- Make sure you're using the `-new` suffix
- Correct URL: `/courses/web-development/1/1-new`
- Check if server is running on the right port
- Your server might be on port 3002 instead of 3000

---

## How Dev Login Works

### Behind the Scenes
1. **API Call**: Form submits to `/api/auth/dev-login`
2. **User Creation**: API creates/updates user in database
3. **Session Creation**: Creates NextAuth session with token
4. **Cookie Setting**: Sets session cookie in browser
5. **Redirect**: Sends you to courses page

### Security Notes
- **Only works in development mode** (`NODE_ENV=development`)
- Production deployments will return 403 error
- Uses real database and NextAuth sessions
- Sessions expire after 30 days

---

## Next Steps

After testing locally:

1. **Connect Real Data**: Replace mock data in lesson player with API calls
2. **Add More Lessons**: Create actual course content in database
3. **Test All Features**: Try grading, course creation, certificates
4. **Check Responsiveness**: Test on mobile viewport (F12 → device toolbar)
5. **Test Emails**: Set up Resend API key to test notifications

---

## Quick Demo Flow

**5-Minute Test Run:**

1. Visit http://localhost:3002/dev-login
2. Login as "Demo User" / "demo@test.com" / Role: ADMIN
3. Go to http://localhost:3002/courses/web-development/1/1-new
4. Press `S` to toggle sidebar
5. Press `N` to go to next lesson
6. Click "Mark Complete" button
7. Watch progress bar update in sidebar
8. Click different lessons in sidebar to navigate
9. Try the keyboard shortcuts (N, P, S, M)
10. Switch between "Lesson Notes" and "Transcript" tabs

---

## Feedback

Found a bug or have suggestions? The dev team wants to hear from you!

**Current Known Issues:**
- Lesson data is currently mocked (not from database)
- Transcript tab is placeholder
- Navigation only works within mock data structure

**Coming Soon:**
- Real API integration
- Dynamic course loading
- More keyboard shortcuts
- Bookmarking lessons
- Note-taking feature

---

**Last Updated**: November 4, 2025
**Server URL**: http://localhost:3002
**Status**: ✅ Running
