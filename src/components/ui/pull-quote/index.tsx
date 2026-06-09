import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import { ReactNode } from "react";

type Theme = "light" | "dark";

type TProps = {
    emphasis: ReactNode;
    continuation: ReactNode;
    className?: string;
    theme?: Theme;
};

const colors: Record<Theme, { body: string; emphasis: string }> = {
    dark: { body: "#F8F9FA", emphasis: "#FFFFFF" },
    light: { body: "#1A1823", emphasis: "#091f40" },
};

const PullQuote = ({ emphasis, continuation, className, theme = "dark" }: TProps) => {
    const c = colors[theme];
    return (
        <motion.blockquote
            className={clsx("pull-quote", className)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            variants={scrollUpVariants}
            style={{
                borderLeft: "2px solid var(--red, #c5203e)",
                paddingLeft: "24px",
                maxWidth: "720px",
                margin: 0,
                fontFamily: "var(--font-body, Gilroy, sans-serif)",
                fontSize: "clamp(18px, 2.6vw, 28px)",
                lineHeight: 1.74,
                fontWeight: 500,
                color: c.body,
            }}
        >
            <span style={{ color: c.emphasis, fontWeight: 700 }}>{emphasis}</span> {continuation}
        </motion.blockquote>
    );
};

export default PullQuote;
