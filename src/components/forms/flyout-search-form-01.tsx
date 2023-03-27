import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useKeyboardFocus } from "@hooks";
import { flyoutSearch01, flyoutSearch01Inner } from "@utils/variants";
import SearchForm from "./search-form";

const AnimatedSearch = motion(SearchForm);

type TProps = {
    /**
     * When `true` The modal will show itself.
     */
    show: boolean;
    /**
     * Pass extra classes
     */
    className?: string;
    /**
     * Callback function for close modal
     */
    onClose: () => void;
};

const FlyoutSearchForm = ({ show, onClose, className }: TProps) => {
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div
                    layout
                    key="searchwrapper"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={flyoutSearch01}
                    className={clsx(
                        "tw-absolute tw-overflow-hidden tw-left-0 tw-top-15 tw-max-w-full tw-min-h-[80px] tw-p-3.8 tw-bg-white tw-border-t tw-border-t-gray-450 tw-w-full",
                        className
                    )}
                    ref={modalRef}
                >
                    <AnimatedSearch
                        layout
                        key="search"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={flyoutSearch01Inner}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FlyoutSearchForm;
