# Vets Who Code - 17-Week Tech Stack Curriculum

**Mission**: Train veterans as Full-Stack AI Engineers using the Vets Who Code stack

**Total Duration**: 17 Weeks
**Stack Progression**: VWC Web Stack → Python/SQL/Azure → FastAPI/LLMs/AI Tools
**Format**: Cohort-based, skills build progressively

---

## 🎯 Program Philosophy

Each phase builds transferable skills that carry forward:
- **Software Engineering**: Core programming, Git, APIs, deployment
- **Data Engineering**: Those same skills + Python, SQL, Azure, ETL
- **AI Engineering**: All previous skills + LLMs, FastAPI, AI-specific tools

---

## 📚 The Vets Who Code Stack

### Phase 1: Software Engineering Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (potentially Next.js API routes)
- **Database**: PostgreSQL, Prisma ORM
- **Auth**: NextAuth.js
- **Deployment**: Vercel
- **Version Control**: Git, GitHub

### Phase 2: Data Engineering Stack
- **Language**: Python
- **Data Processing**: Pandas, NumPy
- **Database**: SQL (PostgreSQL), Azure SQL
- **Cloud Platform**: Microsoft Azure
- **ETL Tools**: Azure Data Factory, Python scripts
- **Storage**: Azure Blob Storage, Azure Data Lake

### Phase 3: AI Engineering Stack
- **API Framework**: FastAPI
- **LLMs**: Google Gemini API, Azure OpenAI
- **Privacy/Security**: Presidio (PII detection/anonymization)
- **ML Tools**: LangChain, vector databases
- **AI Services**: Azure AI Services
- **Deployment**: Azure Container Apps, Docker

---

## 🗓️ 17-Week Breakdown

## Phase 1: Software Engineering (Weeks 1-8)
**Goal**: Master the Vets Who Code web development stack

### Week 1-2: Foundation & Git Workflow
**Focus**: Development fundamentals, version control, web basics

**Skills**:
- Git & GitHub workflow (fork, clone, branch, PR)
- Command line proficiency
- HTML5 semantic markup
- CSS3 & responsive design basics
- Markdown & documentation

**Tech Stack Introduced**:
- Git, GitHub
- VS Code
- HTML/CSS

**Project**: Portfolio website (HTML/CSS) deployed via GitHub Pages

---

### Week 3-4: JavaScript & TypeScript Fundamentals
**Focus**: Modern JavaScript and TypeScript essentials

**Skills**:
- ES6+ features (arrow functions, destructuring, spread/rest)
- TypeScript basics (types, interfaces, generics)
- Async programming (Promises, async/await)
- Fetch API and REST concepts
- Error handling patterns

**Tech Stack Introduced**:
- JavaScript (ES6+)
- TypeScript
- REST APIs

**Project**: Interactive web app consuming a public API (TypeScript)

---

### Week 5-6: React & Next.js
**Focus**: Component-based development with the VWC frontend stack

**Skills**:
- React fundamentals (components, props, state)
- React Hooks (useState, useEffect, useContext)
- Next.js app router and routing
- Server vs Client components
- Tailwind CSS utility-first styling

**Tech Stack Introduced**:
- React 18+
- Next.js 14+
- Tailwind CSS

**Project**: Multi-page Next.js application with routing and state management

---

### Week 7-8: Full-Stack Development
**Focus**: Backend APIs, database, authentication, deployment

**Skills**:
- Next.js API routes
- Prisma ORM and database modeling
- PostgreSQL and relational data
- NextAuth.js authentication (GitHub OAuth)
- Environment variables and security
- Deploying to Vercel

**Tech Stack Introduced**:
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Vercel

**Capstone Project**: Full-stack CRUD application with:
- User authentication (GitHub OAuth)
- PostgreSQL database
- CRUD operations via API
- Deployed to production (Vercel)

**Example**: Task management app or blog platform

---

## Phase 2: Data Engineering (Weeks 9-13)
**Goal**: Transition to Python, work with data at scale, build ETL pipelines on Azure

