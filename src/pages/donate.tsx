import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import DonateFormArea from "@containers/donate-form/layout-01";
import ThankYouBlock from "@components/common/thank-you-block";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
    [key: string]: unknown;
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

const Donate: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    const message =
        "With your support, we help veterans find meaningful employment in technology while building a stronger tech community.";

    return (
        <>
            <SEO title="Donate" description="Support veterans transitioning into tech" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Donate"
                showTitle={false}
            />
            <DonateFormArea data={content?.["donorbox-area"]} space="none" />
            <ThankYouBlock message={message} />
        </>
    );
};

Donate.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "donate");
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

export default Donate;
