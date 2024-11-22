import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-04";
import Breadcrumb from "@components/breadcrumb";
import CtaArea from "@containers/cta/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import HeroImageArea from "@containers/hero-image";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

// Update the interface to include an index signature
interface PageContent {
    section: string;
    [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

interface PageData {
    page: {
        content: PageContent[];
    };
}

type TProps = {
    data: PageData;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const JoinCommunity: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="Join Our Community" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="join our community"
                showTitle={false}
            />
            <Wrapper>
                <CtaArea data={content["cta-area"]} space="none" />
                <FunfactArea data={content["funfact-area"]} />
                <HeroImageArea data={content["hero-image-area"]} />
            </Wrapper>
        </>
    );
};

JoinCommunity.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "join-our-community");

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

export default JoinCommunity;
