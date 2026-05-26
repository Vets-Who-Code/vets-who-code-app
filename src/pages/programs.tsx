import ProgramCard from "@components/program-card";
import SEO from "@components/seo/page-seo";
import { MonoMeta, SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import HeroArea from "@containers/hero/layout-07";
import Layout from "@layout/layout-01";
import { GetStaticProps, NextPage } from "next";

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
            <main>
                {/* Programs index header — SF/CG aesthetic */}
                <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                    <div className="tw-container">
                        <div className="tw-flex tw-flex-col tw-gap-6 md:tw-flex-row md:tw-items-end md:tw-justify-between">
                            <div className="tw-flex tw-flex-col tw-gap-4">
                                <SectionEyebrow
                                    label="Programs Index"
                                    subLabel={`${allPrograms.length} Active`}
                                />
                                <SharpHeadline as="h2" size="h2" tone="navy">
                                    What we run.
                                    <br />
                                    <span className="tw-text-red">How troops engage.</span>
                                </SharpHeadline>
                            </div>
                            <MonoMeta tone="muted" size="sm" className="md:tw-text-right">
                                Sourced · VWC · Validated · Cohort Outcomes
                            </MonoMeta>
                        </div>

                        <p className="tw-mt-10 tw-max-w-[720px] tw-font-body tw-text-charcoal tw-leading-[1.5] [font-size:clamp(18px,1.4vw,22px)]">
                            Every program is mapped to verified labor-market demand. Pick the
                            engagement that fits your stage: pre-troop assessment, full 17-week
                            Hashflag Stack, or a Forward Deployed engagement through the Software
                            Factory.
                        </p>

                        <div className="tw-mt-14 tw-grid tw-gap-8 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
                            {allPrograms.map((program) => (
                                <ProgramCard key={program.slug} program={program} />
                            ))}
                        </div>
                    </div>
                </section>
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
