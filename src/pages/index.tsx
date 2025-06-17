import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-03";
import Wrapper from "@ui/wrapper/wrapper-02";
import HeroArea from "@containers/hero/layout-04";
import ServiceArea from "@containers/service/layout-03";
import FunfactArea from "@containers/funfact/layout-04";
import VideoArea from "@containers/video/layout-04";
import CourseArea from "@containers/course/layout-05";
import TestimonialArea from "@containers/testimonial/layout-04";
import EventArea from "@containers/event/layout-02";
import BlogArea from "@containers/blog/layout-03";
import BrandArea from "@containers/brand/layout-01";
import NewsletterArea from "@containers/newsletter/layout-02";
import { EngagementModal } from "@components/ui/engagement-modal/EngagementModal";

import { normalizedData } from "@utils/methods";
import { IBlog, ICourse, IEvent } from "@utils/types";

import { getPageData } from "../lib/page";
import { getAllBlogs } from "../lib/blog";
import { getallCourses } from "../lib/course";
import { getallEvents } from "../lib/event";

interface PageContent {
    section: string;
    [key: string]: unknown;
}

interface PageData {
    page: {
        content: PageContent[];
    };
    courses: ICourse[];
    events: IEvent[];
    blogs: IBlog[];
}

type TProps = {
    data: PageData;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Home" />
            <HeroArea data={content?.["hero-area"]} />
            <Wrapper className="tw-mb-[140px]">
                <ServiceArea data={content?.["service-area"]} space="none" />
                <FunfactArea data={content?.["funfact-area"]} titleSize="large" />
                <VideoArea data={content?.["video-area"]} space="top" />
            </Wrapper>
            <CourseArea
                data={{ ...content?.["course-area"], courses: data.courses }}
                titleSize="large"
            />
            <TestimonialArea data={content?.["testimonial-area"]} titleSize="large" />
            <EventArea
                data={{ ...content?.["event-area"], events: data.events }}
                titleSize="large"
            />
            <BlogArea data={{ ...content?.["blog-area"], blogs: data.blogs }} titleSize="large" />
            <BrandArea data={content?.["brand-area"]} />
            <NewsletterArea data={content?.["newsletter-area"]} />
            {/* For production, remove forceShow prop entirely */}
            <EngagementModal
                headline="Your Next Mission Starts Here."
                body="Support Vets Who Code — help veterans code, launch tech careers, and change their lives."
                cta1={{ label: "Donate Now", href: "/donate" }}
                cta2={{ label: "Join the Mission", href: "#newsletter" }}
            />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("home", "index");
    const courses = getallCourses(["title", "thumbnail"], 0, 6);
    const events = getallEvents(["title", "thumbnail", "start_date", "location"], 0, 6);
    const { blogs } = getAllBlogs(["title", "image", "category", "postedAt"], 0, 3);
    return {
        props: {
            data: {
                page,
                courses,
                events,
                blogs,
            },
            layout: {
                footerMode: "light",
            },
        },
    };
};

export default Home;
