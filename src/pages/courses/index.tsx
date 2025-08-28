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

const CoursesIndex: PageWithLayout = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <>
                <SEO title="Courses - Sign In Required" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Courses"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <div className="tw-mb-8">
                            <i className="fas fa-lock tw-mb-4 tw-text-6xl tw-text-gray-400" />
                            <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                                Learning Platform Access
                            </h1>
                            <p className="tw-mx-auto tw-max-w-2xl tw-text-xl tw-text-gray-600">
                                Our interactive learning platform with courses, progress tracking,
                                and mentorship is exclusively available to signed-in veterans and
                                military spouses.
                            </p>
                        </div>

                        <div className="tw-to-primary-dark tw-mb-8 tw-rounded-lg tw-bg-gradient-to-r tw-from-primary tw-p-8 tw-text-white">
                            <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">
                                What You&apos;ll Get Access To:
                            </h2>
                            <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                                <div className="tw-text-center">
                                    <i className="fas fa-graduation-cap tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Interactive Courses</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Hands-on learning with real projects
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-chart-line tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Progress Tracking</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Monitor your learning journey
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-users tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">1:1 Mentorship</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Personalized guidance from experts
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-certificate tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Certificates</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Industry-recognized completion certificates
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-briefcase tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Career Support</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Job placement assistance
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-clock tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Lifetime Access</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Learn at your own pace, forever
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tw-space-y-4">
                            <Link
                                href="/login"
                                className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                            >
                                <i className="fas fa-sign-in-alt tw-mr-2" />
                                Sign In to Access Courses
                            </Link>
                            <div className="tw-text-gray-600">
                                <p>Want to explore course topics first?</p>
                                <Link
                                    href="/subjects/all"
                                    className="hover:tw-text-primary-dark tw-text-primary tw-transition-colors"
                                >
                                    Browse our subjects page →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Courses" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Courses"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Admin Access Button (only for jeromehardaway) */}
                {session?.user?.email === "jeromehardaway@users.noreply.github.com" && (
                    <div className="tw-mb-6 tw-flex tw-justify-end">
                        <Link
                            href="/admin"
                            className="tw-rounded-md tw-bg-red-100 tw-px-4 tw-py-2 tw-text-red-700 tw-transition-colors hover:tw-bg-red-200"
                            title="Switch to Admin Mode"
                        >
                            <i className="fas fa-crown tw-mr-2" />
                            Admin Dashboard
                        </Link>
                    </div>
                )}

                <div className="tw-mb-12 tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Learning Tracks
                    </h1>
                    <p className="tw-mx-auto tw-max-w-3xl tw-text-xl tw-text-gray-600">
                        Master the skills you need for a successful career in tech. Our
                        comprehensive courses are designed specifically for veterans and military
                        spouses.
                    </p>
                </div>

                {/* Course Categories */}
                <div className="tw-mb-16 tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {/* Web Development Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-blue-600 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fab fa-html5 tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    Web Development
                                </h3>
                            </div>
                            <p className="tw-text-blue-100">
                                Learn HTML, CSS, JavaScript, React, and Node.js to build modern web
                                applications.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>12-16 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-green-800">
                                    Beginner
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        HTML
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        CSS
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        JavaScript
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        React
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/web-development"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* DevOps Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-green-500 tw-to-green-600 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-server tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    DevOps & Cloud
                                </h3>
                            </div>
                            <p className="tw-text-green-100">
                                Master Docker, Kubernetes, AWS, CI/CD pipelines, and infrastructure
                                as code.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>16-20 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-yellow-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-yellow-800">
                                    Intermediate
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Docker
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        AWS
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Kubernetes
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        CI/CD
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/devops"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* Data Science Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-purple-500 tw-to-purple-600 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-chart-line tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    Data Science
                                </h3>
                            </div>
                            <p className="tw-text-purple-100">
                                Learn Python, SQL, machine learning, and data visualization
                                techniques.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>14-18 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-yellow-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-yellow-800">
                                    Intermediate
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Python
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        SQL
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Pandas
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Machine Learning
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/data-science"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* Cybersecurity Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-red-500 tw-to-red-600 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-shield-alt tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    Cybersecurity
                                </h3>
                            </div>
                            <p className="tw-text-red-100">
                                Learn ethical hacking, network security, incident response, and
                                compliance.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>18-24 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-red-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-red-800">
                                    Advanced
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Penetration Testing
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        NIST
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Incident Response
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/cybersecurity"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Development Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-orange-500 tw-to-orange-600 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-mobile-alt tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    Mobile Development
                                </h3>
                            </div>
                            <p className="tw-text-orange-100">
                                Build iOS and Android apps using React Native, Swift, and Kotlin.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>16-20 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-yellow-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-yellow-800">
                                    Intermediate
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        React Native
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Swift
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Kotlin
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Flutter
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/mobile-development"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* Career Prep Track */}
                    <div className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg">
                        <div className="tw-bg-gradient-to-r tw-from-gray-700 tw-to-gray-800 tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-briefcase tw-mr-3 tw-text-3xl tw-text-white" />
                                <h3 className="tw-text-xl tw-font-semibold tw-text-white">
                                    Career Preparation
                                </h3>
                            </div>
                            <p className="tw-text-gray-100">
                                Resume building, interview prep, networking, and job search
                                strategies.
                            </p>
                        </div>
                        <div className="tw-p-6">
                            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-600">
                                    <i className="fas fa-clock tw-mr-2" />
                                    <span>4-6 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-green-800">
                                    All Levels
                                </span>
                            </div>
                            <div className="tw-mb-4">
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Resume
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Interviews
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Networking
                                    </span>
                                    <span className="tw-rounded tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-text-gray-700">
                                        Job Search
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/career-prep"
                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-center tw-font-medium tw-text-white tw-transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="tw-to-primary-dark tw-rounded-lg tw-bg-gradient-to-r tw-from-primary tw-p-8 tw-text-center tw-text-white">
                    <h2 className="tw-mb-4 tw-text-3xl tw-font-bold">
                        Ready to Start Your Tech Career?
                    </h2>
                    <p className="tw-mb-6 tw-text-xl tw-opacity-90">
                        Join thousands of veterans who have successfully transitioned to tech
                        careers through our programs.
                    </p>
                    <div className="tw-flex tw-flex-col tw-justify-center tw-gap-4 sm:tw-flex-row">
                        <Link
                            href="/apply"
                            className="tw-rounded-md tw-bg-white tw-px-8 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-gray-100"
                        >
                            Apply Now
                        </Link>
                        <Link
                            href="/contact"
                            className="tw-rounded-md tw-border tw-border-white tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-white hover:tw-text-primary"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

CoursesIndex.Layout = Layout01;

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

export default CoursesIndex;
