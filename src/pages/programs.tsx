import { GetStaticProps, NextPage } from "next";
import Layout from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import { getAllMediaPosts } from "../lib/mdx-pages";
import Hero from "@components/hero";
import ProgramCard from "@components/program-card";
import CTA from "@components/cta";

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
            <Hero />
            <main className="tw-container tw-py-10 md:tw-py-15">
                <div className="tw-grid tw-gap-8 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {allPrograms.map((program) => (
                        <ProgramCard key={program.slug} program={program} />
                    ))}
                </div>
            </main>
            <div className="tw-container tw-py-10 md:tw-py-15">
                <CTA />
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
                title: "Our Program", // Updated page title
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
