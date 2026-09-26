import { formatAsOf, OutcomeStat, outcomes, placementMethodology } from "@data/outcomes";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

// "97%" → n "97", suffix "%" so the module tiles keep the gold suffix split
// the two literal tiles below use.
const tile = (stat: OutcomeStat): StatTile => {
    const [, n = stat.display, suffix = ""] = stat.display.match(/^(.*?)([%+]*)$/) ?? [];
    return { n, suffix, label: stat.label, sub: stat.qualifier };
};

type StatTile = {
    n: string;
    suffix: string;
    label: string;
    sub: string;
    methodology?: string | null;
};

const STATS: StatTile[] = [
    // The methodology sentence prints under the placement tile only once its
    // window and denominator are confirmed (#1332); until then it is null.
    { ...tile(outcomes.placementRate), methodology: placementMethodology() },
    tile(outcomes.alumniEarnings),
    {
        n: "500",
        suffix: "+",
        label: "Veterans by 2030",
        sub: "Our scale-by-depth target. Small cohorts. Real outcomes.",
    },
    {
        n: "$0",
        suffix: "",
        label: "Cost to troops",
        sub: "Always free. Funded by donors, alumni, and corporate partners.",
    },
];

const Stats = () => {
    return (
        <section
            id="methodology"
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-[100px] tw-text-white"
            style={{
                borderTop: "1px solid rgba(185,214,242,0.08)",
                borderBottom: "1px solid rgba(185,214,242,0.08)",
                scrollMarginTop: 96,
            }}
            aria-labelledby="about-stats-headline"
        >
            <div className="tw-relative tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-14 tw-flex tw-flex-wrap tw-items-baseline tw-justify-between tw-gap-10 tw-pb-14"
                    style={{ borderBottom: "1px solid rgba(185,214,242,0.12)" }}
                >
                    <span
                        className="tw-inline-flex tw-items-center tw-gap-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(185,214,242,0.65)",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red"
                        />
                        The Receipts · A Decade On
                    </span>
                    <h2
                        id="about-stats-headline"
                        className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                        style={{
                            fontWeight: 800,
                            fontSize: "clamp(28px, 3vw, 40px)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        We surface our numbers, openly.
                    </h2>
                </motion.div>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={scrollUpVariants}
                            className="tw-relative"
                            style={{
                                padding:
                                    i === STATS.length - 1 ? "12px 0 12px 0" : "12px 36px 12px 0",
                                borderRight:
                                    i === STATS.length - 1
                                        ? "none"
                                        : "1px solid rgba(185,214,242,0.10)",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                className="tw-absolute tw-left-0 tw-top-0 tw-h-[2px] tw-w-8 tw-bg-red"
                            />
                            <span
                                className="tw-mb-2.5 tw-block"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "rgba(185,214,242,0.7)",
                                }}
                            >
                                {s.label}
                            </span>
                            <span
                                className="tw-mb-[18px] tw-block tw-font-heading tw-text-white"
                                style={{
                                    fontWeight: 900,
                                    fontSize: "clamp(56px, 6vw, 88px)",
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.04em",
                                }}
                            >
                                {s.n}
                                <span className="tw-text-gold">{s.suffix}</span>
                            </span>
                            <p
                                className="tw-m-0 tw-font-body"
                                style={{
                                    fontSize: 14,
                                    lineHeight: 1.55,
                                    color: "rgba(248,249,250,0.6)",
                                    maxWidth: 220,
                                }}
                            >
                                {s.sub}
                            </p>
                            {s.methodology && (
                                <p
                                    className="tw-m-0 tw-mt-2 tw-font-body"
                                    style={{
                                        fontSize: 13,
                                        lineHeight: 1.55,
                                        color: "rgba(248,249,250,0.75)",
                                        maxWidth: 220,
                                    }}
                                >
                                    {s.methodology}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div
                    className="tw-mt-14 tw-flex tw-flex-col tw-gap-3 tw-pt-8"
                    style={{
                        borderTop: "1px solid rgba(185,214,242,0.08)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--silver)",
                    }}
                >
                    <span>EIN 86-2122804 · 501(c)(3) Nonprofit · Tax-deductible</span>
                    {/* Public methodology note (#1329): one line per number, only for
                        numbers whose source is on record. */}
                    {Object.values(outcomes)
                        .filter((stat) => stat.source)
                        .map((stat) => (
                            <span key={stat.key}>
                                {stat.label} · {stat.source}
                                {stat.asOf ? ` · As of ${formatAsOf(stat.asOf)}` : ""}
                            </span>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