**Skill Transfer**: Use Git, API, deployment knowledge from Phase 1

### Week 9: Python Fundamentals
**Focus**: Python for data engineering

**Skills**:
- Python syntax and data structures (transferring from JavaScript/TypeScript)
- Virtual environments (venv, pip)
- Working with files (CSV, JSON, Excel)
- Python libraries ecosystem
- Error handling and logging

**Tech Stack Introduced**:
- Python 3.11+
- pip, venv
- VS Code Python extensions

**Project**: Python scripts that process CSV/JSON data files

---

### Week 10: SQL & Database Design
**Focus**: Advanced SQL and database engineering

**Skills**:
- Complex SQL queries (JOINs, subqueries, CTEs, window functions)
- Database design and normalization
- Indexing and query optimization
- Stored procedures and functions
- Azure SQL Database

**Tech Stack Introduced**:
- PostgreSQL (advanced)
- Azure SQL Database
- SQL Server Management Studio / Azure Data Studio

**Project**: Design and implement a normalized database schema with complex queries

---

### Week 11-12: Azure & ETL Pipelines
**Focus**: Cloud data engineering with Microsoft Azure

**Skills**:
- Azure fundamentals (Resource Groups, subscriptions)
- Azure Blob Storage and Data Lake
- Azure Data Factory (ETL pipelines)
- Pandas for data transformation
- Scheduling and automation
- Data quality and validation

**Tech Stack Introduced**:
- Microsoft Azure
- Azure Data Factory
- Azure Blob Storage
- Pandas, NumPy
- Azure Functions (optional)

**Project**: Build end-to-end ETL pipeline:
- Extract data from multiple sources (API, CSV, database)
- Transform with Python/Pandas
- Load into Azure SQL Database
- Automate with Azure Data Factory

---

### Week 13: Data Pipelines & Analytics
**Focus**: Production data pipelines and visualization

**Skills**:
- Data pipeline orchestration
- Error handling in pipelines
- Monitoring and logging
- Basic data visualization (Matplotlib, Plotly)
- Data warehouse concepts

**Tech Stack Introduced**:
- Azure Monitor
- Matplotlib, Plotly
- Azure Synapse Analytics (intro)

**Capstone Project**: Production-grade data pipeline:
- Ingest data from multiple sources
- Clean, transform, and validate
- Store in Azure SQL/Data Lake
- Create basic analytics dashboard
- Implement monitoring and alerts

**Example**: Pipeline that processes e-commerce transactions, detects anomalies, stores in data warehouse

---

## Phase 3: AI Engineering (Weeks 14-17)
**Goal**: Build AI-powered applications using LLMs, with a focus on privacy and production deployment

**Skill Transfer**: Use Python, APIs, Azure, deployment knowledge from Phases 1-2

### Week 14: FastAPI & LLM Fundamentals
**Focus**: Building APIs for AI applications with multiple LLM providers

**Skills**:
- FastAPI framework (async, routing, validation)
- Pydantic models for data validation
- Google Gemini API integration
- Azure OpenAI integration
- Comparing LLM providers (cost, performance, features)
- Prompt engineering basics
- API authentication and rate limiting

**Tech Stack Introduced**:
- FastAPI
- Pydantic
- Google Gemini API
- Azure OpenAI Service
- Uvicorn (ASGI server)

**Project**: Multi-provider AI service:
- Accepts user input
- Calls both Gemini and Azure OpenAI
- Compare responses from both providers
- Return results with provider metadata
- Error handling and fallback logic

**Example**: Text summarization API that:
- Uses Gemini for general tasks (cost-effective)
- Uses Azure OpenAI for enterprise features
- Allows client to choose provider

**Why Both Providers?**:
- **Gemini**: Cost-effective, fast, multimodal capabilities
- **Azure OpenAI**: Enterprise features, compliance, Azure integration
- **Real-world skill**: Most companies use multiple LLM providers

---

### Week 15: LangChain & Vector Databases
**Focus**: Advanced LLM applications and RAG (Retrieval-Augmented Generation)

