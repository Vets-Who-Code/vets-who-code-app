import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type PageProps = {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const Dashboard: PageWithLayout = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-300">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-ink">
                        Access Denied
                    </h1>
                    <p className="tw-mb-8 tw-text-gray-300">
                        Please sign in to access your dashboard.
                    </p>
                    <Link
                        href="/login"
                        className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Dashboard" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Dashboard"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Welcome Section */}
                <div className="tw-mb-12">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-ink">
                        Welcome back, {session.user?.name || "Veteran"}!
                    </h1>
                    <p className="tw-text-xl tw-text-gray-300">
                        Continue your journey to a successful tech career
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="tw-mb-12 tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-4">
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-navy-royal">1</div>
                        <div className="tw-text-gray-300">Courses Enrolled</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gold">0</div>
                        <div className="tw-text-gray-300">Courses Completed</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-navy">
                            12
                        </div>
                        <div className="tw-text-gray-300">Hours Studied</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-red">
                            85%
                        </div>
                        <div className="tw-text-gray-300">Average Progress</div>
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                    {/* Current Courses */}
                    <div className="lg:tw-col-span-2">
                        <h2 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-ink">
                            Your Current Courses
                        </h2>

                        <div className="tw-space-y-6">
                            {/* Sample enrolled course */}
                            <div className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md">
                                <div className="tw-p-6">
                                    <div className="tw-mb-4 tw-flex tw-items-start tw-justify-between">
                                        <div className="tw-flex tw-items-center tw-space-x-4">
                                            <div className="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-lg tw-bg-gradient-to-r tw-from-blue-500 tw-to-blue-600">
                                                <i className="fab fa-html5 tw-text-2xl tw-text-white" />
                                            </div>
                                            <div>
                                                <h3 className="tw-text-xl tw-font-semibold tw-text-ink">
                                                    Web Development
                                                </h3>
                                                <p className="tw-text-gray-300">
                                                    Build modern web applications
                                                </p>
                                            </div>
                                        </div>
                                        <span className="tw-rounded-full tw-bg-gold-light/30 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-gold-deep">
                                            Active
                                        </span>
                                    </div>

                                    <div className="tw-mb-4">
                                        <div className="tw-mb-2 tw-flex tw-justify-between tw-text-sm tw-text-gray-300">
                                            <span>Progress</span>
                                            <span>15%</span>
                                        </div>
                                        <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-50">
                                            <div className="tw-h-2 tw-w-[15%] tw-rounded-full tw-bg-navy-royal" />
                                        </div>
                                    </div>

                                    <div className="tw-flex tw-items-center tw-justify-between">
                                        <div className="tw-text-sm tw-text-gray-300">
                                            Next: CSS Styling & Layout
                                        </div>
                                        <Link
                                            href="/courses/web-development"
                                            className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-transition-colors"
                                        >
                                            Continue Learning
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Empty state for additional courses */}
                            <div className="tw-rounded-lg tw-border-2 tw-border-dashed tw-border-gray-300 tw-bg-gray-50 tw-p-8 tw-text-center">
                                <i className="fas fa-plus-circle tw-mb-4 tw-text-4xl tw-text-gray-400" />
                                <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-ink">
                                    Enroll in More Courses
                                </h3>
                                <p className="tw-mb-4 tw-text-gray-300">
                                    Expand your skills with additional courses
                                </p>
                                <Link
                                    href="/courses"
                                    className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Upcoming Assignments */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
                                Upcoming Assignments
                            </h3>
                            <div className="tw-space-y-4">
                                <div className="tw-border-l-4 tw-border-red-signal/100 tw-pl-4">
                                    <div className="tw-font-medium tw-text-ink">
                                        HTML Portfolio Project
                                    </div>
                                    <div className="tw-text-sm tw-text-gray-300">Due in 3 days</div>
                                </div>
                                <div className="tw-border-l-4 tw-border-navy-ocean tw-pl-4">
                                    <div className="tw-font-medium tw-text-ink">
                                        CSS Layout Exercise
                                    </div>
                                    <div className="tw-text-sm tw-text-gray-300">Due in 1 week</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
                                Recent Activity
                            </h3>
                            <div className="tw-space-y-3">
                                <div className="tw-text-sm">
                                    <div className="tw-font-medium tw-text-ink">
                                        Completed: HTML Fundamentals
                                    </div>
                                    <div className="tw-text-gray-300">2 days ago</div>
                                </div>
                                <div className="tw-text-sm">
                                    <div className="tw-font-medium tw-text-ink">
                                        Started: CSS Styling & Layout
                                    </div>
                                    <div className="tw-text-gray-300">3 days ago</div>
                                </div>
                                <div className="tw-text-sm">
                                    <div className="tw-font-medium tw-text-ink">
                                        Enrolled in Web Development
                                    </div>
                                    <div className="tw-text-gray-300">1 week ago</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
                                Quick Links
                            </h3>
                            <div className="tw-space-y-2">
                                <Link
                                    href="/jobs"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-briefcase tw-mr-2" />
                                    Browse Jobs
                                </Link>
                                <Link
                                    href="/profile"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-user tw-mr-2" />
                                    Edit Profile
                                </Link>
                                <Link
                                    href="/courses"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-book tw-mr-2" />
                                    Browse Courses
                                </Link>
                                <Link
                                    href="/assignments"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-tasks tw-mr-2" />
                                    View Assignments
                                </Link>
                                <Link
                                    href="/submissions"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-file-alt tw-mr-2" />
                                    My Submissions
                                </Link>
                                <Link
                                    href="/support"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-question-circle tw-mr-2" />
                                    Get Help
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.Layout = Layout01;

export const getStaticProps: GetStaticProps<PageProps> = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Dashboard;
