import clsx from "clsx";
import { ContainerProps } from "./types";

const TabList = ({ children, variant, className }: ContainerProps) => {
    return (
        <div
            className={clsx(
                "tab-list tw-flex tw-flex-wrap",
                variant === "underline" &&
                    "tw-border-b-2 tw-border-b-gray-500 tw-pb-0.5",
                className
            )}
            role="tablist"
        >
            {children}
        </div>
    );
};

TabList.displayName = "TabList";

export default TabList;
