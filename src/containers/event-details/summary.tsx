import HTMLContent from "@components/html-content";
import EventInfo from "@components/widgets/event-info-widget";
import { formatDate } from "@utils/date";
import { IEvent } from "@utils/types";

type TProps = Pick<
    IEvent,
    "title" | "start_date" | "end_date" | "start_time" | "end_time" | "venue" | "thumbnail" | "body"
>;

function Summary({ start_date, end_date, start_time, end_time, venue, title, body }: TProps) {
    return (
        <article className="tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-border-b-gray-650 tw-container tw-border-b tw-pb-[50px] md:tw-pb-[70px] lg:tw-pb-[90px]">
                <h2 className="tw-mb-5 tw-text-center tw-text-4xl md:tw-text-[42px] lg:tw-text-5xl">
                    About The Event
                </h2>
                <div className="tw-mb-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center lg:tw-mb-15">
                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i
                            className="fal fa-calendar tw-mr-[5px] tw-text-primary"
                            aria-hidden="true"
                        />
                        <span>
                            {formatDate(start_date)} - {formatDate(end_date)}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i
                            className="fal fa-clock tw-mr-[5px] tw-text-primary"
                            aria-hidden="true"
                        />
                        <span>
                            {formatDate(`${start_date} ${start_time}`, "h:mm a")} -{" "}
                            {formatDate(`${end_date} ${end_time}`, "h:mm a")}
                        </span>
                    </div>

                    <div className="tw-mx-3 tw-mb-[5px]">
                        <i
                            className="fal fa-video tw-mr-[5px] tw-text-primary"
                            aria-hidden="true"
                        />
                        <span>{venue}</span>
                    </div>
                </div>
                <div className="tw-mx-auto tw-mb-10 tw-max-w-[420px] lg:tw-mb-[50px]">
                    <EventInfo title={title} start_date={start_date} />
                </div>
                <HTMLContent body={body} />
            </div>
        </article>
    );
}

export default Summary;
