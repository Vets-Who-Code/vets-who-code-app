import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
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
                <div className="tw-prose md:tw-prose-lg tw-max-w-none prose-headings:tw-text-navy prose-a:tw-text-red prose-strong:tw-text-navy">
                    <MDXRemote {...mdxSource} />
                </div>
            </div>
        </>
    );
};

ProgramPage.Layout = Layout;

export const getStaticPaths: GetStaticPaths = async () => {
    // A program with its own page file (e.g. mentorship.tsx) shadows this route at
    // runtime, but getStaticPaths would still emit the same path and fail the
    // production build with a conflicting-ssg-paths error. Skip those slugs.
    const dedicated = new Set(
        fs
            .readdirSync(path.join(process.cwd(), "src/pages/programs"))
            .filter((file) => file.endsWith(".tsx") && !file.startsWith("["))
            .map((file) => file.replace(/\.tsx$/, ""))
    );
    const programs = getAllMediaPosts<{ slug: string }>(["slug"], "programs");
    const paths = programs
        .filter((program) => !dedicated.has(program.slug))
        .map((program) => ({
            params: { slug: program.slug },
        }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const filePath = path.join(process.cwd(), "src/data/programs", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return { notFound: true };
    }
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
