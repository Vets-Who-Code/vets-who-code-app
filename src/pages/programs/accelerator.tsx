import SEO from "@components/seo/page-seo";
import AcceleratorContainer from "@containers/accelerator";
import Layout from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";

type AcceleratorPageProps = NextPage & {
    Layout: typeof Layout;
};

const AcceleratorPage: AcceleratorPageProps = () => {
    return (
        <>
            <SEO
                title="Software Engineering Accelerator"
                description="Seventeen weeks, remote-first, free. A software engineering accelerator for U.S. veterans, service members and spouses. The learning platform teaches what doesn't change so the human hours go to pairing and building."
            />
            <AcceleratorContainer />
        </>
    );
};

AcceleratorPage.Layout = Layout;

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

export default AcceleratorPage;
