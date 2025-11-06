# Elite Cohort Database Schema

**Database support for VWC Elite Cohort Model - ONE cohort per year, 17-week program**

---

## 🎯 Overview

This document explains the database schema updates to support the **Elite Cohort Model**:
- ONE cohort per year (20-30 students)
- 17-week progressive curriculum (Software → Data → AI Engineering)
- Week-based progression tracking
- Three-feature capstone portfolio

---

## 📊 Schema Changes

### 1. New `Cohort` Model

```prisma
model Cohort {
  id          String   @id @default(cuid())
  name        String   @unique // "2026-Elite", "2027-Elite"
  displayName String              // "Elite Cohort 2026"

  // Timeline
  startDate   DateTime            // April 7, 2026
  endDate     DateTime            // August 7, 2026

  // Cohort Status
  status      CohortStatus @default(PLANNING)
  isActive    Boolean      @default(false)

  // Program tracking
  currentWeek Int          @default(1) // Current week (1-17)
  currentPhase CoursePhase @default(SOFTWARE_ENGINEERING)

  // Elite cohort details
  maxStudents Int          @default(30) // Cap at 20-30 students
  description String?

  // Application and selection
  applicationOpenDate  DateTime?
  applicationCloseDate DateTime?
  selectionComplete    Boolean   @default(false)

  // Students in this cohort
  students    User[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Purpose**: Manage the elite cohort lifecycle from applications to graduation.

---

### 2. New `CohortStatus` Enum

```prisma
enum CohortStatus {
  PLANNING      // Pre-launch planning phase
  APPLICATIONS  // Applications open
  SELECTION     // Reviewing applications
  PREWORK       // Accepted students doing pre-work
  ACTIVE        // Cohort in progress
  COMPLETED     // Cohort graduated
  ARCHIVED      // Historical record
}
```

**Cohort Lifecycle**:
```
PLANNING → APPLICATIONS → SELECTION → PREWORK → ACTIVE → COMPLETED → ARCHIVED
```

---

### 3. New `CoursePhase` Enum

```prisma
enum CoursePhase {
  SOFTWARE_ENGINEERING // Weeks 1-8: Next.js, React, TypeScript, PostgreSQL
  DATA_ENGINEERING     // Weeks 9-13: Python, SQL, Azure, ETL pipelines
  AI_ENGINEERING       // Weeks 14-17: FastAPI, Gemini, Azure OpenAI, Presidio
}
```

**Purpose**: Categorize courses by the three engineering verticals.

---

### 4. Enhanced `Course` Model

**New fields added**:

```prisma
model Course {
  // ... existing fields ...

  // 17-Week Elite Cohort Structure
  phase       CoursePhase? // Software, Data, or AI Engineering
  weekNumber  Int?         // Which week this course starts (1-17)
  weekDuration Int?        // How many weeks this course spans
  order       Int?         // Order within the 17-week program

  // ... rest of model ...
}
```

**Purpose**: Structure courses within the 17-week timeline.

**Example**:
- **Course**: "React Development"
- **phase**: `SOFTWARE_ENGINEERING`
- **weekNumber**: `5`
- **weekDuration**: `2`
- **order**: `3` (third course in the program)

---

### 5. Enhanced `User` Model

**New fields added**:

```prisma
model User {
  // ... existing fields ...

  cohort        String?  // DEPRECATED: Use cohortId instead
  cohortId      String?  // Elite cohort membership
  cohortMembership Cohort? @relation(fields: [cohortId], references: [id])

  // ... rest of model ...
}
```

**Purpose**: Link students to their elite cohort.

---

## 📅 Elite Cohort 2026 Example Data

### Creating the 2026 Cohort

```typescript
// Example API call or Prisma query
const cohort2026 = await prisma.cohort.create({
  data: {
    name: "2026-Elite",
    displayName: "Elite Cohort 2026",
    startDate: new Date("2026-04-07"),
    endDate: new Date("2026-08-07"),
    status: "PLANNING",
    isActive: false,
    currentWeek: 1,
    currentPhase: "SOFTWARE_ENGINEERING",
    maxStudents: 30,
    description: "The inaugural elite cohort - 20-30 exceptional veterans becoming full-stack AI engineers",
    applicationOpenDate: new Date("2025-11-01"),
    applicationCloseDate: new Date("2026-01-15"),
    selectionComplete: false,
  }
});
```

---

## 🗓️ Sample Course Structure

### Phase 1: Software Engineering (Weeks 1-8)

```typescript
// Course 1: Web Development Foundations
{
  title: "Web Development Foundations",
  phase: "SOFTWARE_ENGINEERING",
  weekNumber: 1,
  weekDuration: 2,
  order: 1,
  category: "Web Development",
  difficulty: "BEGINNER",
  prerequisites: null
}

// Course 2: JavaScript Essentials
{
  title: "JavaScript Essentials",
  phase: "SOFTWARE_ENGINEERING",
  weekNumber: 3,
  weekDuration: 2,
  order: 2,
  category: "JavaScript",
  difficulty: "BEGINNER",
  prerequisites: JSON.stringify(["web-dev-foundations"])
}