**Skills**:
- LangChain framework (supporting both Gemini and Azure OpenAI)
- Embeddings and vector databases
- Retrieval-Augmented Generation (RAG)
- Document loaders and text splitting
- Memory and conversation chains
- Provider abstraction patterns

**Tech Stack Introduced**:
- LangChain (with Gemini and Azure OpenAI integrations)
- Pinecone / Azure Cognitive Search (vector DB)
- Gemini Embeddings API
- Azure OpenAI Embeddings

**Project**: Multi-provider RAG application:
- Ingests documents
- Creates embeddings using both Gemini and Azure OpenAI
- Stores in vector database
- Retrieves relevant context
- Generates answers using either LLM provider
- Implements provider selection logic

**Example**: Document Q&A system that:
- Uses Gemini embeddings (cost-effective for indexing)
- Uses Azure OpenAI for generation (enterprise compliance)
- Allows switching between providers based on use case

**Key Learning**: Provider abstraction and fallback strategies

---

### Week 16: Privacy, Security & Presidio
**Focus**: PII detection, data privacy in AI applications

**Skills**:
- Presidio for PII detection and anonymization
- Azure AI Content Safety
- Data privacy best practices
- GDPR/compliance considerations
- Secure API design
- Audit logging

**Tech Stack Introduced**:
- Microsoft Presidio
- Azure AI Content Safety
- Azure Key Vault

**Project**: Privacy-aware AI service:
- Detect PII in user input (Presidio)
- Anonymize sensitive data
- Process with LLM safely
- Log for compliance
- Return sanitized results

**Example**: Customer service chatbot that handles sensitive information securely

---

### Week 17: Final Capstone - Portfolio of VWC Features
**Focus**: Ship THREE production features to Vets Who Code platform - one for each vertical

**Goal**: Every troop demonstrates mastery by shipping production-ready features across all three disciplines

**The Three Feature Portfolio**:

1. **Software Engineering Feature** (Phase 1 Skills)
2. **Data Engineering Feature** (Phase 2 Skills)
3. **AI Engineering Feature** (Phase 3 Skills)

Each feature is deployed to production and becomes part of the VWC platform.

---

**Skills Demonstrated**:
- Product thinking (understand user needs)
- Feature design and planning across different domains
- Full-stack implementation (Phase 1, 2, 3 skills)
- Code review process
- Testing (unit, integration, E2E)
- Production deployment
- Monitoring and iteration
- Team collaboration and Git workflow

**Week 17 Timeline**:
Students have already built these features during each phase - Week 17 is for final polish, integration, and deployment:
- **Monday**: Feature review and final requirements
- **Tuesday-Wednesday**: Polish all three features, final testing
- **Thursday**: Deploy all features to production
- **Friday**: Portfolio presentation to VWC team

---

## 📦 Phase-Based Capstone Features

Students build one feature during each phase capstone, then polish and integrate all three in Week 17.

### 🎨 Phase 1 Capstone (Week 8): Software Engineering Feature

**Built during Week 8, shipped to production**

**Example Features**:

1. **Interactive Code Playground**
   - Next.js frontend with Monaco editor
   - Real-time code execution
   - Save/share code snippets
   - User authentication (NextAuth)
   - PostgreSQL to store snippets
   - **Impact**: Students can practice coding in browser

2. **Student Portfolio Builder**
   - Next.js interface for students to build portfolios
   - Showcase projects, skills, certificates
   - Public profile URLs
   - Responsive design with Tailwind
   - **Impact**: Students have professional portfolio upon graduation

3. **Real-time Study Group Finder**
   - Next.js app with WebSockets
   - Students can create/join study sessions
   - Real-time chat functionality
   - PostgreSQL for session data
   - **Impact**: Enable peer learning and collaboration

4. **Assignment Submission Interface Enhancement**
   - Improved UX for submitting assignments
   - Drag-and-drop file uploads
   - GitHub repo auto-validation
   - Live preview of submissions
   - **Impact**: Streamline assignment submission process

**Skills Used**: Next.js, React, TypeScript, PostgreSQL, Prisma, NextAuth, Vercel deployment

