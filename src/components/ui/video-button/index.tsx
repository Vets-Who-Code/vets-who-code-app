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
                    "tw:absolute tw:inset-0 tw:z-30 tw:flex tw:items-center tw:justify-center",
                    className
                )}
                onClick={() => setOpen(true)}
            >
                <img
                    className="icon tw:w-16 tw:md:w-auto"
                    src="/images/icons/icon-youtube-play.png"
                    alt="youtube play"
                    loading="lazy"
                    width={100}
                    height={70}
                />
            </button>
            <ModalVideo show={isOpen} videoId={videoId} onClose={() => setOpen(false)} />
        </>
    );
};

VideoButton.defaultProps = {
    label: "Play video",
};

export default VideoButton;
