import { NextPage, GetStaticProps } from "next";
import Layout from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import ProgramCard from "@components/program-card";
import HeroArea from "@containers/hero/layout-07";

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

const heroData = {
    items: [
        {
            id: 1,
            images: [
                {
                    src: "https://res.cloudinary.com/vetswhocode/image/upload/v1746590043/9_ahefah.png",
                },
            ],
            headings: [
                { id: 1, content: "Our Programs" },
                { id: 2, content: "What we do to be the tech arm of veteran support" },
            ],
            texts: [],
        },
    ],
};

const ProgramsPage: PageWithLayout = ({ allPrograms, page }) => {
    return (
        <>
            <SEO title={`${page.title} | Vets Who Code`} />
            <HeroArea data={heroData} />
            <main className="tw:container tw:mx-auto tw:max-w-6xl tw:px-4">
                <div className="tw:mx-auto tw:mb-12 tw:mt-16 tw:max-w-4xl">
                    <p className="tw:text-center tw:text-lg tw:text-gray-700">
                        Our programs are designed to empower veterans with real-world skills,
                        mentorship, and a supportive community—helping you transition, grow, and
                        lead in tech.
                    </p>
                </div>
                {/* Program Cards Grid - project card style */}
                <section className="tw:mb-16">
                    <div className="tw:grid tw:gap-8 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
                        {allPrograms.map((program) => (
                            <ProgramCard key={program.slug} program={program} />
                        ))}
                    </div>
                </section>
                <hr className="tw:my-12 tw:border-t tw:border-gray-200" />
            </main>
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
                title: "Our Programs",
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
