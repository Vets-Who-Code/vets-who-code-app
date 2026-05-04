import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";

const DEFAULT_COMPANIES = [
    "Microsoft",
    "Accenture",
    "Amazon",
    "Google",
    "GitHub",
    "Booz Allen",
    "Deloitte",
];

type TProps = {
    eyebrow?: string;
    companies?: string[];
    className?: string;
    align?: "left" | "center";
};

const AlumniStrip = ({
    eyebrow = "Where Our Alumni Engineer",
    companies = DEFAULT_COMPANIES,
    className,
    align = "left",
}: TProps) => {
    return (
        <motion.div
            className={clsx("alumni-strip", className)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            variants={scrollUpVariants}
        >
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: align === "center" ? "center" : "flex-start",
                    gap: "12px",
                    marginBottom: "20px",
                }}
            >
                <span
                    aria-hidden="true"
                    style={{
                        width: "16px",
                        height: "2px",
                        background: "var(--red, #c5203e)",
                        display: "inline-block",
                        flexShrink: 0,
                    }}
                />
                {eyebrow}
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: align === "center" ? "center" : "flex-start",
                    rowGap: "16px",
                }}
            >
                {companies.map((name, i) => (
                    <span
                        key={name}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span
                            className="alumni-strip__name"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "14px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#F8F9FA",
                            }}
                        >
                            {name}
                        </span>
                        {i < companies.length - 1 && (
                            <span
                                aria-hidden="true"
                                style={{
                                    width: "16px",
                                    height: "2px",
                                    background: "rgba(185, 214, 242, 0.4)",
                                    display: "inline-block",
                                    margin: "0 20px",
                                    flexShrink: 0,
                                }}
                            />
                        )}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default AlumniStrip;
