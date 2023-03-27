import { forwardRef } from "react";
import clsx from "clsx";
import VideoButton from "@ui/video-button";
import { ImageType, VideoType } from "@utils/types";

type TProps = {
    poster: ImageType;
    video: VideoType;
    className?: string;
};

const Video02 = forwardRef<HTMLDivElement, TProps>(
    ({ poster, video, className }, ref) => {
        return (
            <div
                className={clsx(
                    "tw-relative tw-overflow-hidden tw-group tw-z-20 tw-rounded tw-shadow-xxl tw-shadow-black/[22%]",
                    className
                )}
                ref={ref}
            >
                {poster?.src && (
                    <img
                        className="tw-w-full tw-transition-transform tw-duration-1500 group-hover:tw-scale-110"
                        src={poster.src}
                        alt={poster?.alt || "video poster"}
                        width={poster?.width || 1170}
                        height={poster?.height || 620}
                        loading={poster?.loading || "lazy"}
                    />
                )}
                {video && <VideoButton videoId={video.videoId} />}
            </div>
        );
    }
);

export default Video02;
