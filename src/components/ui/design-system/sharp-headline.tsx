import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "navy" | "white" | "cream";
type Size = "h1" | "h2" | "h3";

interface Props {
    as?: "h1" | "h2" | "h3" | "h4";
    size?: Size;
    tone?: Tone;
    align?: "left" | "center";
    children: ReactNode;
    className?: string;
}

const TONE_CLASS: Record<Tone, string> = {
    navy: "tw-text-navy",
    white: "tw-text-white",
    cream: "tw-text-cream",
};

const SIZE_CLASS: Record<Size, string> = {
    h1: "[font-size:clamp(40px,7vw,84px)] [line-height:0.98]",
    h2: "[font-size:clamp(32px,4.5vw,56px)] [line-height:1.02]",
    h3: "[font-size:clamp(22px,2.6vw,32px)] [line-height:1.1]",
};

const SharpHeadline = ({
    as: Tag = "h2",
    size = "h2",
    tone = "navy",
    align = "left",
    children,
    className,
}: Props) => {
    return (
        <Tag
            className={clsx(
                "tw-m-0 tw-font-heading tw-font-semibold tw-uppercase [letter-spacing:-0.02em]",
                SIZE_CLASS[size],
                TONE_CLASS[tone],
                align === "center" && "tw-text-center",
                className
            )}
        >
            {children}
        </Tag>
    );
};

export default SharpHeadline;
