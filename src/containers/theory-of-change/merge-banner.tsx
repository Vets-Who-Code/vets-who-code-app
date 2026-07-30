import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const MergeBanner = () => {
    return (
        <section
            className="dark-section tw-bg-navy tw-py-20 tw-text-white"
            aria-label="Merge banner: activities into main"
        >
            <div className="tw-mx-auto tw-max-w-[1230px] tw-px-5 md:tw-px-10">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-grid tw-grid-cols-1 tw-items-center tw-gap-8 md:tw-grid-cols-[auto_1fr]"
                    style={{ borderLeft: "4px solid var(--red)", padding: "32px 40px" }}
                >
                    <pre
                        className="tw-m-0 tw-text-gold"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            lineHeight: 1.4,
                            letterSpacing: "0.04em",
                        }}
                    >{`|
|\\
| |
|/
*`}</pre>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                        <h3
                            className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(20px, 2.4vw, 26px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                            }}
                        >
                            Merge branch &apos;activities&apos; into &apos;main&apos;
                        </h3>
                        <p
                            className="tw-m-0 tw-font-body"
                            style={{
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "rgba(185,214,242,0.7)",
                            }}
                        >
                            17 weeks of input + activity collapse into a single, deployable
                            engineer. The remaining commits are downstream of that merge.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MergeBanner;