---

### 📊 Phase 2 Capstone (Week 13): Data Engineering Feature

**Built during Week 13, shipped to production**

**Example Features**:

1. **Student Progress Analytics Dashboard**
   - Python ETL pipeline to aggregate student data
   - Azure Data Factory for orchestration
   - Complex SQL queries for insights
   - Next.js dashboard with interactive charts
   - Azure SQL Database for analytics
   - **Impact**: Instructors identify struggling students early

2. **Course Engagement Metrics Pipeline**
   - ETL pipeline processing lesson views, time spent, completion rates
   - Azure Blob Storage for raw data
   - Pandas for data transformation
   - Automated daily reports
   - SQL views for easy querying
   - **Impact**: Data-driven curriculum improvements

3. **Veteran Outcomes Tracker**
   - ETL pipeline tracking job placements, salaries, companies
   - Azure Data Lake for storage
   - Python data validation and cleaning
   - Dashboard showing program impact
   - **Impact**: Demonstrate VWC's success to funders

4. **Automated Weekly Reports System**
   - Azure Data Factory scheduled pipelines
   - Aggregate student progress, assignment completion
   - Generate PDF reports with charts
   - Email distribution to instructors
   - **Impact**: Keep instructors informed automatically

**Skills Used**: Python, Pandas, SQL, Azure Data Factory, Azure SQL, Azure Blob Storage, ETL, data visualization

---

### 🤖 Phase 3 Capstone (Week 16): AI Engineering Feature

**Built during Week 16, shipped to production**

**Example Features**:

1. **AI Code Review Assistant**
   - FastAPI backend
   - Analyze student code submissions
   - Gemini for syntax/style checks (fast, cheap)
   - Azure OpenAI for architecture review (quality)
   - Presidio to protect student code privacy
   - **Impact**: Instant feedback on code quality

2. **Veteran Benefits Chatbot**
   - RAG system with VA benefits documentation
   - Gemini embeddings for document indexing
   - Azure OpenAI for generation (compliance)
   - Presidio for PII protection
   - FastAPI + Next.js widget
   - **Impact**: Help veterans navigate benefits

3. **AI Assignment Generator**
   - LLM-powered coding challenge creator
   - Parse existing assignments to learn patterns
   - Generate varied problems based on difficulty
   - Presidio to ensure no sensitive data
   - Admin interface in Next.js
   - **Impact**: Endless fresh practice problems

4. **Smart Certificate Generator**
   - AI-generated personalized accomplishment summary
   - Analyze student's course performance with Python
   - Generate custom feedback with Gemini
   - Add to existing certificate system
   - Presidio for PII protection
   - **Impact**: Meaningful, shareable certificates

5. **Intelligent Q&A System**
   - RAG with VWC curriculum documentation
   - Vector database for fast retrieval
   - Multi-provider LLM (Gemini + Azure OpenAI)
   - 24/7 assistant for student questions
   - **Impact**: Reduce instructor support burden

**Skills Used**: FastAPI, Gemini API, Azure OpenAI, LangChain, Presidio, RAG, vector databases, Azure deployment

---

## 🎯 Requirements for Each Feature

**Phase 1 Feature (Week 8)**:
- ✅ Full-stack Next.js application
- ✅ PostgreSQL database with Prisma
- ✅ User authentication (NextAuth)
- ✅ Responsive UI (Tailwind CSS)
- ✅ Deployed to Vercel
- ✅ Unit tests for API routes
- ✅ PR reviewed and merged

**Phase 2 Feature (Week 13)**:
- ✅ Python ETL pipeline
- ✅ Azure services (Data Factory, SQL, or Blob Storage)
- ✅ Complex SQL queries
- ✅ Data validation and error handling
- ✅ Scheduled automation
- ✅ Documentation of data flows
- ✅ PR reviewed and merged

**Phase 3 Feature (Week 16)**:
- ✅ FastAPI backend
- ✅ Multi-provider LLM integration (Gemini + Azure OpenAI)
- ✅ Presidio for privacy protection
- ✅ Containerized with Docker
- ✅ Deployed to Azure
- ✅ Monitoring and logging
- ✅ PR reviewed and merged

