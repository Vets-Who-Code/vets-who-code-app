import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import { VWCGridCard } from "@components/vwc-card";
import { VWCGrid } from "@components/vwc-grid";
import { useSort } from "@hooks";
import Layout01 from "@layout/layout-01";
import Anchor from "@ui/anchor";
import { courseSorting } from "@utils/methods";
import { ICourse } from "@utils/types";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getallCourses } from "../../lib/course";

type TProps = {
    data: {
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const Coursegrid01: PageProps = ({ data }) => {
    const { sortedItems } = useSort<ICourse>(data.courses, courseSorting);
    return (
        <>
            <SEO title="Subjects" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Subjects" />

            {/* Learning Platform CTA */}
            <div className="tw-container tw-py-16">
                <div className="tw-mb-16 tw-rounded-lg tw-bg-gradient-to-r tw-from-secondary tw-to-secondary-dark tw-p-8 tw-text-center tw-text-white">
                    <h2 className="tw-mb-4 tw-text-3xl tw-font-bold">Ready to Start Learning?</h2>
                    <p className="tw-mb-6 tw-text-xl tw-opacity-90">
                        Explore our subjects below, then join our interactive learning platform for
                        hands-on experience, progress tracking, and personalized mentorship.
                    </p>
                    <div className="tw-flex tw-flex-col tw-justify-center tw-gap-4 sm:tw-flex-row">
                        <Link
                            href="/courses"
                            className="tw-rounded-md tw-bg-accent tw-px-8 tw-py-3 tw-font-semibold tw-text-secondary tw-transition-colors hover:tw-bg-accent-dark"
                        >
                            <i className="fas fa-graduation-cap tw-mr-2" />
                            View Learning Platform
                        </Link>
                        <Link
                            href="/dashboard"
                            className="tw-rounded-md tw-border-2 tw-border-white tw-bg-transparent tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-white hover:tw-text-secondary"
                        >
                            <i className="fas fa-tachometer-alt tw-mr-2" />
                            My Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <VWCGrid title="Course Section">
                {sortedItems?.map((course) => (
                    <Anchor key={course.slug} path={course.path}>
                        <VWCGridCard title={course.title} thumbnail={course.thumbnail} />
                    </Anchor>
                ))}
            </VWCGrid>
        </>
    );
};

Coursegrid01.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const courses = getallCourses(["slug", "title", "thumbnail"]);
    return {
        props: {
            data: {
                courses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Coursegrid01;
