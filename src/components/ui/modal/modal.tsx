import { useKeyboardFocus } from "@hooks";
import { fadeIn } from "@utils/variants";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";

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
                                "backdrop tw-fixed tw-left-0 tw-top-0 tw-z-50 tw-h-screen tw-w-screen tw-bg-black/60 tw-transition-opacity"
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
                                "tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden tw-outline-0 tw-transition-opacity"
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
                                    "modal-dialog tw-pointer-events-none tw-relative tw-m-2 tw-w-auto sm:tw-mx-auto sm:tw-my-5",
                                    size === "sm" && "sm:tw-max-w-[300px]",
                                    size === "md" && "sm:tw-max-w-[470px]",
                                    size === "lg" && "sm:tw-max-w-[500px] lg:tw-max-w-[800px]",
                                    size === "xl" && "sm:tw-max-w-[500px] lg:tw-max-w-[800px]",
                                    centered &&
                                        "tw-flex tw-min-h-[calc(100vh_-_1rem)] tw-items-center sm:tw-min-h-[calc(100vh_-_3.5rem)]"
                                )}
                            >
                                <div
                                    className="modal-content tw-pointer-events-auto tw-relative tw-flex tw-w-full tw-flex-col tw-rounded tw-bg-white tw-bg-clip-padding"
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
