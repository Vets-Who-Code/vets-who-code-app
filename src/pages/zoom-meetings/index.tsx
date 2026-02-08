import type { GetStaticProps, NextPage } from "next";
import Breadcrumb from "@/components/breadcrumb";
import SEO from "@/components/seo/page-seo";
import ZoomMeetingArea from "@/containers/zoom-meetings";
import Layout01 from "@/layouts/layout-01";
import { IZoomMeeting } from "@/utils/types";
import { getAllZoomMeetings, getZoomMeetingMeta } from "../../lib/zoom-meeting";

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

const ZoomMeetings: PageProps = ({ data: { zoomMeetings, currentPage, numberOfPages } }) => {
    return (
        <>
            <SEO title="Zoom Meetings" />
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

ZoomMeetings.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const zoomMeetings = getAllZoomMeetings(
        ["slug", "title", "thumbnail", "date", "meeting_id", "duration"],
        0,
        POSTS_PER_PAGE
    );

    const { count } = getZoomMeetingMeta();
    return {
        props: {
            data: {
                zoomMeetings,
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

export default ZoomMeetings;
