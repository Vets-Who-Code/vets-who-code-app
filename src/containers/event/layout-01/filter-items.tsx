import { useRouter } from "next/router";
import EventCard from "@components/event-card/event-01";
import Pagination from "@components/pagination/pagination-01-button";
import { IEvent } from "@utils/types";

type TProps = {
    events: IEvent[];
};

const FilterItems = ({ events }: TProps) => {
    const router = useRouter();
    const { page } = router.query;
    const pageNumber = page ? +page : 1;
    const POSTS_PER_PAGE = 9;
    const skip = (pageNumber - 1) * POSTS_PER_PAGE;
    const limit = pageNumber * POSTS_PER_PAGE;
    const numberOfPages = Math.ceil(events.length / POSTS_PER_PAGE);
    return (
        <>
            <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                {events.length > 0 ? (
                    events
                        .slice(skip, limit)
                        .map((event) => (
                            <EventCard
                                key={event.path}
                                title={event.title}
                                path={event.path}
                                thumbnail={event.thumbnail}
                                start_date={event.start_date}
                                location={event.location}
                            />
                        ))
                ) : (
                    <p>No Items Found</p>
                )}
            </div>
            {numberOfPages > 1 && (
                <Pagination
                    className="tw-mt-[50px]"
                    numberOfPages={numberOfPages}
                    currentPage={pageNumber}
                />
            )}
        </>
    );
};

export default FilterItems;
