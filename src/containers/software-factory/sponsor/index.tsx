import { CLIENT_TYPES } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Link from "next/link";
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
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-max-w-[820px]"
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
                        <span>SECTION 05 / WHO WE SHIP FOR</span>
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
                        The clients we know how to serve.
                    </h2>
                    <p
                        className="tw-mt-6 tw-mb-0"
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.6,
                            color: "#495057",
                        }}
                    >
                        We&rsquo;ve found our fit. Three kinds of organizations, three kinds of
                        problems we&rsquo;ve solved before.
                    </p>
                </motion.div>

                <div className={styles.cards}>
                    {CLIENT_TYPES.map((c) => (
                        <motion.div
                            key={c.title}
                            className={styles.card}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                        >
                            <div className={styles.label}>{c.label}</div>
                            <h3 className={styles.title}>{c.title}</h3>
                            <p className={styles.body}>{c.body}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.footer}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                >
                    <div className={styles.footerLabel}>Not on this list?</div>
                    <p className={styles.footerBody}>
                        <Link href="#discovery" className={styles.footerLink}>
                            Book Discovery
                        </Link>{" "}
                        anyway. We&rsquo;ll tell you straight whether we&rsquo;re the team.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SponsorSection;
