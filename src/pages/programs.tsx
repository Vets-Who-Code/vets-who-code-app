import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import { getAllMediaPosts } from "../lib/mdx-pages";

type Program = {
    slug: string;
    title: string;
    description: string;
};

type TProps = {
    allPrograms: Program[];
    page: {
        title: string;
    };
};

type PageWithLayout = NextPage<TProps> & {
    Layout: typeof Layout;
};

const ProgramsPage: PageWithLayout = ({ allPrograms, page }) => {
    return (
        <>
            <SEO title={`${page.title} | Vets Who Code`} />
            <div className="tw-container tw-py-10 md:tw-py-15">
                <h1 className="tw-mb-10 tw-text-center tw-text-3xl md:tw-text-4xl">{page.title}</h1>
                <div className="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-2">
                    {allPrograms.map((program) => (
                        <div
                            key={program.slug}
                            className="tw-hover:tw-scale-105 tw-flex tw-h-full tw-transform tw-flex-col tw-justify-between tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-p-8 tw-shadow-md tw-transition"
                        >
                            <h2 className="tw-mb-2 tw-text-2xl tw-font-semibold">
                                {program.title}
                            </h2>
                            <p className="tw-mb-4 tw-text-gray-700">{program.description}</p>
                            <Link
                                href={`/programs/${program.slug}`}
                                className="tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-400 tw-mt-auto tw-inline-block tw-font-medium tw-text-blue-700 tw-underline"
                                aria-label={`Learn more about ${program.title}`}
                            >
                                Learn more
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

ProgramsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const allPrograms = getAllMediaPosts<Program>(["slug", "title", "description"], "programs");
    return {
        props: {
            allPrograms,
            page: {
                title: "Programs",
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ProgramsPage;
