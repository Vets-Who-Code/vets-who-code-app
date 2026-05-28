import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const Quote = () => {
    return (
        <section
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-[140px] tw-text-white"
            aria-labelledby="about-quote-headline"
        >
            <span
                aria-hidden="true"
                className="tw-pointer-events-none tw-absolute tw-select-none tw-font-heading"
                style={{
                    fontWeight: 900,
                    fontSize: 480,
                    lineHeight: 1,
                    color: "rgba(197,32,62,0.10)",
                    top: -80,
                    left: 40,
                }}
            >
                &ldquo;
            </span>

            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={scrollUpVariants}
                className="tw-relative tw-mx-auto tw-max-w-[1100px] tw-px-6 tw-text-left md:tw-px-12"
            >
                <span
                    className="tw-mb-9 tw-inline-flex tw-items-center tw-gap-3"
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
                    Mission Statement
                </span>
                <blockquote
                    id="about-quote-headline"
                    className="tw-mb-12 tw-mt-0 tw-font-heading tw-text-white"
                    style={{
                        fontWeight: 700,
                        fontSize: "clamp(36px, 4.6vw, 68px)",
                        lineHeight: 1.12,
                        letterSpacing: "-0.02em",
                        maxWidth: 980,
                        marginInlineStart: 0,
                    }}
                >
                    We don&apos;t train veterans to fill seats. We train them to be{" "}
                    <span className="tw-text-red">impactful</span> on their engineering teams at
                    companies that shape the world.
                </blockquote>
                <div
                    className="tw-flex tw-items-center tw-gap-[18px] tw-pt-8"
                    style={{ borderTop: "1px solid rgba(185,214,242,0.12)" }}
                >
                    <span aria-hidden="true" className="tw-h-[2px] tw-w-8 tw-bg-red" />
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(185,214,242,0.8)",
                        }}
                    >
                        Vets Who Code &middot; Founding Charter
                        <span style={{ color: "rgba(185,214,242,0.5)" }}>
                            {" "}
                            &mdash; ratified 2014
                        </span>
                    </span>
                </div>
            </motion.div>
        </section>
    );
};

export default Quote;
