import { useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { VideoType } from "@utils/types";

const ModalVideo = dynamic(() => import("../video-modal"), { ssr: false });

type TProps = VideoType & {
    label?: string;
    className?: string;
};

const VideoButton = ({ label, className, videoId }: TProps) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <button
                type="button"
                aria-label={label}
                className={clsx(
                    "tw-absolute tw-z-30 tw-inset-0 tw-flex tw-justify-center tw-items-center",
                    className
                )}
                onClick={() => setOpen(true)}
            >
                <img
                    className="icon tw-w-16 md:tw-w-auto"
                    src="/images/icons/icon-youtube-play.png"
                    alt="youtube play"
                    loading="lazy"
                    width={100}
                    height={70}
                />
            </button>
            <ModalVideo
                show={isOpen}
                videoId={videoId}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

VideoButton.defaultProps = {
    label: "Play video",
};

export default VideoButton;
