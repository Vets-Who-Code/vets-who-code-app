import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import clsx from "clsx";
import CloseButton from "@ui/close-button";
import { flyoutSearch02, flyoutSearch02Inner } from "@utils/variants";
import { useKeyboardFocus } from "@hooks";

type TProps = {
    /**
     * When `true` The modal will show itself.
     */
    show: boolean;
    /**
     * Modal Sizes
     */
    onClose: () => void;
    /**
     * Pass extra classes
     */
    className?: string;
};

const FlyoutSearchForm = ({ show, onClose, className }: TProps) => {
    const [search, setSearch] = useState("");
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);
    const router = useRouter();
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!search) return;
        void router.push(
            {
                pathname: "/courses/search",
                query: {
                    s: search,
                },
            },
            undefined,
            { scroll: false }
        );
    };
    return (
        <AnimatePresence
            initial={false}
            exitBeforeEnter
            onExitComplete={() => null}
        >
            {show && (
                <motion.div
                    className={clsx(
                        "tw-fixed tw-z-50 tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-white",
                        className
                    )}
                    ref={modalRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={flyoutSearch02}
                >
                    <div className="tw-absolute tw-top-10 tw-right-14">
                        <CloseButton onClose={onClose} />
                    </div>
                    <motion.div
                        className="tw-w-[1170px] tw-max-w-[90%]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={flyoutSearch02Inner}
                    >
                        <form action="#" onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="tw-text-[50px] tw-font-light tw-h-[100px] tw-w-full tw-py-3.8 tw-text-heading tw-border-b-[3px] tw-border-b-primary tw-bg-transparent focus:tw-outline-0"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FlyoutSearchForm;
