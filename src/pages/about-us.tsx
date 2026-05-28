import SEO from "@components/seo/page-seo";
import Alumni from "@containers/about/alumni";
import Hero from "@containers/about/hero";
import JoinCta from "@containers/about/join-cta";
import Pillars from "@containers/about/pillars";
import Quote from "@containers/about/quote";
import Stats from "@containers/about/stats";
import Story from "@containers/about/story";
import Theory from "@containers/about/theory";
import Layout from "@layout/layout-01";

type PageWithLayout = {
    (): JSX.Element;
    Layout: typeof Layout;
};

const AboutUs: PageWithLayout = () => {
    return (
        <>
            <SEO title="About Us | Vets Who Code" />
            <Hero />
            <Pillars />
            <Stats />
            <Story />
            <Quote />
            <Alumni />
            <Theory />
            <JoinCta />
        </>
    );
};

AboutUs.Layout = Layout;

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

export default AboutUs;
