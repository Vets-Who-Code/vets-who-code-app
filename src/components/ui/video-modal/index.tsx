import { useKeyboardFocus } from "@hooks";
import { fadeIn02 } from "@utils/variants";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
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
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                {show && (
                    <>
                        <motion.div
                            className="backdrop tw-fixed tw-left-0 tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-black/60 tw-transition-opacity"
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
                                "tw-fixed tw-inset-0 tw-z-[999] tw-overflow-hidden tw-outline-0 tw-transition-opacity",
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
                            <div className="modal-dialog tw-pointer-events-none tw-relative tw-z-50 tw-m-3 tw-flex tw-min-h-[calc(100vh_-_1rem)] tw-w-auto tw-items-center sm:tw-mx-auto sm:tw-my-5 sm:tw-min-h-[calc(100vh_-_3.5rem)] sm:tw-max-w-[500px] lg:tw-max-w-[1000px]">
                                <div
                                    className="modal-content tw-pointer-events-auto tw-relative tw-flex tw-w-full tw-flex-col tw-rounded tw-bg-white tw-bg-clip-padding"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={-1}
                                >
                                    {videoLoading && (
                                        <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                                            <Spinner />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="tw-absolute -tw-top-9 tw-right-0 tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-bg-black tw-text-white"
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
                                        allowFullScreen={true}
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