---

## 📋 Week 17 Deliverables

### Portfolio Presentation (Friday of Week 17)

**Each student presents their 3-feature portfolio**:

**1. Software Engineering Feature** (5 minutes)
   - Live demo of the feature
   - Show the code (highlight key parts)
   - Explain technical decisions
   - Show it running in production

**2. Data Engineering Feature** (5 minutes)
   - Demo the pipeline or dashboard
   - Show the data flow architecture
   - Explain ETL logic and SQL queries
   - Show metrics/results

**3. AI Engineering Feature** (5 minutes)
   - Live demo with real LLM calls
   - Explain provider selection logic
   - Demo privacy protection (Presidio)
   - Show cost optimization strategy

**4. Integration & Impact** (5 minutes)
   - How all three features work together
   - Overall impact on VWC platform
   - Lessons learned across all phases
   - What you'd build next

**Total Presentation**: 20 minutes + 10 min Q&A

---

## 🏆 Final Portfolio Package

**What Students Graduate With**:

1. **Three Production Features** on VWC platform:
   - Software Engineering feature (Weeks 1-8)
   - Data Engineering feature (Weeks 9-13)
   - AI Engineering feature (Weeks 14-17)

2. **Three GitHub Pull Requests**:
   - Merged PRs showing professional code
   - Code review comments and iterations
   - Complete with tests and documentation

3. **Production URLs**:
   - Live features students can demo to employers
   - Real metrics and usage data
   - Actual impact on veterans

4. **Technical Portfolio**:
   - Personal portfolio website (built in Phase 1)
   - Showcases all three features
   - Links to code, PRs, live demos
   - Impact metrics

---

## 💼 The Hiring Pitch

**Students can say to employers**:

> "I'm a Full-Stack AI Engineer. During my training at Vets Who Code, I shipped three production features to a platform serving thousands of veterans:
>
> 1. **[Software Feature]** - Next.js app with 500+ daily users
> 2. **[Data Feature]** - ETL pipeline processing 10k+ records daily
> 3. **[AI Feature]** - LLM-powered tool saving instructors 20 hours/week
>
> Here's the code [links to PRs], and here it is live [demo]. I can own features end-to-end from idea to production."

---

## ✨ Why This Multi-Feature Capstone Approach?

✅ **Real-world experience**: Ship code to a production platform used by veterans
✅ **Portfolio depth**: THREE production features, not just one project
✅ **Versatility**: Demonstrate skills across software, data, and AI
✅ **Full ownership**: Own features end-to-end, not just contribute
✅ **Team skills**: Code review, collaboration, Git workflow in real environment
✅ **Confidence**: "I've shipped production features in all three domains"
✅ **Give back**: Improve the platform that trained you
✅ **Immediate impact**: Features serve real users from day one

**Employers see**: A candidate who can ship features across the entire modern tech stack, not just one specialty.

**VWC benefits**: Platform continuously improves with each cohort's contributions.

**Students benefit**: Graduate with a portfolio that proves production experience, not just bootcamp projects.

---

## 📊 Feature Assignment Process

**Week 1**: Students receive feature options for each phase
- Instructors curate a backlog of needed features
- Students can choose or propose their own
- Features scoped to be completable in capstone week

**Week 8, 13, 16**: Build and ship each phase's feature
- Feature design review (Monday)
- Build during the week
- Code review and deployment (Friday)
- Feature goes live

**Week 17**: Polish and integration
- Ensure all three features are production-ready
- Final testing and bug fixes
- Prepare portfolio presentation
- Demo day!

---

## 🔧 Technical Stack Summary

### Languages & Frameworks
```
Phase 1: JavaScript/TypeScript, React, Next.js
Phase 2: Python, SQL
Phase 3: Python, FastAPI
```

### Databases
```
Phase 1: PostgreSQL (Prisma ORM)
Phase 2: Azure SQL, PostgreSQL
Phase 3: Vector databases (Pinecone/Azure Cognitive Search)
```

