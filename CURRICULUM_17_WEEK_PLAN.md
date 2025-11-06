# Vets Who Code - 17-Week Progressive Curriculum

**Program Structure**: Software Engineering → Data Engineering → AI Engineering

**Total Duration**: 17 Weeks
**Format**: Progressive, prerequisite-based learning path
**Cohort-based**: All students follow the same timeline

---

## 📊 Curriculum Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    17-WEEK PROGRAM STRUCTURE                    │
├─────────────────────────────────────────────────────────────────┤
│  Weeks 1-8   │  Weeks 9-13  │  Weeks 14-17                     │
│  Software    │  Data        │  AI                              │
│  Engineering │  Engineering │  Engineering                      │
└─────────────────────────────────────────────────────────────────┘
```

### Progression Flow:
1. **Foundation** → Build core software engineering skills
2. **Data Skills** → Learn to work with data pipelines & analytics
3. **AI/ML** → Apply data skills to AI/ML engineering

---

## 🎯 Phase 1: Software Engineering (Weeks 1-8)

**Goal**: Build a solid foundation in software development, focusing on full-stack web development.

### Week 1-2: Foundations
**Course**: Introduction to Web Development
- Git & GitHub fundamentals
- HTML5 & CSS3 basics
- Command line proficiency
- Development environment setup
- Responsive design principles

**Deliverables**:
- Personal portfolio website (HTML/CSS)
- GitHub profile setup

---

### Week 3-4: JavaScript Fundamentals
**Course**: JavaScript Essentials
- ES6+ syntax and features
- DOM manipulation
- Async programming (Promises, async/await)
- Fetch API and working with APIs
- Error handling

**Deliverables**:
- Interactive web application
- API consumption project

---

### Week 5-6: Frontend Framework
**Course**: React Development
- Component-based architecture
- State management (useState, useContext)
- React Router
- Hooks and lifecycle
- Building reusable components

**Deliverables**:
- Single-page application (SPA)
- Component library

---

### Week 7-8: Backend & Full-Stack
**Course**: Node.js & Express
- RESTful API design
- Database fundamentals (SQL/NoSQL)
- Authentication & authorization
- Deployment basics
- Testing fundamentals

**Deliverables**:
- Full-stack CRUD application
- Deployed production app

**Phase 1 Capstone**: Full-stack web application with authentication, database, and deployment

---

## 📊 Phase 2: Data Engineering (Weeks 9-13)

**Goal**: Transition from web development to data-focused engineering, building data pipelines and analytics skills.

**Prerequisites**: Completed Software Engineering phase (Weeks 1-8)

### Week 9-10: Python & Data Fundamentals
**Course**: Python for Data Engineering
- Python syntax and ecosystem
- Data structures and algorithms
- File I/O and data formats (CSV, JSON, XML)
- Working with APIs for data collection
- Virtual environments and package management

**Deliverables**:
- Data collection scripts
- ETL pipeline (basic)

---

### Week 11: SQL & Database Design
**Course**: Advanced SQL & Database Engineering
- Complex queries (JOINs, subqueries, CTEs)
- Database design and normalization
- Query optimization and indexing
- Stored procedures and triggers
- Working with PostgreSQL/MySQL

**Deliverables**:
- Database schema design
- Complex analytical queries

---

### Week 12-13: Data Pipelines & Processing
**Course**: Building Data Pipelines
- ETL/ELT concepts
- Data cleaning and transformation (Pandas)
- Working with large datasets
- Data validation and quality
- Scheduling and automation (cron, Airflow basics)
- Data visualization (Matplotlib, Plotly)

**Deliverables**:
- Automated data pipeline
- Data dashboard/visualization

**Phase 2 Capstone**: End-to-end data pipeline that collects, processes, stores, and visualizes data

---

## 🤖 Phase 3: AI Engineering (Weeks 14-17)

**Goal**: Apply software and data engineering skills to build and deploy AI/ML solutions.

**Prerequisites**: Completed Data Engineering phase (Weeks 9-13)

### Week 14: Machine Learning Fundamentals
**Course**: Introduction to Machine Learning
- ML concepts and terminology
- Supervised vs unsupervised learning
- Model training and evaluation
- Feature engineering basics
- scikit-learn fundamentals
- Model selection and validation

**Deliverables**:
- Trained ML model (classification or regression)
- Model evaluation report

---

### Week 15: Deep Learning & Neural Networks
**Course**: Neural Networks & Deep Learning
- Neural network architecture
- TensorFlow/PyTorch basics
- Training deep learning models
- Working with pre-trained models
- Transfer learning
- Model optimization

**Deliverables**:
- Deep learning model
- Transfer learning implementation

---

### Week 16: AI Engineering & MLOps
**Course**: Deploying AI/ML Systems
- Model deployment strategies
- API creation for ML models (FastAPI/Flask)
- Model monitoring and logging
- CI/CD for ML projects
- Docker for ML applications
- Cloud deployment (AWS/GCP/Azure basics)

**Deliverables**:
- Deployed ML API
- Dockerized ML application

---

### Week 17: Capstone & Career Prep
**Course**: AI Engineering Capstone
- Full AI application development
- Resume and portfolio building
- Technical interview preparation
- System design for AI systems
- Ethics in AI

**Deliverables**:
- Complete AI-powered application
- Updated portfolio with all three phases
- Technical presentation

**Phase 3 Capstone**: Full AI application that demonstrates software engineering, data engineering, and AI/ML skills

---

## 📋 Course Structure in Database

### Course Hierarchy

```
Program (17 Weeks)
├── Phase 1: Software Engineering (Weeks 1-8)
│   ├── Course: Web Development Foundations
│   │   └── Modules: HTML/CSS, Git, Responsive Design
│   ├── Course: JavaScript Essentials
│   │   └── Modules: ES6, Async JS, DOM, APIs
│   ├── Course: React Development
│   │   └── Modules: Components, State, Routing, Hooks
│   └── Course: Backend Development
│       └── Modules: Node.js, Express, Databases, Auth
│
├── Phase 2: Data Engineering (Weeks 9-13)
│   ├── Course: Python for Data Engineering
│   │   └── Modules: Python Basics, Data Structures, ETL
│   ├── Course: SQL & Databases
│   │   └── Modules: Advanced SQL, Query Optimization
│   └── Course: Data Pipelines
│       └── Modules: Pandas, Airflow, Visualization
│
└── Phase 3: AI Engineering (Weeks 14-17)
    ├── Course: Machine Learning Fundamentals
    │   └── Modules: ML Concepts, scikit-learn, Evaluation
    ├── Course: Deep Learning
    │   └── Modules: Neural Networks, TensorFlow/PyTorch
    ├── Course: MLOps & Deployment
    │   └── Modules: FastAPI, Docker, Cloud, Monitoring
    └── Course: Capstone Project
        └── Modules: Full Application, Career Prep
