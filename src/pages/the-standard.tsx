import SEO from "@components/seo/page-seo";
import TheStandardContainer from "@containers/the-standard";
import { SEO_TITLE } from "@data/the-standard";
import Layout from "@layout/layout-01";
import { buildStandardPage, type StandardPage } from "@lib/the-standard";
import type { GetStaticProps, NextPage } from "next";

type Props = { page: StandardPage };

type TheStandardPageProps = NextPage<Props> & {
    Layout: typeof Layout;
};

const TheStandardPage: TheStandardPageProps = ({ page }) => (
    <>
        <SEO title={SEO_TITLE} description={page.description} />
        <TheStandardContainer page={page} />
    </>
);

TheStandardPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => ({
    props: {
        page: buildStandardPage(),
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default TheStandardPage;
