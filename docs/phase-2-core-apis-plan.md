# Phase 2: Core LMS APIs Implementation Plan

**Timeline**: Week 3-4
**Status**: Planning
**Last Updated**: 2025-11-13

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [API Endpoints Overview](#api-endpoints-overview)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Offline Sync Strategy](#offline-sync-strategy)
6. [Testing Guide](#testing-guide)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

---

## Overview

This phase builds on the Phase 1 foundation by implementing the core API endpoints for the VetsWhoCode Learning Management System. We'll create RESTful APIs for course management, enrollment, and progress tracking, with offline sync capabilities.

### Goals

- [ ] Complete course management APIs (GET/POST/PUT/DELETE)
- [ ] Implement enrollment system endpoints
- [ ] Build progress tracking with real-time updates
- [ ] Add offline sync for progress using localStorage
- [ ] Implement proper error handling and validation
- [ ] Add comprehensive API documentation

### Success Criteria

- All API endpoints respond with proper status codes
- Course filtering and pagination work correctly
- Enrollment system handles duplicate enrollments gracefully
- Progress updates sync correctly online and offline
- API routes are protected with proper authentication/authorization
- All endpoints tested and documented

---

## Prerequisites

### Phase 1 Completion

Ensure Phase 1 is complete before starting:

- [x] Database schema with all LMS models
- [x] Prisma client utility (`src/lib/prisma.ts`)
- [x] RBAC middleware (`src/lib/rbac.ts`)
- [x] NextAuth authentication configured
- [x] Seed data populated

### Verification

```bash
# Verify database is set up
npx prisma studio

# Check for required utility files
ls src/lib/prisma.ts src/lib/rbac.ts

# Verify NextAuth is working
# Navigate to http://localhost:3000/api/auth/signin
```

---

## API Endpoints Overview

### Course APIs

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/courses` | List all courses with filters | Yes | Any |
| POST | `/api/courses` | Create new course | Yes | Admin/Instructor |
| GET | `/api/courses/[courseId]` | Get course details | Yes | Any |
| PUT | `/api/courses/[courseId]` | Update course | Yes | Admin/Instructor |
| DELETE | `/api/courses/[courseId]` | Delete course | Yes | Admin |

### Enrollment APIs

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/enrollment/enroll` | Enroll in course | Yes | Any |
| GET | `/api/enrollment/status` | Check enrollment status | Yes | Any |
| GET | `/api/enrollment` | Get user's enrollments | Yes | Any |

### Progress APIs

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/progress` | Get progress for enrollment | Yes | Any |
| POST | `/api/progress` | Update lesson progress | Yes | Any |

---

## Step-by-Step Implementation

### Step 1: Implement GET `/api/courses`

**Task**: List all courses with filtering, pagination, and counts

**File**: `src/pages/api/courses/index.ts`

**Features**:
- Filter by category, difficulty, published status
- Pagination support (limit, offset)
- Include counts (modules, lessons, enrollments)
- Search by title/description

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      category,
      difficulty,
      isPublished,
      search,
      limit = '10',
      offset = '0',
    } = req.query;

    // Build where clause
    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (difficulty) {
      where.difficulty = difficulty as string;
    }

    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Get courses with counts
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              modules: true,
              enrollments: true,
              assignments: true,
            },
          },
        },
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    // Calculate total lessons for each course
    const coursesWithCounts = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await prisma.lesson.count({
          where: {
            module: {
              courseId: course.id,
            },
          },
        });

        return {
          ...course,
          _count: {
            ...course._count,
            lessons: lessonCount,
          },
        };
      })
    );

    res.json({
      courses: coursesWithCounts,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        hasMore: parseInt(offset as string) + courses.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});
```

**Checklist**:
- [ ] File created at `src/pages/api/courses/index.ts`
- [ ] GET method implemented
- [ ] Filtering by category, difficulty, isPublished works
- [ ] Search functionality works
- [ ] Pagination implemented
- [ ] Counts for modules, lessons, enrollments included
- [ ] Error handling added
- [ ] Authentication required

**Testing**:
```bash
# Get all published courses
curl http://localhost:3000/api/courses?isPublished=true

# Filter by category
curl http://localhost:3000/api/courses?category=Web%20Development

# Search courses
curl http://localhost:3000/api/courses?search=javascript

# Pagination
curl http://localhost:3000/api/courses?limit=5&offset=0
```

---

### Step 2: Implement POST `/api/courses`

**Task**: Create new course (Admin/Instructor only)

**Update**: `src/pages/api/courses/index.ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
  // ... existing GET implementation from Step 1
}

async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedHours,
      prerequisites = [],
      tags = [],
      isPublished = false,
      imageUrl,
    } = req.body;

    // Validation
    if (!title || !description || !category || !difficulty) {
      return res.status(400).json({
        error: 'Missing required fields: title, description, category, difficulty',
      });
    }

    if (!['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty level. Must be BEGINNER, INTERMEDIATE, or ADVANCED',
      });
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        difficulty,
        estimatedHours: estimatedHours || 0,
        prerequisites,
        tags,
        isPublished,
        imageUrl,
      },
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true,
            assignments: true,
          },
        },
      },
    });

    res.status(201).json({ course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      // Only admins and instructors can create courses
      return requireRole(['admin', 'instructor'])(handlePost)(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
```

**Checklist**:
- [ ] POST method added to courses endpoint
- [ ] Input validation implemented
- [ ] Only admin/instructor can create courses
- [ ] Returns 201 status on success
- [ ] Error handling for invalid data
- [ ] Tests pass

**Testing**:
```bash
# Create new course (requires admin/instructor role)
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced JavaScript",
    "description": "Deep dive into JavaScript",
    "category": "Programming",
    "difficulty": "ADVANCED",
    "estimatedHours": 40,
    "tags": ["javascript", "es6", "async"],
    "isPublished": true
  }'
```

---

### Step 3: Implement GET/PUT/DELETE `/api/courses/[courseId]`

**Task**: Single course operations

**File**: `src/pages/api/courses/[courseId].ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, requireRole, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

async function handleGet(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  courseId: string
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        assignments: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            enrollments: true,
            certificates: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

async function handlePut(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  courseId: string
) {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedHours,
      prerequisites,
      tags,
      isPublished,
      imageUrl,
    } = req.body;

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update course
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(difficulty && { difficulty }),
        ...(estimatedHours !== undefined && { estimatedHours }),
        ...(prerequisites && { prerequisites }),
        ...(tags && { tags }),
        ...(isPublished !== undefined && { isPublished }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true,
            assignments: true,
          },
        },
      },
    });

    res.json({ course });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
}

async function handleDelete(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  courseId: string
) {
  try {
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Warn if course has enrollments
    if (existingCourse._count.enrollments > 0) {
      return res.status(400).json({
        error: `Cannot delete course with ${existingCourse._count.enrollments} active enrollments`,
      });
    }

    // Delete course (cascades to modules, lessons, etc.)
    await prisma.course.delete({
      where: { id: courseId },
    });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { courseId } = req.query;

  if (!courseId || typeof courseId !== 'string') {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, courseId);
    case 'PUT':
      return requireRole(['admin', 'instructor'])(
        (req, res) => handlePut(req, res, courseId)
      )(req, res);
    case 'DELETE':
      return requireRole('admin')(
        (req, res) => handleDelete(req, res, courseId)
      )(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
```

**Checklist**:
- [ ] GET method returns full course with modules and lessons
- [ ] PUT method updates course (admin/instructor only)
- [ ] DELETE method deletes course (admin only)
- [ ] Prevents deletion of courses with enrollments
- [ ] Returns 404 for non-existent courses
- [ ] Proper error handling

**Testing**:
```bash
# Get course details
curl http://localhost:3000/api/courses/{courseId}

# Update course
curl -X PUT http://localhost:3000/api/courses/{courseId} \
  -H "Content-Type: application/json" \
  -d '{"isPublished": true}'

# Delete course (admin only)
curl -X DELETE http://localhost:3000/api/courses/{courseId}
```

---

### Step 4: Implement POST `/api/enrollment/enroll`

**Task**: Enroll user in a course

**File**: `src/pages/api/enrollment/enroll.ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId } = req.body;
    const userId = req.user!.id;

    // Validation
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!course.isPublished) {
      return res.status(400).json({ error: 'Course is not published' });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return res.status(400).json({
        error: 'Already enrolled in this course',
        enrollment: existingEnrollment,
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'ACTIVE',
        progress: 0,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
      },
    });

    res.status(201).json({ enrollment });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});
```

**Checklist**:
- [ ] File created at `src/pages/api/enrollment/enroll.ts`
- [ ] Validates course exists and is published
- [ ] Prevents duplicate enrollments
- [ ] Creates enrollment record
- [ ] Returns 201 on success
- [ ] Error handling

**Testing**:
```bash
# Enroll in course
curl -X POST http://localhost:3000/api/enrollment/enroll \
  -H "Content-Type: application/json" \
  -d '{"courseId": "{courseId}"}'

# Try to enroll again (should fail)
curl -X POST http://localhost:3000/api/enrollment/enroll \
  -H "Content-Type: application/json" \
  -d '{"courseId": "{courseId}"}'
```

---

### Step 5: Implement GET `/api/enrollment/status`

**Task**: Check enrollment status for a course

**File**: `src/pages/api/enrollment/status.ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId } = req.query;
    const userId = req.user!.id;

    if (!courseId || typeof courseId !== 'string') {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
    });
  } catch (error) {
    console.error('Error checking enrollment status:', error);
    res.status(500).json({ error: 'Failed to check enrollment status' });
  }
});
```

**Checklist**:
- [ ] File created at `src/pages/api/enrollment/status.ts`
- [ ] Returns enrollment status
- [ ] Handles non-enrolled users
- [ ] Error handling

**Testing**:
```bash
# Check enrollment status
curl http://localhost:3000/api/enrollment/status?courseId={courseId}
```

---

### Step 6: Implement GET `/api/enrollment`

**Task**: Get all enrollments for current user

**File**: `src/pages/api/enrollment/index.ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user!.id;
    const { status } = req.query;

    // Build where clause
    const where: any = { userId };

    if (status) {
      where.status = status as string;
    }

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        course: {
          include: {
            _count: {
              select: {
                modules: true,
              },
            },
          },
        },
        progressRecords: {
          where: { completed: true },
          select: { id: true },
        },
      },
      orderBy: { startedAt: 'desc' },
    });

    // Calculate total lessons for each course
    const enrollmentsWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons = await prisma.lesson.count({
          where: {
            module: {
              courseId: enrollment.courseId,
            },
          },
        });

        const completedLessons = enrollment.progressRecords.length;

        return {
          ...enrollment,
          stats: {
            totalLessons,
            completedLessons,
            progressPercentage:
              totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
          },
        };
      })
    );

    res.json({ enrollments: enrollmentsWithProgress });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});
```

**Checklist**:
- [ ] File created at `src/pages/api/enrollment/index.ts`
- [ ] Returns all user enrollments
- [ ] Includes progress statistics
- [ ] Filter by status
- [ ] Error handling

**Testing**:
```bash
# Get all enrollments
curl http://localhost:3000/api/enrollment

# Filter by status
curl http://localhost:3000/api/enrollment?status=ACTIVE
```

---

### Step 7: Implement GET `/api/progress`

**Task**: Get progress for an enrollment

**File**: `src/pages/api/progress/index.ts`

**Implementation**:

```typescript
import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import prisma from '@/lib/prisma';

async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { enrollmentId } = req.query;
    const userId = req.user!.id;

    if (!enrollmentId || typeof enrollmentId !== 'string') {
      return res.status(400).json({ error: 'Enrollment ID is required' });
    }

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get all progress records
    const progressRecords = await prisma.progress.findMany({
      where: { enrollmentId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    // Create progress map
    const progressMap = new Map(
      progressRecords.map((p) => [p.lessonId, p])
    );

    // Build response with progress
    const modulesWithProgress = enrollment.course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        progress: progressMap.get(lesson.id) || null,
      })),
    }));

    res.json({
      enrollment: {
        ...enrollment,
        course: {
          ...enrollment.course,
          modules: modulesWithProgress,
        },
      },
      progressRecords,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
});
```

**Checklist**:
- [ ] File created at `src/pages/api/progress/index.ts`
- [ ] GET method implemented
- [ ] Verifies enrollment ownership
- [ ] Returns progress for all lessons
- [ ] Error handling

**Testing**:
```bash
# Get progress for enrollment
curl http://localhost:3000/api/progress?enrollmentId={enrollmentId}
```

---

### Step 8: Implement POST `/api/progress`

**Task**: Update lesson progress

**Update**: `src/pages/api/progress/index.ts`

**Implementation**:

```typescript
async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const { enrollmentId, lessonId, completed, timeSpent } = req.body;
    const userId = req.user!.id;

    // Validation
    if (!enrollmentId || !lessonId) {
      return res.status(400).json({
        error: 'Enrollment ID and Lesson ID are required',
      });
    }

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Upsert progress record
    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId,
          lessonId,
        },
      },
      update: {
        completed: completed ?? undefined,
        completedAt: completed ? new Date() : undefined,
        timeSpent: timeSpent ?? undefined,
      },
      create: {
        enrollmentId,
        lessonId,
        completed: completed ?? false,
        completedAt: completed ? new Date() : null,
        timeSpent: timeSpent ?? 0,
      },
    });

    // Update enrollment progress percentage
    const totalLessons = await prisma.lesson.count({
      where: {
        module: {
          courseId: enrollment.courseId,
        },
      },
    });

    const completedLessons = await prisma.progress.count({
      where: {
        enrollmentId,
        completed: true,
      },
    });

    const progressPercentage =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress: progressPercentage,
        lastAccessedAt: new Date(),
        ...(progressPercentage === 100 && !enrollment.completedAt
          ? { completedAt: new Date(), status: 'COMPLETED' }
          : {}),
      },
    });

    res.json({
      progress,
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
});
```

**Checklist**:
- [ ] POST method added
- [ ] Validates enrollment ownership
- [ ] Updates progress record
- [ ] Updates enrollment progress percentage
- [ ] Marks enrollment as completed when 100%
- [ ] Error handling

**Testing**:
```bash
# Mark lesson as completed
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -d '{
    "enrollmentId": "{enrollmentId}",
    "lessonId": "{lessonId}",
    "completed": true,
    "timeSpent": 45
  }'
```

---

### Step 9: Add Offline Sync for Progress

**Task**: Implement localStorage fallback for offline progress tracking

**File**: `src/lib/offline-sync.ts`

**Implementation**:

```typescript
export interface OfflineProgress {
  enrollmentId: string;
  lessonId: string;
  completed: boolean;
  timeSpent: number;
  timestamp: number;
}

const STORAGE_KEY = 'vwc_offline_progress';

/**
 * Save progress to localStorage when offline
 */
export function saveOfflineProgress(progress: Omit<OfflineProgress, 'timestamp'>): void {
  try {
    const offlineQueue = getOfflineQueue();

    // Add timestamp
    const progressWithTimestamp: OfflineProgress = {
      ...progress,
      timestamp: Date.now(),
    };

    // Check if this lesson progress already exists in queue
    const existingIndex = offlineQueue.findIndex(
      (p) => p.enrollmentId === progress.enrollmentId && p.lessonId === progress.lessonId
    );

    if (existingIndex >= 0) {
      // Update existing record
      offlineQueue[existingIndex] = progressWithTimestamp;
    } else {
      // Add new record
      offlineQueue.push(progressWithTimestamp);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(offlineQueue));
  } catch (error) {
    console.error('Failed to save offline progress:', error);
  }
}

/**
 * Get all offline progress records
 */
export function getOfflineQueue(): OfflineProgress[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get offline queue:', error);
    return [];
  }
}

/**
 * Clear offline progress queue
 */
export function clearOfflineQueue(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear offline queue:', error);
  }
}

/**
 * Sync offline progress to server
 */
export async function syncOfflineProgress(): Promise<{
  success: number;
  failed: number;
  errors: any[];
}> {
  const queue = getOfflineQueue();

  if (queue.length === 0) {
    return { success: 0, failed: 0, errors: [] };
  }

  const results = {
    success: 0,
    failed: 0,
    errors: [] as any[],
  };

  // Process each progress record
  for (const progress of queue) {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollmentId: progress.enrollmentId,
          lessonId: progress.lessonId,
          completed: progress.completed,
          timeSpent: progress.timeSpent,
        }),
      });

      if (response.ok) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({
          progress,
          error: await response.text(),
        });
      }
    } catch (error) {
      results.failed++;
      results.errors.push({ progress, error });
    }
  }

  // Clear queue if all synced successfully
  if (results.failed === 0) {
    clearOfflineQueue();
  }

  return results;
}

/**
 * Check if browser is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}
```

**Client-side Hook**: `src/hooks/useOfflineProgress.ts`

```typescript
import { useEffect, useState } from 'react';
import {
  saveOfflineProgress,
  syncOfflineProgress,
  getOfflineQueue,
  isOnline,
} from '@/lib/offline-sync';

export function useOfflineProgress() {
  const [pendingSync, setPendingSync] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Update pending count
    const updatePendingCount = () => {
      setPendingSync(getOfflineQueue().length);
    };

    updatePendingCount();

    // Auto-sync when coming online
    const handleOnline = async () => {
      if (getOfflineQueue().length > 0) {
        await handleSync();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('storage', updatePendingCount);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('storage', updatePendingCount);
    };
  }, []);

  const updateProgress = async (
    enrollmentId: string,
    lessonId: string,
    completed: boolean,
    timeSpent: number
  ) => {
    if (!isOnline()) {
      // Save offline
      saveOfflineProgress({
        enrollmentId,
        lessonId,
        completed,
        timeSpent,
      });
      setPendingSync(getOfflineQueue().length);
      return { offline: true };
    }

    // Try to sync online
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollmentId,
          lessonId,
          completed,
          timeSpent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      return await response.json();
    } catch (error) {
      // Fallback to offline
      saveOfflineProgress({
        enrollmentId,
        lessonId,
        completed,
        timeSpent,
      });
      setPendingSync(getOfflineQueue().length);
      return { offline: true, error };
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const results = await syncOfflineProgress();
      setPendingSync(getOfflineQueue().length);
      return results;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    updateProgress,
    syncOfflineProgress: handleSync,
    pendingSync,
    isSyncing,
    isOnline: isOnline(),
  };
}
```

**Checklist**:
- [ ] File created at `src/lib/offline-sync.ts`
- [ ] Hook created at `src/hooks/useOfflineProgress.ts`
- [ ] Saves progress to localStorage when offline
- [ ] Auto-syncs when coming online
- [ ] Shows pending sync count
- [ ] Handles sync errors gracefully

**Testing**:
```typescript
// In a React component
import { useOfflineProgress } from '@/hooks/useOfflineProgress';

function LessonViewer({ enrollmentId, lessonId }) {
  const { updateProgress, pendingSync, isOnline } = useOfflineProgress();

  const markComplete = async () => {
    await updateProgress(enrollmentId, lessonId, true, 45);
  };

  return (
    <div>
      {!isOnline && <p>Offline mode - {pendingSync} pending syncs</p>}
      <button onClick={markComplete}>Mark Complete</button>
    </div>
  );
}
```

---

## Offline Sync Strategy

### How It Works

1. **Online**: Progress updates sent directly to API
2. **Offline**: Progress saved to localStorage
3. **Coming Online**: Auto-sync queued progress
4. **Manual Sync**: User can trigger sync manually

### Data Flow

```
User Action (Mark Complete)
    ↓
Check if Online
    ├─ Yes → POST /api/progress
    │         ├─ Success → Update UI
    │         └─ Fail → Save to localStorage
    └─ No → Save to localStorage
              ↓
         Show "Pending Sync" indicator
              ↓
         Browser comes online
              ↓
         Auto-sync localStorage → API
              ↓
         Clear localStorage
```

### Storage Format

```json
[
  {
    "enrollmentId": "clx123",
    "lessonId": "clx456",
    "completed": true,
    "timeSpent": 45,
    "timestamp": 1699564800000
  }
]
```

---

## Testing Guide

### Manual Testing Checklist

#### Course APIs
- [ ] List courses with no filters
- [ ] Filter by category
- [ ] Filter by difficulty
- [ ] Search by title
- [ ] Pagination works
- [ ] Create course as admin
- [ ] Create course as user (should fail)
- [ ] Update course
- [ ] Delete course without enrollments
- [ ] Delete course with enrollments (should fail)

#### Enrollment APIs
- [ ] Enroll in published course
- [ ] Enroll in unpublished course (should fail)
- [ ] Duplicate enrollment (should fail)
- [ ] Check enrollment status
- [ ] List all enrollments

#### Progress APIs
- [ ] Get progress for enrollment
- [ ] Update lesson progress
- [ ] Mark lesson complete
- [ ] Verify enrollment progress percentage updates
- [ ] Verify enrollment completion at 100%

#### Offline Sync
- [ ] Mark lesson complete while online
- [ ] Go offline (disable network in DevTools)
- [ ] Mark lesson complete while offline
- [ ] Check localStorage has pending progress
- [ ] Go online
- [ ] Verify auto-sync occurs
- [ ] Check localStorage is cleared

### Automated Testing

Create test file: `__tests__/api/courses.test.ts`

```typescript
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/courses/index';

describe('/api/courses', () => {
  it('returns courses list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('courses');
  });

  it('creates course with admin role', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Test Course',
        description: 'Test Description',
        category: 'Test',
        difficulty: 'BEGINNER',
      },
    });

    // Mock authenticated admin user
    req.user = { id: '1', role: 'admin' };

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
  });
});
```

---

## Troubleshooting

### Common Issues

#### 1. 401 Unauthorized on API Calls

**Cause**: Not authenticated

**Solution**:
- Ensure you're signed in via NextAuth
- Check session in browser DevTools: `Application > Cookies`
- Verify NEXTAUTH_SECRET is set

#### 2. Progress Not Syncing Offline

**Cause**: localStorage disabled or full

**Solution**:
```javascript
// Check localStorage availability
if (typeof window !== 'undefined' && window.localStorage) {
  // localStorage available
} else {
  // Fallback to memory storage or disable offline mode
}
```

#### 3. Enrollment Progress Not Updating

**Cause**: Progress calculation logic error

**Solution**:
```bash
# Check progress records in database
npx prisma studio

# Manually recalculate
# Run SQL query or create admin endpoint to recalculate all progress
```

#### 4. CORS Errors

**Cause**: Next.js API routes don't need CORS, but check for:

**Solution**:
- Ensure you're calling from same domain
- Check for middleware blocking requests

---

## Next Steps

Once Phase 2 is complete, proceed to:

### Phase 3: Frontend Components (Week 5-6)
- Course catalog UI
- Course detail page
- Lesson viewer component
- Progress dashboard
- User enrollment management

### Phase 4: Advanced Features (Week 7-8)
- Certificate generation
- Cohort management interface
- Bookmarks and notes UI
- Advanced search and filtering
- Analytics dashboard

---

## API Documentation

### Quick Reference

#### Authentication
All endpoints require authentication unless specified. Include session cookie in requests.

#### Error Responses
```json
{
  "error": "Error message"
}
```

#### Success Responses
```json
{
  "data": {},
  "message": "Optional success message"
}
```

### Rate Limiting
Consider adding rate limiting in production:

```typescript
// src/lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}
```

---

## Completion Criteria

Phase 2 is complete when:

- [ ] All course management endpoints implemented (GET/POST/PUT/DELETE)
- [ ] Enrollment system working with duplicate prevention
- [ ] Progress tracking updates enrollment percentage
- [ ] Offline sync saves to localStorage
- [ ] Auto-sync works when coming online
- [ ] All endpoints have proper authentication/authorization
- [ ] Error handling covers edge cases
- [ ] Manual testing checklist completed
- [ ] API documentation complete

**Sign-off**: Review this checklist before proceeding to Phase 3.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-13
**Author**: VetsWhoCode Development Team
