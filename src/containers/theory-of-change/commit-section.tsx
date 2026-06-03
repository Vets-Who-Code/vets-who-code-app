import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import { branchColor, type Phase } from "./phases-data";
import styles from "./theory.module.css";

interface Props {
    phase: Phase;
}

const CommitSection = ({ phase }: Props) => {
    const dark = phase.theme === "dark";
    const color = branchColor(phase.branchId, phase.theme);
    const bodyText = dark ? "rgba(248,249,250,0.78)" : "var(--charcoal)";
    const headlineColor = dark ? "#fff" : "var(--navy)";
    const eyebrowColor = dark ? "rgba(185,214,242,0.65)" : "var(--slate)";
    const borderColor = dark ? "1px solid rgba(185,214,242,0.12)" : "1px solid rgba(9,31,64,0.12)";
    const diffBg = dark ? "#212529" : "#fff";
    const diffBorder = dark ? "1px solid rgba(185,214,242,0.10)" : "1px solid var(--silver)";
    const markerBg = dark ? "rgba(248,249,250,0.04)" : "rgba(9,31,64,0.02)";

    return (
        <section
            className={clsx(
                dark ? "dark-section tw-bg-navy tw-text-white" : "tw-bg-cream",
                "tw-py-[120px]"
            )}
            aria-labelledby={`toc-phase-${phase.n}-headline`}
        >
            <div className="tw-mx-auto tw-max-w-[1230px] tw-px-5 md:tw-px-10">
                {/* Section header */}
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-12 tw-grid tw-grid-cols-1 tw-items-end tw-gap-6 tw-pb-8 md:tw-grid-cols-[1.4fr_1fr]"
                    style={{ borderBottom: borderColor }}
                >
                    <h2
                        id={`toc-phase-${phase.n}-headline`}
                        className="tw-m-0 tw-font-heading tw-uppercase"
                        style={{
                            color: headlineColor,
                            fontWeight: 900,
                            fontSize: "clamp(36px, 6vw, 72px)",
                            letterSpacing: "-0.025em",
                            lineHeight: 1.02,
                        }}
                    >
                        {phase.title}
                        <span className="tw-text-red">{phase.accent}</span>
                    </h2>
                    <div className="tw-flex tw-flex-col tw-gap-1.5 md:tw-text-right">
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 13,
                                fontWeight: 700,
                                color: "var(--red)",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            {phase.branchName}
                        </span>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                color: eyebrowColor,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                            }}
                        >
                            {phase.metaDescription}
                        </span>
                    </div>
                </motion.div>

                {/* Commit container */}
                <div
                    className={clsx(
                        styles.timelineRail,
                        dark && "dark",
                        "tw-mx-auto tw-max-w-[1100px]"
                    )}
                >
                    <motion.article
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={scrollUpVariants}
                        className="tw-relative tw-pl-[60px] md:tw-pl-[88px]"
                    >
                        {/* Commit node — outlined square */}
                        <div
                            aria-hidden="true"
                            className="tw-absolute tw-flex tw-items-center tw-justify-center"
                            style={{
                                top: 8,
                                left: 13,
                                width: 32,
                                height: 32,
                                color,
                            }}
                        >
                            <div
                                style={{
                                    width: 30,
                                    height: 30,
                                    border: `2.5px solid ${color}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        background: color,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Commit head: hash + tag + branch + step */}
                        <div
                            className="tw-mb-6 tw-flex tw-flex-wrap tw-items-center tw-gap-4"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span style={{ color }}>{phase.hash}</span>
                            <span
                                style={{
                                    border: `1px solid ${color}`,
                                    padding: "3px 8px",
                                    color,
                                }}
                            >
                                {phase.tag}
                            </span>
                            <span style={{ color: eyebrowColor, fontStyle: "italic" }}>
                                {phase.branchName}
                            </span>
                            <span
                                className="tw-ml-auto tw-font-heading"
                                style={{
                                    fontWeight: 700,
                                    color: dark ? "#fff" : "var(--navy)",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {phase.step}
                            </span>
                        </div>

                        {/* Commit title */}
                        <h3
                            className="tw-m-0 tw-mb-5 tw-font-heading tw-uppercase"
                            style={{
                                color: headlineColor,
                                fontWeight: 900,
                                fontSize: "clamp(28px, 3.6vw, 44px)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.05,
                            }}
                        >
                            {phase.headline}
                        </h3>

                        {/* Commit lede */}
                        <p
                            className="tw-m-0 tw-mb-10 tw-font-body"
                            style={{
                                color: bodyText,
                                fontSize: 18,
                                lineHeight: 1.65,
                                maxWidth: 720,
                            }}
                        >
                            {phase.lede}
                        </p>

                        {/* Diff block */}
                        <div
                            role="list"
                            style={{
                                background: diffBg,
                                border: diffBorder,
                            }}
                        >
                            {phase.diffs.map((row, i) => (
                                <div
                                    key={row.label}
                                    role="listitem"
                                    className={clsx(styles.diffRow, dark && styles.diffRowDark)}
                                    style={{
                                        borderTop:
                                            i === 0
                                                ? "none"
                                                : dark
                                                  ? "1px solid rgba(185,214,242,0.08)"
                                                  : "1px solid var(--silver)",
                                    }}
                                >
                                    <div
                                        className="tw-flex tw-items-start tw-justify-center"
                                        style={{
                                            color,
                                            background: markerBg,
                                            borderRight: diffBorder,
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            padding: "22px 0",
                                        }}
                                    >
                                        +
                                    </div>
                                    <div
                                        className="tw-flex tw-flex-col tw-gap-2"
                                        style={{ padding: "22px 28px" }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color,
                                                letterSpacing: "0.14em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {row.label}
                                        </div>
                                        <p
                                            className="tw-m-0 tw-font-body"
                                            style={{
                                                color: bodyText,
                                                fontSize: 15.5,
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {row.text}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.diffIndex}
                                        style={{
                                            padding: "22px 24px 22px 0",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 10,
                                            color: eyebrowColor,
                                            letterSpacing: "0.12em",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Commit foot */}
                        <div
                            className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-6"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: eyebrowColor,
                            }}
                        >
                            <span style={{ color, fontWeight: 700 }}>{phase.footAdd}</span>
                            <span>{phase.footMiddle}</span>
                            <span>build: passing</span>
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    );
};

export default CommitSection;
