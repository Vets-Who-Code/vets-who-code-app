import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MarkdownRenderer from "@components/markdown-renderer";
import { getPageBySlug } from "../lib/mdx-pages";

type TProps = {
    data: {
        page: string;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const CodeOfConduct: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Code Of Conduct" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Code Of Conduct" />
            <div className="tw:container tw:gap-7.5 tw:pb-15 tw:md:pb-20 tw:lg:gap-15 tw:lg:pb-[100px] w-full">
                <div className="tw:order-1 tw:col-span-full tw:lg:order-2 tw:lg:col-[2/-1]">
                    <MarkdownRenderer content={data.page} />
                </div>
            </div>
        </>
    );
};

CodeOfConduct.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageBySlug("code-of-conduct");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default CodeOfConduct;
