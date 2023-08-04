import { motion } from "framer-motion";
import EventCard from "@components/event-card/event-01";
import Pagination from "@components/pagination/pagination-01";
import { IEvent } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedEventCard = motion(EventCard);

type TProps = {
    events: IEvent[];
    pagiData?: {
        currentPage: number;
        numberOfPages: number;
    };
};

const OriginalItems = ({ events, pagiData }: TProps) => {
    return (
        <>
            <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                {events.map((event) => (
                    <AnimatedEventCard
                        key={event.path}
                        title={event.title}
                        path={event.path}
                        thumbnail={event.thumbnail}
                        start_date={event.start_date}
                        location={event.location}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    />
                ))}
            </div>
            {pagiData && pagiData.numberOfPages > 1 && (
                <Pagination
                    className="tw-mt-[50px]"
                    numberOfPages={pagiData.numberOfPages}
                    currentPage={pagiData.currentPage}
                    rootPage="events"
                />
            )}
        </>
    );
};

export default OriginalItems;
