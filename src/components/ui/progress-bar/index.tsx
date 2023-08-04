import { FC } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface ProgressProps {
    /**
     * Current value of progress
     */
    now: number;
    /**
     * Minimum value progress can begin from
     */
    min?: number;
    /**
     * Maximum value progress can reach
     */
    max?: number;
    /**
     * Show label that represents visual percentage. EG. 60%
     */
    isLabel?: boolean;
    /**
     * Optional. Default is `primary`.
     */
    color?: "primary" | "success" | "danger";
    /**
     * Optional. Default is `md`.
     */
    size?: "xxs" | "xs" | "sm" | "md" | "lg";
    /**
     * Optional. Disable Animation. Default is `false`
     */
    disableAnimation?: boolean;
    /**
     * Extra Class Name
     */
    className?: string;
}

const ProgressBar: FC<ProgressProps> = ({
    className,
    now,
    min,
    max,
    isLabel,
    color,
    size,
    disableAnimation,
    ...restProps
}) => {
    const colorClass = [
        color === "primary" && "tw-bg-primary",
        color === "success" && "tw-bg-success",
        color === "danger" && "tw-bg-danger",
    ];
    const sizeClass = [
        size === "xxs" && "tw-h-0.5",
        size === "xs" && "tw-h-1.5",
        size === "sm" && "tw-h-2.5",
        size === "md" && "tw-h-3.8",
        size === "lg" && "tw-h-5",
    ];
    return (
        <div
            className={clsx("progress tw-bg-gray-500 tw-rounded-sm", className)}
            {...restProps}
        >
            <motion.div
                role="progressbar"
                aria-valuenow={now}
                aria-valuemin={min}
                aria-valuemax={max}
                initial={{
                    width: disableAnimation ? `${now}%` : 0,
                }}
                whileInView={{ width: `${now}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 1,
                    type: "tween",
                    delay: 0.5,
                }}
                className={clsx(
                    "progress-bar tw-flex tw-items-center tw-justify-center tw-rounded-l-sm",
                    color && colorClass,
                    size && sizeClass
                )}
            >
                <span
                    className={
                        !isLabel ? "tw-sr-only" : "tw-text-white tw-text-[11px]"
                    }
                >
                    {now}%
                </span>
            </motion.div>
        </div>
    );
};

ProgressBar.defaultProps = {
    now: 40,
    min: 0,
    max: 100,
    color: "primary",
    size: "xs",
    disableAnimation: false,
};

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