// Course 3: React Development
{
  title: "React Development",
  phase: "SOFTWARE_ENGINEERING",
  weekNumber: 5,
  weekDuration: 2,
  order: 3,
  category: "Frontend",
  difficulty: "INTERMEDIATE",
  prerequisites: JSON.stringify(["javascript-essentials"])
}

// Course 4: Backend Development
{
  title: "Backend Development (Node.js & Express)",
  phase: "SOFTWARE_ENGINEERING",
  weekNumber: 7,
  weekDuration: 2,
  order: 4,
  category: "Backend",
  difficulty: "INTERMEDIATE",
  prerequisites: JSON.stringify(["react-development"])
}
```

---

### Phase 2: Data Engineering (Weeks 9-13)

```typescript
// Course 5: Python for Data Engineering
{
  title: "Python for Data Engineering",
  phase: "DATA_ENGINEERING",
  weekNumber: 9,
  weekDuration: 2,
  order: 5,
  category: "Data Engineering",
  difficulty: "INTERMEDIATE",
  prerequisites: JSON.stringify(["backend-development"])
}

// Course 6: SQL & Database Engineering
{
  title: "SQL & Database Engineering",
  phase: "DATA_ENGINEERING",
  weekNumber: 11,
  weekDuration: 1,
  order: 6,
  category: "Data Engineering",
  difficulty: "INTERMEDIATE",
  prerequisites: JSON.stringify(["python-data-engineering"])
}

// Course 7: Building Data Pipelines
{
  title: "Building Data Pipelines",
  phase: "DATA_ENGINEERING",
  weekNumber: 12,
  weekDuration: 2,
  order: 7,
  category: "Data Engineering",
  difficulty: "ADVANCED",
  prerequisites: JSON.stringify(["sql-databases"])
}
```

---

### Phase 3: AI Engineering (Weeks 14-17)

```typescript
// Course 8: FastAPI & LLM Fundamentals
{
  title: "FastAPI & LLM Fundamentals",
  phase: "AI_ENGINEERING",
  weekNumber: 14,
  weekDuration: 1,
  order: 8,
  category: "AI Engineering",
  difficulty: "ADVANCED",
  prerequisites: JSON.stringify(["data-pipelines"])
}

// Course 9: RAG with Multi-Provider LLMs
{
  title: "RAG with Gemini & Azure OpenAI",
  phase: "AI_ENGINEERING",
  weekNumber: 15,
  weekDuration: 1,
  order: 9,
  category: "AI Engineering",
  difficulty: "ADVANCED",
  prerequisites: JSON.stringify(["fastapi-llm-fundamentals"])
}

// Course 10: Production AI with Privacy
{
  title: "Production AI with Presidio",
  phase: "AI_ENGINEERING",
  weekNumber: 16,
  weekDuration: 1,
  order: 10,
  category: "AI Engineering",
  difficulty: "ADVANCED",
  prerequisites: JSON.stringify(["rag-multi-provider"])
}

// Course 11: AI Engineering Capstone
{
  title: "AI Engineering Capstone & Portfolio",
  phase: "AI_ENGINEERING",
  weekNumber: 17,
  weekDuration: 1,
  order: 11,
  category: "Capstone",
  difficulty: "ADVANCED",
  prerequisites: JSON.stringify(["production-ai-privacy"])
}
```

---

## 🔄 Cohort Workflow

### 1. Planning Phase (Q4 2025)

```typescript
// Admin creates the cohort
const cohort = await prisma.cohort.create({
  data: {
    name: "2026-Elite",
    displayName: "Elite Cohort 2026",
    status: "PLANNING",
    // ... dates, etc.
  }
});
```

---

### 2. Applications Open (November 2025)

```typescript
// Update cohort status
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    status: "APPLICATIONS",
    applicationOpenDate: new Date("2025-11-01"),
    applicationCloseDate: new Date("2026-01-15"),
  }
});
```

---

### 3. Selection Process (January-February 2026)

```typescript
// Mark cohort as in selection
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    status: "SELECTION",
  }
});

// After selections complete
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    selectionComplete: true,
  }
});
```

---

### 4. Prework Phase (March 2026)

```typescript
// Accept students into cohort
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    status: "PREWORK",
  }
});

// Link accepted students to cohort
await prisma.user.update({
  where: { id: studentId },
  data: {
    cohortId: cohortId,
  }
});
```

---

### 5. Cohort Starts (April 7, 2026)

```typescript
// Activate the cohort
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    status: "ACTIVE",
    isActive: true,
    currentWeek: 1,
    currentPhase: "SOFTWARE_ENGINEERING",
  }
});
```

---

### 6. Week-by-Week Progression

```typescript
// Update cohort week and phase (run weekly)
const updateCohortWeek = async (cohortId: string) => {
  const cohort = await prisma.cohort.findUnique({
    where: { id: cohortId }
  });

  if (!cohort || cohort.status !== "ACTIVE") return;

  const nextWeek = cohort.currentWeek + 1;
  let nextPhase = cohort.currentPhase;

  // Transition phases at appropriate weeks
  if (nextWeek === 9) {
    nextPhase = "DATA_ENGINEERING";
  } else if (nextWeek === 14) {
    nextPhase = "AI_ENGINEERING";
  }

  await prisma.cohort.update({
    where: { id: cohortId },
    data: {
      currentWeek: nextWeek,
      currentPhase: nextPhase,
    }
  });
};
```

---

### 7. Graduation (August 7, 2026)

```typescript
// Mark cohort as completed
await prisma.cohort.update({
  where: { id: cohortId },
  data: {
    status: "COMPLETED",
    isActive: false,
    currentWeek: 17,
  }
});

