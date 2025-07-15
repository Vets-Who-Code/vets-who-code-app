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
    ({ className, thumbnail, title, path, meeting_id, date, time, duration }, ref) => {
        return (
            <div
                className={clsx(
                    "event tw:bg-white-100 tw:group tw:relative tw:h-full tw:rounded-sm",
                    "tw:before:absolute tw:before:inset-0 tw:before:opacity-0 tw:before:shadow-4xl tw:before:shadow-black/12 tw:before:transition-opacity tw:before:duration-300 tw:before:content-['']",
                    "tw:hover:before:opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw:relative tw:h-[230px] tw:overflow-hidden tw:rounded-t max-w-full">
                    {thumbnail?.src && (
                        <figure className="tw:h-full tw:transition-transform tw:duration-1500 tw:group-hover:scale-110">
                            <img
                                className="tw:h-full tw:w-full tw:object-cover"
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

                <div className="info tw:relative tw:z-1 tw:px-7.5 tw:pb-[23px] tw:pt-[19px]">
                    <h3 className="tw:mb-0 tw:text-xl tw:leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <div className="tw:mt-[7px] tw:flex tw:items-center">
                        <span className="tw:text-[13px] tw:font-medium tw:uppercase tw:tracking-[1.73px] tw:text-gray-700">
                            Meeting ID:{" "}
                        </span>
                        <span className="tw:text-[16px] tw:font-semibold tw:tracking-[2.13px] tw:text-primary">
                            {meeting_id}
                        </span>
                    </div>

                    <div className="tw:mt-[11px] tw:flex tw:flex-wrap tw:items-center tw:text-base tw:text-gray-300">
                        <div className="tw:mr-5 tw:py-[3px]">
                            <span className="far fa-calendar tw:mr-1 tw:text-body" />
                            <span className="meta-value start-date">{date}</span>{" "}
                            <span className="tw:font-semibold">{time}</span>
                        </div>

                        <div className="zvc-meta zvc-loop-duration">
                            <span className="far fa-clock tw:mr-1 tw:text-body" />
                            <span className="meta-value">{minutesToHours(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default ZoomCard;
