import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import Layout from "@layout/layout-01";
import { SafeLocalStorage } from "@utils/safe-storage";
import type { GetStaticProps, NextPage } from "next";
import { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";

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
        description: "Getting found. Make sure your portfolio works for you even when you\u2019re not sharing it directly.",
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
                text: '\u201cWhat\u2019s New\u201d section or changelog \u2014 optional but strong. Shows continuous improvement.',
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

// --- Helper: get all item IDs ---

function getAllItemIds(): string[] {
    const ids: string[] = [];
    for (const section of CHECKLIST_DATA) {
        if (section.items) {
            for (const item of section.items) {
                ids.push(item.id);
            }
        }
        if (section.subsections) {
            for (const sub of section.subsections) {
                for (const item of sub.items) {
                    ids.push(item.id);
                }
            }
        }
    }
    for (const item of QUALITY_BAR_ITEMS) {
        ids.push(item.id);
    }
    return ids;
}

// --- Page Component ---

type TProps = Record<string, never>;

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const PortfolioChecklist: PageProps = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [mounted, setMounted] = useState(false);

    const allIds = useMemo(() => getAllItemIds(), []);
    const totalItems = allIds.length;
    const checkedCount = useMemo(
        () => allIds.filter((id) => checked[id]).length,
        [allIds, checked]
    );
    const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

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

    const renderItem = (item: ChecklistItem) => (
        <label
            key={item.id}
            className="tw-flex tw-cursor-pointer tw-items-start tw-gap-3 tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-px-4 tw-py-3 tw-transition-all tw-duration-200 hover:tw-border-navy-ocean/30 hover:tw-shadow-sm print:tw-border-gray-200 print:tw-px-2 print:tw-py-1.5"
        >
            <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggleItem(item.id)}
                className="tw-mt-0.5 tw-h-5 tw-w-5 tw-shrink-0 tw-cursor-pointer tw-appearance-none tw-rounded tw-border-2 tw-border-gray-300 tw-bg-white tw-transition-colors checked:tw-border-navy-ocean checked:tw-bg-navy-ocean print:tw-appearance-auto"
            />
            <span
                className={clsx(
                    "tw-text-base tw-leading-relaxed tw-transition-colors print:tw-text-sm",
                    checked[item.id]
                        ? "tw-text-gray-400 tw-line-through print:tw-no-underline print:tw-text-body"
                        : "tw-text-body"
                )}
            >
                {item.text}
            </span>
        </label>
    );

    const getSectionProgress = (section: ChecklistSection) => {
        const sectionIds: string[] = [];
        if (section.items) {
            for (const item of section.items) sectionIds.push(item.id);
        }
        if (section.subsections) {
            for (const sub of section.subsections) {
                for (const item of sub.items) sectionIds.push(item.id);
            }
        }
        const done = sectionIds.filter((id) => checked[id]).length;
        return { done, total: sectionIds.length };
    };

    return (
        <>
            <SEO title="Portfolio Checklist for Software Engineers | Vets Who Code" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Portfolio Checklist"
                showTitle={false}
                className="tw-bg-gray-50"
            />

            {/* Hero */}
            <section className="tw-bg-gradient-to-br tw-from-secondary tw-to-navy-deep tw-py-16 tw-text-white md:tw-py-24 print:tw-bg-white print:tw-py-8 print:tw-text-body">
                <div className="tw-container tw-max-w-4xl">
                    <h1 className="tw-mb-4 tw-text-3xl tw-font-bold tw-leading-tight md:tw-text-5xl print:tw-text-2xl print:tw-text-secondary">
                        Portfolio Checklist for Software Engineers
                    </h1>
                    <p className="tw-mb-6 tw-text-lg tw-leading-relaxed tw-text-navy-sky md:tw-text-xl print:tw-text-body">
                        The portfolio is a sales site. Every element either moves a hiring
                        manager toward &ldquo;I need to talk to this person&rdquo; or
                        it&rsquo;s noise. Build accordingly.
                    </p>
                    <p className="tw-text-sm tw-text-navy-sky/70 print:tw-text-gray-200">
                        2025 Edition &middot; {totalItems} items across 7 sections
                    </p>
                </div>
            </section>

            {/* Progress Bar + Actions */}
            <div className="tw-sticky tw-top-0 tw-z-10 tw-border-b tw-border-gray-100 tw-bg-white/95 tw-backdrop-blur-sm print:tw-relative print:tw-bg-white">
                <div className="tw-container tw-flex tw-max-w-4xl tw-items-center tw-gap-4 tw-py-3">
                    <div className="tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-font-medium">
                            <span className="tw-text-secondary">
                                {checkedCount} / {totalItems} completed
                            </span>
                            <span className="tw-text-navy-ocean">{progressPercent}%</span>
                        </div>
                        <div className="tw-mt-1.5 tw-h-2 tw-overflow-hidden tw-rounded-full tw-bg-gray-100">
                            <div
                                className="tw-h-full tw-rounded-full tw-bg-gradient-to-r tw-from-navy-ocean tw-to-navy-royal tw-transition-all tw-duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-gap-2 print:tw-hidden">
                        <button
                            onClick={handlePrint}
                            type="button"
                            className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-secondary tw-transition-colors hover:tw-bg-gray-50"
                            title="Print or save as PDF"
                            aria-label="Print checklist or save as PDF"
                        >
                            <i className="fas fa-print tw-mr-1.5" />
                            Print / PDF
                        </button>
                        <button
                            onClick={resetAll}
                            type="button"
                            className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50 hover:tw-text-danger"
                            title="Reset all checkboxes"
                            aria-label="Reset all checkboxes to unchecked"
                        >
                            <i className="fas fa-undo tw-mr-1.5" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Checklist Sections */}
            <div className="tw-container tw-max-w-4xl tw-py-12 print:tw-py-4">
                <div className="tw-space-y-12 print:tw-space-y-6">
                    {CHECKLIST_DATA.map((section) => {
                        const { done, total } = getSectionProgress(section);
                        return (
                            <section
                                key={section.id}
                                id={section.id}
                                className="tw-scroll-mt-20"
                            >
                                {/* Section Header */}
                                <div className="tw-mb-6 tw-flex tw-items-start tw-gap-4 print:tw-mb-3">
                                    <span className="tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-secondary tw-text-lg tw-font-bold tw-text-white print:tw-bg-gray-200 print:tw-text-secondary">
                                        {section.number}
                                    </span>
                                    <div className="tw-flex-1">
                                        <div className="tw-flex tw-items-center tw-gap-3">
                                            <h2 className="tw-text-xl tw-font-bold tw-text-secondary md:tw-text-2xl print:tw-text-lg">
                                                {section.title}
                                            </h2>
                                            <span className="tw-rounded-full tw-bg-gray-50 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium tw-text-gray-200 print:tw-bg-gray-100">
                                                {done}/{total}
                                            </span>
                                        </div>
                                        <p className="tw-mt-1 tw-text-base tw-text-gray-200 print:tw-text-sm">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Items (flat) */}
                                {section.items && (
                                    <div className="tw-space-y-2 print:tw-space-y-1">
                                        {section.items.map(renderItem)}
                                    </div>
                                )}

                                {/* Items (with subsections) */}
                                {section.subsections && (
                                    <div className="tw-space-y-6 print:tw-space-y-3">
                                        {section.subsections.map((sub) => (
                                            <div key={sub.title}>
                                                <h3 className="tw-mb-3 tw-ml-1 tw-text-sm tw-font-bold tw-uppercase tw-tracking-wider tw-text-navy-ocean print:tw-mb-1 print:tw-text-xs">
                                                    {sub.title}
                                                </h3>
                                                <div className="tw-space-y-2 print:tw-space-y-1">
                                                    {sub.items.map(renderItem)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        );
                    })}

                    {/* Quality Bar */}
                    <section
                        id="quality-bar"
                        className="tw-scroll-mt-20 tw-rounded-2xl tw-border-2 tw-border-primary/20 tw-bg-gradient-to-br tw-from-primary/5 tw-to-transparent tw-p-6 md:tw-p-8 print:tw-border-gray-200 print:tw-bg-white print:tw-p-4"
                    >
                        <div className="tw-mb-6 print:tw-mb-3">
                            <h2 className="tw-text-xl tw-font-bold tw-text-primary md:tw-text-2xl print:tw-text-lg">
                                The Quality Bar
                            </h2>
                            <p className="tw-mt-1 tw-text-base tw-text-gray-200 print:tw-text-sm">
                                Don&rsquo;t share until every one of these is true.
                            </p>
                        </div>
                        <div className="tw-space-y-2 print:tw-space-y-1">
                            {QUALITY_BAR_ITEMS.map(renderItem)}
                        </div>
                    </section>
                </div>
            </div>

            {/* Table of Contents (sidebar on large screens) */}
            <nav
                className="tw-fixed tw-bottom-6 tw-right-6 tw-z-20 tw-hidden tw-w-56 tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-p-4 tw-shadow-lg xl:tw-block print:tw-hidden"
                aria-label="Checklist sections"
            >
                <p className="tw-mb-3 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-gray-200">
                    Sections
                </p>
                <ul className="tw-space-y-1.5">
                    {CHECKLIST_DATA.map((section) => {
                        const { done, total } = getSectionProgress(section);
                        const complete = done === total;
                        return (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={clsx(
                                        "tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-2 tw-py-1 tw-text-sm tw-transition-colors hover:tw-bg-gray-50",
                                        complete
                                            ? "tw-text-navy-ocean"
                                            : "tw-text-gray-300"
                                    )}
                                >
                                    <i
                                        className={clsx(
                                            "tw-text-xs",
                                            complete
                                                ? "fas fa-check-circle tw-text-navy-ocean"
                                                : "far fa-circle tw-text-gray-100"
                                        )}
                                    />
                                    <span className="tw-truncate">
                                        {section.number}. {section.title}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                    <li>
                        <a
                            href="#quality-bar"
                            className="tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-2 tw-py-1 tw-text-sm tw-text-gray-300 tw-transition-colors hover:tw-bg-gray-50"
                        >
                            <i className="far fa-star tw-text-xs tw-text-primary" />
                            <span className="tw-truncate">Quality Bar</span>
                        </a>
                    </li>
                </ul>
            </nav>
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
