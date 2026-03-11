import clsx from "clsx";
import { forwardRef } from "react";
import SafeHTML from "../safe-html";

type TProps = {
    className?: string;
    title: string;
    subtitle?: string;
    description?: string;
    align?: "left" | "right" | "center";
    color?: "A" | "B" | "C";
    titleSize?: "default" | "large";
    subtitleClass?: string;
    titleClass?: string;
    descClass?: string;
};

const SectionTitle = forwardRef<HTMLDivElement, TProps>(
    (
        {
            className,
            title,
            subtitle,
            description,
            align,
            color,
            titleSize,
            subtitleClass,
            titleClass,
            descClass,
        },
        ref
    ) => {
        return (
            <div
                className={clsx(
                    "section-title tw-relative tw-z-20",
                    align === "center" && "tw-text-center",
                    className
                )}
                data-align={align}
                ref={ref}
            >
                {/* Section label — Evil Rabbit precision context */}
                {subtitle && (
                    <div
                        className="section-label tw-mb-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: color === "C" ? "#FFFFFF" : "#091f40",
                            display: "flex",
                            alignItems: align === "center" ? "center" : "center",
                            justifyContent: align === "center" ? "center" : "flex-start",
                            gap: "12px",
                        }}
                    >
                        <span style={{ width: "16px", height: "2px", background: "var(--red, #c5203e)", display: "inline-block", flexShrink: 0 }} />
                        <SafeHTML content={subtitle} as="span" className={subtitleClass} />
                    </div>
                )}

                {/* Main heading — GothamPro authority */}
                <SafeHTML
                    content={title}
                    as="h2"
                    className={clsx(
                        "title tw-m-0 child:tw-font-normal child:tw-text-primary [font-family:var(--font-headline)] tw-font-extrabold",
                        color === "A" && "tw-text-secondary",
                        color === "C" && "tw-text-white",
                        titleSize === "large" &&
                            "tw-text-4xl tw-leading-heading lg:tw-text-5xl lg:tw-leading-heading",
                        titleClass
                    )}
                />
                {description && (
                    <SafeHTML
                        content={description}
                        as="p"
                        className={clsx(
                            "tw-mb-0 tw-mt-[25px] tw-font-medium",
                            descClass,
                            color === "C" && "tw-text-white"
                        )}
                    />
                )}
            </div>
        );
    }
);

SectionTitle.defaultProps = {
    align: "center" as const,
    color: "A" as const,
};

export default SectionTitle;
