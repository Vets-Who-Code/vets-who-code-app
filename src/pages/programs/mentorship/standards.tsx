import SEO from "@components/seo/page-seo";
import MentorStandardsArea from "@containers/mentor-standards";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const MentorStandardsPage: PageWithLayout = () => (
    <>
        <SEO
            title="Mentor Standards and Development Guide | Vets Who Code"
            description="What good mentoring looks like at each growth stage, and what VWC provides when a mentor is struggling. Coaching, not grading."
        />
        <MentorStandardsArea />
    </>
);

MentorStandardsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MentorStandardsPage;
