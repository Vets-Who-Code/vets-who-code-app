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
                "tw:inline-flex tw:items-center tw:justify-center tw:leading-none",
                variant === "contained" && [
                    color === "teracotta" && "tw:bg-teracotta-light tw:text-teracotta",
                    color === "scooter" && "tw:bg-scooter-light tw:text-scooter",
                    color === "primary" && "tw:bg-primary tw:text-white",
                    color === "gradient" && "tw:bg-straw-gradient tw:text-white",
                ],
                variant === "outlined" && [
                    "tw:border",
                    color === "white" && "tw:border-white tw:text-white",
                ],

                size === "xs" && "tw:rounded-xs tw:px-2 tw:pb-[3px] tw:pt-1 tw:text-[11px]",
                size === "sm" && "tw:rounded-[4px] tw:p-2 tw:text-xs",
                size === "lg" && "tw:h-7.5 tw:rounded-sm tw:px-3.8 tw:text-sm tw:font-medium",
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
