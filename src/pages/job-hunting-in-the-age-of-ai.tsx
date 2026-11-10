import SEO from "@components/seo/page-seo";
import JobHuntingAiContainer from "@containers/job-hunting-ai";
import { SEO as PAGE_SEO } from "@data/job-hunting-ai";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type JobHuntingAiPageProps = NextPage & {
    Layout: typeof Layout;
};

const JobHuntingAiPage: JobHuntingAiPageProps = () => (
    <>
        <SEO title={PAGE_SEO.title} description={PAGE_SEO.description} />
        <JobHuntingAiContainer />
    </>
);

JobHuntingAiPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => ({
    props: {
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default JobHuntingAiPage;
