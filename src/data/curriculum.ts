/**
 * Module registry for the Hashflag Stack.
 *
 * This file holds the time/module structure of the program — phases, week ranges, and the
 * numbered modules the Hashflag Graph cites in each topic's `source` (e.g. "M07 §7.4").
 * It deliberately does NOT hold topic lists, stacks or skill counts: that content lives in
 * the graph at src/data/curriculum-graph, and keeping a second copy here is what let the
 * site drift into quoting four different numbers for the same curriculum.
 *
 * Counts are derived, never typed. __tests__/lib/curriculum-graph.test.ts asserts that
 * every module the graph cites exists here.
 */

export type Module = {
    n: number;
    title: string;
    oneLiner: string;
};

export type PhaseId =
    | "foundations"
    | "software-engineering"
    | "ai-engineering"
    | "production-mastery";

export type Phase = {
    id: PhaseId;
    num: string;
    name: string;
    weeks: string;
    weekRange: [number, number];
    tagline: string;
    intro: string;
    outcome: string;
    modules: Module[];
};

const phases: Phase[] = [
    {
        id: "foundations",
        num: "01",
        name: "Foundations",
        weeks: "Weeks 1–4",
        weekRange: [1, 4],
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
            },
            {
                n: 2,
                title: "VS Code Mastery",
                oneLiner: "Configure your primary workspace for maximum speed and efficiency.",
            },
            {
                n: 3,
                title: "Git & GitHub",
                oneLiner:
                    "Write code like a professional. Version everything, review everything, collaborate on everything.",
            },
            {
                n: 4,
                title: "HTML & CSS Fundamentals",
                oneLiner:
                    "Build the visual layer of the web with semantic, accessible, responsive code.",
            },
            {
                n: 5,
                title: "JavaScript Fundamentals",
                oneLiner: "The language of the web. Master it here, build with it everywhere.",
            },
            {
                n: 6,
                title: "Python Fundamentals",
                oneLiner: "Your second language and the backbone of AI engineering.",
            },
            {
                n: 7,
                title: "Software Development Life Cycle",
                oneLiner: "Learn how real teams build real software.",
            },
            {
                n: 8,
                title: "Code Challenges",
                oneLiner:
                    "Sharpen problem-solving and prepare for technical interviews from day one.",
            },
        ],
    },
    {
        id: "software-engineering",
        num: "02",
        name: "Software Engineering",
        weeks: "Weeks 5–9",
        weekRange: [5, 9],
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
            },
            {
                n: 10,
                title: "Next.js Application Development",
                oneLiner: "Build complete applications with the framework powering the modern web.",
            },
            {
                n: 11,
                title: "Testing Fundamentals",
                oneLiner: "Untested code is broken code. Period.",
            },
            {
                n: 12,
                title: "Deployment & CI/CD",
                oneLiner: "Automate everything between your code and your users.",
            },
            {
                n: 13,
                title: "Media Management & Analytics",
                oneLiner: "Images and video can make or break your app's performance.",
            },
        ],
    },
    {
        id: "ai-engineering",
        num: "03",
        name: "AI Engineering",
        weeks: "Weeks 9–14",
        weekRange: [9, 14],
        tagline: "Beyond prompts — build the systems behind the AI tools everyone else just uses.",
        intro: "Go beyond prompts. This is where VWC graduates separate from every other bootcamp — you won't just use AI tools, you'll build the systems behind them. Production APIs, retrieval-augmented generation, autonomous agents, and real-time streaming interfaces.",
        outcome: "Design, build, and deploy AI-powered applications from scratch.",
        modules: [
            {
                n: 14,
                title: "AI Foundations",
                oneLiner: "Before you write AI code, understand what AI actually is.",
            },
            {
                n: 15,
                title: "Advanced Python for AI",
                oneLiner: "Level up to production patterns.",
            },
            {
                n: 16,
                title: "FastAPI: Production AI APIs",
                oneLiner: "Build the backend that powers AI applications at scale.",
            },
            {
                n: 17,
                title: "Google Gemini Integration",
                oneLiner: "Connect to frontier AI models for text and multimodal apps.",
            },
            {
                n: 18,
                title: "Professional Prompt Engineering",
                oneLiner: "Systematic techniques that consistently produce better results.",
            },
            { n: 19, title: "RAG Systems", oneLiner: "Give AI applications real knowledge." },
            {
                n: 20,
                title: "AI Agents & Workflows",
                oneLiner: "Build autonomous systems that reason, plan, and act.",
            },
            {
                n: 21,
                title: "Full-Stack AI Integration",
                oneLiner: "Connect everything — frontend, backend, model.",
            },
        ],
    },
    {
        id: "production-mastery",
        num: "04",
        name: "Production Mastery",
        weeks: "Weeks 15–17",
        weekRange: [15, 17],
        tagline: "Ship, monitor, and maintain AI systems at scale.",
        intro: "Building is only half the job. This phase teaches you to ship, monitor, and maintain AI systems at scale. Testing AI output, observability, containerized deployment, and responsible AI governance — this is what separates engineers from hobbyists.",
        outcome:
            "Ship, monitor, and scale real AI applications, and leave with a body of work — blogs, pull requests, shipped features and verified reps — that keeps growing after week 17.",
        modules: [
            {
                n: 22,
                title: "Testing AI Systems",
                oneLiner: "AI systems need different testing strategies.",
            },
            {
                n: 23,
                title: "LLMOps & Observability",
                oneLiner: "You can't improve what you can't measure.",
            },
            {
                n: 24,
                title: "Production Deployment",
                oneLiner: "Getting AI to production is different from traditional software.",
            },
            {
                n: 25,
                title: "Ethics, Safety & Governance",
                oneLiner: "AI systems can cause harm. Build responsibly.",
            },
            {
                n: 32,
                title: "Harness Engineering",
                oneLiner: "Agents fail. A harness is what makes the failure safe.",
            },
        ],
    },
];

export const PHASES = phases;

/** Inclusive week span of a phase. */
export const weekCount = (p: Phase) => p.weekRange[1] - p.weekRange[0] + 1;

/** "4 weeks · 8 modules" — derived so the module count can never go stale. */
export const durationLabel = (p: Phase) => `${weekCount(p)} weeks · ${p.modules.length} modules`;

/** Every module, flattened, with the phase it belongs to. */
export const ALL_MODULES = phases.flatMap((p) =>
    p.modules.map((m) => ({ ...m, phase: p.name, phaseId: p.id }))
);
