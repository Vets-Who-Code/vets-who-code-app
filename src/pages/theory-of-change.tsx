import SEO from "@components/seo/page-seo";
import CommitSection from "@containers/theory-of-change/commit-section";
import CoreBelief from "@containers/theory-of-change/core-belief";
import Hero from "@containers/theory-of-change/hero";
import MergeBanner from "@containers/theory-of-change/merge-banner";
import { PHASES } from "@containers/theory-of-change/phases-data";
import Pipeline from "@containers/theory-of-change/pipeline";
import Vision from "@containers/theory-of-change/vision";
import Layout from "@layout/layout-01";

type PageWithLayout = {
    (): JSX.Element;
    Layout: typeof Layout;
};

const TheoryOfChange: PageWithLayout = () => {
    return (
        <>
            <SEO title="Theory of Change | Vets Who Code" />
            <Hero />
            <CoreBelief />
            <Pipeline />
            <CommitSection phase={PHASES[0]} />
            <CommitSection phase={PHASES[1]} />
            <MergeBanner />
            <CommitSection phase={PHASES[2]} />
            <CommitSection phase={PHASES[3]} />
            <CommitSection phase={PHASES[4]} />
            <Vision />
        </>
    );
};

TheoryOfChange.Layout = Layout;

export const getStaticProps = () => {
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

export default TheoryOfChange;
