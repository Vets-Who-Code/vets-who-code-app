import SEO from "@components/seo/page-seo";
import CurriculumGraphContainer from "@containers/curriculum-graph";
import Layout from "@layout/layout-01";
import { MANIFEST, type Topic } from "@lib/curriculum-graph";
import { TOPICS } from "@lib/curriculum-graph-data";
import type { GetStaticProps, NextPage } from "next";

type TProps = {
    sample: Topic;
};

type CurriculumGraphPageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

// Derived, not typed. A search preview that contradicts the page's own manifest would
// undercut the exact claim the page is making.
const DESCRIPTION =
    `We didn't write a syllabus. We drew a map. ${MANIFEST.counts.topics} micro-topics, ` +
    `${MANIFEST.counts.edges} prerequisite links, ` +
    `${MANIFEST.acyclic ? "zero cycles" : "unvalidated"} — the ${MANIFEST.name} ` +
    `${MANIFEST.version} behind the Vets Who Code accelerator.`;

const CurriculumGraphPage: CurriculumGraphPageProps = ({ sample }) => {
    return (
        <>
            <SEO title="Curriculum — The Hashflag Method" description={DESCRIPTION} />
            <CurriculumGraphContainer sample={sample} />
        </>
    );
};

CurriculumGraphPage.Layout = Layout;

export const getStaticProps: GetStaticProps<TProps> = () => {
    return {
        props: {
            // A real record, read straight out of the dataset — the section's claim is that
            // every node is specified to this level, so it must not be a hand-written mock.
            sample: TOPICS.find((t) => t.id === "ret-faithful") ?? TOPICS[0],
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default CurriculumGraphPage;
