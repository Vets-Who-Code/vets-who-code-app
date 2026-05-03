import { TEAM } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./team.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const TeamSection = () => {
    return (
        <section className="dark-section tw-bg-navy tw-py-[60px] md:tw-py-[100px]">
            <div className="tw-container">
                <motion.div
                    className="tw-mb-14 tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-2 lg:tw-items-end"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                >
                    <div>
                        <div
                            className="tw-flex tw-items-center tw-gap-3"
                            style={{
                                ...monoLabel,
                                fontSize: "12px",
                                color: "#FFFFFF",
                            }}
                        >
                            <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                            <span>SECTION 06 / LEADERSHIP</span>
                        </div>
                        <h2
                            className="tw-mb-0 tw-mt-4 tw-uppercase tw-text-white"
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 800,
                                fontSize: "clamp(32px, 4vw, 56px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            The chain of command.
                        </h2>
                    </div>
                    <p
                        className="tw-m-0"
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.6,
                            color: "rgba(185, 214, 242, 0.7)",
                            maxWidth: "480px",
                        }}
                    >
                        Every engagement is led by a full-time veteran staff engineer. No surprise
                        resumes, no offshore subcontracting, no junior-only teams.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {TEAM.map((t) => (
                        <motion.div
                            key={t.name}
                            className={styles.card}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                        >
                            <div className={styles.photo} aria-hidden="true">
                                <span>
                                    PHOTO ·{" "}
                                    {t.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.name}>{t.name}</div>
                                <div className={styles.role}>{t.role}</div>
                                <div className={styles.branch}>
                                    {t.branch}
                                    <br />
                                    {t.specialty}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
