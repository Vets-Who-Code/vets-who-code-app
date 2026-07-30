import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./about.module.css";

const monoEyebrow = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(185,214,242,0.65)",
};

const Hero = () => {
    return (
        <section
            className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-pb-[100px] tw-pt-[160px]"
            aria-labelledby="about-hero-headline"
        >
            <span
                aria-hidden="true"
                className="tw-pointer-events-none tw-absolute tw-inset-0"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(9,31,64,0.92) 0%, rgba(6,26,64,0.88) 100%)",
                }}
            />

            <div className="tw-relative tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1.25fr_1fr] lg:tw-items-center lg:tw-gap-20">
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                    >
                        <div
                            className="tw-mb-9 tw-flex tw-flex-wrap tw-items-center tw-gap-3.5"
                            style={monoEyebrow}
                        >
                            <span
                                aria-hidden="true"
                                className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red"
                            />
                            <span>Doc 01 · About Us</span>
                            <span
                                aria-hidden="true"
                                className="tw-inline-block tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-gold"
                            />
                            <span>Est. 2014 · 501(c)(3) · EIN 86-2122804</span>
                        </div>

                        <h1
                            id="about-hero-headline"
                            className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(48px, 6.4vw, 92px)",
                                lineHeight: 0.96,
                                letterSpacing: "-0.025em",
                            }}
                        >
                            We don&apos;t fill
                            <br />
                            seats. We build
                            <br />
                            <span className="tw-text-red">engineers</span>
                            <span
                                aria-hidden="true"
                                className={styles.blink}
                                style={{
                                    verticalAlign: "baseline",
                                    width: "0.55em",
                                    height: "0.08em",
                                    background: "var(--gold)",
                                    marginLeft: "0.12em",
                                }}
                            />
                        </h1>

                        <p
                            className="tw-mt-9 tw-font-body"
                            style={{
                                fontSize: 19,
                                lineHeight: 1.7,
                                color: "rgba(248,249,250,0.85)",
                                maxWidth: 560,
                            }}
                        >
                            Vets Who Code is a remote-first software engineering accelerator for
                            U.S. military veterans and military spouses. Free. Selective.
                            Outcome-focused. A nonprofit built by veterans who walked the same
                            transition and refused to settle for thank-you-for-your-service.
                        </p>

                        <div
                            className="tw-mt-12 tw-flex tw-flex-wrap tw-gap-9 tw-border-t tw-pt-8"
                            style={{ borderColor: "rgba(185,214,242,0.12)" }}
                        >
                            {[
                                { label: "Founded", value: "2014 · Decade strong" },
                                { label: "Format", value: "17 weeks · Fully remote" },
                                { label: "Cost to troops", value: "$0 · Always" },
                            ].map((item) => (
                                <div key={item.label} className="tw-flex tw-flex-col tw-gap-1.5">
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 10,
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "rgba(185,214,242,0.55)",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className="tw-font-heading tw-text-white"
                                        style={{
                                            fontWeight: 700,
                                            fontSize: 18,
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.aside
                        aria-label="VWC Charter"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollUpVariants}
                        className="tw-flex tw-flex-col tw-justify-between"
                        style={{
                            aspectRatio: "4 / 5",
                            background:
                                "linear-gradient(180deg, rgba(185,214,242,0.04) 0%, rgba(185,214,242,0.01) 100%)",
                            border: "1px solid rgba(185,214,242,0.18)",
                            padding: "40px 36px 32px",
                        }}
                    >
                        <div
                            className="tw-flex tw-items-center tw-justify-between tw-pb-[18px]"
                            style={{
                                ...monoEyebrow,
                                fontSize: 10,
                                borderBottom: "1px solid rgba(185,214,242,0.12)",
                            }}
                        >
                            <span>Doc 01 · Charter</span>
                            <span
                                className="tw-text-gold"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 9,
                                    letterSpacing: "0.22em",
                                    padding: "4px 8px",
                                    border: "1px solid rgba(253,179,48,0.4)",
                                }}
                            >
                                Ratified 2014
                            </span>
                        </div>

                        <div className="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-py-8">
                            <div
                                className="tw-mb-[18px]"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "rgba(185,214,242,0.6)",
                                }}
                            >
                                The Tagline · Three Words
                            </div>
                            <p
                                className="tw-m-0 tw-font-heading tw-uppercase tw-text-white"
                                style={{
                                    fontWeight: 900,
                                    fontSize: "clamp(40px, 4vw, 56px)",
                                    lineHeight: 0.98,
                                    letterSpacing: "-0.025em",
                                }}
                            >
                                Retool<span className="tw-text-gold">.</span>
                                <br />
                                Retrain<span className="tw-text-gold">.</span>
                                <br />
                                <span className="tw-text-red">Relaunch</span>
                                <span className="tw-text-gold">.</span>
                            </p>
                            <p
                                className="tw-mt-7 tw-font-body"
                                style={{
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                    color: "rgba(248,249,250,0.75)",
                                    paddingLeft: 14,
                                    borderLeft: "2px solid var(--red)",
                                    margin: "28px 0 0",
                                }}
                            >
                                Our vision is to close the digital talent gap and ease career
                                transition for military veterans through software development
                                training.
                            </p>
                        </div>

                        <div
                            className="tw-flex tw-items-end tw-justify-between tw-gap-3 tw-pt-[22px]"
                            style={{ borderTop: "1px solid rgba(185,214,242,0.12)" }}
                        >
                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 9,
                                        letterSpacing: "0.22em",
                                        textTransform: "uppercase",
                                        color: "rgba(185,214,242,0.5)",
                                    }}
                                >
                                    Issued by
                                </span>
                                <span
                                    className="tw-font-heading tw-text-white"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        letterSpacing: "-0.005em",
                                    }}
                                >
                                    Vets Who Code · Founders
                                </span>
                            </div>
                            <div
                                aria-hidden="true"
                                className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center"
                                style={{
                                    width: 60,
                                    height: 60,
                                    border: "1px solid rgba(253,179,48,0.45)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 8,
                                    letterSpacing: "0.18em",
                                    color: "var(--gold)",
                                    lineHeight: 1.3,
                                    padding: 6,
                                }}
                            >
                                <span
                                    className="tw-font-heading"
                                    style={{
                                        fontWeight: 900,
                                        fontSize: 18,
                                        color: "var(--gold)",
                                        letterSpacing: "-0.02em",
                                        marginBottom: 2,
                                    }}
                                >
                                    501
                                </span>
                                <span>c · 3</span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
};

export default Hero;
