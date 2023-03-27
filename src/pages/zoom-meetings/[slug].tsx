import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ZoomMeetingDetailsArea from "@containers/zoom-meeting-details";
import { IZoomMeeting } from "@utils/types";
import { toCapitalize } from "@utils/methods";
import {
    getZoomMeetingBySlug,
    getAllZoomMeetings,
} from "../../lib/zoom-meeting";

type TProps = {
    data: {
        zoomMeeting: IZoomMeeting;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const ZoomMeetingDetails: PageProps = ({ data: { zoomMeeting } }) => {
    return (
        <>
            <SEO
                title={toCapitalize(zoomMeeting.title)}
                openGraph={{
                    type: "website",
                    images: [
                        {
                            url: `https://maxcoach-react.pages.dev${zoomMeeting.thumbnail.src}`,
                            width: 800,
                            height: 600,
                            alt: zoomMeeting.title,
                        },
                        {
                            url: `https://maxcoach-react.pages.dev${zoomMeeting.thumbnail.src}`,
                            width: 900,
                            height: 800,
                            alt: zoomMeeting.title,
                        },
                    ],
                }}
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    {
                        path: "/zoom-meetings",
                        label: "Zoom Meetings and Webinars",
                    },
                ]}
                currentPage={zoomMeeting.title}
            />
            <ZoomMeetingDetailsArea
                host={zoomMeeting.host}
                start_date={zoomMeeting.start_date}
                date={zoomMeeting.date}
                time={zoomMeeting.time}
                category={zoomMeeting.category}
                duration={zoomMeeting.duration}
                timezone={zoomMeeting.timezone}
                thumbnail={zoomMeeting.thumbnail}
                links={zoomMeeting.links}
                body={zoomMeeting.body}
            />
        </>
    );
};

ZoomMeetingDetails.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const zoomMeetings = getAllZoomMeetings(["slug"]);
    return {
        paths: zoomMeetings.map(({ slug }) => {
            return {
                params: {
                    slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const zoomMeeting = getZoomMeetingBySlug(params.slug, "all");

    return {
        props: {
            data: {
                zoomMeeting,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ZoomMeetingDetails;
