import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import HeroGitGraph from "./hero-git-graph";
import styles from "./theory.module.css";

const META = [
    { label: "Repository", value: "vetswhocode/troops" },
    { label: "Branch", value: "main → production" },
    { label: "Cohort", value: "2026 · open" },
    { label: "License", value: "501(c)(3) · free" },
];

const Hero = () => {
    return (
        <section
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-pb-20 tw-pt-[140px] tw-text-white lg:tw-min-h-screen"
            aria-labelledby="toc-hero-headline"
        >
            <span aria-hidden="true" className={styles.heroGrid} />
            <span aria-hidden="true" className={styles.heroGlow} />

            <div className="tw-relative tw-mx-auto tw-grid tw-max-w-[1230px] tw-grid-cols-1 tw-items-center tw-gap-12 tw-px-5 md:tw-px-10 lg:tw-grid-cols-[minmax(320px,1fr)_minmax(420px,1.2fr)] lg:tw-gap-20">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                >
                    <div
                        className="tw-mb-9 tw-flex tw-items-center tw-gap-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="tw-inline-block tw-h-[2px] tw-w-7 tw-bg-red"
                        />
                        Theory of Change · v2026
                    </div>

                    <h1
                        id="toc-hero-headline"
                        className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                        style={{
                            fontWeight: 900,
                            fontSize: "clamp(48px, 8vw, 104px)",
                            lineHeight: 0.92,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Service.
                        <br />
                        <span className="tw-text-red">Software.</span>
                        <br />
                        <span
                            style={{
                                color: "transparent",
                                WebkitTextStroke: "2px #fff",
                            }}
                        >
                            Shipped.
                        </span>
                    </h1>

                    <p
                        className="tw-mt-9 tw-font-body"
                        style={{
                            fontSize: 18,
                            lineHeight: 1.65,
                            color: "rgba(185,214,242,0.7)",
                            maxWidth: 480,
                        }}
                    >
                        A 17-week, remote-first pipeline that turns disciplined operators into
                        production software engineers. This is the commit log.
                    </p>

                    <div
                        className="tw-mt-12 tw-grid tw-grid-cols-2 tw-gap-x-8 tw-gap-y-5 tw-pt-7"
                        style={{ borderTop: "1px solid rgba(185,214,242,0.12)" }}
                    >
                        {META.map((m) => (
                            <div key={m.label}>
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 10,
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "rgba(185,214,242,0.55)",
                                        marginBottom: 6,
                                    }}
                                >
                                    {m.label}
                                </div>
                                <div
                                    className="tw-font-heading tw-uppercase tw-text-white"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    {m.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="tw-mt-10 tw-flex tw-items-center tw-gap-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(185,214,242,0.55)",
                        }}
                    >
                        <span className="tw-text-red">$</span>
                        <span>git checkout theory-of-change</span>
                        <span
                            aria-hidden="true"
                            className="tw-ml-auto tw-flex tw-items-center tw-gap-2"
                        >
                            <span className={styles.statusDot} />
                            2026 cohort active
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-w-full"
                >
                    <HeroGitGraph />
                </motion.div>
            </div>

            <div
                aria-hidden="true"
                className="tw-mt-16 tw-flex tw-flex-col tw-items-center tw-gap-3"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(185,214,242,0.45)",
                }}
            >
                <span>scroll · git log</span>
                <span className={styles.scrollCue} />
            </div>
        </section>
    );
};

export default Hero;