### Cloud & Deployment
```
Phase 1: Vercel
Phase 2: Microsoft Azure (Data Factory, Blob Storage, SQL)
Phase 3: Azure (Container Apps, OpenAI, AI Services)
```

### AI/ML Tools
```
Phase 3 Only:
- Google Gemini API
- Azure OpenAI Service
- LangChain (multi-provider)
- Presidio
- Azure AI Content Safety
```

### Multi-Provider LLM Strategy

**Why Gemini + Azure OpenAI?**

Students learn to work with **both** major LLM providers, giving them flexibility and real-world skills:

| Use Case | Gemini | Azure OpenAI |
|----------|---------|--------------|
| **Cost** | ✅ More affordable for high-volume | Standard OpenAI pricing |
| **Speed** | ✅ Fast inference | Fast inference |
| **Multimodal** | ✅ Native image/video support | Image support (GPT-4 Vision) |
| **Enterprise** | Good for startups | ✅ Best for enterprise (compliance, SLAs) |
| **Integration** | Google Cloud | ✅ Azure ecosystem integration |
| **Privacy** | Good | ✅ Enterprise-grade (HIPAA, SOC 2) |

**Teaching Strategy**:
- **Week 14**: Learn both APIs, compare strengths/weaknesses
- **Week 15**: Use both in RAG (Gemini for embeddings, Azure for generation)
- **Week 16**: Implement privacy with Presidio for both providers
- **Week 17**: Deploy with provider selection logic and fallbacks

**Real-World Pattern**:
```python
# Students learn to abstract providers
class LLMProvider:
    def __init__(self, provider="gemini"):
        if provider == "gemini":
            self.client = gemini_client
        elif provider == "azure":
            self.client = azure_openai_client

    def generate(self, prompt):
        # Unified interface for both providers
        pass
```

---

## 📊 Skill Transferability Map

### From Phase 1 → Phase 2:
✅ **Git workflow** → Use for Python projects
✅ **API concepts** → Build data APIs
✅ **Database knowledge** → Advanced SQL
✅ **Environment variables** → Azure secrets
✅ **Deployment** → Azure deployment

### From Phase 2 → Phase 3:
✅ **Python** → FastAPI development
✅ **Azure** → Deploy AI services
✅ **SQL** → Store AI metadata
✅ **ETL** → Prepare data for AI
✅ **Data processing** → Pre/post-process AI data

### All Phases Together:
✅ **Capstone**: Full-stack AI app using Next.js + Azure + FastAPI + LLMs

---

## 🎓 Weekly Time Commitment

**Total**: ~25-30 hours/week

**Breakdown**:
- **Live Sessions**: 4-6 hours/week
  - Monday: Kickoff lecture (2 hours)
  - Wednesday: Office hours (2 hours)
  - Friday: Review/showcase (2 hours optional)

- **Self-Paced Work**: 20-24 hours/week
  - Reading documentation
  - Video tutorials
  - Coding assignments
  - Project work

---

## 📋 Elite Cohort Schedule

### One Elite Cohort Per Year

**Vets Who Code runs ONE highly selective cohort annually** - making it the most exclusive, high-touch, AI-driven tech training program on the planet.

### Cohort 2026 Timeline (Aligned with September Surge)

**Strategic Timing**: Graduate in August, hit the September hiring surge when companies have refreshed budgets and are actively hiring.

