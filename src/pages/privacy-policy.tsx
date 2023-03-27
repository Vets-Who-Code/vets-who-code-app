import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import PageSidebar from "@containers/page-sidebar";
import MarkdownRenderer from "@components/markdown-renderer";

import { ICourse } from "@utils/types";

import { getallCourses } from "../lib/course";
import { getPageBySlug } from "../lib/mdx-pages";

type TProps = {
    data: {
        page: string;
        recentCourses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const PrivacyPolicy: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Privacy Policy" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Privacy Policy"
            />
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-grid-cols-3 tw-gap-7.5 lg:tw-gap-15">
                <div className="tw-col-span-full tw-order-2 lg:tw-order-1 lg:tw-col-[1/1]">
                    <PageSidebar recentCourses={data.recentCourses} />
                </div>
                <div className="tw-col-span-full tw-order-1 lg:tw-order-2 lg:tw-col-[2/-1]">
                    <MarkdownRenderer content={data.page} />
                </div>
            </div>
        </>
    );
};

PrivacyPolicy.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageBySlug("privacy-policy");
    const recentCourses = getallCourses(
        ["title", "thumbnail", "price", "currency"],
        0,
        4
    );

    return {
        props: {
            data: {
                page,
                recentCourses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default PrivacyPolicy;
