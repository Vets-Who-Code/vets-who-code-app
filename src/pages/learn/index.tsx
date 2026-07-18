import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import { ArrowRight } from "lucide-react";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getLessonsGroupedByModule, type LessonModuleGroup } from "@/lib/interactive-lessons";

type PageProps = {
    groups: LessonModuleGroup[];
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const LearnIndexPage: PageWithLayout = ({ groups }) => (
    <>
        <SEO
            title="Learn to Code — Interactive Lessons | Vets Who Code"
            description="Write code by hand, run it live in the browser, and pass the tests. Interactive lessons from the Hashflag Stack curriculum."
        />
        <div className="tw-bg-navy-deep tw-py-16 tw-text-cream">
            <div className="tw-container">
                <p className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-widest tw-text-gold">
                    The Hashflag Stack
                </p>
                <h1 className="tw-m-0 tw-font-heading tw-text-4xl md:tw-text-5xl">
                    Learn by Building
                </h1>
                <p className="tw-mt-4 tw-max-w-2xl tw-text-lg tw-text-gray-300">
                    No videos to watch passively. Write every line by hand, run it live, and prove
                    it with tests — the way real engineers work.
                </p>
            </div>
        </div>

        <div className="tw-container tw-py-14">
            {groups.map((group) => (
                <section key={group.module} className="tw-mb-12">
                    <h2 className="tw-mb-6 tw-font-heading tw-text-2xl tw-text-navy-deep">
                        Module {group.module} · {group.moduleTitle}
                    </h2>
                    <ul className="tw-grid tw-list-none tw-gap-4 tw-p-0 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                        {group.lessons.map((lesson) => (
                            <li key={lesson.slug}>
                                <Link
                                    href={`/learn/${lesson.slug}`}
                                    className="tw-group tw-flex tw-h-full tw-flex-col tw-justify-between tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-transition hover:tw-border-navy-deep hover:tw-shadow-lg"
                                >
                                    <span className="tw-font-heading tw-text-lg tw-text-navy-deep">
                                        {lesson.title}
                                    </span>
                                    <span className="tw-mt-4 tw-inline-flex tw-items-center tw-gap-1 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wide tw-text-red group-hover:tw-gap-2">
                                        Start{" "}
                                        <ArrowRight className="tw-h-4 tw-w-4" aria-hidden="true" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    </>
);

LearnIndexPage.Layout = Layout01;

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
    props: {
        groups: getLessonsGroupedByModule(),
        layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
    },
});

export default LearnIndexPage;
