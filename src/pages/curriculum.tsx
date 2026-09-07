import SEO from "@components/seo/page-seo";
import CurriculumGraphContainer from "@containers/curriculum-graph";
import Layout from "@layout/layout-01";
import { MANIFEST } from "@lib/curriculum-graph";
import type { GetStaticProps, NextPage } from "next";

type CurriculumGraphPageProps = NextPage & {
    Layout: typeof Layout;
};

// Derived, not typed. A search preview that contradicts the page's own manifest would
// undercut the exact claim the page is making.
const DESCRIPTION =
    `We didn't write a syllabus. We drew a map. ${MANIFEST.counts.topics} micro-topics, ` +
    `${MANIFEST.counts.edges} prerequisite links, ` +
    `${MANIFEST.acyclic ? "zero cycles" : "unvalidated"} — the ${MANIFEST.name} ` +
    `${MANIFEST.version} behind the Vets Who Code accelerator.`;

const CurriculumGraphPage: CurriculumGraphPageProps = () => {
    return (
        <>
            <SEO title="Curriculum — The Hashflag Method" description={DESCRIPTION} />
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
