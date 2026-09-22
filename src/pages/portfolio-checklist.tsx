import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Button from "@ui/button";
import { SafeLocalStorage } from "@utils/safe-storage";
import clsx from "clsx";
import type { GetStaticProps, NextPage } from "next";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

// --- Checklist Data ---

interface ChecklistItem {
    id: string;
    text: string;
}

interface ChecklistSection {
    id: string;
    number: string;
    title: string;
    description: string;
    subsections?: {
        title: string;
        items: ChecklistItem[];
    }[];
    items?: ChecklistItem[];
}

const CHECKLIST_DATA: ChecklistSection[] = [
    {
        id: "first-impression",
        number: "1",
        title: "First Impression",
        description:
            "You have 8 seconds. Every element either moves a hiring manager toward “I need to talk to this person” or it’s noise.",
        items: [
            { id: "1-1", text: "Headline positioning statement" },
            { id: "1-2", text: "Target roles stated, each linked to its role page" },
            { id: "1-3", text: "CTA above the fold" },
            { id: "1-4", text: "Contact links visible on every page" },
            {
                id: "1-5",
                text: "Clean nav: About, Artifacts, How I Build, Writing, Résumé, Contact",
            },
            { id: "1-6", text: "Custom domain with HTTPS" },
            { id: "1-7", text: "Mobile-responsive and accessible" },
        ],
    },
    {
        id: "hiring-channels",
        number: "2",
        title: "Hiring Channels",
        description:
            "Different readers need different doors. Recruiters, referrers, and hiring managers each get a page built for the way they actually read.",
        items: [
            { id: "2-1", text: "Role-specific landing pages (/for/[role])" },
            { id: "2-2", text: "Recruiter fast lane (/recruiters)" },
            { id: "2-3", text: "Referral kit (/refer)" },
            { id: "2-4", text: "HTML résumé per track (/resume/[role])" },
            { id: "2-5", text: "Recruiter CTA banner on artifact pages" },
        ],
    },
    {
        id: "proof-of-work",
        number: "3",
        title: "Proof of Work",
        description:
            "This is your product catalog. Every card should make someone want to click through.",
        items: [
            { id: "3-1", text: "Cards show outcomes, not descriptions" },
            { id: "3-2", text: "One-sentence business impact on each card" },
            { id: "3-3", text: "Skill tags in market-standard terms" },
            { id: "3-4", text: "Live demo or demo video" },
            { id: "3-5", text: "Repo link" },
            { id: "3-6", text: "Visual proof strip (tests, deploy date, performance)" },
            { id: "3-7", text: "No tutorial clones or single-prompt projects" },
            { id: "3-8", text: 'No "coming soon" cards' },
        ],
    },
    {
        id: "artifact-deep-dives",
        number: "4",
        title: "Artifact Deep Dives",
        description:
            "This is where you convert interest into a conversation. Each artifact is a story: situation → approach → result → reflection.",
        subsections: [
            {
                title: "The Story",
                items: [
                    { id: "4-1", text: "Problem statement with business context" },
                    { id: "4-2", text: "Success criteria up front" },
                    { id: "4-3", text: "Approach and architecture" },
                    { id: "4-4", text: "Key tradeoffs, linked to decision records" },
                    { id: "4-5", text: "Measurable outcome" },
                    { id: "4-6", text: "What I’d change in v2" },
                    { id: "4-7", text: "“Walk me through it” (10-minute spoken version)" },
                ],
            },
            {
                title: "AI Collaboration",
                items: [
                    {
                        id: "4-8",
                        text: "AI collaboration note (tools used, what AI did, what you owned)",
                    },
                    { id: "4-9", text: "Where AI got it wrong" },
                ],
            },
            {
                title: "The Evidence",
                items: [
                    { id: "4-10", text: "Tradeoff video with you on camera" },
                    { id: "4-11", text: "Live demo or demo video" },
                    { id: "4-12", text: "Repo link" },
                    { id: "4-13", text: "Architecture diagram" },
                    { id: "4-14", text: "Links to decision records and related posts" },
                ],
            },
        ],
    },
    {
        id: "ai-fluency",
        number: "5",
        title: "AI Fluency & Judgment",
        description:
            "Everyone ships with AI now. What separates you is the judgment around it: evals, cost, fallbacks, and the calls you owned.",
        items: [
            { id: "5-1", text: "How I Build page (/how-i-build)" },
            {
                id: "5-2",
                text: "At least one LLM artifact with evals, cost, latency, and fallback",
            },
            { id: "5-3", text: "Prompts versioned in the repo (/prompts)" },
            { id: "5-4", text: "Evals in the repo (/evals)" },
            { id: "5-5", text: "Decision records index (/decisions)" },
            { id: "5-6", text: "LLM data handling statement" },
        ],
    },
    {
        id: "technical-credibility",
        number: "6",
        title: "Technical Credibility Signals",
        description:
            "Hiring managers and senior engineers will click into your repos. They’re looking for professional habits, not perfection.",
        subsections: [
            {
                title: "Repository Basics",
                items: [
                    { id: "6-1", text: "README that gets someone running in 5 minutes" },
                    { id: "6-2", text: "Architecture diagram in /docs" },
                    { id: "6-3", text: "ADRs in /docs/adr" },
                    { id: "6-4", text: "Strict language settings and linting" },
                    { id: "6-5", text: "Dependency management visible" },
                ],
            },
            {
                title: "Testing",
                items: [
                    { id: "6-6", text: "Tests exist and pass" },
                    { id: "6-7", text: "CI runs tests on PR and main" },
                    { id: "6-8", text: "Integration or E2E tests" },
                ],
            },
            {
                title: "CI/CD",
                items: [
                    { id: "6-9", text: "Pipeline config in the repo" },
                    { id: "6-10", text: "Deploy process described" },
                    { id: "6-11", text: "Environment promotion noted" },
                ],
            },
            {
                title: "Observability",
                items: [
                    { id: "6-12", text: "Logging approach" },
                    {
                        id: "6-13",
                        text: "Key metrics, including token cost and eval score for AI features",
                    },
                    { id: "6-14", text: "Uptime or performance target" },
                ],
            },
            {
                title: "Security",
                items: [
                    { id: "6-15", text: "Auth approach described" },
                    { id: "6-16", text: "No secrets in the repo, including model API keys" },
                    { id: "6-17", text: "Input validation" },
                    { id: "6-18", text: "Prompt injection and output validation" },
                ],
            },
        ],
    },
    {
        id: "authority-social-proof",
        number: "7",
        title: "Authority & Social Proof",
        description:
            "Why you, not someone else. Build credibility through content, visibility, and community contribution.",
        items: [
            { id: "7-1", text: "Blog posts on real decisions" },
            { id: "7-2", text: "At least one deep-dive post" },
            { id: "7-3", text: "Artifacts link to related posts" },
            { id: "7-4", text: "Press and talks on About" },
            { id: "7-5", text: "Testimonials" },
            { id: "7-6", text: "Meaningful open source contributions" },
        ],
    },
    {
        id: "ai-search-visibility",
        number: "8",
        title: "AI Search Visibility",
        description:
            "Recruiters ask an assistant about you before they ask you. Make sure the answer it gives is accurate and comes from your site.",
        items: [
            {
                id: "8-1",
                text: "Let AI read your site: no blocked AI crawlers, and key information in plain text",
            },
            {
                id: "8-2",
                text: "Be the same person everywhere: same name, title, and headline across profiles, all linked",
            },
            {
                id: "8-3",
                text: "Answer the recruiter’s question in plain sentences: role, skills, location, remote preference, availability",
            },
            { id: "8-4", text: "One quotable fact per project, with a number" },
        ],
    },
    {
        id: "discoverability",
        number: "9",
        title: "Discoverability & Distribution",
        description:
            "Getting found. Make sure your portfolio works for you even when you’re not sharing it directly.",
        items: [
            {
                id: "9-1",
                text: "Basic SEO (titles, meta descriptions, canonical URLs, sitemap, robots.txt)",
            },
            { id: "9-2", text: "JSON-LD Person schema (optional)" },
            { id: "9-3", text: "llms.txt at the root (optional)" },
            {
                id: "9-4",
                text: "Consistent skills language across tags, role pages, résumés, and LinkedIn",
            },
            { id: "9-5", text: "OG preview images" },
            { id: "9-6", text: "Favicons" },
            { id: "9-7", text: "Active LinkedIn with pinned portfolio post" },
            { id: "9-8", text: "Polished GitHub profile with pinned repos matching the portfolio" },
        ],
    },
    {
        id: "maintenance",
        number: "10",
        title: "Maintenance",
        description:
            "A stale portfolio works against you. Keep it alive or it signals abandonment.",
        items: [
            { id: "10-1", text: "All links and demos working (check monthly)" },
            { id: "10-2", text: "CI green on showcased repos" },
            { id: "10-3", text: "New artifact, decision record, or post monthly" },
            { id: "10-4", text: "Quarterly review of metrics, evals, and role pages" },
            { id: "10-5", text: "“What’s new” section or changelog" },
        ],
    },
];

