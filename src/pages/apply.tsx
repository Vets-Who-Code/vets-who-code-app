import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-04";
import Breadcrumb from "@components/breadcrumb";
import CtaArea from "@containers/cta/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import PreworkButton from "@containers/prework-button";
import HeroImageArea from "@containers/hero-image";
// import GradationArea from "@containers/gradation";
import ApplyForm from "@components/forms/apply-form";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

interface PageContent {
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

const ApplyPage: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="Apply" />
            <Breadcrumb
                pages={[{ path: "/", label: "Home" }]}
                currentPage="Apply"
                showTitle={false}
            />
            <Wrapper>
                <CtaArea data={content["cta-area"]} space="none" />
                <PreworkButton />
                <FunfactArea data={content["funfact-area"]} />
                <HeroImageArea data={content["hero-image-area"]} />
            </Wrapper>
            <ApplyForm />
            {/* <GradationArea data={content["gradation-area"]} /> */}
        </>
    );
};

ApplyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "apply-to-be-a-student");

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

export default ApplyPage;