```
Application Period:  November 2025 - January 2026 (Highly selective)
Selection Process:   January - February 2026
Cohort Announced:    March 1, 2026 (20-30 elite veterans selected)
Pre-work Period:     March 2026 (4 weeks of preparation)

COHORT START:        April 7, 2026

Week 1:   April 7   - Phase 1 Start: Git & HTML/CSS
Week 2:   April 14  - Web Fundamentals
Week 3:   April 21  - JavaScript & TypeScript
Week 4:   April 28  - React Deep Dive
Week 5:   May 5     - Next.js Advanced
Week 6:   May 12    - Backend & APIs
Week 7:   May 19    - Full-Stack Integration
Week 8:   May 26    - Phase 1 Capstone: Ship Software Feature ✅

Week 9:   June 2    - Phase 2 Start: Python & Data
Week 10:  June 9    - SQL & Database Engineering
Week 11:  June 16   - Azure & Cloud Services
Week 12:  June 23   - ETL Pipelines
Week 13:  June 30   - Phase 2 Capstone: Ship Data Feature ✅

Week 14:  July 7    - Phase 3 Start: FastAPI & LLMs
Week 15:  July 14   - RAG & Vector Databases
Week 16:  July 21   - Phase 3 Capstone: Ship AI Feature ✅
Week 17:  July 28   - Portfolio Integration & Demo Day

GRADUATION:          August 7, 2026 🎓

Post-Graduation:     August 8 - December 2026
- August: Portfolio polish, interview prep
- September: HIRING SURGE - Active job search begins
- October-December: Continued placement support
```

**Cohort Size**: 20-30 elite veterans (highly selective)
**Format**: Full-time, intensive (40-50 hours/week)
**Support**: White-glove mentorship, 1-on-1 coaching

**Why This Timeline Works**:
✅ **Graduation in August** - Perfect timing before September surge
✅ **September Surge** - Companies have Q4 budgets, urgent hiring needs
✅ **Fresh graduates** - Hit the market when demand is highest
✅ **4 months runway** - Sep-Dec for placements before year-end
✅ **Strategic advantage** - Traditional bootcamps graduate off-cycle

---

## 💾 Database Schema Updates Needed

### Add to Course Model:

```prisma
model Course {
  // ... existing fields

  // 17-week structure
  phase       CoursePhase
  weekStart   Int          // Week number (1-17)
  weekEnd     Int          // Week number (1-17)
  stackTech   String[]     // e.g., ["Next.js", "React", "TypeScript"]

  // Prerequisites as course IDs
  prerequisites String?     // JSON array of prerequisite course IDs
}

enum CoursePhase {
  SOFTWARE_ENGINEERING  // Weeks 1-8
  DATA_ENGINEERING      // Weeks 9-13
  AI_ENGINEERING        // Weeks 14-17
}
```

### Add Cohort Model:

```prisma
model Cohort {
  id          String   @id @default(cuid())
  name        String   // "2025-Q2"
  startDate   DateTime
  currentWeek Int      @default(1)

  users       User[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🎯 Success Criteria

### Phase Completion:
- ✅ 70%+ average on assignments
- ✅ Capstone project passed
- ✅ All required skills demonstrated

### Program Completion:
- ✅ Complete all 3 phases
- ✅ Pass all capstone projects
- ✅ Final portfolio with 3 major projects
- **🏆 Certificate**: Full-Stack AI Engineer (Vets Who Code)

---

## 🚀 Implementation Priority

### Immediate (This Sprint):
1. ✅ Add `phase`, `weekStart`, `weekEnd` to Course schema
2. ✅ Create Cohort model
3. ✅ Update course creation UI for phase/week
4. ✅ Document course content for Week 1-2

### Next Sprint:
1. Build prerequisite checking logic
2. Create cohort management interface
3. Build weekly progress tracking
4. Course content for Weeks 3-4

### Future:
1. Complete all 17 weeks of content
2. Build auto-unlock based on completion
3. Add live session scheduling
4. Career services integration

---

## 📝 Questions for You:

1. **Phase Duration** - Is 8-5-4 weeks correct, or would you prefer different allocation?
2. **Live Sessions** - What days/times work best for live sessions?
3. **Azure Credits** - Will students get Azure credits for Phase 2-3?
4. **OpenAI Access** - Azure OpenAI or direct OpenAI API?
5. **Capstone Scope** - Should final capstone combine all 3 phases, or can students choose focus area?

---

**Next Steps**:
1. Review this curriculum
2. Confirm tech stack choices
3. Approve week allocation
4. I'll update the database schema
5. Build prerequisite system
6. Start creating Week 1 content

---

**Version**: 2.0 (VWC Stack)
**Date**: November 6, 2025
**Status**: Ready for Review
