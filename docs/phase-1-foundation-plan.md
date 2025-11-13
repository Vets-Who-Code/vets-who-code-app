# Phase 1: Foundation & Database Implementation Plan

**Timeline**: Week 1-2
**Status**: Planning
**Last Updated**: 2025-11-13

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Database Schema Design](#database-schema-design)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Verification Steps](#verification-steps)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## Overview

This phase establishes the foundational database structure and authentication system for the VetsWhoCode Learning Management System (LMS). We'll create all necessary database models, seed data, and core utilities needed for subsequent phases.

### Goals

- ✅ Complete database schema with all LMS models
- ✅ Migration system setup with proper versioning
- ✅ Seed data for testing and development
- ✅ Core utilities (Prisma client, RBAC middleware)
- ✅ Authentication with NextAuth and GitHub OAuth

### Success Criteria

- All Prisma models defined and migrated successfully
- Seed script runs without errors and populates test data
- RBAC middleware protects API routes
- Users can authenticate via GitHub OAuth
- All tables visible in Prisma Studio

---

## Prerequisites

### Required Tools

- Node.js 18+ installed
- SQLite (default) or PostgreSQL
- Git for version control
- VS Code (recommended) with Prisma extension

### Existing Codebase

Check current setup:

```bash
# Verify Prisma is installed
npm list @prisma/client prisma

# Check existing schema
cat prisma/schema.prisma

# Verify NextAuth setup
ls src/pages/api/auth
```

---

## Database Schema Design

### Models Overview

```
Course (1) ──────< Enrollment (N) ──────> User (1)
  │                    │
  │                    └──────< Progress (N) ──────> Lesson (1)
  │
  ├──────< Module (N)
  │          │
  │          └──────< Lesson (N)
  │
  ├──────< Assignment (N)
  │          │
  │          └──────< Submission (N) ──────> User (1)
  │
  └──────< Certificate (N) ──────> User (1)

Cohort (1) ──────< User (N)

User (1) ──────< Bookmark (N) ──────> Lesson (1)
User (1) ──────< Note (N) ──────> Lesson (1)
```

### Core Models

#### 1. **Course**
```prisma
model Course {
  id              String         @id @default(cuid())
  title           String
  description     String
  category        String
  difficulty      String         // BEGINNER, INTERMEDIATE, ADVANCED
  estimatedHours  Int
  prerequisites   String[]
  tags            String[]
  isPublished     Boolean        @default(false)
  imageUrl        String?
  modules         Module[]
  enrollments     Enrollment[]
  assignments     Assignment[]
  certificates    Certificate[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}
```

#### 2. **Module**
```prisma
model Module {
  id          String    @id @default(cuid())
  title       String
  description String
  order       Int
  courseId    String
  course      Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons     Lesson[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

#### 3. **Lesson**
```prisma
model Lesson {
  id          String     @id @default(cuid())
  title       String
  description String
  content     String?    // Markdown/HTML content
  videoUrl    String?
  duration    Int?       // in minutes
  order       Int
  type        String     // CONTENT, VIDEO, EXERCISE, QUIZ, PROJECT
  moduleId    String
  module      Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  progress    Progress[]
  bookmarks   Bookmark[]
  notes       Note[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

#### 4. **Enrollment**
```prisma
model Enrollment {
  id              String     @id @default(cuid())
  userId          String
  user            User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId        String
  course          Course     @relation(fields: [courseId], references: [id], onDelete: Cascade)
  status          String     @default("ACTIVE") // ACTIVE, COMPLETED, DROPPED
  progress        Int        @default(0) // 0-100 percentage
  startedAt       DateTime   @default(now())
  completedAt     DateTime?
  lastAccessedAt  DateTime   @default(now())
  progressRecords Progress[]

  @@unique([userId, courseId])
}
```

#### 5. **Progress**
```prisma
model Progress {
  id           String     @id @default(cuid())
  enrollmentId String
  enrollment   Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)
  lessonId     String
  lesson       Lesson     @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  completed    Boolean    @default(false)
  completedAt  DateTime?
  timeSpent    Int        @default(0) // in minutes

  @@unique([enrollmentId, lessonId])
}
```

#### 6. **Assignment**
```prisma
model Assignment {
  id          String       @id @default(cuid())
  title       String
  description String
  courseId    String
  course      Course       @relation(fields: [courseId], references: [id], onDelete: Cascade)
  dueDate     DateTime?
  maxPoints   Int          @default(100)
  submissions Submission[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}
```

#### 7. **Submission**
```prisma
model Submission {
  id           String     @id @default(cuid())
  assignmentId String
  assignment   Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  content      String     // Submission text/link
  status       String     @default("SUBMITTED") // SUBMITTED, GRADED, RETURNED
  score        Int?
  feedback     String?
  submittedAt  DateTime   @default(now())
  gradedAt     DateTime?

  @@unique([assignmentId, userId])
}
```

#### 8. **Certificate**
```prisma
model Certificate {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId     String
  course       Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  issuedAt     DateTime @default(now())
  certificateUrl String?

  @@unique([userId, courseId])
}
```

#### 9. **Cohort**
```prisma
model Cohort {
  id          String   @id @default(cuid())
  name        String
  description String?
  startDate   DateTime
  endDate     DateTime?
  isElite     Boolean  @default(false)
  members     User[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 10. **Bookmark**
```prisma
model Bookmark {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, lessonId])
}
```

#### 11. **Note**
```prisma
model Note {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Step-by-Step Implementation

### Step 1: Update User Model

**Task**: Add LMS-related relations to existing User model

**File**: `prisma/schema.prisma`

```prisma
model User {
  id            String       @id @default(cuid())
  email         String       @unique
  name          String?
  image         String?
  role          String       @default("user") // user, admin, instructor
  cohortId      String?
  cohort        Cohort?      @relation(fields: [cohortId], references: [id])
  enrollments   Enrollment[]
  submissions   Submission[]
  certificates  Certificate[]
  bookmarks     Bookmark[]
  notes         Note[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}
```

**Checklist**:
- [ ] Add new fields to User model
- [ ] Add all relation fields
- [ ] Verify existing User fields are preserved

---

### Step 2: Define All LMS Models

**Task**: Add all 11 models to Prisma schema

**Action**:
1. Open `prisma/schema.prisma`
2. Add each model from the schema design above
3. Ensure proper relations and cascading deletes
4. Add indexes where needed

**Key Points**:
- Use `@default(cuid())` for IDs
- Use `onDelete: Cascade` for dependent records
- Add `@@unique` constraints for composite keys
- Include `createdAt` and `updatedAt` timestamps

**Checklist**:
- [ ] Course model defined
- [ ] Module model defined
- [ ] Lesson model defined
- [ ] Enrollment model defined
- [ ] Progress model defined
- [ ] Assignment model defined
- [ ] Submission model defined
- [ ] Certificate model defined
- [ ] Cohort model defined
- [ ] Bookmark model defined
- [ ] Note model defined

---

### Step 3: Create Initial Migration

**Task**: Generate first migration with all LMS tables

**Commands**:
```bash
# Generate migration
npx prisma migrate dev --name init_with_lms

# This will:
# 1. Create migration file in prisma/migrations/
# 2. Apply migration to database
# 3. Generate Prisma Client
```

**Verify**:
```bash
# Check migration was created
ls prisma/migrations/

# Should see folder like: 20250113_init_with_lms/
```

**Checklist**:
- [ ] Migration file created
- [ ] Migration applied successfully
- [ ] No errors in terminal
- [ ] Prisma Client regenerated

---

### Step 4: Add Certificates Migration

**Task**: Ensure Certificate model is properly migrated

**Note**: If certificates were included in Step 3, this might be a no-op. Otherwise:

```bash
npx prisma migrate dev --name add_certificates
```

**Checklist**:
- [ ] Certificate table exists in database
- [ ] Relations to User and Course working

---

### Step 5: Add Elite Cohort Migration

**Task**: Add elite cohort functionality

**Note**: The `isElite` field should already be in Cohort model. Verify:

```bash
# Check if field exists
npx prisma studio
# Navigate to Cohort model and check for isElite field
```

If missing:
```bash
npx prisma migrate dev --name add_elite_cohort_model
```

**Checklist**:
- [ ] isElite field exists in Cohort model
- [ ] Can filter cohorts by elite status

---

### Step 6: Verify Database Tables

**Task**: Confirm all tables created correctly

**Method 1: Prisma Studio**
```bash
npx prisma studio
```

Navigate to each model and verify:
- [ ] Course table
- [ ] Module table
- [ ] Lesson table
- [ ] Enrollment table
- [ ] Progress table
- [ ] Assignment table
- [ ] Submission table
- [ ] Certificate table
- [ ] Cohort table
- [ ] Bookmark table
- [ ] Note table
- [ ] User table (with new fields)

**Method 2: SQLite CLI** (if using SQLite)
```bash
sqlite3 prisma/dev.db ".tables"
```

Should show all model tables.

---

### Step 7: Write Seed Script

**Task**: Create comprehensive seed data for development

**File**: `prisma/seed.ts`

**Structure**:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean existing data (development only)
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.course.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cohort.deleteMany();

  // 2. Create test cohort
  const cohort = await prisma.cohort.create({
    data: {
      name: 'Class #13',
      description: 'Elite cohort for advanced veterans',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-07-15'),
      isElite: true,
    },
  });

  // 3. Create test users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@vetswhocode.io',
      name: 'Admin User',
      role: 'admin',
      cohortId: cohort.id,
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@vetswhocode.io',
      name: 'Student User',
      role: 'user',
      cohortId: cohort.id,
    },
  });

  // 4. Create course
  const webDevCourse = await prisma.course.create({
    data: {
      title: 'Web Development Fundamentals',
      description: 'Complete web development course covering HTML, CSS, JavaScript, React, and Node.js',
      category: 'Web Development',
      difficulty: 'BEGINNER',
      estimatedHours: 120,
      prerequisites: [],
      tags: ['html', 'css', 'javascript', 'react', 'nodejs'],
      isPublished: true,
      imageUrl: '/images/courses/web-dev.jpg',
    },
  });

  // 5. Create modules with lessons
  const htmlModule = await prisma.module.create({
    data: {
      title: 'HTML Fundamentals',
      description: 'Learn the building blocks of web pages',
      order: 1,
      courseId: webDevCourse.id,
      lessons: {
        create: [
          {
            title: 'Introduction to HTML',
            description: 'Understanding HTML structure and syntax',
            content: '# Introduction to HTML\n\nHTML (HyperText Markup Language)...',
            type: 'CONTENT',
            order: 1,
            duration: 30,
          },
          {
            title: 'HTML Elements and Tags',
            description: 'Common HTML elements',
            content: '# HTML Elements\n\nLearn about headings, paragraphs, links...',
            type: 'CONTENT',
            order: 2,
            duration: 45,
          },
          {
            title: 'HTML Forms',
            description: 'Creating interactive forms',
            videoUrl: 'https://www.youtube.com/watch?v=example',
            type: 'VIDEO',
            order: 3,
            duration: 60,
          },
          {
            title: 'HTML Practice Exercise',
            description: 'Build your first HTML page',
            content: '# Exercise\n\nCreate a personal profile page...',
            type: 'EXERCISE',
            order: 4,
            duration: 90,
          },
        ],
      },
    },
  });

  const cssModule = await prisma.module.create({
    data: {
      title: 'CSS Fundamentals',
      description: 'Style your web pages with CSS',
      order: 2,
      courseId: webDevCourse.id,
      lessons: {
        create: [
          {
            title: 'Introduction to CSS',
            description: 'CSS syntax and selectors',
            type: 'CONTENT',
            order: 1,
            duration: 30,
          },
          {
            title: 'CSS Box Model',
            description: 'Understanding margin, padding, border',
            type: 'VIDEO',
            order: 2,
            duration: 45,
          },
          {
            title: 'CSS Flexbox',
            description: 'Modern layout with Flexbox',
            type: 'CONTENT',
            order: 3,
            duration: 60,
          },
          {
            title: 'CSS Grid',
            description: 'Advanced layouts with Grid',
            type: 'VIDEO',
            order: 4,
            duration: 60,
          },
          {
            title: 'CSS Practice Project',
            description: 'Style your HTML page',
            type: 'PROJECT',
            order: 5,
            duration: 120,
          },
        ],
      },
    },
  });

  // Add 7 more modules (JavaScript, React, Node.js, etc.)
  // ... (abbreviated for brevity)

  // 6. Create assignments
  const assignments = await Promise.all([
    prisma.assignment.create({
      data: {
        title: 'HTML Portfolio Page',
        description: 'Create a personal portfolio page using semantic HTML',
        courseId: webDevCourse.id,
        dueDate: new Date('2025-02-01'),
        maxPoints: 100,
      },
    }),
    prisma.assignment.create({
      data: {
        title: 'CSS Styled Calculator',
        description: 'Build a calculator UI using CSS Grid/Flexbox',
        courseId: webDevCourse.id,
        dueDate: new Date('2025-03-01'),
        maxPoints: 100,
      },
    }),
    prisma.assignment.create({
      data: {
        title: 'JavaScript Todo App',
        description: 'Create an interactive todo application',
        courseId: webDevCourse.id,
        dueDate: new Date('2025-04-01'),
        maxPoints: 150,
      },
    }),
    prisma.assignment.create({
      data: {
        title: 'Full Stack Blog',
        description: 'Build a blog with React frontend and Node.js backend',
        courseId: webDevCourse.id,
        dueDate: new Date('2025-06-01'),
        maxPoints: 200,
      },
    }),
  ]);

  // 7. Create enrollment for student
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: studentUser.id,
      courseId: webDevCourse.id,
      status: 'ACTIVE',
      progress: 0,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log({
    cohort,
    users: { admin: adminUser.email, student: studentUser.email },
    course: webDevCourse.title,
    modulesCount: 2, // Update with actual count
    lessonsCount: 9, // Update with actual count
    assignmentsCount: assignments.length,
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Package.json Configuration**:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

**Checklist**:
- [ ] seed.ts file created
- [ ] Includes 1 course
- [ ] Includes 9 modules (add 7 more)
- [ ] Includes 39 lessons (add 30 more)
- [ ] Includes 4 assignments
- [ ] Includes test users (admin, student)
- [ ] Includes test cohort
- [ ] package.json configured

---

### Step 8: Run Seed Script

**Commands**:
```bash
# Install ts-node if not present
npm install -D ts-node

# Run seed
npx prisma db seed
```

**Expected Output**:
```
🌱 Starting seed...
✅ Seed completed successfully!
{
  cohort: { id: 'xxx', name: 'Class #13' },
  users: {
    admin: 'admin@vetswhocode.io',
    student: 'student@vetswhocode.io'
  },
  course: 'Web Development Fundamentals',
  modulesCount: 9,
  lessonsCount: 39,
  assignmentsCount: 4
}
```

**Verification**:
```bash
# Open Prisma Studio
npx prisma studio

# Check:
# - 1 Course record
# - 9 Module records
# - 39 Lesson records
# - 4 Assignment records
# - 2 User records
# - 1 Cohort record
# - 1 Enrollment record
```

**Checklist**:
- [ ] Seed runs without errors
- [ ] All records created
- [ ] Data visible in Prisma Studio
- [ ] Relations working correctly

---

### Step 9: Create Prisma Client Utility

**Task**: Create singleton Prisma client for API routes

**File**: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

**Usage in API Routes**:
```typescript
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const courses = await prisma.course.findMany();
  res.json(courses);
}
```

**Checklist**:
- [ ] File created at `src/lib/prisma.ts`
- [ ] Singleton pattern implemented
- [ ] Logging configured for development
- [ ] Can import in API routes

---

### Step 10: Create RBAC Middleware

**Task**: Role-based access control for API routes

**File**: `src/lib/rbac.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export type Role = 'user' | 'instructor' | 'admin';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

/**
 * Require authentication for API route
 */
export function requireAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role as Role,
    };

    return handler(req, res);
  };
}

/**
 * Require specific role(s) for API route
 */
export function requireRole(roles: Role | Role[]) {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
    return requireAuth(async (req, res) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      return handler(req, res);
    });
  };
}

/**
 * Check if user has specific role
 */
export function hasRole(userRole: Role, requiredRoles: Role | Role[]): boolean {
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return required.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: Role): boolean {
  return userRole === 'admin';
}

/**
 * Check if user is instructor or admin
 */
export function isInstructorOrAdmin(userRole: Role): boolean {
  return ['instructor', 'admin'].includes(userRole);
}
```

**Usage Examples**:
```typescript
// Require any authenticated user
export default requireAuth(async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
});

// Require admin role
export default requireRole('admin')(async (req, res) => {
  await prisma.course.create({ data: req.body });
  res.json({ success: true });
});

// Require instructor or admin
export default requireRole(['instructor', 'admin'])(async (req, res) => {
  await prisma.assignment.create({ data: req.body });
  res.json({ success: true });
});
```

**Checklist**:
- [ ] File created at `src/lib/rbac.ts`
- [ ] requireAuth function implemented
- [ ] requireRole function implemented
- [ ] Helper functions (hasRole, isAdmin, etc.)
- [ ] TypeScript types defined

---

### Step 11: Configure NextAuth

**Task**: Setup authentication with GitHub OAuth

**File**: `src/pages/api/auth/[...nextauth].ts`

**Prerequisites**:
```bash
# Install dependencies
npm install next-auth @next-auth/prisma-adapter
```

**GitHub OAuth Setup**:
1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate Client Secret

**Environment Variables**:
```env
# .env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

**Implementation**:
```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
```

**TypeScript Types**:

**File**: `src/types/next-auth.d.ts`
```typescript
import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
```

**Prisma Schema Update**:
```prisma
// Add NextAuth models
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  // ... existing fields
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

**Migration**:
```bash
npx prisma migrate dev --name add_nextauth_models
```

**Checklist**:
- [ ] NextAuth installed
- [ ] GitHub OAuth app created
- [ ] Environment variables set
- [ ] [...nextauth].ts configured
- [ ] TypeScript types created
- [ ] Prisma schema updated
- [ ] Migration applied
- [ ] Can sign in with GitHub

---

## Verification Steps

### Complete Verification Checklist

Run through these steps to ensure Phase 1 is complete:

#### Database Verification

```bash
# 1. Check all tables exist
npx prisma studio
```

Verify tables:
- [ ] User (with role, cohortId)
- [ ] Cohort
- [ ] Course
- [ ] Module
- [ ] Lesson
- [ ] Enrollment
- [ ] Progress
- [ ] Assignment
- [ ] Submission
- [ ] Certificate
- [ ] Bookmark
- [ ] Note
- [ ] Account (NextAuth)
- [ ] Session (NextAuth)
- [ ] VerificationToken (NextAuth)

#### Seed Data Verification

Check in Prisma Studio:
- [ ] 1 Course record exists
- [ ] 9 Module records exist
- [ ] 39 Lesson records exist
- [ ] 4 Assignment records exist
- [ ] 2 User records exist (admin, student)
- [ ] 1 Cohort record exists
- [ ] 1 Enrollment record exists

#### File Structure Verification

```bash
# Check all files created
ls -la src/lib/
ls -la prisma/
```

Files should exist:
- [ ] `src/lib/prisma.ts`
- [ ] `src/lib/rbac.ts`
- [ ] `src/pages/api/auth/[...nextauth].ts`
- [ ] `src/types/next-auth.d.ts`
- [ ] `prisma/schema.prisma` (updated)
- [ ] `prisma/seed.ts`
- [ ] `prisma/migrations/` (with migration files)

#### Authentication Verification

```bash
# Start dev server
npm run dev
```

Test:
- [ ] Navigate to http://localhost:3000
- [ ] Click "Sign In" (or navigate to /api/auth/signin)
- [ ] GitHub OAuth flow works
- [ ] User is redirected back after auth
- [ ] Session persists on refresh

#### API Route Test

Create test file: `src/pages/api/courses/index.ts`

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });

  res.json({
    user: req.user,
    courses,
  });
});
```

Test:
```bash
# Should return 401 without auth
curl http://localhost:3000/api/courses

