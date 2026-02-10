import SEO from "@components/seo/page-seo";
import HeroSection from "@containers/event-details/hero";
import Speakers from "@containers/event-details/speakers";
import Summary from "@containers/event-details/summary";
import Layout01 from "@layout/layout-01";
import { toCapitalize } from "@utils/methods";
import { IEvent } from "@utils/types";
import type { GetStaticPaths, NextPage } from "next";
import { getallEvents, getEventeBySlug } from "../../lib/event";

type TProps = {
    data: {
        event: IEvent;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const SingleEvent: PageProps = ({ data: { event } }) => {
    return (
        <>
            <SEO
                title={toCapitalize(event.title)}
                openGraph={{
                    type: "article",
                    images: [
                        {
                            url: `https://vetswhocode.io${event.thumbnail.src}`,
                            width: 800,
                            height: 600,
                            alt: event.title,
                        },
                        {
                            url: `https://vetswhocode.io${event.thumbnail.src}`,
                            width: 900,
                            height: 800,
                            alt: event.title,
                        },
                    ],
                }}
            />
            <HeroSection
                thumbnail={event.thumbnail}
                title={event.title}
                start_date={event.start_date}
                start_time={event.start_time}
            />
            <Summary
                location={event.location}
                start_date={event.start_date}
                start_time={event.start_time}
                end_date={event.end_date}
                end_time={event.end_time}
                title={event.title}
                venue={event.venue}
                thumbnail={event.thumbnail}
                body={event.body}
            />
            <Speakers speakers={event.speakers} />
        </>
    );
};

SingleEvent.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const courses = getallEvents(["slug"]);
    return {
        paths: courses.map((course) => {
            return {
                params: {
                    slug: course.slug,
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
    const event = getEventeBySlug(params.slug, "all");

    return {
        props: {
            data: {
                event,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SingleEvent;
