import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "muted" | "bright" | "accent" | "gold";
type Size = "xs" | "sm" | "md";

interface Props {
    children: ReactNode;
    tone?: Tone;
    size?: Size;
    as?: "span" | "div" | "p";
    className?: string;
}

const TONE_CLASS: Record<Tone, string> = {
    muted: "tw-text-[#6C757D]",
    bright: "tw-text-cream",
    accent: "tw-text-red",
    gold: "tw-text-gold",
};

const SIZE_CLASS: Record<Size, string> = {
    xs: "tw-text-[10px]",
    sm: "tw-text-[11px]",
    md: "tw-text-[12px]",
};

const MonoMeta = ({ children, tone = "muted", size = "sm", as = "span", className }: Props) => {
    const Tag = as;
    return (
        <Tag
            className={clsx(
                "tw-font-mono tw-uppercase tw-tracking-[0.12em]",
                SIZE_CLASS[size],
                TONE_CLASS[tone],
                className
            )}
        >
            {children}
        </Tag>
    );
};

export default MonoMeta;
