import { forwardRef } from "react";
import clsx from "clsx";
import { IZoomMeeting } from "@utils/types";
import Anchor from "@components/ui/anchor";
import { minutesToHours } from "@utils/methods";

type TProps = Pick<
    IZoomMeeting,
    "thumbnail" | "title" | "path" | "meeting_id" | "date" | "time" | "duration"
> & {
    className?: string;
};

const ZoomCard = forwardRef<HTMLDivElement, TProps>(
    (
        { className, thumbnail, title, path, meeting_id, date, time, duration },
        ref
    ) => {
        return (
            <div
                className={clsx(
                    "event tw-h-full tw-relative tw-bg-gray-100 tw-group tw-rounded",
                    "before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-shadow-4xl before:tw-shadow-black/[0.12] before:tw-opacity-0 before:tw-transition-opacity before:tw-duration-300",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-overflow-hidden tw-rounded-t max-w-full tw-h-[230px]">
                    {thumbnail?.src && (
                        <figure className="tw-transition-transform tw-duration-1500 group-hover:tw-scale-110 tw-h-full">
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={thumbnail.src}
                                alt={thumbnail?.alt || "Event"}
                                width={thumbnail.width || 480}
                                height={thumbnail.height || 230}
                                loading={thumbnail.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </div>

                <div className="info tw-relative tw-z-1 tw-pt-[19px] tw-pb-[23px] tw-px-7.5">
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <div className="tw-flex tw-items-center tw-mt-[7px]">
                        <span className="tw-text-[13px] tw-font-medium tw-uppercase tw-tracking-[1.73px] tw-text-gray-700">
                            Meeting ID:{" "}
                        </span>
                        <span className="tw-tracking-[2.13px] tw-font-semibold tw-text-[16px] tw-text-primary">
                            {meeting_id}
                        </span>
                    </div>

                    <div className="tw-mt-[11px] tw-text-base tw-text-gray-300 tw-flex tw-flex-wrap tw-items-center">
                        <div className="tw-py-[3px] tw-mr-5">
                            <span className="tw-mr-1 tw-text-body far fa-calendar" />
                            <span className="meta-value start-date">
                                {date}
                            </span>{" "}
                            <span className="tw-font-semibold">{time}</span>
                        </div>

                        <div className="zvc-meta zvc-loop-duration">
                            <span className="tw-mr-1 tw-text-body far fa-clock" />
                            <span className="meta-value">
                                {minutesToHours(duration)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default ZoomCard;
