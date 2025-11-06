# Local Setup Guide - Run Everything Locally

Quick guide to get the VWC LMS running on your local machine.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Database Setup (Already Done!)

You already have SQLite configured. Just need to ensure Prisma is ready:

```bash
# Generate Prisma Client
npx prisma generate

# Check if database has tables (optional)
npx prisma studio
# This opens a GUI at http://localhost:5555
```

**If you need to reset/seed the database:**

```bash
# Reset database and run migrations
npx prisma migrate reset

# Or just seed with sample data
npx prisma db seed
```

---

## Step 3: Environment Variables

Your `.env.local` is already set up with SQLite!

**Optional enhancements:**

```bash
# Add to .env.local if you want email notifications
RESEND_API_KEY="your-resend-key-here"
EMAIL_FROM="Vets Who Code <noreply@vetswhocode.io>"

# Add if you want GitHub OAuth (optional for local dev)
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
GITHUB_ORG="Vets-Who-Code"
```

---

## Step 4: Run Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## Step 5: Access the New UI

### View New Lesson Player

1. **Go to**: http://localhost:3000/login
2. **Sign in** with dev mode or GitHub
3. **Visit**: http://localhost:3000/courses/web-development/1/1-new

**Note**: The `-new` suffix shows the new modern UI!

### Alternative: Use Dev Login (No GitHub OAuth needed)

If you don't have GitHub OAuth set up, you can use dev login:

1. **Go to**: http://localhost:3002/dev-login (note: server may use port 3002)
2. **Fill in the form**:
   - Name: Any name (e.g., "Test User")
   - Email: Any email (e.g., "test@example.com")
   - Role: Choose ADMIN to test all features
3. **Click "Login as [Role]"** - Creates real user and session
4. **Access courses**: http://localhost:3002/courses

**See DEV_LOGIN_GUIDE.md for detailed instructions!**

---

## Quick Test Checklist

