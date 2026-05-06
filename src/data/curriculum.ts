export type Module = {
    n: number;
    title: string;
    oneLiner: string;
    stack: string[];
    topics: string[];
};

export type PhaseId =
    | "foundations"
    | "software-engineering"
    | "ai-engineering"
    | "production-mastery";

export type Phase = {
    id: PhaseId;
    num: "01" | "02" | "03" | "04";
    name: string;
    weeks: string;
    weekRange: [number, number];
    moduleRange: [number, number];
    durationLabel: string;
    tagline: string;
    intro: string;
    outcome: string;
    modules: Module[];
};

export type Capstone = {
    title: string;
    subtitle: string;
    blurb: string;
    required: string[];
    stack: Record<string, string[]>;
};

export type Principle = {
    n: string;
    t: string;
    d: string;
};

export type StackGroup = {
    label: string;
    items: string[];
};

export const PHASES: Phase[] = [
    {
        id: "foundations",
        num: "01",
        name: "Foundations",
        weeks: "Weeks 1–4",
        weekRange: [1, 4],
        moduleRange: [1, 8],
        durationLabel: "4 weeks · 8 modules",
        tagline: "Master the tools that separate professionals from hobbyists.",
        intro: "Before you write application code, you need to think like an engineer — navigate systems, control your environment, and solve problems methodically. Every module here builds muscle memory you'll use for the rest of your career.",
        outcome:
            "Navigate any codebase, push code professionally, and solve problems like an engineer.",
        modules: [
            {
                n: 1,
                title: "Terminal Mastery",
                oneLiner:
                    "Dominate the command line. Every tool has a CLI; the fastest path runs through the terminal.",
                stack: ["Bash", "Zsh", "grep", "sed", "awk"],
                topics: [
                    "File system navigation (cd, pwd, ls, paths, dotfiles)",
                    "File ops (touch, mkdir -p, cp, mv, rm, find)",
                    "Text processing (grep, sed, awk, sort, uniq, wc, diff)",
                    "Piping & redirection (stdin/stdout/stderr, xargs)",
                    "Shell config (.zshrc, env vars, PATH, aliases, functions)",
                    "Package management (apt, brew, npm)",
                    "Process management (ps, top, kill, jobs, nohup)",
                ],
            },
            {
                n: 2,
                title: "VS Code Mastery",
                oneLiner: "Configure your primary workspace for maximum speed and efficiency.",
                stack: ["VS Code", "ESLint", "Prettier"],
                topics: [
                    "IDE setup, workspaces & profiles",
                    "Extensions for the VWC stack",
                    "Debugging tools & launch configs",
                    "Keyboard shortcuts & multi-cursor workflows",
                    "Git integration, linting & formatting",
                    "Custom settings, snippets, and keybindings",
                ],
            },
            {
                n: 3,
                title: "Git & GitHub",
                oneLiner:
                    "Write code like a professional. Version everything, review everything, collaborate on everything.",
                stack: ["Git", "GitHub", "GitHub Actions"],
                topics: [
                    "Version control fundamentals",
                    "Branching strategies & merge conflict resolution",
                    "Pull requests & code review etiquette",
                    "GitHub Actions and CI basics",
                    "Collaborative development on real codebases",
                ],
            },
            {
                n: 4,
                title: "HTML & CSS Fundamentals",
                oneLiner:
                    "Build the visual layer of the web with semantic, accessible, responsive code.",
                stack: ["HTML5", "CSS3", "A11y"],
                topics: [
                    "Semantic HTML5 & document structure",
                    "Accessibility fundamentals (WCAG, ARIA)",
                    "CSS Box Model, Flexbox, CSS Grid",
                    "Responsive design and media queries",
                    "Mobile-first design with transitions and animations",
                ],
            },
            {
                n: 5,
                title: "JavaScript Fundamentals",
                oneLiner: "The language of the web. Master it here, build with it everywhere.",
                stack: ["JavaScript", "ES6+", "DOM"],
                topics: [
                    "Variables, data types, control flow",
                    "Functions, arrays, and objects",
                    "DOM manipulation and event handling",
                    "ES6+ features: destructuring, spread, modules",
                    "Async/await, Promises, and the event loop",
                ],
            },
            {
                n: 6,
                title: "Python Fundamentals",
                oneLiner: "Your second language and the backbone of AI engineering.",
                stack: ["Python 3.11+", "venv"],
                topics: [
                    "Variables, data types, control structures",
                    "Functions, lists, dictionaries, tuples",
                    "Object-oriented programming",
                    "Modules and virtual environments",
                    "File I/O with error handling",
                ],
            },
            {
                n: 7,
                title: "Software Development Life Cycle",
                oneLiner: "Learn how real teams build real software.",
                stack: ["Agile", "Scrum", "Jira"],
                topics: [
                    "Agile methodology & Scrum framework",
                    "Sprint planning, standups, retrospectives",
                    "User stories and project management",
                    "Technical writing for engineers",
                    "Team collaboration patterns",
                ],
            },
            {
                n: 8,
                title: "Code Challenges",
                oneLiner:
                    "Sharpen problem-solving and prepare for technical interviews from day one.",
                stack: ["DSA", "LeetCode"],
                topics: [
                    "Data structures: arrays, linked lists, stacks, queues",
                    "Hash maps, trees, and graphs",
                    "Algorithms: sorting, searching, recursion",
                    "Big O complexity analysis",
                    "Whiteboard problem-solving strategies",
                ],
            },
        ],
    },
    {
        id: "software-engineering",
        num: "02",
        name: "Software Engineering",
        weeks: "Weeks 5–9",
        weekRange: [5, 9],
        moduleRange: [9, 13],
        durationLabel: "5 weeks · 5 modules",
        tagline: "From writing code to engineering software — architecture, testing, deployment.",
        intro: "Build full-stack applications with modern frameworks and ship them to production. This phase takes you from writing code to engineering software — architecture, testing, deployment, and the interview skills to get paid for it.",
        outcome:
            "Build, test, and deploy production applications. Ship features to real users on the VWC platform.",
        modules: [
            {
                n: 9,
                title: "Advanced JavaScript & TypeScript",
                oneLiner:
                    "Level up to the type-safe, scalable patterns used in production codebases.",
                stack: ["TypeScript", "ES2024"],
                topics: [
                    "TypeScript fundamentals and type system",
                    "Interfaces, generics, and utility types",
                    "Closures, prototypes, advanced patterns",
                    "Module systems and build tools",
                    "Advanced async patterns",
                ],
            },
            {
                n: 10,
                title: "Next.js Application Development",
                oneLiner: "Build complete applications with the framework powering the modern web.",
                stack: ["Next.js 14+", "Tailwind", "React"],
                topics: [
                    "App Router architecture, layouts, templates",
                    "Server vs Client Components",
                    "Data fetching with caching and ISR",
                    "Server Actions and API routes",
                    "Tailwind CSS styling",
                    "Performance: next/image, next/font, edge runtime",
                ],
            },
            {
                n: 11,
                title: "Testing Fundamentals",
                oneLiner: "Untested code is broken code. Period.",
                stack: ["Jest", "Playwright", "RTL"],
                topics: [
                    "The testing pyramid and TDD",
                    "Jest: matchers, mocking, async tests",
                    "React Testing Library",
                    "Integration testing patterns",
                    "E2E with Playwright (POM, visual regression)",
                    "Test integration in CI",
                ],
            },
            {
                n: 12,
                title: "Deployment & CI/CD",
                oneLiner: "Automate everything between your code and your users.",
                stack: ["Vercel", "GitHub Actions"],
                topics: [
                    "Vercel deployment and preview deploys",
                    "GitHub Actions: triggers, jobs, secrets",
                    "Matrix builds and caching",
                    "CI: lint, typecheck, test pipelines",
                    "CD: feature flags, rollbacks, blue-green",
                ],
            },
            {
                n: 13,
                title: "Media Management & Analytics",
                oneLiner: "Images and video can make or break your app's performance.",
                stack: ["Cloudinary", "GA4", "Clarity"],
                topics: [
                    "Cloudinary: upload, transforms, optimization",
                    "Modern formats: WebP, AVIF, lazy loading",
                    "Microsoft Clarity: session recordings, heatmaps",
                    "Google Analytics 4 setup",
                    "Event tracking and conversion analysis",
                ],
            },
        ],
    },
    {
        id: "ai-engineering",
        num: "03",
        name: "AI Engineering",
        weeks: "Weeks 9–14",
        weekRange: [9, 14],
        moduleRange: [14, 21],
        durationLabel: "6 weeks · 8 modules",
        tagline: "Beyond prompts — build the systems behind the AI tools everyone else just uses.",
        intro: "Go beyond prompts. This is where VWC graduates separate from every other bootcamp — you won't just use AI tools, you'll build the systems behind them. Production APIs, retrieval-augmented generation, autonomous agents, and real-time streaming interfaces.",
        outcome: "Design, build, and deploy AI-powered applications from scratch.",
        modules: [
            {
                n: 14,
                title: "AI Foundations",
                oneLiner: "Before you write AI code, understand what AI actually is.",
                stack: ["Theory", "LLMs"],
                topics: [
                    "AI / ML / Deep Learning hierarchy",
                    "Learning paradigms (supervised, unsupervised, RL)",
                    "Transformer architecture explained",
                    "Tokens, embeddings, and context windows",
                    "LLM landscape: GPT-4, Claude, Gemini, Llama",
                ],
            },
            {
                n: 15,
                title: "Advanced Python for AI",
                oneLiner: "Level up to production patterns.",
                stack: ["Python 3.11+", "Pydantic v2", "uv", "asyncio"],
                topics: [
                    "Python 3.11+ features and uv toolchain",
                    "Type hints and structural typing",
                    "Pydantic v2: BaseModel, validators, serialization",
                    "BaseSettings, computed fields, JSON schema",
                    "Async Python: asyncio, httpx",
                ],
            },
            {
                n: 16,
                title: "FastAPI: Production AI APIs",
                oneLiner: "Build the backend that powers AI applications at scale.",
                stack: ["FastAPI", "Pydantic", "OpenAPI"],
                topics: [
                    "Routing and request/response models",
                    "Dependency injection and OpenAPI 3.1",
                    "Streaming responses (SSE, AsyncIterator)",
                    "Middleware, CORS, auth, rate limiting",
                    "Background tasks and workers",
                ],
            },
            {
                n: 17,
                title: "Google Gemini Integration",
                oneLiner: "Connect to frontier AI models for text and multimodal apps.",
                stack: ["Gemini Pro", "Gemini Flash"],
                topics: [
                    "Gemini Pro vs Flash, generation config",
                    "Streaming, chat sessions, tool calling",
                    "Structured output (JSON mode + Pydantic schema)",
                    "Multimodal inputs (image, audio, PDF)",
                    "Function calling patterns",
                ],
            },
            {
                n: 18,
                title: "Professional Prompt Engineering",
                oneLiner: "Systematic techniques that consistently produce better results.",
                stack: ["CoT", "ReAct", "Jinja2"],
                topics: [
                    "Zero-, one-, and few-shot prompting",
                    "Chain of Thought, Self-Consistency",
                    "Tree of Thoughts, ReAct",
                    "XML tags and schema-guided generation",
                    "Jinja2 templates and A/B testing prompts",
                ],
            },
            {
                n: 19,
                title: "RAG Systems",
                oneLiner: "Give AI applications real knowledge.",
                stack: ["pgvector", "ChromaDB", "Embeddings"],
                topics: [
                    "Document ingestion and chunking strategies",
                    "Embeddings and vector stores",
                    "pgvector and ChromaDB",
                    "Hybrid search and reranking",
                    "Query expansion (HyDE)",
                    "Evaluation: Precision@k, Recall@k, MRR, faithfulness",
                ],
            },
            {
                n: 20,
                title: "AI Agents & Workflows",
                oneLiner: "Build autonomous systems that reason, plan, and act.",
                stack: ["LangChain", "LangGraph"],
                topics: [
                    "Agent architecture: perception, reasoning, action, reflection",
                    "Tool use and function calling",
                    "Memory systems (short and long term)",
                    "LangChain and LangGraph",
                    "Multi-agent systems",
                    "Human-in-the-loop patterns",
                ],
            },
            {
                n: 21,
                title: "Full-Stack AI Integration",
                oneLiner: "Connect everything — frontend, backend, model.",
                stack: ["Next.js", "SSE", "Zod"],
                topics: [
                    "Next.js patterns for AI apps",
                    "Server Components for AI workflows",
                    "Streaming chat UI (SSE, token-by-token, markdown)",
                    "Type-safe integration (OpenAPI client gen, Zod ↔ Pydantic)",
                    "File upload with multimodal support",
                ],
            },
        ],
    },
    {
        id: "production-mastery",
        num: "04",
        name: "Production Mastery",
        weeks: "Weeks 15–17",
        weekRange: [15, 17],
        moduleRange: [22, 25],
        durationLabel: "3 weeks · 4 modules + capstone",
        tagline: "Ship, monitor, and maintain AI systems at scale.",
        intro: "Building is only half the job. This phase teaches you to ship, monitor, and maintain AI systems at scale. Testing AI output, observability, containerized deployment, and responsible AI governance — this is what separates engineers from hobbyists.",
        outcome:
            "Ship, monitor, and scale real AI applications. Complete a production capstone that proves mastery of the entire Hashflag Stack.",
        modules: [
            {
                n: 22,
                title: "Testing AI Systems",
                oneLiner: "AI systems need different testing strategies.",
                stack: ["pytest", "K6"],
                topics: [
                    "pytest: fixtures, async testing",
                    "FastAPI TestClient",
                    "Streaming endpoint tests",
                    "K6 load testing: VUs, scenarios, thresholds",
                    "LLM output evaluation: factuality, relevance",
                    "Automated eval pipelines",
                ],
            },
            {
                n: 23,
                title: "LLMOps & Observability",
                oneLiner: "You can't improve what you can't measure.",
                stack: ["LangSmith", "Prometheus"],
                topics: [
                    "LangSmith: tracing, eval datasets, prompt versioning",
                    "Cost tracking per prompt and per user",
                    "Structured logging",
                    "Prometheus metrics and dashboards",
                    "AI-specific metrics: latency, tokens, error rates",
                    "Budget alerts",
                ],
            },
            {
                n: 24,
                title: "Production Deployment",
                oneLiner: "Getting AI to production is different from traditional software.",
                stack: ["Docker", "Cloud Run"],
                topics: [
                    "Docker: Dockerfile best practices, multi-stage builds",
                    "Google Cloud Run: config, secrets, scaling",
                    "Cloud SQL connection patterns",
                    "GitHub Actions for Python services",
                    "CI/CD automation and rollbacks",
                    "The production-readiness checklist",
                ],
            },
            {
                n: 25,
                title: "Ethics, Safety & Governance",
                oneLiner: "AI systems can cause harm. Build responsibly.",
                stack: ["Governance", "Safety"],
                topics: [
                    "Bias and fairness audits",
                    "Prompt injection defense",
                    "Data poisoning and model extraction",
                    "PII leakage and explainability",
                    "GDPR and ISO 42001 for AI",
                    "Model cards and content safety filters",
                    "Incident response",
                ],
            },
        ],
    },
];

