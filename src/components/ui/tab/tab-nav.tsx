import clsx from "clsx";
import { motion } from "motion/react";
import { TabProps } from "./types";

const TabNav = ({ id, children, onClick, isActive, variant, className }: TabProps) => {
    return (
        <button
            className={clsx(
                "tab-nav",
                variant === "underline" &&
                    "tw-relative tw-px-[14px] tw-py-[9px] tw-text-base tw-font-semibold tw-leading-snug sm:tw-text-xl sm:tw-font-bold lg:tw-px-6.1 lg:tw-py-[9px]",
                !isActive && "tw-text-gray-400",
                isActive && "tw-text-heading",
                className
            )}
            type="button"
            role="tab"
            id={id && `${id}-tab`}
            aria-controls={isActive ? id && `${id}-panel` : undefined}
            aria-selected={isActive}
            onClick={onClick}
        >
            {children}
            {isActive && variant === "underline" ? (
                <motion.span
                    className="tw-absolute -tw-bottom-1 tw-left-0 tw-z-1 tw-block tw-h-0.5 tw-w-full tw-bg-primary"
                    layoutId="underline"
                />
            ) : null}
        </button>
    );
};

TabNav.displayName = "TabNav";

export default TabNav;
