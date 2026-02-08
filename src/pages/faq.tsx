import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import FaqArea from "@containers/faq/layout-03";
import QuoteArea from "@containers/quote/layout-02";
import Layout from "@layout/layout-01";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps, NextPage } from "next";
import { getPageData } from "../lib/page";

// Updated interface to satisfy Record<string, unknown>
interface PageContent extends Record<string, unknown> {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Faq: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="FAQ" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="FAQ"
                showTitle={false}
                className="tw-bg-gray-50"
            />
            <QuoteArea data={content?.["quote-area"]} />
            <FaqArea data={content?.["faq-area"]} />
        </>
    );
};

Faq.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "faq");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Faq;
