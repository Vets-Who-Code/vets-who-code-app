import { DIFFERENTIATORS, STATS, STATS_HEADER } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./differentiators.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const DifferentiatorsSection = () => {
    return (
        <section
            className="dark-section tw-py-[60px] md:tw-py-[100px]"
            style={{ background: "#091f40" }}
        >
            <div className="tw-container">
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
                            color: "#FFFFFF",
                        }}
                    >
                        <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                        <span>SECTION 07 / THE STANDARD</span>
                    </div>
                    <h2
                        className="tw-mb-0 tw-mt-4 tw-uppercase tw-text-white"
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontWeight: 800,
                            fontSize: "clamp(32px, 4vw, 56px)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            maxWidth: "800px",
                        }}
                    >
                        What every engagement ships with.
                    </h2>
                </motion.div>

                <div className={styles.diffGrid}>
                    {DIFFERENTIATORS.map((d) => (
                        <motion.div
                            key={d.num}
                            className={styles.diff}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={scrollUpVariants}
                        >
                            <div className={styles.diffNum}>{d.num}</div>
                            <h3 className={styles.diffTitle}>{d.title}</h3>
                            <p className={styles.diffBody}>{d.body}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.stats}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={scrollUpVariants}
                >
                    <div className={styles.statsHeader}>{STATS_HEADER}</div>
                    <div className={styles.statsRow}>
                        {STATS.map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <div className={styles.statNum}>{s.num}</div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DifferentiatorsSection;