const QUALITY_BAR_ITEMS: ChecklistItem[] = [
    {
        id: "qb-1",
        text: "Every artifact has a demo, repo, diagram, tests, deploy note, observability note, and AI note",
    },
    { id: "qb-2", text: "Target roles stated, each with its own page and matching résumé" },
    { id: "qb-3", text: "Recruiters and referrers can act in under a minute" },
    { id: "qb-4", text: 'No "coming soon" placeholders' },
    { id: "qb-5", text: "You can defend every line, including code AI wrote" },
];

// --- Storage Key ---

// 2027 edition: new items and ids, so progress starts fresh under a new key.
const STORAGE_KEY = "vwc-portfolio-checklist-2027";

// --- Steps: every section plus the Quality Bar, one panel each ---

interface Step {
    id: string;
    num: string;
    title: string;
    description: string;
    groups: { title: string; items: ChecklistItem[] }[];
    gate?: boolean;
}

const STEPS: Step[] = [
    ...CHECKLIST_DATA.map((section) => ({
        id: section.id,
        num: section.number.padStart(2, "0"),
        title: section.title,
        description: section.description,
        groups: section.subsections ?? [{ title: "", items: section.items ?? [] }],
    })),
    {
        id: "quality-bar",
        num: "QB",
        title: "The Quality Bar",
        description: "Don’t share until every one of these is true.",
        groups: [{ title: "", items: QUALITY_BAR_ITEMS }],
        gate: true,
    },
];

