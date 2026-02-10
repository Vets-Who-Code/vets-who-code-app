import { useKeyboardFocus } from "@hooks";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { memo } from "react";

const Portal = dynamic(() => import("../../portal"), {
    ssr: false,
});

type TProps = {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
};

const wrapVariant = {
    hidden: { opacity: 0 },
    show: {
        transition: {
            staggerChildren: 0.1,
        },
        opacity: 1,
    },
    close: { opacity: 0 },
};

const innerVariant = {
    hidden: {
        opacity: 0,
        x: 420,
        transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    close: {
        opacity: 0,
        x: 420,
        transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
    },
};

const Offcanvas = memo(({ className, onClose, isOpen, children }: TProps) => {
    const offcanvasRef = useKeyboardFocus<HTMLDivElement>(isOpen, onClose);
    return (
        <Portal>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className={clsx(
                            "tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden tw-bg-black tw-bg-black/70"
                        )}
                        onClick={onClose}
                        onKeyUp={onClose}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        variants={wrapVariant}
                        initial="hidden"
                        animate="show"
                        exit="close"
                    >
                        <motion.div
                            className={clsx(
                                "tw-relative tw-z-30 tw-ml-auto tw-h-full tw-w-[300px] tw-bg-secondary tw-bg-[url('https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1698904153/mobile-image_ssvugk.png')] tw-bg-cover tw-bg-top tw-bg-no-repeat sm:tw-w-[360px]",
                                "before:tw-absolute before:tw-inset-0 before:-tw-z-1 before:tw-bg-secondary/90 before:tw-content-['']",
                                className
                            )}
                            onClick={(e) => e.stopPropagation()}
                            onKeyUp={(e) => e.stopPropagation()}
                            tabIndex={0}
                            ref={offcanvasRef}
                            variants={innerVariant}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
});

Offcanvas.displayName = "Offcanvas";

export default Offcanvas;
