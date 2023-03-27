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
    | "total_slot"
    | "price"
    | "currency"
    | "total_booked"
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
    total_slot,
    price,
    currency,
    total_booked,
    venue,
    thumbnail,
    title,
    body,
}: TProps) => {
    return (
        <article className="tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-container tw-border-b tw-border-b-gray-650 tw-pb-[50px] md:tw-pb-[70px] lg:tw-pb-[90px]">
                <h2 className="tw-text-4xl md:tw-text-[42px] lg:tw-text-5xl tw-text-center tw-mb-5">
                    About The Event
                </h2>
                <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-mb-10 lg:tw-mb-15">
                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-map-marker-alt tw-text-primary tw-mr-[5px]" />
                        <span>
                            {location.city}, {location.country}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-calendar tw-text-primary tw-mr-[5px]" />
                        <span>
                            {dayjs(start_date).format("MMM DD, YYYY")} -{" "}
                            {dayjs(end_date).format("MMM DD, YYYY")}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i className="fal fa-clock tw-text-primary tw-mr-[5px]" />
                        <span>
                            {dayjs(`${start_date} ${start_time}`).format(
                                "h:mm a"
                            )}{" "}
                            -{" "}
                            {dayjs(`${end_date} ${end_time}`).format("h:mm a")}
                        </span>
                    </div>
                </div>
                <div className="tw-grid tw-grid-cols-3 tw-gap-10 tw-mb-10 lg:tw-mb-[50px]">
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
                            <span className="fal fa-map-marker-alt tw-text-primary tw-mr-1.5" />
                            {venue}
                        </p>
                    </div>
                    <div className="tw-col-span-full lg:tw-col-[3/-1]">
                        <EventInfo
                            total_slot={total_slot}
                            total_booked={total_booked}
                            title={title}
                            thumbnail={thumbnail}
                            start_date={start_date}
                            price={price}
                            currency={currency}
                        />
                    </div>
                </div>
                <HTMLContent body={body} />
            </div>
        </article>
    );
};

export default Summary;
