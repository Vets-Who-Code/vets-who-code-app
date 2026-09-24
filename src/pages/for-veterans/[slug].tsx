import SEO from "@components/seo/page-seo";
import DecisionLandingContainer from "@containers/decision-landing";
import Layout from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllMediaPosts, getLandingPage, type LandingFrontmatter } from "@/lib/mdx-pages";

type TProps = {
    frontmatter: LandingFrontmatter;
    mdxSource: MDXRemoteSerializeResult;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const DecisionLandingPage: PageProps = ({ frontmatter, mdxSource }) => (
    <>
        {/* PageSeo appends the brand itself, so seoTitle carries only the query. */}
        <SEO
            title={frontmatter.seoTitle}
            description={frontmatter.description}
            jsonLdType="faq"
            faq={frontmatter.faq}
        />
        <DecisionLandingContainer frontmatter={frontmatter} mdxSource={mdxSource} />
    </>
);

DecisionLandingPage.Layout = Layout;

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = getAllMediaPosts<{ slug: string }>(["slug"], "mdx-pages/landing");
    return {
        paths: pages.map((page) => ({ params: { slug: page.slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const page = getLandingPage(String(params?.slug));
    if (!page) {
        return { notFound: true };
    }
    const mdxSource = await serialize(page.content);
    return {
        props: {
            frontmatter: page.frontmatter,
            mdxSource,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default DecisionLandingPage;
