import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    className?: string;
    color?: "teracotta" | "scooter" | "primary" | "gradient" | "white";
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "contained" | "outlined";
};

const Badge = ({ children, className, color, size, variant }: TProps) => {
    return (
        <span
            className={clsx(
                "tw-inline-flex tw-justify-center tw-items-center tw-leading-none",
                variant === "contained" && [
                    color === "teracotta" &&
                        "tw-text-teracotta tw-bg-teracotta-light",
                    color === "scooter" &&
                        "tw-text-scooter tw-bg-scooter-light",
                    color === "primary" && "tw-text-white tw-bg-primary",
                    color === "gradient" && "tw-text-white tw-bg-strawGradient",
                ],
                variant === "outlined" && [
                    "tw-border",
                    color === "white" && "tw-text-white tw-border-white",
                ],

                size === "xs" &&
                    "tw-pt-1 tw-px-2 tw-pb-[3px] tw-text-[11px] tw-rounded-sm",
                size === "sm" && "tw-p-2 tw-text-xs tw-rounded-[4px]",
                size === "lg" &&
                    "tw-h-7.5 tw-px-3.8 tw-text-sm tw-font-medium tw-rounded",
                className
            )}
        >
            {children}
        </span>
    );
};

Badge.defaultProps = {
    color: "teracotta",
    size: "lg",
    variant: "contained",
};

export default Badge;
