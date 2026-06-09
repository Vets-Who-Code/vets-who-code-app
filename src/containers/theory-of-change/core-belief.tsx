import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const CoreBelief = () => {
    return (
        <section
            className="tw-relative tw-overflow-hidden tw-bg-cream tw-py-[120px]"
            aria-labelledby="toc-belief-headline"
        >
            <div className="tw-relative tw-mx-auto tw-max-w-[1230px] tw-px-5 md:tw-px-10">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-14 tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-[#6C757D]"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                    }}
                >
                    <span
                        aria-hidden="true"
                        className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red"
                    />
                    <span>README.md · core belief</span>
                    <span aria-hidden="true" className="tw-h-px tw-flex-1 tw-bg-[#DEE2E6]" />
                    <span>commit 0000000</span>
                </motion.div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[minmax(280px,1fr)_minmax(420px,1.6fr)] lg:tw-gap-20">
                    <motion.h2
                        id="toc-belief-headline"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                        className="tw-m-0 tw-font-heading tw-uppercase tw-text-navy"
                        style={{
                            fontWeight: 900,
                            fontSize: "clamp(36px, 5vw, 60px)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.025em",
                        }}
                    >
                        Veterans are
                        <br />
                        <span className="tw-text-red">stakeholders,</span>
                        <br />
                        not charity cases.
                    </motion.h2>

                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                        className="tw-relative tw-pl-8"
                        style={{ borderLeft: "1px solid var(--silver)" }}
                    >
                        <span
                            aria-hidden="true"
                            className="tw-absolute tw-left-[-1px] tw-top-0 tw-h-16 tw-w-0.5 tw-bg-red"
                        />
                        <p
                            className="tw-m-0 tw-font-heading tw-text-navy"
                            style={{
                                fontWeight: 600,
                                fontSize: 22,
                                lineHeight: 1.45,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Military experience instills a unique blend of grit, discipline, and
                            adaptive thinking. Pair it with technical training and real product
                            work, and you get exceptional engineers.
                        </p>
                        <p
                            className="tw-mt-6 tw-font-body tw-text-ink"
                            style={{ fontSize: 18, lineHeight: 1.7 }}
                        >
                            Vets Who Code is not a bootcamp. It is a selective, outcome-focused
                            training program that maps every hour of instruction to verified
                            labor-market demand. We channel potential through a proven,
                            product-focused learning ecosystem — not a curriculum in isolation.
                        </p>
                        <p
                            className="tw-mt-6 tw-font-body tw-text-ink"
                            style={{ fontSize: 18, lineHeight: 1.7 }}
                        >
                            If our students can&apos;t make money with it, we don&apos;t bother
                            teaching it.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CoreBelief;