# Sign in via browser, then test with session
# Should return courses data
```

- [ ] Unauthorized request returns 401
- [ ] Authenticated request returns data
- [ ] User info attached to request
- [ ] Prisma queries work

---

## Troubleshooting

### Common Issues

#### 1. Migration Fails

**Error**: `Foreign key constraint failed`

**Solution**:
```bash
# Reset database (development only!)
npx prisma migrate reset

# Re-run migrations
npx prisma migrate dev
```

#### 2. Seed Script Fails

**Error**: `Cannot find module 'ts-node'`

**Solution**:
```bash
npm install -D ts-node @types/node
```

**Error**: `Unique constraint failed`

**Solution**: The seed script is trying to create duplicate data. Run:
```bash
npx prisma migrate reset --skip-seed
npx prisma db seed
```

#### 3. Prisma Client Not Found

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npm install @prisma/client
npx prisma generate
```

#### 4. NextAuth Session Not Working

**Error**: Session is null

**Checklist**:
- [ ] NEXTAUTH_URL set correctly in .env
- [ ] NEXTAUTH_SECRET is set (generate with: `openssl rand -base64 32`)
- [ ] GitHub OAuth credentials correct
- [ ] Callback URL matches in GitHub app settings
- [ ] NextAuth models in Prisma schema
- [ ] Migration applied for NextAuth tables

