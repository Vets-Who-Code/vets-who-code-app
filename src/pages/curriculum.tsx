import SEO from "@components/seo/page-seo";
import CurriculumGraphContainer from "@containers/curriculum-graph";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type CurriculumGraphPageProps = NextPage & {
    Layout: typeof Layout;
};

const CurriculumGraphPage: CurriculumGraphPageProps = () => {
    return (
        <>
            <SEO
                title="Curriculum — The Hashflag Method"
                description="We don't write a syllabus. We compute a path. 304 micro-topics, 442 prerequisite edges, zero cycles — explore the Hashflag Graph that orders the Vets Who Code accelerator by dependency."
            />
            <CurriculumGraphContainer />
        </>
    );
};

CurriculumGraphPage.Layout = Layout;

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

export default CurriculumGraphPage;