export const CAPSTONE: Capstone = {
    title: "AI-Powered Document Intelligence Platform",
    subtitle: "Capstone Project · Final Mission",
    blurb: "Build a complete production system that proves mastery of the entire Hashflag Stack. Real users, real data, real consequences.",
    required: [
        "Auth and user management",
        "Document upload with intelligent chunking",
        "Streaming chat with citations",
        "Conversation history",
        "Admin dashboard",
        "Safety measures and content filters",
    ],
    stack: {
        Frontend: ["Next.js 14+", "Streaming chat UI", "Tailwind"],
        Backend: ["FastAPI", "Pydantic v2", "Async Python"],
        AI: ["Google Gemini", "RAG", "Function calling"],
        Data: ["Postgres", "pgvector", "Cloud SQL"],
        Infra: ["Docker", "Cloud Run", "Vercel"],
        Ops: ["LangSmith", "pytest", "Playwright", "K6"],
    },
};

export const PRINCIPLES: Principle[] = [
    {
        n: "01",
        t: "Built for adults",
        d: "We don't ask you to put your life on hold. 20–30 hrs/week, mostly async, instructor support during evenings and weekends.",
    },
    {
        n: "02",
        t: "Practice over theory",
        d: "90% hands-on. You ship deployable code from week one, on a real production codebase built to serve our veterans.",
    },
    {
        n: "03",
        t: "Market-validated",
        d: "128 skills cross-checked against billions of job postings via Lightcast. If employers aren't hiring for it, we don't teach it.",
    },
    {
        n: "04",
        t: "Sequenced, not buffet",
        d: "Each module assumes the previous. You finish Phase 1 before Phase 2 unlocks. Mastery, not menu.",
    },
];

