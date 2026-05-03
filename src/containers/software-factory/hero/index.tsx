import { HERO_META } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Link from "next/link";
import styles from "./hero.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const HeroSection = () => {
    return (
        <section className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-[60px] md:tw-py-[100px]">
            <div className="tw-container">
                {/* Brief bar */}
                <div
                    className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-[rgba(185,214,242,0.08)] tw-pb-4"
                    style={{
                        ...monoLabel,
                        color: "rgba(185, 214, 242, 0.65)",
                    }}
                >
                    <span>OPERATIONS BRIEF · 26-04 / SOFTWARE FACTORY</span>
                    <span>CLASSIFICATION: PUBLIC</span>
                    <span className="tw-flex tw-items-center tw-gap-2">
                        <span className={styles.pulseDot} aria-hidden="true" />
                        EFFECTIVE 01 MAY 2026
                    </span>
                </div>

                {/* Two-column grid */}
                <div className="tw-mt-12 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[0.8fr_1.2fr] lg:tw-gap-20">
                    {/* Left column — mission + meta */}
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                    >
                        <div
                            className="tw-mb-6 tw-flex tw-items-center tw-gap-3"
                            style={{
                                ...monoLabel,
                                fontSize: "12px",
                                color: "#FFFFFF",
                            }}
                        >
                            <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                            <span>MISSION</span>
                        </div>
                        <p
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "13px",
                                lineHeight: 1.8,
                                color: "rgba(185, 214, 242, 0.7)",
                                maxWidth: "420px",
                            }}
                        >
                            Train transitioning service members in software engineering by deploying
                            them on real client work, supervised by veteran staff engineers. Ship
                            production software. Reinvest 100% of project margin into the program.
                        </p>

                        <dl className="tw-mt-10 tw-grid tw-grid-cols-[110px_1fr] tw-gap-y-3">
                            {HERO_META.map(([k, v]) => (
                                <div key={k} className="tw-contents">
                                    <dt
                                        style={{
                                            ...monoLabel,
                                            fontSize: "11px",
                                            color: "rgba(185, 214, 242, 0.7)",
                                        }}
                                    >
                                        {k}
                                    </dt>
                                    <dd
                                        style={{
                                            ...monoLabel,
                                            fontSize: "11px",
                                            color: "#FDB330",
                                            margin: 0,
                                        }}
                                    >
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    {/* Right column — H1 + lead + actions */}
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                    >
                        <h1
                            className="tw-m-0 tw-uppercase tw-text-white"
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 900,
                                fontSize: "clamp(48px, 8vw, 96px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 0.95,
                            }}
                        >
                            We ship
                            <br />
                            <span style={{ color: "#c5203e" }}>production</span>
                            <br />
                            code.
                        </h1>
                        <p
                            className="tw-mt-10 tw-mb-0"
                            style={{
                                fontSize: "22px",
                                lineHeight: 1.5,
                                color: "rgba(185, 214, 242, 0.7)",
                                maxWidth: "600px",
                            }}
                        >
                            A veteran-led engineering team for hire, embedded inside a 501(c)(3)
                            nonprofit. Hire us for the work; fund the mission as a side effect.
                        </p>

                        <div className="tw-mt-10 tw-flex tw-flex-wrap tw-gap-4">
                            <Link href="#discovery" className={styles.btnPrimary}>
                                Book Discovery <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                                href="/files/vwc-software-factory-capabilities.pdf"
                                className={styles.btnOutline}
                            >
                                Download Capabilities Brief (PDF)
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
