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
            "You have 8 seconds. Every element either moves a hiring manager toward \u201cI need to talk to this person\u201d or it\u2019s noise.",
        items: [
            {
                id: "1-1",
                text: "Headline positioning statement \u2014 one sentence that says what you build and who it\u2019s for. Not a tool list.",
            },
            {
                id: "1-2",
                text: "Target roles stated clearly \u2014 say what you\u2019re looking for so the right people self-select.",
            },
            {
                id: "1-3",
                text: 'CTA above the fold \u2014 a recruiter should see "View Artifacts" or "Book an Intro" without scrolling.',
            },
            {
                id: "1-4",
                text: "Email capture popup \u2014 offer your r\u00e9sum\u00e9 as a download or send it to their inbox. Name, email, done.",
            },
            {
                id: "1-5",
                text: "Contact surface obvious \u2014 email, LinkedIn, and GitHub links visible from every page.",
            },
            {
                id: "1-6",
                text: "Clean navigation \u2014 About, Projects, Artifacts, Blog, Press/Talks, Contact. That\u2019s it.",
            },
            {
                id: "1-7",
                text: "Custom domain with HTTPS \u2014 yourname.dev or similar. No default subdomain URLs.",
            },
            {
                id: "1-8",
                text: "Mobile-responsive, accessible \u2014 recruiters browse on phones between meetings.",
            },
        ],
    },
    {
        id: "proof-of-work",
        number: "2",
        title: "Proof of Work",
        description:
            "This is your product catalog. Every card should make someone want to click through.",
        items: [
            {
                id: "2-1",
                text: 'Each project card shows an outcome, not a description \u2014 "Cut API response time 60% for 50K daily users" not "Built a REST API with Express."',
            },
            {
                id: "2-2",
                text: "1-sentence business impact visible on the card without clicking in.",
            },
            {
                id: "2-3",
                text: "Tech scope tags \u2014 secondary to the outcome. Tags are filters, not headlines.",
            },
            {
                id: "2-4",
                text: "Live demo link or demo video \u2014 a working app is best, but a short video walkthrough works.",
            },
            {
                id: "2-5",
                text: "Repo link obvious \u2014 if there\u2019s no live demo and no video, the project shouldn\u2019t be on the index.",
            },
            {
                id: "2-6",
                text: "Visual proof strip \u2014 tests passing badge, last deploy date, uptime or performance snapshot.",
            },
            {
                id: "2-7",
                text: 'No "coming soon" cards \u2014 either it ships or it doesn\u2019t exist on this page.',
            },
        ],
    },
    {
        id: "artifact-deep-dives",
        number: "3",
        title: "Artifact Deep Dives",
        description:
            "This is where you convert interest into a conversation. Each artifact is a story: situation \u2192 approach \u2192 result \u2192 reflection.",
        subsections: [
            {
                title: "The Story",
                items: [
                    {
                        id: "3-1",
                        text: "Problem statement with business context \u2014 who had the problem, what it cost them, what constraints you operated under.",
                    },
                    {
                        id: "3-2",
                        text: "Success criteria defined upfront \u2014 what \u201cdone\u201d looked like, stated in measurable terms.",
                    },
                    {
                        id: "3-3",
                        text: "Your approach and architecture \u2014 architecture diagram + brief stack summary. This is \u201chow I think.\u201d",
                    },
                    {
                        id: "3-4",
                        text: "Key tradeoffs you made and why \u2014 serverless vs containers, SQL vs NoSQL, build vs buy. The senior engineer signal.",
                    },
                    {
                        id: "3-5",
                        text: "Measurable outcome \u2014 tie back to success criteria. Numbers. Before/after. Business impact a non-engineer VP can understand.",
                    },
                    {
                        id: "3-6",
                        text: "What I\u2019d change in v2 \u2014 shows self-awareness, learning orientation, and honesty.",
                    },
                ],
            },
            {
                title: "The Evidence",
                items: [
                    {
                        id: "3-7",
                        text: "Live demo or demo video \u2014 working app, recorded walkthrough, or Loom-style video.",
                    },
                    {
                        id: "3-8",
                        text: "Repo link \u2014 clean, documented, CI green.",
                    },
                    {
                        id: "3-9",
                        text: "Architecture diagram \u2014 Mermaid, Excalidraw, or a clean image. Doesn\u2019t need to be fancy, needs to be clear.",
                    },
                    {
                        id: "3-10",
                        text: "Links to related blog posts \u2014 cross-link your deeper technical writing.",
                    },
                ],
            },
        ],
    },
    {
        id: "technical-credibility",
        number: "4",
        title: "Technical Credibility Signals",
        description:
            "Hiring managers and senior engineers will click into your repos. They\u2019re looking for professional habits, not perfection.",
        subsections: [
            {
                title: "Repository Basics",
                items: [
                    {
                        id: "4-1",
                        text: "README that gets someone running in 5 minutes \u2014 quickstart, env vars, scripts, and deploy steps.",
                    },
                    {
                        id: "4-2",
                        text: "Architecture diagram in /docs \u2014 Mermaid or Excalidraw. Shows you think in systems.",
                    },
                    {
                        id: "4-3",
                        text: "Strict language settings and linting config checked in \u2014 signals you care about code quality.",
                    },
                    {
                        id: "4-4",
                        text: "Dependency management visible \u2014 automated updates enabled, security audits in CI.",
                    },
                ],
            },
            {
                title: "Testing",
                items: [
                    {
                        id: "4-5",
                        text: "Tests exist and pass \u2014 unit tests with a coverage badge or report. Table stakes.",
                    },
                    {
                        id: "4-6",
                        text: "CI runs tests on PR and main \u2014 the badge should be green.",
                    },
                    {
                        id: "4-7",
                        text: "Integration or E2E tests present \u2014 even one meaningful E2E test signals production thinking.",
                    },
                ],
            },
            {
                title: "CI/CD",
                items: [
                    {
                        id: "4-8",
                        text: "Pipeline config in the repo \u2014 GitHub Actions, CircleCI, whatever. Visible and automated.",
                    },
                    {
                        id: "4-9",
                        text: 'Deploy process described \u2014 doesn\u2019t need to be complex. "Push to main deploys to Vercel" is fine.',
                    },
                    {
                        id: "4-10",
                        text: "Environment promotion noted \u2014 if you have staging \u2192 production, say so.",
                    },
                ],
            },
            {
                title: "Observability",
                items: [
                    {
                        id: "4-11",
                        text: "Logging approach noted \u2014 what logger, structured logs, correlation IDs if applicable.",
                    },
                    {
                        id: "4-12",
                        text: "Key metrics identified \u2014 latency, error rate, what you\u2019d alert on.",
                    },
                    {
                        id: "4-13",
                        text: 'Uptime or performance target stated \u2014 "99.9% uptime target" or "p95 under 200ms."',
                    },
                ],
            },
            {
                title: "Security",
                items: [
                    {
                        id: "4-14",
                        text: "Auth approach described \u2014 how users authenticate and how permissions work.",
                    },
                    {
                        id: "4-15",
                        text: "No secrets in the repo \u2014 state your secrets management approach.",
                    },
                    {
                        id: "4-16",
                        text: "Input validation called out \u2014 mention your validation strategy.",
                    },
                ],
            },
        ],
    },
    {
        id: "authority-social-proof",
        number: "5",
        title: "Authority & Social Proof",
        description:
            "Why you, not someone else. Build credibility through content, visibility, and community contribution.",
        subsections: [
            {
                title: "Content",
                items: [
                    {
                        id: "5-1",
                        text: "Blog posts that unpack real decisions \u2014 design choices, performance wins, lessons from outages.",
                    },
                    {
                        id: "5-2",
                        text: 'At least one "deep dive" post \u2014 mirrors a real engineering writeup. Your writing sample for async-first teams.',
                    },
                    {
                        id: "5-3",
                        text: "Artifacts link to related posts \u2014 cross-pollinate your content. Keep people on your site.",
                    },
                ],
            },
            {
                title: "Press & Talks",
                items: [
                    {
                        id: "5-4",
                        text: "Dedicated press/talks page \u2014 interviews, articles, conference talks, awards, media features.",
                    },
                    {
                        id: "5-5",
                        text: "Testimonials or recommendations \u2014 brief quotes with names and titles.",
                    },
                ],
            },
            {
                title: "Open Source",
                items: [
                    {
                        id: "5-6",
                        text: "Highlight meaningful contributions \u2014 merged PRs, maintained packages, issues resolved. Quality over quantity.",
                    },
                ],
            },
        ],
    },
    {
        id: "discoverability",
        number: "6",
        title: "Discoverability & Distribution",
        description:
            "Getting found. Make sure your portfolio works for you even when you\u2019re not sharing it directly.",
        items: [
            {
                id: "6-1",
                text: "Basic SEO \u2014 page titles, meta descriptions, canonical URLs, sitemap, robots.txt.",
            },
            {
                id: "6-2",
                text: "Social preview images (OG tags) \u2014 when shared on Slack or LinkedIn, it should look intentional.",
            },
            {
                id: "6-3",
                text: "Favicons set \u2014 small detail that signals professionalism.",
            },
            {
                id: "6-4",
                text: "LinkedIn profile linked and active \u2014 pinned post linking to your portfolio or best artifact.",
            },
            {
                id: "6-5",
                text: "GitHub profile polished \u2014 pinned repos match your portfolio, profile README exists.",
            },
            {
                id: "6-6",
                text: 'Recruiter CTA banner \u2014 "Hiring a senior engineer? See my artifacts \u2192" Make the next step obvious.',
            },
        ],
    },
    {
        id: "maintenance",
        number: "7",
        title: "Maintenance",
        description:
            "A stale portfolio works against you. Keep it alive or it signals abandonment.",
        items: [
            {
                id: "7-1",
                text: "All links work, all demos are live \u2014 broken links signal abandonment. Check monthly.",
            },
            {
                id: "7-2",
                text: "CI is green on showcased repos \u2014 if the badge is red, you\u2019re advertising that you don\u2019t maintain your work.",
            },
            {
                id: "7-3",
                text: "Add a new artifact or post at least monthly \u2014 shows you\u2019re active and growing.",
            },
            {
                id: "7-4",
                text: "Quarterly review \u2014 update screenshots, metrics, links. Archive stale projects with a \u201cretired\u201d note.",
            },
            {
                id: "7-5",
                text: "\u201cWhat\u2019s New\u201d section or changelog \u2014 optional but strong. Shows continuous improvement.",
            },
        ],
    },
];

