import HTMLContent from "@components/html-content";
import ZoomInfo from "@components/widgets/zoom-info-widget";
import CountdownTimer from "@ui/countdown-timer/layout-02";
import { IZoomMeeting } from "@utils/types";

type TProps = Pick<
    IZoomMeeting,
    | "host"
    | "start_date"
    | "date"
    | "time"
    | "category"
    | "duration"
    | "timezone"
    | "thumbnail"
    | "links"
    | "body"
>;

const ZoomMeetingDetails = ({
    host,
    start_date,
    date,
    time,
    category,
    duration,
    timezone,
    thumbnail,
    links,
    body,
}: TProps) => {
    return (
        <div className="zoom-meeting-details tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]">
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-3 tw-gap-10">
                    <div className="tw-col-span-full lg:tw-col-[1/3]">
                        {thumbnail?.src && (
                            <figure className="tw-mb-7.5 tw-h-[400px]">
                                <img
                                    src={thumbnail.src}
                                    alt={thumbnail?.alt || "zoom meeting"}
                                    width="770"
                                    className="tw-h-full tw-w-full tw-rounded tw-object-cover"
                                />
                            </figure>
                        )}
                        <HTMLContent body={body} />
                    </div>
                    <div className="tw-col-span-full lg:tw-col-[3/-1]">
                        <CountdownTimer targetDate={start_date} className="tw-mb-[45px]" />
                        <ZoomInfo
                            host={host}
                            date={date}
                            time={time}
                            category={category}
                            duration={duration}
                            timezone={timezone}
                            links={links}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoomMeetingDetails;