const STEP_IDS = STEPS.map((step) =>
    step.groups.flatMap((group) => group.items.map((item) => item.id))
);

// The Quality Bar is a gate, not part of the item count.
const TOTAL_ITEMS = STEP_IDS.reduce((sum, ids, i) => (STEPS[i].gate ? sum : sum + ids.length), 0);

const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const GHOST_BUTTON =
    "tw-inline-flex tw-min-h-[38px] tw-items-center tw-bg-transparent tw-px-[18px] tw-font-mono tw-text-[11px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-gray-300 tw-transition-all tw-duration-300 tw-ease-out hover:-tw-translate-y-px hover:tw-text-navy hover:tw-underline active:tw-scale-95";

// Inline: PurgeCSS strips arbitrary-property classes, and tw-ease-[...] clashes with
// tailwindcss-animate's ease-* utility.
const EASE_CARD = { transitionTimingFunction: "var(--ease-card)" };

const ACTIVE_TILE = {
    bg: "tw-bg-navy",
    ink: "tw-text-white",
    meta: "tw-text-navy-sky",
    track: "tw-bg-navy-sky/20",
};

const REST_TILE = {
    bg: "tw-bg-white",
    ink: "tw-text-navy",
    meta: "tw-text-gray-200",
    track: "tw-bg-gray-100",
};

const Eyebrow = ({
    as: Tag = "div",
    className,
    children,
}: {
    as?: "div" | "h3";
    className?: string;
    children: ReactNode;
}) => (
    <Tag
        className={clsx(
            "tw-m-0 tw-flex tw-items-center tw-font-mono tw-text-[12px] tw-font-medium tw-uppercase tw-leading-body tw-tracking-[0.1em]",
            className
        )}
    >
        <span aria-hidden="true" className="tw-mr-3 tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
        {children}
    </Tag>
);

// --- Page Component ---