// Update all students with graduation date
await prisma.user.updateMany({
  where: { cohortId: cohortId },
  data: {
    graduationDate: new Date("2026-08-07"),
  }
});
```

---

## 🔍 Useful Queries

### Get current cohort with students

```typescript
const currentCohort = await prisma.cohort.findFirst({
  where: {
    isActive: true,
    status: "ACTIVE",
  },
  include: {
    students: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    }
  }
});
```

---

### Get courses for current week

```typescript
const cohort = await prisma.cohort.findFirst({
  where: { isActive: true }
});

const coursesThisWeek = await prisma.course.findMany({
  where: {
    weekNumber: {
      lte: cohort.currentWeek,
    },
    OR: [
      {
        weekNumber: {
          gte: cohort.currentWeek - 1, // Include previous week's courses
        }
      }
    ],
    phase: cohort.currentPhase,
  },
  orderBy: {
    order: 'asc',
  }
});
```

---

### Get student progress in current cohort

```typescript
const studentProgress = await prisma.user.findUnique({
  where: { id: studentId },
  include: {
    cohortMembership: true,
    enrollments: {
      include: {
        course: {
          select: {
            title: true,
            phase: true,
            weekNumber: true,
          }
        }
      }
    },
    progress: {
      where: {
        completed: true,
      }
    },
    certificates: true,
  }
});
```

---

### Get cohort statistics

```typescript
const cohortStats = await prisma.cohort.findUnique({
  where: { id: cohortId },
  include: {
    students: {
      include: {
        enrollments: {
          where: {
            status: "COMPLETED"
          }
        },
        certificates: true,
      }
    }
  }
});

const stats = {
  totalStudents: cohortStats.students.length,
  averageCoursesCompleted: cohortStats.students.reduce((acc, s) =>
    acc + s.enrollments.length, 0) / cohortStats.students.length,
  certificatesEarned: cohortStats.students.reduce((acc, s) =>
    acc + s.certificates.length, 0),
};
```

---

## 🎯 Key Features

### 1. **Cohort-Based Learning**
- All students progress together through the same weeks
- Cohort tracks which week and phase they're currently on
- Enables synchronized learning and peer collaboration

### 2. **Phase Transitions**
- Automatic phase transitions at weeks 9 and 14
- Clear progression through three engineering verticals
- Prerequisites ensure proper skill building

### 3. **Elite Selectivity**
- `maxStudents` cap ensures quality (20-30 students)
- Status tracking from applications through graduation
- Selection process built into the model

### 4. **Timeline Management**
- Application windows tracked
- Pre-work phase before start
- Exact start and end dates for cohort

---

## 📝 Next Steps

### Immediate (Database Ready)
- ✅ Schema updated with Cohort model
- ✅ CoursePhase enum added
- ✅ Course phase/week fields added
- ✅ Migration created and applied

### Backend Implementation
- [ ] Create API endpoints for cohort management
- [ ] Build admin interface for creating cohorts
- [ ] Implement prerequisite checking logic
- [ ] Create weekly progression cron job
- [ ] Build cohort dashboard

### Frontend Implementation
- [ ] Cohort selection UI for admin
- [ ] Student cohort dashboard (shows current week/phase)
- [ ] Course unlock logic based on week number
- [ ] Progress visualization for 17-week journey
- [ ] Phase completion badges

### Content Creation
- [ ] Create 11 courses following the structure above
- [ ] Build modules and lessons for each course
- [ ] Create three capstone assignments (Weeks 8, 13, 16)
- [ ] Write assessment criteria for each phase

---

## 🚀 Migration Applied

**Migration**: `20251106190703_add_elite_cohort_model`

**Changes**:
- Added `Cohort` table
- Added `CohortStatus` enum
- Added `CoursePhase` enum
- Added `phase`, `weekNumber`, `weekDuration`, `order` to `Course` table
- Added `cohortId` to `User` table
- Created relationship between `User` and `Cohort`

**Status**: ✅ **Applied to database** (SQLite for local development)

---

## 🔐 Production Considerations

### Before Production Deployment:

1. **Switch to PostgreSQL**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```

2. **Run migration on production database**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed initial data**:
   - Create Elite Cohort 2026
   - Create 11 courses with proper phase/week assignments
   - Set up admin users

4. **Implement access controls**:
   - Only ADMIN role can create/edit cohorts
   - Only ADMIN/INSTRUCTOR can update cohort week
   - Students can view their cohort but not edit

---

**Version**: 1.0
**Date**: November 6, 2025
**Migration**: `20251106190703_add_elite_cohort_model`
**Status**: ✅ Applied to local development database
