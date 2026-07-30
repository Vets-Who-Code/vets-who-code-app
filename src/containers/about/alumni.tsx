import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import styles from "./about.module.css";

const ALUMNI = [
    "Microsoft",
    "GitHub",
    "Google",
    "Salesforce",
    "JP Morgan Chase",
    "Amazon",
    "Accenture",
    "Deloitte",
    "Booz Allen",
    "Chewy",
    "CBS Interactive",
    "+ many more",
];

const Alumni = () => {
    const lastRowStart = ALUMNI.length - 4;

    return (
        <section className="tw-bg-cream tw-py-[120px]" aria-labelledby="about-alumni-headline">
            <div className="tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-16 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1fr_1.4fr] lg:tw-items-end lg:tw-gap-20"
                >
                    <div>
                        <span
                            className="tw-inline-flex tw-items-center tw-gap-3 tw-text-[#6C757D]"
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
                            Where Our Alumni Engineer
                        </span>
                        <h2
                            id="about-alumni-headline"
                            className="tw-m-0 tw-mt-6 tw-font-heading tw-uppercase tw-text-navy"
                            style={{
                                fontWeight: 800,
                                fontSize: "clamp(36px, 4.4vw, 56px)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.05,
                            }}
                        >
                            Service stripes,
                            <br />
                            now shipping code.
                        </h2>
                    </div>
                    <p
                        className="tw-m-0 tw-font-body tw-text-[#495057]"
                        style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}
                    >
                        A representative sample of the companies hiring VWC graduates. Roles span
                        platform, mobile, data, and consulting. Names are listed for transparency,
                        not endorsement.
                    </p>
                </motion.div>

                <div
                    className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-4"
                    style={{ border: "1px solid var(--silver)", background: "#fff" }}
                >
                    {ALUMNI.map((name, i) => {
                        const inLastRow = i >= lastRowStart;
                        const inLastCol = (i + 1) % 4 === 0;
                        return (
                            <div
                                key={name}
                                className={clsx(
                                    styles.alumniCell,
                                    "tw-relative tw-flex tw-flex-col tw-justify-between"
                                )}
                                style={{
                                    padding: "44px 32px",
                                    minHeight: 160,
                                    borderRight: inLastCol ? "none" : "1px solid var(--silver)",
                                    borderBottom: inLastRow ? "none" : "1px solid var(--silver)",
                                }}
                            >
                                <span
                                    className="tw-text-[#6C757D]"
                                    style={{
                                        position: "absolute",
                                        top: 14,
                                        right: 16,
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 10,
                                        letterSpacing: "0.14em",
                                        opacity: 0.6,
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3
                                    className="tw-m-0 tw-font-heading tw-text-navy"
                                    style={{
                                        fontWeight: 800,
                                        fontSize: 24,
                                        letterSpacing: "-0.01em",
                                        lineHeight: 1.15,
                                    }}
                                >
                                    {name}
                                </h3>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="tw-mt-10 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-text-[#6C757D]"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                    }}
                >
                    <span>
                        ↪ Partial list · Hundreds more across SMBs, startups, and federal contracts
                    </span>
                    <span>Last updated · Q2 2026</span>
                </div>
            </div>
        </section>
    );
};

export default Alumni;
