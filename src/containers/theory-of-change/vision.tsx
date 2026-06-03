import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Link from "next/link";
import styles from "./theory.module.css";

const Vision = () => {
    return (
        <section
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-pb-0 tw-pt-[120px] tw-text-white"
            aria-labelledby="toc-vision-headline"
        >
            <div className="tw-mx-auto tw-max-w-[1230px] tw-px-5 md:tw-px-10">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-7 tw-text-gold"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                    }}
                >
                    <span aria-hidden="true">/</span>
                    <span aria-hidden="true">/</span> HEAD → vision/2030
                </motion.div>

                <motion.h2
                    id="toc-vision-headline"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-m-0 tw-mb-12 tw-font-heading tw-uppercase tw-text-white"
                    style={{
                        fontWeight: 900,
                        fontSize: "clamp(36px, 6vw, 80px)",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.02,
                    }}
                >
                    A platform is not a curriculum.
                    <br />
                    It is a <span className="tw-text-red">launchpad.</span>
                </motion.h2>

                <motion.p
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-m-0 tw-mb-6 tw-font-body"
                    style={{
                        fontSize: 18,
                        lineHeight: 1.7,
                        color: "rgba(185,214,242,0.7)",
                        maxWidth: 760,
                    }}
                >
                    We envision a future where every veteran who wants a career in tech has access
                    to the platform, mentorship, and tools they need to succeed.
                </motion.p>
                <motion.p
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-m-0 tw-font-body"
                    style={{
                        fontSize: 18,
                        lineHeight: 1.7,
                        color: "rgba(185,214,242,0.7)",
                        maxWidth: 760,
                    }}
                >
                    By continuing to build open-source tools that matter, develop products people
                    use, and uplift our own through mentoring and advocacy, Vets Who Code will
                    remain a blueprint for what&apos;s possible when service meets software.
                </motion.p>

                <motion.p
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-12 tw-mt-9 tw-font-heading tw-uppercase tw-text-white"
                    style={{
                        fontWeight: 900,
                        fontSize: "clamp(20px, 2.4vw, 28px)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.15,
                    }}
                >
                    Retool. Retrain. Relaunch.
                </motion.p>

                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-flex tw-flex-wrap tw-gap-4"
                >
                    <Link href="/apply" className={styles.ctaPrimary}>
                        Apply Now
                        <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/about-us" className={styles.ctaGhost}>
                        Read About Us
                    </Link>
                </motion.div>

                <div
                    className="tw-mt-12 tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-pt-10"
                    style={{
                        borderTop: "1px solid rgba(185,214,242,0.08)",
                        paddingBottom: 40,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(185,214,242,0.45)",
                    }}
                >
                    <span className="tw-text-red">$</span>
                    <span>
                        git log · 5 phases · 23 commits · #VetsWhoCode · 501(c)(3) · EIN 86-2122804
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Vision;
