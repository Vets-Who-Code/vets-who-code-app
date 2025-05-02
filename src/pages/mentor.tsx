import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-04";
import Breadcrumb from "@components/breadcrumb";
import CtaArea from "@containers/cta/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import HeroImageArea from "@containers/hero-image";
import MentorForm from "@components/forms/mentor-form";
import LoremText from "@components/common/lorem-text";
import GradationArea from "@containers/gradation";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
    [key: string]: unknown; // Add index signature
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

const MentorPage: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="Become A Mentor" />
            <Breadcrumb
                pages={[{ path: "/", label: "Home" }]}
                currentPage="Become A Mentor"
                showTitle={false}
            />
            <Wrapper>
                <CtaArea data={content["cta-area"]} space="none" />
                <FunfactArea data={content["funfact-area"]} />
                <HeroImageArea data={content["hero-image-area"]} />
            </Wrapper>
            <div className="container my-8">
                <LoremText paragraphs={2} />
            </div>
            <GradationArea data={content["gradation-area"]} />
            <MentorForm />
        </>
    );
};

MentorPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "become-a-mentor");

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

export default MentorPage;