```

---

## 🔗 Prerequisites & Course Progression

### Database Implementation

**Course Table - Prerequisites Field** (JSON format):

```json
{
  "courses": [
    {
      "id": "web-dev-foundations",
      "title": "Web Development Foundations",
      "week": 1,
      "phase": "Software Engineering",
      "prerequisites": null,
      "unlocks": ["javascript-essentials"]
    },
    {
      "id": "javascript-essentials",
      "title": "JavaScript Essentials",
      "week": 3,
      "phase": "Software Engineering",
      "prerequisites": ["web-dev-foundations"],
      "unlocks": ["react-development"]
    },
    {
      "id": "react-development",
      "title": "React Development",
      "week": 5,
      "phase": "Software Engineering",
      "prerequisites": ["javascript-essentials"],
      "unlocks": ["backend-development"]
    },
    {
      "id": "backend-development",
      "title": "Backend Development",
      "week": 7,
      "phase": "Software Engineering",
      "prerequisites": ["react-development"],
      "unlocks": ["python-data-engineering"]
    },
    {
      "id": "python-data-engineering",
      "title": "Python for Data Engineering",
      "week": 9,
      "phase": "Data Engineering",
      "prerequisites": ["backend-development"],
      "unlocks": ["sql-databases"]
    },
    {
      "id": "sql-databases",
      "title": "SQL & Database Engineering",
      "week": 11,
      "phase": "Data Engineering",
      "prerequisites": ["python-data-engineering"],
      "unlocks": ["data-pipelines"]
    },
    {
      "id": "data-pipelines",
      "title": "Building Data Pipelines",
      "week": 12,
      "phase": "Data Engineering",
      "prerequisites": ["sql-databases"],
      "unlocks": ["ml-fundamentals"]
    },
    {
      "id": "ml-fundamentals",
      "title": "Machine Learning Fundamentals",
      "week": 14,
      "phase": "AI Engineering",
      "prerequisites": ["data-pipelines"],
      "unlocks": ["deep-learning"]
    },
    {
      "id": "deep-learning",
      "title": "Neural Networks & Deep Learning",
      "week": 15,
      "phase": "AI Engineering",
      "prerequisites": ["ml-fundamentals"],
      "unlocks": ["mlops-deployment"]
    },
    {
      "id": "mlops-deployment",
      "title": "MLOps & Deployment",
      "week": 16,
      "phase": "AI Engineering",
      "prerequisites": ["deep-learning"],
      "unlocks": ["capstone"]
    },
    {
      "id": "capstone",
      "title": "AI Engineering Capstone",
      "week": 17,
      "phase": "AI Engineering",
      "prerequisites": ["mlops-deployment"],
      "unlocks": null
    }
  ]
}
```

---

## 📅 Weekly Schedule Format

### Typical Week Structure:

**Monday**:
- Live lecture/demo (2 hours)
- Assignment introduction

**Tuesday-Thursday**:
- Self-paced learning
- Office hours (2 hours daily)
- Peer collaboration

**Friday**:
- Project showcase/review
- Q&A session
- Weekly retrospective

**Weekend**:
- Catch-up time
- Work on assignments
- Optional study groups

---

## 🎓 Assessment & Grading

### Per Course:
- **Assignments**: 40%
- **Projects**: 40%
- **Participation**: 10%
- **Final Project**: 10%

### Phase Completion Requirements:
- Minimum 70% average across all courses
- All capstone projects submitted
- Peer code reviews completed

### Program Completion:
- Complete all 3 phases
- Pass all capstone projects
- Final portfolio review
- **Certificate Awarded**: Full-Stack AI Engineer

---

## 🔄 Cohort Management

### Cohort Structure:
- **Cohort Start**: All students begin Week 1 together
- **Synchronized Learning**: Everyone moves through weeks together
- **Peer Support**: Built-in study groups and pair programming
- **Instructor Support**: Live sessions and office hours

### Enrollment Model:
```
Cohort 2025-Q1: Weeks 1-17 (Jan - May)
├── Week 1 Start: January 6, 2025
├── Phase 1 Complete: March 3, 2025
├── Phase 2 Complete: April 7, 2025
└── Program Complete: May 5, 2025
```

---

## 💾 Database Schema Additions Needed

### New Fields for Course Table:

```prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String?
  difficulty  Difficulty @default(BEGINNER)
  category    String

  // NEW FIELDS FOR 17-WEEK STRUCTURE
  phase       CoursePhase? // Software, Data, AI
  weekNumber  Int?         // Which week this course starts (1-17)
  weekDuration Int?        // How many weeks this course spans
  order       Int?         // Order within the program

  // Existing fields
  modules     Module[]
  isPublished Boolean  @default(false)
  duration    Int?
  prerequisites String? // JSON string of prerequisite course IDs

  // Relationships
  enrollments Enrollment[]
  assignments Assignment[]
  certificates Certificate[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum CoursePhase {
  SOFTWARE_ENGINEERING
  DATA_ENGINEERING
  AI_ENGINEERING
}
```

### New Cohort Table:

```prisma
model Cohort {
  id          String   @id @default(cuid())
  name        String   // "2025-Q1", "2025-Q2"
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean  @default(true)

  // Track which week the cohort is currently on
  currentWeek Int      @default(1)

  // Students in this cohort
  users       User[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🚀 Implementation Recommendations

### Phase 1: Core Structure (Now)
1. ✅ Add `phase`, `weekNumber`, `order` fields to Course model
2. ✅ Create Cohort model
3. ✅ Update course creation UI to include phase/week
4. ✅ Build prerequisite checking logic

### Phase 2: Course Content (Week by Week)
1. Create course content for each week
2. Build modules and lessons
3. Create assignments and projects
4. Set up grading rubrics

### Phase 3: Cohort Management
1. Cohort creation interface
2. Student assignment to cohorts
3. Progress tracking by week
4. Automated unlocking based on week number

### Phase 4: Advanced Features
1. Peer review system
2. Live session scheduling
3. Office hours booking
4. Career services integration

---

## 📊 Student Progress Tracking

### Dashboard View for Students:

```
┌─────────────────────────────────────────────┐
│         YOUR 17-WEEK JOURNEY                │
├─────────────────────────────────────────────┤
│ Current Week: 5 of 17                       │
│ Phase: Software Engineering (Weeks 1-8)     │
│ Current Course: React Development           │
├─────────────────────────────────────────────┤
│ Completed:                                  │
│ ✓ Web Development Foundations (Weeks 1-2)  │
│ ✓ JavaScript Essentials (Weeks 3-4)        │
│                                             │
│ In Progress:                                │
│ ▶ React Development (Weeks 5-6)            │
│   Progress: 45%                             │
│                                             │
│ Upcoming:                                   │
│ 🔒 Backend Development (Weeks 7-8)         │
│ 🔒 Python for Data Eng. (Weeks 9-10)       │
└─────────────────────────────────────────────┘
```

---

## 🎯 Success Metrics

### For Students:
- Course completion rate
- Assignment submission rate
- Time to completion
- Capstone project quality
- Job placement rate

### For Program:
- Student retention by phase
- Average grades by course
- Capstone project success rate
- Graduate employment rate within 6 months

---

## 📝 Next Steps

1. **Review this plan** - Does this structure align with your vision?
2. **Adjust week allocations** - Should any phase be longer/shorter?
3. **Define detailed curriculum** - What specific topics in each course?
4. **Create content** - Lessons, assignments, projects for each week
5. **Update database schema** - Add new fields and tables
6. **Build prerequisite system** - Enforce course progression
7. **Create cohort management** - Admin tools for cohort creation

---

**Questions to Consider:**

1. **Week Distribution**: Is 8-5-4 the right split? Or would you prefer 7-5-5 or 6-6-5?
2. **Intensity**: Should all phases have the same weekly time commitment?
3. **Flexibility**: Should students be able to move faster if they complete work early?
4. **Prerequisites**: Should prerequisites be strict (must complete 100%) or flexible (70%+)?
5. **Synchronous vs Asynchronous**: How much is live vs self-paced?

---

**Version**: 1.0
**Date**: November 6, 2025
**Status**: Draft - Awaiting Review
