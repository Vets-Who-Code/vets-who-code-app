import Link from "next/link";

type Stat = {
    /** Big number/value, e.g. "300+", "$20M+", "<1%" */
    value: string;
    /** Short label, displayed beneath the value in monospace uppercase */
    label: string;
    /** Optional second-line context, e.g. "since 2014" */
    sub?: string;
};

const STATS: Stat[] = [
    {
        value: "300+",
        label: "Veterans Deployed",
        sub: "as production engineers since 2014",
    },
    {
        value: "$20M+",
        label: "Collective Earnings",
        sub: "first-year compensation, alumni",
    },
    {
        value: "<1%",
        label: "Acceptance Rate",
        sub: "selectivity comparable to top CS programs",
    },
];

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
};

const StatBelt = () => {
    return (
        <section
            className="dark-section tw-bg-navy tw-border-t tw-border-[rgba(185,214,242,0.08)] tw-py-10 md:tw-py-14"
            aria-label="Vets Who Code outcomes"
        >
            <div className="tw-container">
                {/* Tagline + CTA bar — sits above the three stats */}
                <div className="tw-mb-8 tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-3 tw-border-b tw-border-[rgba(185,214,242,0.08)] tw-pb-8 sm:tw-flex-row sm:tw-items-center md:tw-mb-10 md:tw-pb-10">
                    <p
                        className="tw-m-0 tw-text-white"
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontWeight: 700,
                            fontSize: "clamp(18px, 2vw, 22px)",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                        }}
                    >
                        First commit to production. Built by veterans.
                    </p>
                    <Link
                        href="/projects"
                        className="tw-group tw-inline-flex tw-items-center tw-gap-2 tw-whitespace-nowrap tw-text-gold hover:tw-text-gold-light"
                        style={{
                            ...monoLabel,
                            letterSpacing: "0.1em",
                        }}
                    >
                        <span>See the work</span>
                        <span
                            className="tw-inline-block tw-transition-transform group-hover:tw-translate-x-1"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </Link>
                </div>

                <ul className="tw-grid tw-grid-cols-1 tw-gap-8 sm:tw-grid-cols-3 sm:tw-gap-6 md:tw-gap-10">
                    {STATS.map((stat) => (
                        <li
                            key={stat.label}
                            className="tw-flex tw-flex-col tw-gap-2"
                        >
                            {/* Top row: pulse dot + label */}
                            <div
                                className="tw-flex tw-items-center tw-gap-2.5"
                                style={{
                                    ...monoLabel,
                                    color: "rgba(185, 214, 242, 0.7)",
                                }}
                            >
                                <span
                                    className="tw-inline-block tw-h-[6px] tw-w-[6px] tw-rounded-full tw-bg-gold"
                                    style={{
                                        animation:
                                            "pulse-soft 2.4s ease-in-out infinite",
                                    }}
                                    aria-hidden="true"
                                />
                                <span>{stat.label}</span>
                            </div>

                            {/* Big value — Obama-axis GothamPro */}
                            <div
                                className="tw-text-white"
                                style={{
                                    fontFamily: "var(--font-headline)",
                                    fontWeight: 800,
                                    fontSize: "clamp(40px, 5.4vw, 64px)",
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {stat.value}
                            </div>

                            {/* Sub-context */}
                            {stat.sub && (
                                <div
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "13px",
                                        lineHeight: 1.5,
                                        color: "rgba(185, 214, 242, 0.55)",
                                    }}
                                >
                                    {stat.sub}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default StatBelt;
