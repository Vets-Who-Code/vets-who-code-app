import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import EventArea from "@containers/event/layout-01";
import { IEvent } from "@utils/types";
import { getallEvents, getEventMeta } from "../../../lib/event";

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
            <SEO title={`Events - Page - ${currentPage}`} />
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

export const getStaticPaths: GetStaticPaths = () => {
    const { count } = getEventMeta();
    const pages = Math.ceil(count / POSTS_PER_PAGE);

    const pagesToGenerate = [...Array(pages).keys()]
        .map((a) => {
            if (a !== 0) return a + 1;
            return null;
        })
        .filter(Boolean);

    const paths = pagesToGenerate.map((page) => {
        return { params: { page: String(page) } }; // cast page to string
    });

    return {
        paths,
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    page: string;
}

export const getStaticProps: GetStaticProps<TProps, Params> = ({ params }) => {
    const page = params?.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;

    const { count } = getEventMeta();
    const events = getallEvents([
        "slug",
        "title",
        "thumbnail",
        "start_date",
        "location",
    ]);
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
    const limit = currentPage * POSTS_PER_PAGE;

    return {
        props: {
            data: {
                events: events.slice(skip, limit),
                allEvents: events,
                currentPage: Number(page),
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
                totalEvents: count,
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
