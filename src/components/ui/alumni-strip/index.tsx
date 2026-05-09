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

type Theme = "light" | "dark";

type TProps = {
    eyebrow?: string;
    companies?: string[];
    className?: string;
    align?: "left" | "center";
    theme?: Theme;
};

const palette: Record<Theme, { eyebrow: string; name: string; divider: string }> = {
    dark: {
        eyebrow: "#FFFFFF",
        name: "#F8F9FA",
        divider: "rgba(185, 214, 242, 0.4)",
    },
    light: {
        eyebrow: "#091f40",
        name: "#1A1823",
        divider: "rgba(9, 31, 64, 0.2)",
    },
};

const AlumniStrip = ({
    eyebrow = "Where Our Alumni Engineer",
    companies = DEFAULT_COMPANIES,
    className,
    align = "left",
    theme = "dark",
}: TProps) => {
    const c = palette[theme];
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
                    color: c.eyebrow,
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
                                color: c.name,
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
                                    background: c.divider,
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
