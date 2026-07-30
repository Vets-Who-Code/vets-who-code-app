import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Link from "next/link";
import styles from "./about.module.css";

const Theory = () => {
    return (
        <section
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-[100px] tw-text-white"
            style={{ borderTop: "1px solid rgba(185,214,242,0.08)" }}
            aria-labelledby="about-theory-headline"
        >
            <span
                aria-hidden="true"
                className="tw-absolute tw-left-0 tw-top-0 tw-h-px tw-w-12 tw-bg-red"
            />
            <div className="tw-relative tw-mx-auto tw-grid tw-max-w-[1320px] tw-grid-cols-1 tw-gap-12 tw-px-6 md:tw-px-12 lg:tw-grid-cols-[1fr_1.4fr] lg:tw-items-center lg:tw-gap-20">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                >
                    <span
                        className="tw-mb-6 tw-inline-flex tw-items-center tw-gap-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(185,214,242,0.65)",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red"
                        />
                        Methodology · Doc 03
                    </span>
                    <h2
                        id="about-theory-headline"
                        className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                        style={{
                            fontWeight: 900,
                            fontSize: "clamp(36px, 4.4vw, 56px)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.025em",
                        }}
                    >
                        How we turn troops into{" "}
                        <span className="tw-text-red">software engineers.</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-flex tw-flex-col tw-gap-8"
                >
                    <p
                        className="tw-m-0 tw-font-body"
                        style={{
                            fontSize: 17,
                            lineHeight: 1.7,
                            color: "rgba(248,249,250,0.85)",
                            maxWidth: 620,
                        }}
                    >
                        Our Theory of Change is the working document that maps every hour of our
                        curriculum to a labor-market outcome. It&apos;s how we justify a 97%
                        placement rate to donors, board members, and the troops themselves. Read the
                        full methodology — including the evaluation framework, mentor protocols, and
                        2030 roadmap.
                    </p>

                    <div className="tw-flex tw-flex-wrap tw-gap-4">
                        <Link href="/theory-of-change" className={styles.theoryCtaPrimary}>
                            View Theory of Change
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link href="/programs" className={styles.theoryCtaSecondary}>
                            Browse Curriculum
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Theory;