### Basic Functionality
- [ ] Home page loads (http://localhost:3000)
- [ ] Can access login page
- [ ] Dev login works (if using dev mode)
- [ ] Dashboard loads
- [ ] Course list shows courses

### New UI Components
- [ ] Modern lesson player loads
- [ ] Sidebar is collapsible
- [ ] Video player displays
- [ ] Keyboard shortcuts work (S, N, P, M)
- [ ] Progress bar shows
- [ ] Module expansion works
- [ ] Dark theme looks good

### Admin Features (if admin user)
- [ ] Admin dashboard (http://localhost:3000/admin)
- [ ] Course management works
- [ ] Grading interface loads
- [ ] Users page accessible

---

## Useful Commands

### Development
```bash
# Start dev server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production (test)
npm run build
```

### Database
```bash
# Open Prisma Studio (GUI)
npx prisma studio

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Seed with sample data
npx prisma db seed

# View database in terminal
sqlite3 prisma/dev.db
```

### Prisma Studio Commands (once opened)
- Browse all tables
- View/edit data
- Test relationships
- Quick data entry

---

## Accessing Different Features

### 1. Modern Lesson Player (NEW!)

**URL**: http://localhost:3000/courses/web-development/1/1-new

**Features to test:**
- Sidebar toggle (click hamburger or press `S`)
- Navigate lessons (click or use `N`/`P` keys)
- Mark complete (button or press `M`)
- Module expansion (click module headers)
- Video player (if video URL provided)
- Notes/Transcript tabs

### 2. Course Dashboard

**URL**: http://localhost:3000/dashboard

**Features:**
- View enrolled courses
- See progress stats
- Quick access to continue learning

### 3. Course Catalog

**URL**: http://localhost:3000/courses

**Features:**
- Browse all courses
- Enroll in courses
- View course details

### 4. Admin Panel (Admin only)

**URL**: http://localhost:3000/admin

**Features:**
- Manage users
- Manage courses
- Grade submissions
- View analytics

### 5. Grading Interface (Admin/Instructor)

**URL**: http://localhost:3000/admin/grading

**Features:**
- View pending submissions
- Grade assignments
- Provide feedback
- Email notifications

### 6. Course Creation (Admin/Instructor)

**URL**: http://localhost:3000/admin/courses/create

**Features:**
- Create new courses
- Set difficulty level
- Publish/draft courses

---

## Creating Test Data

### Option 1: Use Seed Script

```bash
npx prisma db seed
```

This creates:
- Web Development course
- 9 modules
- 39 lessons
- 4 assignments
- Sample enrollments (if user exists)

### Option 2: Manual Creation via Prisma Studio

```bash
npx prisma studio
```

Then:
1. Open User table → Create test user
2. Open Course table → Create course
3. Open Module table → Add modules
4. Open Lesson table → Add lessons
5. Open Enrollment table → Enroll user

### Option 3: Use Dev Login + UI

1. Go to http://localhost:3000/dev-login
2. Create a dev user
3. Browse to courses
4. Enroll in a course
5. Start learning!

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Issues

```bash
# Reset everything
npx prisma migrate reset

# Generate fresh client
npx prisma generate

# Check database file exists
ls -la prisma/dev.db
```

### Module Not Found Errors

```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run dev
```

### TypeScript Errors

```bash
# Check for errors
npm run typecheck

# Generate Prisma types
npx prisma generate
```

### Styles Not Loading

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## Viewing the Database

### Option 1: Prisma Studio (Recommended)

```bash
npx prisma studio
```

Opens at http://localhost:5555 - Visual interface for your data!

### Option 2: SQLite CLI

```bash
sqlite3 prisma/dev.db

# Useful commands:
.tables              # List all tables
.schema User         # Show User table schema
SELECT * FROM User;  # Query users
.quit                # Exit
```

### Option 3: VS Code Extension

Install **SQLite Viewer** extension in VS Code, then:
1. Open `prisma/dev.db` file
2. Right-click → Open Database

---

## Testing the New UI Features

### 1. Test Lesson Player Keyboard Shortcuts

1. Open lesson page: http://localhost:3000/courses/web-development/1/1-new
2. Press `S` → Sidebar should toggle
3. Press `N` → Should go to next lesson
4. Press `P` → Should go to previous lesson
5. Press `M` → Should mark lesson as complete

### 2. Test Progress Tracking

1. Enroll in a course
2. Complete a few lessons
3. Check dashboard → Progress should update
4. Check sidebar → Checkmarks should appear
5. Check progress bar → Should show percentage

### 3. Test Responsive Design

1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl/Cmd + Shift + M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px
4. Verify sidebar behavior
5. Check touch targets on mobile

### 4. Test Dark Theme

1. The new lesson player uses dark theme
2. Check contrast is good
3. Verify text is readable
4. Test focus indicators

---

## Performance Testing (Optional)

```bash
# Build for production
npm run build

# Start production server
npm start

# Check build size
du -sh .next

# Lighthouse audit in Chrome DevTools
# (Performance, Accessibility, Best Practices, SEO)
```

---

## Hot Reload Not Working?

If changes aren't showing up:

```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next

# Restart
npm run dev
```

---

## Environment Variables Check

Verify your `.env.local`:

```bash
cat .env.local

# Should have at minimum:
# DATABASE_URL="file:./dev.db"
# NEXTAUTH_SECRET="..."
# NEXTAUTH_URL="http://localhost:3000"
```

---

## Default Test Accounts

After running seed:

**Test User** (if created):
- Check Prisma Studio for user details
- Or create via dev-login

**Admin Access**:
- Uses GitHub OAuth
- Or modify user role in Prisma Studio:
  ```sql
  UPDATE User SET role = 'ADMIN' WHERE email = 'your@email.com';
  ```

---

## Quick Start (TL;DR)

```bash
# 1. Install
npm install

# 2. Setup database
npx prisma generate
npx prisma db seed

# 3. Run
npm run dev

# 4. Visit
# http://localhost:3000/courses/web-development/1/1-new
```

---

## Demo URLs

Once running, try these URLs:

| Feature | URL |
|---------|-----|
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Dev Login | http://localhost:3000/dev-login |
| Dashboard | http://localhost:3000/dashboard |
| Courses | http://localhost:3000/courses |
| **NEW Lesson Player** | http://localhost:3000/courses/web-development/1/1-new |
| Admin | http://localhost:3000/admin |
| Grading | http://localhost:3000/admin/grading |
| Prisma Studio | http://localhost:5555 |

---

## Get Help

If you run into issues:

1. Check the console for errors
2. Check the terminal for server errors
3. Clear cache: `rm -rf .next`
4. Restart server: `npm run dev`
5. Check database: `npx prisma studio`

---

## Success! ✅

You should now see:
- Modern lesson player with dark theme
- Collapsible sidebar with course outline
- Keyboard shortcuts working
- Progress tracking
- Beautiful, professional UI

Enjoy your Laracasts/Frontend Masters-inspired learning platform! 🚀

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
