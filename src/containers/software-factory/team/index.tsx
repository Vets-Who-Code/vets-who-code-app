import { TEAM } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Image from "next/image";
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
                            color: "#F8F9FA",
                            maxWidth: "480px",
                        }}
                    >
                        Every engagement is led by VWC leadership. No surprise resumes, no
                        offshore subcontracting, no junior-only teams.
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
                            <div className={styles.photo}>
                                {t.image ? (
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        sizes="(max-width: 575px) 100vw, (max-width: 991px) 200px, 240px"
                                        className={styles.photoImg}
                                    />
                                ) : (
                                    <span>
                                        PHOTO ·{" "}
                                        {t.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </span>
                                )}
                            </div>
                            <div className={styles.info}>
                                <div className={styles.role}>{t.role}</div>
                                <div className={styles.name}>{t.name}</div>
                                <div className={styles.branch}>
                                    {t.branch && (
                                        <>
                                            {t.branch}
                                            <br />
                                        </>
                                    )}
                                    {t.specialty}
                                </div>
                                {t.quote && (
                                    <blockquote className={styles.quote}>
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                )}
                                <p className={styles.body}>{t.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
