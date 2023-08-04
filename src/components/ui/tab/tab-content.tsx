import { Children } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ContentProps } from "./types";

const TabContent = ({ children, activeIdx, className }: ContentProps) => {
    const childArr = Children.toArray(children);
    const activeChild = childArr.find((_el, i) => i === activeIdx);
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className={clsx("tab-content", className)}
                key={activeIdx}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {activeChild}
            </motion.div>
        </AnimatePresence>
    );
};

TabContent.displayName = "TabContent";

export default TabContent;
