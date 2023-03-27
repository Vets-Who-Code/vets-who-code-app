import clsx from "clsx";
import { TabPaneProps } from "./types";

const TabPane = ({ children, className, id }: TabPaneProps) => {
    return (
        <div
            className={clsx("tab-pane", className)}
            role="tabpanel"
            id={id && `${id}-panel`}
            aria-labelledby={id && `${id}-tab`}
        >
            {children}
        </div>
    );
};

TabPane.displayName = "TabPane";

export default TabPane;
