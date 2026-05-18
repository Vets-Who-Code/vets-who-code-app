import { ENGAGEMENTS } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./engagements.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const EngagementsSection = () => {
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
                            <span>SECTION 04 / SELECTED ENGAGEMENTS</span>
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
                            What we&rsquo;ve shipped.
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
                        Live URLs and full case studies on request. Most of our work sits behind
                        NDAs; public examples below give you the shape of what we ship.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {ENGAGEMENTS.map((p) => (
                        <motion.article
                            key={p.id}
                            className={styles.card}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                        >
                            <div className={styles.meta}>
                                <span className={styles.id}>
                                    {p.id} · {p.tag}
                                </span>
                                <span className={styles.year}>{p.year}</span>
                            </div>
                            <h3 className={styles.title}>{p.title}</h3>
                            <p className={styles.body}>{p.body}</p>
                            <div className={styles.foot}>
                                <span className={styles.stack}>{p.stack}</span>
                                <span className={styles.aar}>
                                    READ AAR <span aria-hidden="true">→</span>
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EngagementsSection;
