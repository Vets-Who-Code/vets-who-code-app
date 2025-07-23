import dayjs from "dayjs";
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

const Summary = ({
    location,
    start_date,
    end_date,
    start_time,
    end_time,
    venue,
    title,
    body,
}: TProps) => {
    return (
        <article className="tw:py-15 tw:md:py-20 tw:lg:py-[100px]">
            <div className="tw:container tw:border-b tw:border-b-gray-650 tw:pb-[50px] tw:md:pb-[70px] tw:lg:pb-[90px]">
                <h2 className="tw:mb-5 tw:text-center tw:text-4xl tw:md:text-[42px] tw:lg:text-5xl">
                    About The Event
                </h2>
                <div className="tw:mb-10 tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:lg:mb-15">
                    <div className="tw:mx-3 tw:mb-[5px]">
                        <i className="fal fa-map-marker-alt tw:mr-[5px] tw:text-primary" />
                        <span>
                            {location.city}, {location.country}
                        </span>
                    </div>

                    <div className="tw:mx-3 tw:mb-[5px]">
                        <i className="fal fa-calendar tw:mr-[5px] tw:text-primary" />
                        <span>
                            {dayjs(start_date).format("MMM DD, YYYY")} -{" "}
                            {dayjs(end_date).format("MMM DD, YYYY")}
                        </span>
                    </div>

                    <div className="tw:mx-3 tw:mb-[5px]">
                        <i className="fal fa-clock tw:mr-[5px] tw:text-primary" />
                        <span>
                            {dayjs(`${start_date} ${start_time}`).format("h:mm a")} -{" "}
                            {dayjs(`${end_date} ${end_time}`).format("h:mm a")}
                        </span>
                    </div>
                </div>
                <div className="tw:mb-10 tw:grid tw:grid-cols-3 tw:gap-10 tw:lg:mb-[50px]">
                    <div className="tw:col-span-full tw:lg:col-[1/3]">
                        <div className="tw:h-[400px] tw:lg:h-[390px]">
                            <GoogleMap
                                center={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                zoom={14}
                            />
                        </div>

                        <p className="tw:mb-0 tw:mt-5 tw:text-center">
                            <span className="fal fa-map-marker-alt tw:mr-1.5 tw:text-primary" />
                            {venue}
                        </p>
                    </div>
                    <div className="tw:col-span-full tw:lg:col-[3/-1]">
                        <EventInfo title={title} start_date={start_date} />
                    </div>
                </div>
                <HTMLContent body={body} />
            </div>
        </article>
    );
};

export default Summary;
