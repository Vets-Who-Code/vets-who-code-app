import { DELIVERABLES, PROCESS } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./process.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const ProcessSection = () => {
    return (
        <section className="tw-bg-cream tw-py-[60px] md:tw-py-[100px]">
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
                            color: "#091f40",
                        }}
                    >
                        <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                        <span>SECTION 03 / OPERATIONS CADENCE</span>
                    </div>
                    <h2
                        className="tw-mb-0 tw-mt-4 tw-uppercase tw-text-secondary"
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontWeight: 800,
                            fontSize: "clamp(32px, 4vw, 56px)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            maxWidth: "800px",
                        }}
                    >
                        Recon · Plan · Build · Hand off.
                    </h2>
                    <p
                        className="tw-mt-6 tw-mb-0"
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.6,
                            color: "#495057",
                            maxWidth: "720px",
                        }}
                    >
                        We borrowed our cadence from the Army. Demo every Friday, async daily
                        SITREP, code in your repo on day one. No surprises, no scope-creep theater,
                        no two-month silence.
                    </p>
                </motion.div>

                <div className={styles.timeline}>
                    {PROCESS.map((p, i) => (
                        <motion.div
                            key={p.phase}
                            className={styles.step}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={scrollUpVariants}
                        >
                            <div className={styles.marker}>
                                <span
                                    className={i === 0 ? styles.dotFilled : styles.dotOutline}
                                    aria-hidden="true"
                                />
                                <span className={styles.phase}>{p.phase}</span>
                            </div>
                            <h3 className={styles.stepName}>{p.name}</h3>
                            <p className={styles.stepBody}>{p.body}</p>
                            <div className={styles.duration}>{p.duration}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.artifacts}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={scrollUpVariants}
                >
                    <div className={styles.artifactsHead}>
                        <div
                            style={{
                                ...monoLabel,
                                color: "#6C757D",
                            }}
                        >
                            Deliverables
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 800,
                                fontSize: "16px",
                                marginTop: 4,
                                textTransform: "uppercase",
                                letterSpacing: "-0.01em",
                                color: "#091f40",
                            }}
                        >
                            Per Engagement
                        </div>
                    </div>
                    {DELIVERABLES.map((a) => (
                        <div key={a.name} className={styles.artifact}>
                            <div className={styles.artifactName}>{a.name}</div>
                            <div className={styles.artifactDesc}>{a.description}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;
