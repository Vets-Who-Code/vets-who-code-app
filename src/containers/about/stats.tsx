import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const STATS = [
    {
        n: "97",
        suffix: "%",
        label: "Placement rate",
        sub: "Of graduates land tech roles within months of completion.",
    },
    {
        n: "$20M",
        suffix: "+",
        label: "Alumni earnings",
        sub: "Collective compensation earned by VWC alumni to date.",
    },
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
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-[100px] tw-text-white"
            style={{
                borderTop: "1px solid rgba(185,214,242,0.08)",
                borderBottom: "1px solid rgba(185,214,242,0.08)",
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
                                <span className="tw-text-red">{s.suffix}</span>
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
                        </motion.div>
                    ))}
                </div>

                <div
                    className="tw-mt-14 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-pt-8"
                    style={{
                        borderTop: "1px solid rgba(185,214,242,0.08)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(185,214,242,0.55)",
                    }}
                >
                    <span>EIN 86-2122804 · 501(c)(3) Nonprofit · Tax-deductible</span>
                    <span>Source · Internal cohort data · Updated quarterly</span>
                </div>
            </div>
        </section>
    );
};

export default Stats;
