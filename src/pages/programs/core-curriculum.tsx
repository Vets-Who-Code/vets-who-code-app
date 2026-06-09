import SEO from "@components/seo/page-seo";
import CurriculumContainer from "@containers/curriculum";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type CurriculumPageProps = NextPage & {
    Layout: typeof Layout;
};

const CurriculumPage: CurriculumPageProps = () => {
    return (
        <>
            <SEO
                title="Core Curriculum"
                description="The Hashflag Stack: 17 weeks, 25 modules, 128 market-validated skills. From terminal mastery to production AI engineering — built for veterans with real lives."
            />
            <CurriculumContainer />
        </>
    );
};

CurriculumPage.Layout = Layout;

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

export default CurriculumPage;
