import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MarkdownRenderer from "@components/markdown-renderer";
import { getPageBySlug } from "../lib/mdx-pages";

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const CodeOfConduct: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Code Of Conduct" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Code Of Conduct"
            />
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] w-full tw-gap-7.5 lg:tw-gap-15">
                <div className="tw-col-span-full tw-order-1 lg:tw-order-2 lg:tw-col-[2/-1]">
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
