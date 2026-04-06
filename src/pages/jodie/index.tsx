import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { useCallback, useState } from "react";
import { options } from "@/pages/api/auth/options";
import Link from "next/link";

type Pillar = "learn" | "code" | "debug";

interface Message {
    role: "user" | "assistant";
    content: string;
}

type PageProps = {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

// Hashflag Stack: 25 modules + capstone across 4 phases (17 weeks)
const HASHFLAG_MODULES = [
    // Phase 1: Foundations — Weeks 1-4
    { module: 1, week: 1, phase: "Foundations", title: "Terminal Mastery", topics: "File system navigation, file operations, text processing (grep/sed/awk), piping & redirection, shell config (.zshrc), package management, process management, SSH, shell scripting" },
    { module: 2, week: 1, phase: "Foundations", title: "VS Code Mastery", topics: "Core navigation, Command Palette, extensions (ESLint, Prettier, GitLens), workspace config, integrated terminal, debugging (JS/Python), keyboard shortcuts" },
    { module: 3, week: 2, phase: "Foundations", title: "Git & GitHub", topics: "Git architecture, staging/commits, branching strategies, merging/rebasing, conflict resolution, GitHub collaboration, PRs, code review, advanced Git (stash, cherry-pick, bisect, reflog)" },
    { module: 4, week: 2, phase: "Foundations", title: "HTML & CSS Fundamentals", topics: "Semantic HTML5, accessibility, forms, CSS selectors & specificity, Box Model, Flexbox, Grid, responsive design, media queries, typography, transitions & animations" },
    { module: 5, week: 3, phase: "Foundations", title: "JavaScript Fundamentals", topics: "Variables, data types, operators, control flow, functions, closures, arrays (map/filter/reduce), objects, destructuring, DOM manipulation, events, error handling, async/await, Promises, fetch" },
    { module: 6, week: 3, phase: "Foundations", title: "Python Fundamentals", topics: "Variables, data types, control flow, functions (*args/**kwargs), lists, tuples, dicts, sets, string processing, file I/O, JSON, error handling, OOP basics, classes" },
    { module: 7, week: 4, phase: "Foundations", title: "Software Development Lifecycle", topics: "User stories, requirements, Agile/Scrum/Kanban, sprint planning, standups, retros, technical documentation, READMEs, code review best practices" },
    { module: 8, week: 4, phase: "Foundations", title: "Code Challenges", topics: "Data structures (arrays, linked lists, stacks, queues, hash maps, trees), algorithm patterns (two pointers, sliding window, recursion), Big O, 50+ easy + 25+ medium LeetCode in JS & Python. Gate: 3 problems in 90 min" },

    // Phase 2: Software Engineering — Weeks 5-9
    { module: 9, week: 5, phase: "Software Engineering", title: "Advanced JavaScript & TypeScript", topics: "ES6+ features, advanced async (Promise.all/race/allSettled), modules, classes, TypeScript fundamentals (interfaces, generics, utility types), advanced TS (conditional types, mapped types), debugging" },
    { module: 10, week: 6, phase: "Software Engineering", title: "Next.js Application Development", topics: "App Router, layouts, Server & Client Components, data fetching (ISR, Suspense, SWR), Server Actions, API routes, Tailwind CSS styling, performance optimization (next/image, next/font, code splitting)" },
    { module: 11, week: 7, phase: "Software Engineering", title: "Testing Fundamentals", topics: "Testing pyramid, TDD, Jest (matchers, mocking), React Testing Library, integration testing, E2E with Playwright (Page Object Model, visual regression), CI integration" },
    { module: 12, week: 8, phase: "Software Engineering", title: "Deployment & CI/CD", topics: "Vercel deployment, preview deploys, GitHub Actions (triggers, jobs, secrets, matrix, caching), CI pipeline (lint, typecheck, test), CD pipeline (feature flags, rollbacks, blue-green)" },
    { module: 13, week: 8, phase: "Software Engineering", title: "Media Management & Analytics", topics: "Cloudinary (upload, transforms, optimization), image formats (WebP/AVIF), lazy loading, Microsoft Clarity (session recordings, heatmaps), Google Analytics 4, event tracking" },

    // Phase 3: AI Engineering — Weeks 9-14
    { module: 14, week: 9, phase: "AI Engineering", title: "AI Foundations", topics: "AI vs ML vs Deep Learning, learning paradigms (supervised/unsupervised/reinforcement), Transformer architecture, self-attention, tokens & embeddings, context windows, LLM landscape (GPT-4, Claude, Gemini, Llama)" },
    { module: 15, week: 10, phase: "AI Engineering", title: "Advanced Python for AI", topics: "Python 3.11+ patterns, uv, type hints, Pydantic v2 (BaseModel, validators, serialization, BaseSettings, computed fields, JSON schema), async Python (asyncio, httpx)" },
    { module: 16, week: 10, phase: "AI Engineering", title: "FastAPI: Production AI APIs", topics: "Routing, path/query params, Pydantic request/response, dependency injection, OpenAPI 3.1, streaming responses (SSE, AsyncIterator), middleware, CORS, API key auth, rate limiting, background tasks" },
    { module: 17, week: 11, phase: "AI Engineering", title: "Google Gemini Integration", topics: "Gemini Pro/Flash, auth, generation config (temperature, top_p, top_k), text generation, streaming, chat sessions, structured output (JSON mode + Pydantic schema), multimodal (images, PDF, video, audio), function calling" },
    { module: 18, week: 11, phase: "AI Engineering", title: "Professional Prompt Engineering", topics: "Zero/one/few-shot, Chain of Thought, Self-Consistency, Tree of Thoughts, ReAct, XML tags & delimiters, schema-guided generation, role assignment, prompt templates (Jinja2), A/B testing, evaluation" },
    { module: 19, week: 12, phase: "AI Engineering", title: "RAG Systems", topics: "Document ingestion, chunking strategies, embeddings, pgvector (Postgres), ChromaDB, hybrid search (keyword + semantic), reranking, query expansion (HyDE), evaluation (Precision@k, Recall@k, MRR, faithfulness)" },
    { module: 20, week: 13, phase: "AI Engineering", title: "AI Agents & Workflows", topics: "Agent architecture (perception, reasoning, action, reflection), tool use & function calling, memory systems (short/long-term, episodic, semantic), LangChain, LangGraph, multi-agent systems, human-in-the-loop" },
    { module: 21, week: 14, phase: "AI Engineering", title: "Full-Stack AI Integration", topics: "Next.js AI patterns, Server Components for AI, streaming chat UI (SSE, token-by-token, markdown rendering), type-safe integration (OpenAPI client gen, Zod ↔ Pydantic), file upload (drag-and-drop, multimodal)" },

    // Phase 4: Production Mastery — Weeks 15-17
    { module: 22, week: 15, phase: "Production Mastery", title: "Testing AI Systems", topics: "pytest, fixtures, async testing, FastAPI TestClient, streaming endpoint tests, K6 load testing (virtual users, scenarios, thresholds), LLM output evaluation (factuality, relevance, automated pipelines)" },
    { module: 23, week: 15, phase: "Production Mastery", title: "LLMOps & Observability", topics: "LangSmith (tracing, evaluation datasets, prompt versioning, cost tracking), structured logging, Prometheus metrics, AI-specific metrics (latency, tokens, errors), cost management, budget alerts" },
    { module: 24, week: 16, phase: "Production Mastery", title: "Production Deployment", topics: "Docker (Dockerfile best practices, multi-stage builds), Google Cloud Run (config, secrets, scaling, Cloud SQL), GitHub Actions for Python, CI/CD automation, rollbacks, production checklist" },
    { module: 25, week: 17, phase: "Production Mastery", title: "Ethics, Safety & Governance", topics: "Bias & fairness, prompt injection defense, data poisoning, model extraction, PII leakage, explainability, GDPR for AI, ISO 42001, model cards, content safety filters, incident response" },
];

const JodiePage: PageWithLayout = () => {
    const [activePillar, setActivePillar] = useState<Pillar>("learn");
    const [selectedModule, setSelectedModule] = useState(1);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Code pillar state
    const [codeInput, setCodeInput] = useState("");
    const [codeLanguage, setCodeLanguage] = useState("javascript");
    const [codeAction, setCodeAction] = useState<"review" | "refactor" | "explain" | "generate" | "architecture">("review");
    const [codeResult, setCodeResult] = useState<string | null>(null);
    const [isCodeLoading, setIsCodeLoading] = useState(false);

    // Debug pillar state
    const [debugCode, setDebugCode] = useState("");
    const [debugError, setDebugError] = useState("");
    const [debugLanguage, setDebugLanguage] = useState("javascript");
    const [debugResult, setDebugResult] = useState<string | null>(null);
    const [isDebugLoading, setIsDebugLoading] = useState(false);

    const currentMod = HASHFLAG_MODULES.find((m) => m.module === selectedModule);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/j0di3/learning/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    concept: currentMod?.title ?? "general",
                    question: userMsg.content,
                    curriculum_week: currentMod?.week ?? 1,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                const msg = errData.error || (Array.isArray(errData.detail) ? errData.detail.map((d: any) => d.msg).join(", ") : errData.detail) || "Failed to get response";
                throw new Error(msg);
            }

            const data = await res.json();
            const content = data.response || data.explanation || data.answer || JSON.stringify(data, null, 2);
            setMessages((prev) => [...prev, { role: "assistant", content }]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, selectedModule, currentMod]);

    const handleCodeSubmit = useCallback(async () => {
        if (!codeInput.trim() && codeAction !== "generate" && codeAction !== "architecture") return;
        setIsCodeLoading(true);
        setCodeResult(null);
        setError(null);

        try {
            // Build payload based on action — generate uses "prompt", architecture uses "question", others use "code"
            const payload: Record<string, string> = { language: codeLanguage };
            if (codeAction === "generate") {
                payload.prompt = codeInput;
            } else if (codeAction === "architecture") {
                payload.question = codeInput;
            } else {
                payload.code = codeInput;
            }

            const res = await fetch(`/api/j0di3/coding/${codeAction}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Request failed");
            }

            const data = await res.json();
            setCodeResult(
                data.response || data.review || data.refactored_code || data.explanation || data.code || JSON.stringify(data, null, 2)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsCodeLoading(false);
        }
    }, [codeInput, codeLanguage, codeAction]);

    const handleDebugSubmit = useCallback(async () => {
        if (!debugCode.trim()) return;
        setIsDebugLoading(true);
        setDebugResult(null);
        setError(null);

        try {
            const res = await fetch("/api/j0di3/learning/debug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: debugCode,
                    error_message: debugError,
                    language: debugLanguage,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Request failed");
            }

            const data = await res.json();
            setDebugResult(data.response || data.explanation || data.fix || JSON.stringify(data, null, 2));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsDebugLoading(false);
        }
    }, [debugCode, debugError, debugLanguage]);

    const pillars = [
        { key: "learn" as const, label: "Learn", icon: "fa-graduation-cap", desc: "Ask about the Hashflag curriculum" },
        { key: "code" as const, label: "Code", icon: "fa-code", desc: "Review, refactor, explain, or generate code" },
        { key: "debug" as const, label: "Debug", icon: "fa-bug", desc: "Paste broken code and get a fix" },
    ];

    return (
        <>
            <SEO
                title="J0d!e - AI Teaching Assistant | Vets Who Code"
                description="Your AI-powered teaching assistant for the Hashflag Stack curriculum."
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="J0d!e"
                showTitle={false}
            />

            <div className="tw-container tw-py-12">
                {/* Header */}
                <div className="tw-mb-8">
                    <h1 className="tw-text-4xl tw-font-bold tw-text-ink tw-mb-2">
                        J0d!e
                    </h1>
                    <p className="tw-text-xl tw-text-navy/60">
                        AI teaching assistant for the Hashflag Stack
                    </p>
                </div>

                {/* Quick Links */}
                <div className="tw-mb-8 tw-flex tw-flex-wrap tw-gap-3">
                    <Link
                        href="/challenges"
                        className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 tw-shadow-sm hover:tw-shadow-sm tw-transition-shadow"
                    >
                        <i className="fas fa-trophy tw-text-primary" />
                        Code Challenges
                    </Link>
                    <Link
                        href="/jobs"
                        className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 tw-shadow-sm hover:tw-shadow-sm tw-transition-shadow"
                    >
                        <i className="fas fa-briefcase tw-text-primary" />
                        Resume Scorer & Mock Interviews
                    </Link>
                </div>

                {error && (
                    <div className="tw-mb-6 tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-4 tw-text-red-700">
                        {error}
                        <button onClick={() => setError(null)} className="tw-ml-3 tw-text-sm tw-underline">
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Pillar Tabs */}
                <div className="tw-mb-6 tw-flex tw-gap-1 tw-rounded-lg tw-bg-navy/5 tw-p-1">
                    {pillars.map((p) => (
                        <button
                            key={p.key}
                            onClick={() => setActivePillar(p.key)}
                            className={`tw-flex-1 tw-rounded-md tw-px-4 tw-py-2.5 tw-text-sm tw-font-medium tw-transition-colors ${
                                activePillar === p.key
                                    ? "tw-bg-white tw-text-navy tw-shadow-sm tw-border-b-2 tw-border-gold"
                                    : "tw-text-ink/60 hover:tw-text-navy/60"
                            }`}
                        >
                            <i className={`fas ${p.icon} tw-mr-2`} />
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* LEARN PILLAR */}
                {activePillar === "learn" && (
                    <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-6">
                        {/* Week Selector */}
                        <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                                Curriculum Week
                            </h3>
                            <div className="tw-space-y-1 tw-max-h-96 tw-overflow-y-auto">
                                {["Foundations", "Software Engineering", "AI Engineering", "Production Mastery"].map((phase) => (
                                    <div key={phase}>
                                        <div className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mt-3 tw-mb-1 tw-px-1 first:tw-mt-0">
                                            {phase}
                                        </div>
                                        {HASHFLAG_MODULES.filter((m) => m.phase === phase).map((m) => (
                                            <button
                                                key={m.module}
                                                onClick={() => setSelectedModule(m.module)}
                                                className={`tw-w-full tw-text-left tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-transition-colors ${
                                                    selectedModule === m.module
                                                        ? "tw-bg-primary tw-text-white"
                                                        : "tw-text-ink/80 hover:tw-bg-navy/5"
                                                }`}
                                            >
                                                <span className="tw-font-medium">M{m.module}</span>
                                                <span className="tw-block tw-text-xs tw-opacity-80">{m.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="lg:tw-col-span-3 tw-rounded-lg tw-bg-white tw-shadow-sm tw-flex tw-flex-col tw-max-h-[600px]">
                            {/* Context Bar */}
                            <div className="tw-bg-primary tw-text-white tw-px-5 tw-py-3 tw-rounded-t-lg">
                                <div className="tw-text-sm tw-font-medium">
                                    Hashflag Stack / {currentMod?.phase} / Module {selectedModule}
                                </div>
                                <div className="tw-text-xs tw-opacity-80">{currentMod?.title}</div>
                            </div>

                            {/* Messages */}
                            <div className="tw-flex-1 tw-overflow-y-auto tw-p-5 tw-space-y-4">
                                {messages.length === 0 && (
                                    <div className="tw-text-center tw-text-ink/60 tw-py-12">
                                        <i className="fas fa-robot tw-text-4xl tw-mb-3 tw-text-navy/60" />
                                        <p className="tw-text-lg tw-font-medium tw-mb-1">
                                            Ask me about {currentMod?.title || "the curriculum"}
                                        </p>
                                        <p className="tw-text-sm">
                                            {currentMod?.phase} — Week {currentMod?.week}
                                        </p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`tw-flex ${msg.role === "user" ? "tw-justify-end" : "tw-justify-start"}`}
                                    >
                                        <div
                                            className={`tw-max-w-[80%] tw-rounded-lg tw-px-4 tw-py-3 tw-text-sm tw-whitespace-pre-wrap ${
                                                msg.role === "user"
                                                    ? "tw-bg-primary tw-text-white"
                                                    : "tw-bg-navy/5 tw-text-ink/80"
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="tw-flex tw-justify-start">
                                        <div className="tw-bg-navy/5 tw-rounded-lg tw-px-4 tw-py-3 tw-text-sm tw-text-ink/60">
                                            Thinking...
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="tw-border-t tw-border-navy/10 tw-p-4 tw-flex tw-gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={`Ask about ${currentMod?.title || "the curriculum"}...`}
                                    disabled={isLoading}
                                    className="tw-flex-1 tw-border tw-border-navy/10 tw-rounded-lg tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-border-primary disabled:tw-bg-navy/5"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="tw-rounded-lg tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white hover:tw-bg-primary-dark disabled:tw-opacity-50 tw-transition-colors"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* CODE PILLAR */}
                {activePillar === "code" && (
                    <div className="tw-space-y-6">
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-4">
                                <div>
                                    <label htmlFor="code-action" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                        Action
                                    </label>
                                    <select
                                        id="code-action"
                                        value={codeAction}
                                        onChange={(e) => setCodeAction(e.target.value as typeof codeAction)}
                                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                    >
                                        <option value="review">Code Review</option>
                                        <option value="refactor">Refactor</option>
                                        <option value="explain">Explain Code</option>
                                        <option value="generate">Generate Code</option>
                                        <option value="architecture">Architecture Question</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="code-lang" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                        Language
                                    </label>
                                    <select
                                        id="code-lang"
                                        value={codeLanguage}
                                        onChange={(e) => setCodeLanguage(e.target.value)}
                                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                    >
                                        <option value="javascript">JavaScript</option>
                                        <option value="typescript">TypeScript</option>
                                        <option value="python">Python</option>
                                        <option value="html">HTML/CSS</option>
                                        <option value="bash">Bash</option>
                                    </select>
                                </div>
                            </div>

                            <textarea
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value)}
                                rows={12}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-bg-navy/5 tw-px-4 tw-py-3 tw-font-mono tw-text-sm focus:tw-border-primary focus:tw-outline-none tw-mb-4"
                                placeholder={
                                    codeAction === "generate"
                                        ? "Describe what you want to generate..."
                                        : codeAction === "architecture"
                                            ? "Ask your architecture question..."
                                            : "Paste your code here..."
                                }
                                spellCheck={false}
                            />

                            <button
                                onClick={handleCodeSubmit}
                                disabled={isCodeLoading || !codeInput.trim()}
                                className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                            >
                                {isCodeLoading ? "Processing..." : `Run ${codeAction.charAt(0).toUpperCase() + codeAction.slice(1)}`}
                            </button>
                        </div>

                        {codeResult && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                                <h3 className="tw-text-lg tw-font-bold tw-text-ink tw-mb-3">Result</h3>
                                <pre className="tw-rounded-md tw-bg-navy/5 tw-p-4 tw-text-sm tw-font-mono tw-text-ink/80 tw-whitespace-pre-wrap tw-border tw-border-navy/10 tw-max-h-96 tw-overflow-y-auto">
                                    {codeResult}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {/* DEBUG PILLAR */}
                {activePillar === "debug" && (
                    <div className="tw-space-y-6">
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <div className="tw-mb-4">
                                <label htmlFor="debug-lang" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                    Language
                                </label>
                                <select
                                    id="debug-lang"
                                    value={debugLanguage}
                                    onChange={(e) => setDebugLanguage(e.target.value)}
                                    className="tw-w-48 tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="html">HTML/CSS</option>
                                    <option value="bash">Bash</option>
                                </select>
                            </div>

                            <div className="tw-mb-4">
                                <label htmlFor="debug-code" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                    Your Code
                                </label>
                                <textarea
                                    id="debug-code"
                                    value={debugCode}
                                    onChange={(e) => setDebugCode(e.target.value)}
                                    rows={10}
                                    className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-bg-navy/5 tw-px-4 tw-py-3 tw-font-mono tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                                    placeholder="Paste the broken code here..."
                                    spellCheck={false}
                                />
                            </div>

                            <div className="tw-mb-4">
                                <label htmlFor="debug-error" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                    Error Message (optional)
                                </label>
                                <textarea
                                    id="debug-error"
                                    value={debugError}
                                    onChange={(e) => setDebugError(e.target.value)}
                                    rows={3}
                                    className="tw-w-full tw-rounded-md tw-border tw-border-red-200 tw-bg-red-50 tw-px-4 tw-py-3 tw-font-mono tw-text-sm focus:tw-border-red-400 focus:tw-outline-none"
                                    placeholder="Paste the error message here..."
                                    spellCheck={false}
                                />
                            </div>

                            <button
                                onClick={handleDebugSubmit}
                                disabled={isDebugLoading || !debugCode.trim()}
                                className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                            >
                                {isDebugLoading ? "Analyzing..." : "Debug This Code"}
                            </button>
                        </div>

                        {debugResult && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                                <h3 className="tw-text-lg tw-font-bold tw-text-ink tw-mb-3">
                                    <i className="fas fa-wrench tw-mr-2 tw-text-primary" />
                                    Debug Analysis
                                </h3>
                                <pre className="tw-rounded-md tw-bg-navy/5 tw-p-4 tw-text-sm tw-font-mono tw-text-ink/80 tw-whitespace-pre-wrap tw-border tw-border-navy/10 tw-max-h-96 tw-overflow-y-auto">
                                    {debugResult}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

JodiePage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/jodie",
                permanent: false,
            },
        };
    }

    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default JodiePage;
