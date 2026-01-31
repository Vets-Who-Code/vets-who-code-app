import { formatDate } from "@utils/date";
import GoogleMap from "@ui/google-map";
import { IEvent } from "@utils/types";
import EventInfo from "@components/widgets/event-info-widget";
import HTMLContent from "@components/html-content";

type TProps = Pick<
    IEvent,
    | "title"
    | "start_date"
    | "end_date"
    | "start_time"
    | "end_time"
    | "location"
    | "venue"
    | "thumbnail"
    | "body"
>;

function Summary({
    location,
    start_date,
    end_date,
    start_time,
    end_time,
    venue,
    title,
    body,
}: TProps) {
    return (
        <article className="tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-border-b-gray-650 tw-container tw-border-b tw-pb-[50px] md:tw-pb-[70px] lg:tw-pb-[90px]">
                <h2 className="tw-mb-5 tw-text-center tw-text-4xl md:tw-text-[42px] lg:tw-text-5xl">
                    About The Event
                </h2>
                <div className="tw-mb-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center lg:tw-mb-15">
                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-map-marker-alt tw-mr-[5px] tw-text-primary" />
                        <span>
                            {location.city}, {location.country}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-calendar tw-mr-[5px] tw-text-primary" />
                        <span>
                            {formatDate(start_date)} - {formatDate(end_date)}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-clock tw-mr-[5px] tw-text-primary" />
                        <span>
                            {formatDate(`${start_date} ${start_time}`, "h:mm a")} -{" "}
                            {formatDate(`${end_date} ${end_time}`, "h:mm a")}
                        </span>
                    </div>
                </div>
                <div className="tw-mb-10 tw-grid tw-grid-cols-3 tw-gap-10 lg:tw-mb-[50px]">
                    <div className="tw-col-span-full lg:tw-col-[1/3]">
                        <div className="tw-h-[400px] lg:tw-h-[390px]">
                            <GoogleMap
                                center={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                zoom={14}
                            />
                        </div>

                        <p className="tw-mb-0 tw-mt-5 tw-text-center">
                            <span className="fal fa-map-marker-alt tw-mr-1.5 tw-text-primary" />
                            {venue}
                        </p>
                    </div>
                    <div className="tw-col-span-full lg:tw-col-[3/-1]">
                        <EventInfo title={title} start_date={start_date} />
                    </div>
                </div>
                <HTMLContent body={body} />
            </div>
        </article>
    );
}

export default Summary;