#### 5. RBAC Middleware Not Working

**Error**: `req.user is undefined`

**Solution**: Ensure getServerSession is called and authOptions are imported:
```typescript
import { authOptions } from '@/pages/api/auth/[...nextauth]';
const session = await getServerSession(req, res, authOptions);
```

#### 6. TypeScript Errors

**Error**: Property 'role' does not exist on type 'User'

**Solution**:
- Ensure `src/types/next-auth.d.ts` exists
- Restart TypeScript server in VS Code: Cmd+Shift+P > "TypeScript: Restart TS Server"

---

## Next Steps

Once Phase 1 is complete, proceed to:

### Phase 2: Core API Endpoints (Week 3-4)
- Course CRUD endpoints
- Enrollment endpoints
- Progress tracking endpoints
- Assignment submission endpoints

### Phase 3: Frontend Components (Week 5-6)
- Course catalog UI
- Course detail pages
- Lesson viewer
- Progress dashboard

### Phase 4: Advanced Features (Week 7-8)
- Certificate generation
- Cohort management
- Bookmarks and notes
- Search and filtering

---

## Resources

### Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [SQLite Browser](https://sqlitebrowser.org) - SQLite database viewer

### Code Examples
- Check existing codebase in `/src/pages/api/` for API patterns
- Reference similar projects for NextAuth integration

---

## Completion Criteria

Phase 1 is complete when:

- ✅ All 11 LMS models defined in Prisma schema
- ✅ Migrations applied successfully
- ✅ Database verified in Prisma Studio
- ✅ Seed script runs and populates test data
- ✅ Prisma client utility created
- ✅ RBAC middleware implemented
- ✅ NextAuth configured with GitHub OAuth
- ✅ Test API route works with authentication
- ✅ All verification steps pass

**Sign-off**: Review this checklist with your team before proceeding to Phase 2.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-13
**Author**: VetsWhoCode Development Team
