import clsx from "clsx";
import { motion } from "framer-motion";
import { TabProps } from "./types";

const TabNav = ({
    id,
    children,
    onClick,
    isActive,
    variant,
    className,
}: TabProps) => {
    return (
        <button
            className={clsx(
                "tab-nav",
                variant === "underline" &&
                    "tw-relative tw-text-base tw-font-semibold sm:tw-text-xl sm:tw-font-bold tw-leading-snug tw-py-[9px] tw-px-[14px] lg:tw-py-[9px] lg:tw-px-6.1",
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
                    className="tw-absolute tw-block tw-w-full tw-h-0.5 -tw-bottom-1 tw-left-0 tw-bg-primary tw-z-1"
                    layoutId="underline"
                />
            ) : null}
        </button>
    );
};

TabNav.displayName = "TabNav";

export default TabNav;
