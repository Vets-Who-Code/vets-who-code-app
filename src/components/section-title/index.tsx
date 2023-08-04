import { forwardRef } from "react";
import clsx from "clsx";

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
                    <span
                        className={clsx(
                            "tw-font-medium tw-text-base tw-leading-none -tw-tracking-tightest tw-block tw-mb-2.5 tw-uppercase",
                            color === "A" && "tw-text-secondary-light",
                            color === "B" && "tw-text-secondary",
                            subtitleClass
                        )}
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}

                <h2
                    className={clsx(
                        "title tw-m-0 child:tw-text-primary child:tw-font-normal",
                        color === "A" && "tw-text-secondary",
                        color === "C" && "tw-text-white",
                        titleSize === "large" &&
                            "tw-text-4xl lg:tw-text-5xl tw-leading-heading lg:tw-leading-heading",
                        titleClass
                    )}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                {description && (
                    <p
                        className={clsx(
                            "tw-mb-0 tw-mt-[25px] tw-font-medium",
                            descClass,
                            color === "C" && "tw-text-white"
                        )}
                        dangerouslySetInnerHTML={{ __html: description }}
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
