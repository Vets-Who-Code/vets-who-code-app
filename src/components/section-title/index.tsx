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
                ref={ref}
            >
                {subtitle && (
                    <SafeHTML
                        content={subtitle}
                        as="span"
                        className={clsx(
                            "tw-mb-2.5 tw-block tw-text-base tw-font-medium tw-uppercase tw-leading-none -tw-tracking-tightest",
                            color === "A" && "tw-text-secondary-light",
                            color === "B" && "tw-text-secondary",
                            color === "C" && "tw-text-white",
                            subtitleClass
                        )}
                    />
                )}

                <SafeHTML
                    content={title}
                    as="h2"
                    className={clsx(
                        "title tw-m-0 child:tw-font-normal child:tw-text-primary",
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
