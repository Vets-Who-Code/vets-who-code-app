import { motion, AnimatePresence } from "framer-motion";
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

const Modal = ({
    className,
    show,
    size,
    centered,
    children,
    onClose,
}: TModal) => {
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);

    return (
        <Portal>
            <AnimatePresence
                initial={false}
                exitBeforeEnter
                onExitComplete={() => null}
            >
                {show && (
                    <>
                        <motion.div
                            className={clsx(
                                "backdrop tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-black/60 tw-transition-opacity tw-z-50"
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
                                "tw-fixed tw-inset-0 tw-overflow-hidden tw-outline-0 tw-transition-opacity tw-z-50"
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
                                    "modal-dialog tw-relative tw-w-auto tw-m-2 tw-pointer-events-none sm:tw-my-5 sm:tw-mx-auto",
                                    size === "sm" && "sm:tw-max-w-[300px]",
                                    size === "md" && "sm:tw-max-w-[470px]",
                                    size === "lg" &&
                                        "sm:tw-max-w-[500px] lg:tw-max-w-[800px]",
                                    size === "xl" &&
                                        "sm:tw-max-w-[500px] lg:tw-max-w-[800px]",
                                    centered &&
                                        "tw-flex tw-items-center tw-min-h-[calc(100vh_-_1rem)] sm:tw-min-h-[calc(100vh_-_3.5rem)]"
                                )}
                            >
                                <div
                                    className="modal-content tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded"
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
