import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ZoomMeetingArea from "@containers/zoom-meetings";
import { IZoomMeeting } from "@utils/types";
import {
    getAllZoomMeetings,
    getZoomMeetingMeta,
} from "../../../lib/zoom-meeting";

type TProps = {
    data: {
        zoomMeetings: IZoomMeeting[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 6;

const Events: PageProps = ({
    data: { zoomMeetings, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title={`Zoom Meetings - Page - ${currentPage}`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Zoom Meetings and Webinars"
                title="Archives: Zoom Meetings and Webinars"
            />
            <ZoomMeetingArea
                data={{
                    zoomMeetings,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

Events.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { count } = getZoomMeetingMeta();
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
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
    const limit = currentPage * POSTS_PER_PAGE;

    const zoomMeetings = getAllZoomMeetings(
        ["slug", "title", "thumbnail", "date", "meeting_id", "duration"],
        skip,
        limit
    );

    const { count } = getZoomMeetingMeta();

    return {
        props: {
            data: {
                zoomMeetings,
                currentPage: Number(page),
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
