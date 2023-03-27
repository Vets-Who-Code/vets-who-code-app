import dynamic from "next/dynamic";
import Section from "@ui/section";
import NiceSelect from "@ui/nice-select";
import { IEvent } from "@utils/types";
import { eventFilter } from "@utils/methods";
import { useFilter } from "@hooks";
import OriginalItems from "./original-items";

const FilterItems = dynamic(() => import("./filter-items"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

type TProps = {
    data: {
        events: IEvent[];
        allEvents: IEvent[];
        totalEvents?: number;
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
        };
    };
};

const EventArea = ({
    data: { events, allEvents, totalEvents, pagiData },
}: TProps) => {
    const { filterItems, setValue, value } = useFilter<IEvent>(
        allEvents,
        eventFilter,
        "/events"
    );

    const count = value ? filterItems.length : totalEvents;

    return (
        <Section className="events-area" space="bottom">
            <h2 className="tw-sr-only">Event Section</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-items-center tw-mb-5">
                    <p className="tw-mb-2.5">
                        We found {count} courses available for you
                    </p>
                    <NiceSelect
                        className="tw-w-[270px] md:tw-ml-auto tw-mb-2.5"
                        options={[
                            {
                                label: "All",
                                value: "all",
                                selected: true,
                            },
                            { label: "Happening", value: "happening" },
                            { label: "Upcoming", value: "upcoming" },
                            { label: "Expired", value: "expired" },
                        ]}
                        setValue={setValue}
                        prefix="Event Type:"
                        defaultValue={value}
                    />
                </div>
                {!value && (
                    <OriginalItems events={events} pagiData={pagiData} />
                )}
                {value && <FilterItems events={filterItems} />}
            </div>
        </Section>
    );
};

export default EventArea;
