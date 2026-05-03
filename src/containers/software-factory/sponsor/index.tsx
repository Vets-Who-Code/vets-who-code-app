import { SPONSOR_TIERS } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./sponsor.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const SponsorSection = () => {
    return (
        <section className="tw-bg-cream tw-py-[60px] md:tw-py-[100px]">
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1fr_1.2fr] lg:tw-gap-20 lg:tw-items-start">
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                    >
                        <div
                            className="tw-flex tw-items-center tw-gap-3"
                            style={{
                                ...monoLabel,
                                fontSize: "12px",
                                color: "#091f40",
                            }}
                        >
                            <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                            <span>SECTION 05 / SPONSOR TRACK</span>
                        </div>
                        <h2
                            className="tw-mb-0 tw-mt-4 tw-uppercase tw-text-secondary"
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 800,
                                fontSize: "clamp(32px, 4vw, 56px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            Don&rsquo;t need software?
                            <br />
                            Sponsor a cohort.
                        </h2>
                        <p
                            className="tw-mt-6 tw-mb-0"
                            style={{
                                fontSize: "18px",
                                lineHeight: 1.6,
                                color: "#495057",
                            }}
                        >
                            Foundations and corporate giving programs can fund a Factory cohort
                            directly. The grant pays the salaries of transitioning service members
                            for a 16-week paid apprenticeship — and produces an open-source
                            deliverable in your name.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.tiers}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={scrollUpVariants}
                    >
                        {SPONSOR_TIERS.map((s, i) => (
                            <div
                                key={s.tier}
                                className={`${styles.tile} ${s.popular ? styles.popular : ""}`}
                                data-index={i}
                            >
                                {s.popular && (
                                    <span className={styles.popularAccent} aria-hidden="true" />
                                )}
                                <div className={styles.tier}>{s.tier}</div>
                                <div className={styles.amount}>{s.amount}</div>
                                <p className={styles.body}>{s.body}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SponsorSection;
