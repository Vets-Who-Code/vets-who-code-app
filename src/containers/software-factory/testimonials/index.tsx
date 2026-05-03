import { TESTIMONIALS } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./testimonials.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const TestimonialsSection = () => {
    return (
        <section className="dark-section tw-bg-navy tw-py-[60px] md:tw-py-[100px]">
            <div className="tw-container">
                <motion.div
                    className="tw-flex tw-items-center tw-gap-3"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    style={{
                        ...monoLabel,
                        fontSize: "12px",
                        color: "#FFFFFF",
                    }}
                >
                    <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                    <span>SECTION 08 / FROM THE FIELD</span>
                </motion.div>

                <div className={styles.grid}>
                    {TESTIMONIALS.map((t) => (
                        <motion.figure
                            key={t.attribution}
                            className={styles.quote}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                        >
                            <span className={styles.glyph} aria-hidden="true">
                                &ldquo;
                            </span>
                            <blockquote className={styles.q}>{t.quote}</blockquote>
                            <figcaption className={styles.attrib}>— {t.attribution}</figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
