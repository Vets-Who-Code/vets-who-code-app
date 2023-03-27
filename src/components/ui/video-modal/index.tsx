import { useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyboardFocus } from "@hooks";
import { fadeIn02 } from "@utils/variants";
import Spinner from "../spinner";

const Portal = dynamic(() => import("../../portal"), {
    ssr: false,
});

type TModal = {
    /**
     * Youtube video ID
     */
    videoId: string;
    /**
     * When `true` The modal will show itself.
     */
    show: boolean;
    /**
     * Callback function for close modal
     */
    onClose: () => void;
    /**
     * Pass extra classes
     */
    className?: string;
};

const VideoModal = ({ videoId, show, onClose, className }: TModal) => {
    const [videoLoading, setVideoLoading] = useState(true);
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);

    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

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
                            className="backdrop tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-black/60 tw-transition-opacity tw-z-50 tw-flex tw-justify-center tw-items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                            }}
                            tabIndex={-1}
                        />

                        <motion.div
                            className={clsx(
                                "tw-fixed tw-inset-0 tw-overflow-hidden tw-outline-0 tw-transition-opacity tw-z-[999]",
                                className
                            )}
                            role="button"
                            tabIndex={-1}
                            ref={modalRef}
                            onClick={onClose}
                            onKeyPress={(e) => e}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={fadeIn02}
                        >
                            <div className="modal-dialog tw-relative tw-z-50 tw-w-auto tw-m-3 tw-pointer-events-none sm:tw-my-5 sm:tw-mx-auto tw-flex tw-items-center tw-min-h-[calc(100vh_-_1rem)] sm:tw-min-h-[calc(100vh_-_3.5rem)] sm:tw-max-w-[500px] lg:tw-max-w-[1000px]">
                                <div
                                    className="modal-content tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={-1}
                                >
                                    {videoLoading && (
                                        <div className="tw-absolute tw-inset-0 tw-flex tw-justify-center tw-items-center">
                                            <Spinner />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="tw-absolute tw-right-0 -tw-top-9 tw-w-9 tw-h-9 tw-text-white tw-bg-black tw-flex tw-items-center tw-justify-center"
                                    >
                                        <i className="linea-arrows-circle-remove" />
                                    </button>
                                    <iframe
                                        className="modal__video-style"
                                        onLoad={spinner}
                                        loading="lazy"
                                        width="800"
                                        height="500"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default VideoModal;