type TProps = Record<string, never>;

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const PortfolioChecklist: PageProps = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(0);
    const [hideDone, setHideDone] = useState(false);
    const [printing, setPrinting] = useState(false);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const hashTarget = useRef<number | null>(null);

    const counts = STEP_IDS.map((ids) => ({
        done: ids.filter((id) => checked[id]).length,
        total: ids.length,
    }));
    const checkedCount = counts.reduce(
        (sum, count, i) => (STEPS[i].gate ? sum : sum + count.done),
        0
    );
    const progressPercent = Math.round((checkedCount / TOTAL_ITEMS) * 100);

    useEffect(() => {
        const stored = SafeLocalStorage.getItem<Record<string, boolean>>(STORAGE_KEY, {});
        setChecked(stored);
        setMounted(true);
        // Old #section links from the single-scroll page open that section.
        const fromHash = STEPS.findIndex((step) => `#${step.id}` === window.location.hash);
        if (fromHash > 0) {
            hashTarget.current = fromHash;
            setActive(fromHash);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            SafeLocalStorage.setItem(STORAGE_KEY, checked);
        }
    }, [checked, mounted]);

    // Once the hash-linked panel has rendered, focus its heading, which also scrolls it
    // into view below the sticky header.
    useEffect(() => {
        if (hashTarget.current !== active) return;
        hashTarget.current = null;
        headingRef.current?.focus();
    }, [active]);

    // Print stacks every section. flushSync commits before the browser lays out the print.
    useEffect(() => {
        const before = () => flushSync(() => setPrinting(true));
        const after = () => setPrinting(false);
        window.addEventListener("beforeprint", before);
        window.addEventListener("afterprint", after);
        return () => {
            window.removeEventListener("beforeprint", before);
            window.removeEventListener("afterprint", after);
        };
    }, []);

    const toggleItem = useCallback((id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const resetAll = useCallback(() => {
        if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
            setChecked({});
        }
    }, []);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    // Stepping moves focus to the new panel's heading so keyboard and screen reader
    // users land on the content that just swapped in.
    const goToStep = (index: number) => {
        flushSync(() => setActive(index));
        headingRef.current?.focus();
    };

    // With "Hide completed" on, checking an item unmounts its row. Hand focus to the
    // next (or previous) item first so keyboard and screen reader users keep their place.
    const handleToggle = (id: string, input: HTMLInputElement) => {
        if (!hideDone || checked[id]) {
            toggleItem(id);
            return;
        }
        const boxes = Array.from(
            input.closest("section")?.querySelectorAll<HTMLInputElement>("input[type=checkbox]") ??
                []
        );
        const index = boxes.indexOf(input);
        const target = boxes[index + 1] ?? boxes[index - 1] ?? headingRef.current;
        flushSync(() => toggleItem(id));
        target?.focus();
    };

    const renderItem = (item: ChecklistItem) => {
        const isDone = !!checked[item.id];
        return (
            <label
                key={item.id}
                style={EASE_CARD}
                className={clsx(
                    "tw-flex tw-cursor-pointer tw-break-inside-avoid tw-items-start tw-gap-4 tw-border tw-border-l-2 tw-border-gray-100 tw-px-5 tw-py-[15px] tw-transition-all tw-duration-300 hover:tw-border-l-red hover:tw-shadow-sm hover:tw-shadow-black/10",
                    isDone
                        ? "tw-border-l-navy tw-bg-gray-50"
                        : "tw-border-l-transparent tw-bg-white"
                )}
            >
                <span className="tw-relative tw-mt-[3px] tw-h-5 tw-w-5 tw-shrink-0">
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(event) => handleToggle(item.id, event.currentTarget)}
                        className={clsx(
                            "tw-m-0 tw-block tw-h-5 tw-w-5 tw-cursor-pointer tw-appearance-none tw-rounded-none tw-border-2 tw-border-solid tw-transition-all tw-duration-200 tw-ease-out",
                            isDone ? "tw-border-navy tw-bg-navy" : "tw-border-gray-200 tw-bg-white"
                        )}
                    />
                    <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="square"
                        className={clsx(
                            "tw-pointer-events-none tw-absolute tw-left-1 tw-top-1 tw-text-white",
                            isDone ? "tw-opacity-100" : "tw-opacity-0"
                        )}
                    >
                        <polyline points="4 12.5 9.5 18 20 6" />
                    </svg>
                </span>
                <span
                    className={clsx(
                        "tw-text-base tw-leading-[1.68] tw-text-pretty",
                        isDone ? "tw-text-gray-300 tw-line-through" : "tw-text-ink"
                    )}
                >
                    {item.text}
                </span>
            </label>
        );
    };

    const renderPanel = (step: Step, index: number) => {
        const { done, total } = counts[index];
        const groups = step.groups
            .map((group) => ({
                title: group.title,
                items: hideDone ? group.items.filter((item) => !checked[item.id]) : group.items,
            }))
            .filter((group) => group.items.length > 0);

        return (
            <section
                key={step.id}
                id={step.id}
                aria-labelledby={`${step.id}-title`}
                className="tw-container tw-pt-10"
            >
                <div
                    className={clsx(
                        "tw-border tw-border-t-[3px] tw-border-gray-100 tw-px-5 tw-pb-11 tw-pt-10 sm:tw-px-[34px]",
                        step.gate
                            ? "tw-border-t-red tw-bg-[#FCF6F7]"
                            : "tw-border-t-navy tw-bg-white"
                    )}
                >
                    <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-start sm:tw-gap-[22px] print:tw-break-after-avoid print:tw-break-inside-avoid">
                        <span
                            aria-hidden="true"
                            className={clsx(
                                "tw-font-heading tw-text-[46px] tw-font-black tw-leading-[0.9]",
                                step.gate ? "tw-text-red/35" : "tw-text-gray-100"
                            )}
                        >
                            {step.num}
                        </span>
                        <div className="tw-min-w-0 tw-flex-1">
                            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3.5">
                                <h2
                                    id={`${step.id}-title`}
                                    ref={printing ? undefined : headingRef}
                                    tabIndex={-1}
                                    className={clsx(
                                        "tw-m-0 tw-scroll-mt-[calc(var(--header-sticky-offset,0px)+8rem)] tw-text-[clamp(22px,3vw,30px)]",
                                        step.gate ? "tw-text-red" : "tw-text-navy"
                                    )}
                                >
                                    {step.title}
                                </h2>
                                <span
                                    className={clsx(
                                        "tw-px-2.5 tw-py-[5px] tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em]",
                                        step.gate
                                            ? "tw-bg-red/10 tw-text-red"
                                            : "tw-bg-navy/[0.06] tw-text-navy"
                                    )}
                                >
                                    {done} / {total} {step.gate ? "cleared" : "done"}
                                </span>
                            </div>
                            <p className="tw-mb-0 tw-mt-3 tw-max-w-[72ch] tw-text-base tw-leading-body tw-text-gray-300 tw-text-pretty">
                                {step.description}
                            </p>
                        </div>
                    </div>

                    {groups.map((group) => (
                        <div key={group.title || step.id} className="tw-mt-[30px]">
                            {group.title && (
                                <Eyebrow
                                    as="h3"
                                    className="tw-mb-3.5 tw-text-navy-ocean print:tw-break-after-avoid"
                                >
                                    {group.title}
                                </Eyebrow>
                            )}
                            <div className="tw-flex tw-flex-col tw-gap-2">
                                {group.items.map(renderItem)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const prev = STEPS[active - 1];
    const next = STEPS[active + 1];

    return (
        <>
            <SEO title="Portfolio Checklist for Software Engineers | Vets Who Code" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Portfolio Checklist"
                showTitle={false}
                hideHeading={true}
                className="tw-bg-gray-50 print:tw-hidden"
            />

            <div
                className="tw-bg-cream tw-pb-24"
                style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
            >
                {/* Hero */}
                <section className="tw-relative tw-overflow-hidden tw-bg-navy tw-pb-16 tw-pt-20">
                    <div
                        aria-hidden="true"
                        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-[0.02] print:tw-hidden"
                        style={{ backgroundImage: GRAIN }}
                    />
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-end tw-justify-between tw-gap-12">
                        <div className="tw-min-w-0 tw-flex-[1_1_520px]">
                            <Eyebrow className="tw-mb-7 tw-text-gray-100">
                                Sharpen Skills &middot; 2027 Edition
                            </Eyebrow>
                            <h1 className="tw-mb-[26px] tw-mt-0 tw-max-w-[20ch] tw-text-white tw-text-[clamp(34px,5vw,58px)]">
                                Portfolio Checklist for Software Engineers
                            </h1>
                            <p className="tw-m-0 tw-max-w-[60ch] tw-text-lg tw-leading-[1.6] tw-text-navy-sky tw-text-pretty">
                                The portfolio is a sales site. Every element either moves a hiring
                                manager toward &ldquo;I need to talk to this person&rdquo; or
                                it&rsquo;s noise. Build accordingly.
                            </p>
                        </div>
                        <div className="tw-min-w-[240px] tw-flex-[0_1_300px] tw-border-l-2 tw-border-red tw-pl-6">
                            <div className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-navy-sky/70">
                                Completed
                            </div>
                            <div className="tw-mt-2.5 tw-flex tw-items-baseline tw-gap-2.5 tw-font-heading tw-font-black">
                                <span className="tw-text-[62px] tw-leading-none tw-text-white">
                                    {checkedCount}
                                </span>
                                <span className="tw-text-[22px] tw-text-navy-sky/70">
                                    / {TOTAL_ITEMS}
                                </span>
                            </div>
                            <div
                                aria-hidden="true"
                                className="tw-mt-[22px] tw-h-1 tw-bg-navy-sky/[0.18]"
                            >
                                <div
                                    className="tw-h-1 tw-bg-red tw-transition-[width] tw-duration-500 tw-ease-out-expo"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="tw-mt-3 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-navy-sky/70">
                                {TOTAL_ITEMS} items &middot; {CHECKLIST_DATA.length} sections
                                &middot; gate
                            </div>
                        </div>
                    </div>
                </section>

                {/* Control strip */}
                <div className="tw-top-[var(--header-sticky-offset,0px)] tw-z-30 md:tw-sticky tw-border-b tw-border-gray-100 tw-bg-gray-50/[0.92] tw-backdrop-blur-md print:tw-hidden">
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-x-6 tw-gap-y-4 tw-py-3">
                        <div className="tw-flex tw-min-w-0 tw-items-center tw-gap-4">
                            <span className="tw-whitespace-nowrap tw-font-mono tw-text-[12px] tw-font-medium tw-uppercase tw-tracking-[0.1em] tw-text-navy">
                                {checkedCount} / {TOTAL_ITEMS} completed
                            </span>
                            <span
                                aria-hidden="true"
                                className="tw-block tw-h-[2px] tw-w-40 tw-max-w-[30vw] tw-bg-gray-100"
                            >
                                <span
                                    className="tw-block tw-h-[2px] tw-bg-red tw-transition-[width] tw-duration-500 tw-ease-out-expo"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </span>
                            <span className="tw-whitespace-nowrap tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-gray-300">
                                {progressPercent}% &middot; {TOTAL_ITEMS - checkedCount} remaining
                            </span>
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                            <button
                                type="button"
                                aria-pressed={hideDone}
                                onClick={() => setHideDone((prevHide) => !prevHide)}
                                className="tw-inline-flex tw-min-h-[38px] tw-items-center tw-gap-2.5 tw-border tw-border-gray-100 tw-bg-transparent tw-px-3.5 tw-py-[9px] tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-navy tw-transition-all tw-duration-200 tw-ease-out hover:tw-border-navy"
                            >
                                <span
                                    aria-hidden="true"
                                    className={clsx(
                                        "tw-block tw-h-3 tw-w-3 tw-border-2 tw-forced-color-adjust-none",
                                        hideDone
                                            ? "tw-border-red tw-bg-red"
                                            : "tw-border-gray-200 tw-bg-transparent"
                                    )}
                                />
                                Hide completed
                            </button>
                            <button type="button" onClick={handlePrint} className={GHOST_BUTTON}>
                                Print / PDF
                            </button>
                            <button type="button" onClick={resetAll} className={GHOST_BUTTON}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section map */}
                <nav
                    aria-label="Checklist sections"
                    className="tw-container tw-pt-14 print:tw-hidden"
                >
                    <Eyebrow className="tw-mb-5 tw-text-gray-300">Sections</Eyebrow>
                    <div className="tw-grid tw-grid-cols-1 tw-gap-px tw-border tw-border-gray-100 tw-bg-gray-100 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                        {STEPS.map((step, index) => {
                            const { done, total } = counts[index];
                            const isActive = index === active;
                            const complete = done === total;
                            const tone = isActive ? ACTIVE_TILE : REST_TILE;
                            let rule = "tw-border-t-transparent";
                            if (isActive)
                                rule =
                                    "tw-border-t-red forced-colors:tw-outline forced-colors:tw-outline-2 forced-colors:-tw-outline-offset-4";
                            else if (complete) rule = "tw-border-t-gold";
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    style={EASE_CARD}
                                    aria-current={isActive ? "step" : undefined}
                                    onClick={() => setActive(index)}
                                    className={clsx(
                                        "tw-relative tw-flex tw-min-h-[132px] tw-flex-col tw-gap-2.5 tw-border-t-2 tw-px-5 tw-pb-4 tw-pt-[18px] tw-text-left tw-transition-all tw-duration-300 hover:tw-border-t-red focus-visible:tw-z-10",
                                        rule,
                                        tone.bg,
                                        step.gate && "sm:tw-col-span-2"
                                    )}
                                >
                                    <span
                                        className={clsx(
                                            "tw-font-mono tw-text-[11px] tw-tracking-[0.1em]",
                                            tone.meta
                                        )}
                                    >
                                        {step.num}
                                    </span>
                                    <span
                                        className={clsx(
                                            "tw-font-heading tw-text-[15px] tw-font-bold tw-uppercase tw-leading-[1.25] tw-tracking-[-0.02em]",
                                            tone.ink
                                        )}
                                    >
                                        {step.title}
                                    </span>
                                    <span className="tw-mt-auto tw-flex tw-w-full tw-items-center tw-gap-2.5 tw-pt-3.5">
                                        <span
                                            aria-hidden="true"
                                            className={clsx(
                                                "tw-block tw-h-[2px] tw-flex-1",
                                                tone.track
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    "tw-block tw-h-[2px] tw-transition-[width] tw-duration-500 tw-ease-out-expo",
                                                    complete ? "tw-bg-gold" : "tw-bg-red"
                                                )}
                                                style={{
                                                    width: `${Math.round((done / total) * 100)}%`,
                                                }}
                                            />
                                        </span>
                                        <span
                                            className={clsx(
                                                "tw-font-mono tw-text-[11px] tw-tracking-[0.06em]",
                                                tone.meta
                                            )}
                                        >
                                            {done}/{total}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Section panel — one at a time, all stacked when printing */}
                {printing ? STEPS.map(renderPanel) : renderPanel(STEPS[active], active)}

                {/* Step navigation */}
                {!printing && (
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-pt-5 print:tw-hidden">
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={!prev}
                            onClick={() => goToStep(active - 1)}
                            className="tw-max-w-full maxSm:tw-min-w-0 tw-gap-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                        >
                            <span aria-hidden="true">&larr;</span>
                            {prev ? (
                                <span>
                                    <span className="tw-sr-only">Previous section: </span>
                                    {prev.title}
                                </span>
                            ) : (
                                "Previous"
                            )}
                        </Button>
                        <Button
                            size="sm"
                            disabled={!next}
                            onClick={() => goToStep(active + 1)}
                            className="tw-max-w-full maxSm:tw-min-w-0 tw-gap-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                        >
                            {next ? (
                                <>
                                    <span>
                                        <span className="tw-sr-only">Next section: </span>
                                        {next.title}
                                    </span>
                                    <span aria-hidden="true">&rarr;</span>
                                </>
                            ) : (
                                "End of checklist"
                            )}
                        </Button>
                    </div>
                )}

                {/* Closing rule */}
                <div className="tw-container tw-pt-14">
                    <div className="tw-relative tw-h-px tw-bg-gray-100">
                        <span className="tw-absolute tw-left-0 tw-top-0 tw-block tw-h-px tw-w-12 tw-bg-red" />
                    </div>
                    <div className="tw-mt-5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-gray-300">
                        Vets Who Code &middot; Retool. Retrain. Relaunch.
                    </div>
                </div>
            </div>
        </>
    );
};

PortfolioChecklist.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
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

export default PortfolioChecklist;
