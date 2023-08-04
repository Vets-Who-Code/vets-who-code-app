import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
    color?: "light" | "white" | "dark";
    variant?: "contained" | "outlined" | "texted";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "square" | "rounded" | "circle";
    hover?: boolean;
    href: string;
    label: string;
    tooltip?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const SocialLink = ({
    children,
    className,
    href,
    label,
    color,
    variant,
    size,
    shape,
    hover,
    tooltip,
    onClick,
}: TProps) => {
    // texted variant
    const textedWhite =
        color === "white" && hover && "tw-text-white/50 hover:tw-text-white";
    const textedLight =
        color === "light" && hover && "tw-text-body/50 hover:tw-text-primary";
    const textedDark =
        color === "dark" && hover && "tw-text-body hover:tw-text-primary";
    const textedXl = size === "xl" && "tw-text-2xl";
    const textedLg = size === "lg" && "tw-text-lg";

    // Toopltip
    const tooltipBeforeClass =
        "before:tw-absolute before:tw-content-[''] before:tw-border-[7px] before:tw-border-transparent before:tw-border-t-primary before:tw-bottom-full before:left-[calc(50%_-_7px) before:tw-transition-all before:tw-duration-300 before:tw-ease-[cubic-bezier(.71,1.7,.77,1.24)] before:tw-pointer-events-none before:tw-z-20 before:tw-mb-[-13px] before:tw-invisible before:tw-opacity-0";
    const tooltipAfterClass =
        "after:tw-absolute after:tw-content-[attr(aria-label)] after:tw-bg-primary after:tw-text-white after:tw-py-2 after:tw-px-2.5 after:tw-leading-none after:tw-whitespace-nowrap after:tw-rounded after:tw-shadow-xs after:tw-shadow-black/30 after:tw-bottom-full after:tw-left-1/2 after:-tw-translate-x-1/2 after:tw-transition-all after:tw-duration-300 after:tw-ease-[cubic-bezier(.71,1.7,.77,1.24)] after:tw-pointer-events-none after:tw-z-10 after:tw-invisible after:tw-opacity-0";
    const tooltipHoverClass =
        "hover:before:tw-visible hover:before:tw-opacity-100 hover:before:tw-delay-100 hover:before:-tw-translate-y-2 hover:after:tw-visible hover:after:tw-opacity-100 hover:after:tw-delay-100 hover:after:-tw-translate-y-2";

    return (
        <a
            className={clsx(
                "social-link tw-relative tw-leading-none",
                variant === "texted" && [
                    textedWhite,
                    textedLight,
                    textedDark,
                    textedXl,
                    textedLg,
                ],
                variant !== "texted" && [
                    "tw-text-center",
                    size === "md" && "tw-w-10 tw-h-10 tw-leading-10",
                    color === "light" &&
                        "tw-border-gray-550 hover:tw-border-primary hover:tw-bg-primary hover:tw-text-white",
                ],
                variant === "outlined" && "tw-bg-transparent tw-border",
                shape === "rounded" && "tw-rounded",
                shape === "circle" && "tw-rounded-full",
                tooltip && [
                    tooltipBeforeClass,
                    tooltipAfterClass,
                    tooltipHoverClass,
                ],
                className
            )}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

SocialLink.displayName = "SocialLink";

export default SocialLink;
