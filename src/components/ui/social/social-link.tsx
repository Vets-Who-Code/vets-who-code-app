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
    const textedWhite = color === "white" && hover && "tw:text-white/50 tw:hover:text-white";
    const textedLight = color === "light" && hover && "tw:text-body/50 tw:hover:text-primary";
    const textedDark = color === "dark" && hover && "tw:text-body tw:hover:text-primary";
    const textedXl = size === "xl" && "tw:text-2xl";
    const textedLg = size === "lg" && "tw:text-lg";

    // Toopltip
    const tooltipBeforeClass =
        "tw:before:absolute tw:before:content-[''] tw:before:border-[7px] tw:before:border-transparent tw:before:border-t-primary tw:before:bottom-full before:left-[calc(50%_-_7px) tw:before:transition-all tw:before:duration-300 tw:before:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:before:pointer-events-none tw:before:z-20 tw:before:mb-[-13px] tw:before:invisible tw:before:opacity-0";
    const tooltipAfterClass =
        "tw:after:absolute tw:after:content-[attr(aria-label)] tw:after:bg-primary tw:after:text-white tw:after:py-2 tw:after:px-2.5 tw:after:leading-none tw:after:whitespace-nowrap tw:after:rounded tw:after:shadow-xs tw:after:shadow-black/30 tw:after:bottom-full tw:after:left-1/2 tw:after:-translate-x-1/2 tw:after:transition-all tw:after:duration-300 tw:after:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:after:pointer-events-none tw:after:z-10 tw:after:invisible tw:after:opacity-0";
    const tooltipHoverClass =
        "tw:hover:before:visible tw:hover:before:opacity-100 tw:hover:before:delay-100 tw:hover:before:-translate-y-2 tw:hover:after:visible tw:hover:after:opacity-100 tw:hover:after:delay-100 tw:hover:after:-translate-y-2";

    return (
        <a
            className={clsx(
                "social-link tw:relative tw:leading-none",
                variant === "texted" && [textedWhite, textedLight, textedDark, textedXl, textedLg],
                variant !== "texted" && [
                    "tw:text-center",
                    size === "md" && "tw:h-10 tw:w-10 tw:leading-10",
                    color === "light" &&
                        "tw:border-gray-550 tw:hover:border-primary tw:hover:bg-primary tw:hover:text-white",
                ],
                variant === "outlined" && "tw:border tw:bg-transparent",
                shape === "rounded" && "tw:rounded-sm",
                shape === "circle" && "tw:rounded-full",
                tooltip && [tooltipBeforeClass, tooltipAfterClass, tooltipHoverClass],
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
