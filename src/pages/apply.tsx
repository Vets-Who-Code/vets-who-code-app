import SEO from "@components/seo/page-seo";
import ApplyContainer from "@containers/apply";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type ApplyPageProps = NextPage & {
    Layout: typeof Layout;
};

const ApplyPage: ApplyPageProps = () => {
    return (
        <>
            <SEO
                title="Apply"
                description="Apply for the next Vets Who Code cohort. Six steps, save and resume anytime. We train veterans and military spouses to ship production code."
            />
            <ApplyContainer />
        </>
    );
};

ApplyPage.Layout = Layout;

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

export default ApplyPage;
