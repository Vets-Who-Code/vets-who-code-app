import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import EventArea from "@containers/event/layout-01";
import { IEvent } from "@utils/types";
import { getallEvents, getEventMeta } from "../../lib/event";

type TProps = {
    data: {
        events: IEvent[];
        allEvents: IEvent[];
        currentPage: number;
        numberOfPages: number;
        totalEvents: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const Events: PageProps = ({
    data: { events, allEvents, totalEvents, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="Events" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Events"
            />
            <EventArea
                data={{
                    events,
                    allEvents,
                    totalEvents,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

Events.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const events = getallEvents([
        "slug",
        "title",
        "thumbnail",
        "start_date",
        "location",
    ]);

    const { count } = getEventMeta();
    return {
        props: {
            data: {
                events: events.slice(0, POSTS_PER_PAGE),
                allEvents: events,
                totalEvents: count,
                currentPage: 1,
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Events;