const QUALITY_BAR_ITEMS: ChecklistItem[] = [
    {
        id: "qb-1",
        text: "Every project has: live link or demo video, repo, architecture diagram, test evidence, deployment note, and an observability note.",
    },
    {
        id: "qb-2",
        text: "Homepage clearly states your target roles and how to contact you.",
    },
    {
        id: "qb-3",
        text: 'No "coming soon" placeholders anywhere.',
    },
    {
        id: "qb-4",
        text: "You can explain every technical choice on your portfolio in a live conversation \u2014 if you can\u2019t defend it, don\u2019t display it.",
    },
];

// --- Storage Key ---

const STORAGE_KEY = "vwc-portfolio-checklist";

// --- Steps: the seven sections plus the Quality Bar, one panel each ---

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

const TOTAL_ITEMS = STEP_IDS.reduce((sum, ids) => sum + ids.length, 0);

const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const GHOST_BUTTON =
    "tw-inline-flex tw-min-h-[38px] tw-items-center tw-bg-transparent tw-px-2.5 tw-font-mono tw-text-[11px] tw-font-medium tw-uppercase tw-tracking-[0.1em] tw-text-gray-300 tw-transition-colors tw-duration-300 hover:tw-text-navy hover:tw-underline";

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

    const counts = STEP_IDS.map((ids) => ({
        done: ids.filter((id) => checked[id]).length,
        total: ids.length,
    }));
    const checkedCount = counts.reduce((sum, count) => sum + count.done, 0);
    const progressPercent = Math.round((checkedCount / TOTAL_ITEMS) * 100);

    useEffect(() => {
        const stored = SafeLocalStorage.getItem<Record<string, boolean>>(STORAGE_KEY, {});
        setChecked(stored);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            SafeLocalStorage.setItem(STORAGE_KEY, checked);
        }
    }, [checked, mounted]);

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

    const renderItem = (item: ChecklistItem) => {
        const isDone = !!checked[item.id];
        return (
            <label
                key={item.id}
                className={clsx(
                    "tw-flex tw-cursor-pointer tw-items-start tw-gap-4 tw-border tw-border-l-2 tw-border-gray-100 tw-px-5 tw-py-[15px] tw-transition-all tw-duration-300 tw-ease-[var(--ease-card)] hover:tw-border-l-red hover:tw-shadow-sm hover:tw-shadow-black/10",
                    isDone
                        ? "tw-border-l-navy tw-bg-gray-50"
                        : "tw-border-l-transparent tw-bg-white"
                )}
            >
                <span className="tw-relative tw-mt-[3px] tw-h-5 tw-w-5 tw-shrink-0">
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleItem(item.id)}
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
                        "tw-text-base tw-leading-[1.68] [text-wrap:pretty]",
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
                    <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-start sm:tw-gap-[22px]">
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
                                        "tw-m-0 tw-scroll-mt-[calc(var(--header-sticky-offset,0px)+8rem)] [font-size:clamp(22px,3vw,30px)]",
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
                                    {done} / {total} done
                                </span>
                            </div>
                            <p className="tw-mb-0 tw-mt-3 tw-max-w-[72ch] tw-text-base tw-leading-body tw-text-gray-300 [text-wrap:pretty]">
                                {step.description}
                            </p>
                        </div>
                    </div>

                    {groups.map((group) => (
                        <div key={group.title || step.id} className="tw-mt-[30px]">
                            {group.title && (
                                <Eyebrow as="h3" className="tw-mb-3.5 tw-text-navy-ocean">
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
                className="tw-bg-gray-50"
            />

            <div className="tw-bg-cream tw-pb-24 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]">
                {/* Hero */}
                <section className="tw-relative tw-overflow-hidden tw-bg-navy tw-pb-16 tw-pt-20">
                    <div
                        aria-hidden="true"
                        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-[0.02]"
                        style={{ backgroundImage: GRAIN }}
                    />
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-end tw-justify-between tw-gap-12">
                        <div className="tw-min-w-0 tw-flex-[1_1_520px]">
                            <Eyebrow className="tw-mb-7 tw-text-gray-100">
                                Sharpen Skills &middot; 2026 Edition
                            </Eyebrow>
                            <h1 className="tw-mb-[26px] tw-mt-0 tw-max-w-[20ch] tw-text-white [font-size:clamp(34px,5vw,58px)]">
                                Portfolio Checklist for Software Engineers
                            </h1>
                            <p className="tw-m-0 tw-max-w-[60ch] tw-text-lg tw-leading-[1.6] tw-text-navy-sky [text-wrap:pretty]">
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
                                        "tw-block tw-h-3 tw-w-3 tw-border-2",
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
                            if (isActive) rule = "tw-border-t-red";
                            else if (complete) rule = "tw-border-t-gold";
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    aria-current={isActive ? "step" : undefined}
                                    onClick={() => setActive(index)}
                                    className={clsx(
                                        "tw-flex tw-min-h-[132px] tw-flex-col tw-gap-2.5 tw-border-t-2 tw-px-5 tw-pb-4 tw-pt-[18px] tw-text-left tw-transition-all tw-duration-300 tw-ease-[var(--ease-card)] hover:tw-border-t-red",
                                        rule,
                                        tone.bg
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
                            className="tw-max-w-full !tw-min-w-0 tw-gap-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
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
                            className="tw-max-w-full !tw-min-w-0 tw-gap-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
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