export const STACK_INVENTORY: StackGroup[] = [
    { label: "Dev Environment", items: ["Bash", "Zsh", "VS Code", "Git", "GitHub"] },
    {
        label: "Frontend",
        items: ["JavaScript", "TypeScript", "Next.js 14+", "Tailwind CSS", "Jest", "Playwright"],
    },
    {
        label: "Backend & AI",
        items: [
            "Python 3.11+",
            "FastAPI",
            "Pydantic v2",
            "Google Gemini",
            "LangChain",
            "LangSmith",
        ],
    },
    { label: "Data", items: ["Postgres", "pgvector", "ChromaDB", "OpenAPI 3.1"] },
    { label: "Infrastructure", items: ["Vercel", "Cloud Run", "Docker", "GitHub Actions", "K6"] },
];

export const HERO_META: Array<[string, string]> = [
    ["Duration", "17 weeks · part-time"],
    ["Hours/week", "20–30 hrs"],
    ["Format", "Remote · async + live"],
    ["Tuition", "$0 · for veterans"],
    ["Phases", "4 · sequenced"],
    ["Skills", "128 · market-validated"],
    ["Capstone", "Production system"],
    ["Outcome", "Software Engineer, AI · $85–130K"],
];

export const CTA_ASIDE_ROWS: Array<[string, string]> = [
    ["Application closes", "Rolling"],
    ["Cohort starts", "Q1 2026"],
    ["Seats", "Small · capped"],
    ["Eligibility", "U.S. veterans & spouses"],
    ["Cost", "$0"],
];
