import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import VideoArea from "@containers/video/layout-05";
import QuoteArea from "@containers/quote/layout-02";
import FaqArea from "@containers/faq/layout-03";
import RelatedCourseArea from "@containers/course/layout-02";
import GalleryArea from "@containers/gallery";

import { normalizedData } from "@utils/methods";
import { ICourse } from "@utils/types";
import { getPageData } from "../lib/page";
import { getallCourses } from "../lib/course";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const SuccessStory: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="Success Story" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Success Story"
                showTitle={false}
                className="tw-bg-gray-200"
            />
            <VideoArea data={content?.["video-area"]} />
            <QuoteArea data={content?.["quote-area"]} />
            <FaqArea data={content?.["faq-area"]} />
            <RelatedCourseArea
                data={{
                    ...content?.["course-area"],
                    courses: data.courses,
                }}
            />
            <GalleryArea data={content?.["gallery-area"]} />
        </>
    );
};

SuccessStory.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "success-story");
    const courses = getallCourses(
        [
            "title",
            "thumbnail",
            "price",
            "currency",
            "total_lectures",
            "total_students",
        ],
        0,
        4
    );
    return {
        props: {
            data: {
                page,
                courses,
            },
            layout: {
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SuccessStory;
