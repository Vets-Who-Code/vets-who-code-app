import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { fadeIn } from "@utils/variants";
import { useKeyboardFocus } from "@hooks";

const Portal = dynamic(() => import("../../portal"), {
    ssr: false,
});

type TModal = {
    children: React.ReactNode;
    /**
     * When `true` The modal will show itself.
     */
    show: boolean;
    /**
     * Modal Sizes
     */
    size?: "xl" | "lg" | "md" | "sm";
    /**
     * vertically center the Dialog in the window
     */
    centered?: boolean;
    /**
     * Callback function for close modal
     */
    onClose: () => void;
    /**
     * Pass extra classes
     */
    className?: string;
};

const Modal = ({ className, show, size, centered, children, onClose }: TModal) => {
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);

    return (
        <Portal>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                {show && (
                    <>
                        <motion.div
                            className={clsx(
                                "backdrop tw:fixed tw:left-0 tw:top-0 tw:z-50 tw:h-screen tw:w-screen tw:bg-black/60 tw:transition-opacity"
                            )}
                            tabIndex={-1}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            ref={modalRef}
                            className={clsx(
                                className,
                                "tw:fixed tw:inset-0 tw:z-50 tw:overflow-hidden tw:outline-0 tw:transition-opacity"
                            )}
                            role="button"
                            tabIndex={-1}
                            onClick={onClose}
                            onKeyPress={(e) => e}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div
                                className={clsx(
                                    "modal-dialog tw:pointer-events-none tw:relative tw:m-2 tw:w-auto tw:sm:mx-auto tw:sm:my-5",
                                    size === "sm" && "tw:sm:max-w-[300px]",
                                    size === "md" && "tw:sm:max-w-[470px]",
                                    size === "lg" && "tw:sm:max-w-[500px] tw:lg:max-w-[800px]",
                                    size === "xl" && "tw:sm:max-w-[500px] tw:lg:max-w-[800px]",
                                    centered &&
                                        "tw:flex tw:min-h-[calc(100vh-1rem)] tw:items-center tw:sm:min-h-[calc(100vh-3.5rem)]"
                                )}
                            >
                                <div
                                    className="modal-content tw:pointer-events-auto tw:relative tw:flex tw:w-full tw:flex-col tw:rounded-sm tw:bg-white tw:bg-clip-padding"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
};

Modal.defaultProps = {
    size: "md",
    centered: true,
};

export default Modal;
