import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllMediaPosts } from "../../lib/mdx-pages";

interface ProgramPageProps {
    frontmatter: {
        title: string;
        description: string;
        slug: string;
    };
    mdxSource: MDXRemoteSerializeResult;
}

const ProgramPage: NextPage<ProgramPageProps> & { Layout: typeof Layout } = ({
    frontmatter,
    mdxSource,
}) => {
    return (
        <>
            <SEO
                title={`${frontmatter.title} | Vets Who Code`}
                description={frontmatter.description}
            />
            <div className="tw-container tw-py-10 md:tw-py-15">
                <h1 className="tw-mb-6 tw-text-3xl tw-font-bold md:tw-text-4xl">
                    {frontmatter.title}
                </h1>
                <div className="prose md:prose-lg max-w-none">
                    <MDXRemote {...mdxSource} />
                </div>
            </div>
        </>
    );
};

ProgramPage.Layout = Layout;

export const getStaticPaths: GetStaticPaths = async () => {
    const programs = getAllMediaPosts<{ slug: string }>(["slug"], "programs");
    const paths = programs.map((program) => ({
        params: { slug: program.slug },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const filePath = path.join(process.cwd(), "src/data/programs", `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content: mdxContent } = matter(fileContents);
    const mdxSource = await serialize(mdxContent, { scope: frontmatter });
    return {
        props: {
            frontmatter,
            mdxSource,
        },
    };
};

export default ProgramPage;
