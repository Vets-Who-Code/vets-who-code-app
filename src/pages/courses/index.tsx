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

    // Check for dev session as fallback
    const [devSession, setDevSession] = React.useState<{
        user: { id: string; name: string; email: string; image: string };
    } | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("dev-session");
            if (stored) {
                try {
                    const user = JSON.parse(stored);
                    setDevSession({ user });
                } catch {
                    localStorage.removeItem("dev-session");
                }
            }
        }
    }, []);

    // Use either real session or dev session
    const currentSession = session || devSession;

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

    // Require authentication to access courses
    if (!currentSession) {
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

                        <div className="tw-mb-8 tw-rounded-lg tw-bg-gradient-to-r tw-from-primary tw-to-primary tw-p-8 tw-text-white">
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
                            <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-justify-center">
                                <Link
                                    href="/login"
                                    className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                                >
                                    <i className="fas fa-sign-in-alt tw-mr-2" />
                                    Sign In to Access Courses
                                </Link>
                                {process.env.NODE_ENV === "development" && (
                                    <Link
                                        href="/dev-login"
                                        className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-gray-600 tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-gray-500"
                                    >
                                        <i className="fas fa-code tw-mr-2" />
                                        Dev Login (Testing)
                                    </Link>
                                )}
                            </div>
                            <div className="tw-text-gray-600">
                                <p>Want to explore course topics first?</p>
                                <Link
                                    href="/subjects/all"
                                    className="tw-text-primary tw-transition-colors hover:tw-text-primary/80"
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
                {/* Header with Admin and User Menu */}
                <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                    <div>
                        {/* Admin Access Button (only for jeromehardaway) */}
                        {currentSession?.user?.email ===
                            "jeromehardaway@users.noreply.github.com" && (
                            <Link
                                href="/admin"
                                className="tw-rounded-md tw-bg-primary/10 tw-px-4 tw-py-2 tw-text-primary tw-transition-colors hover:tw-bg-primary/20"
                                title="Switch to Admin Mode"
                            >
                                <i className="fas fa-crown tw-mr-2" />
                                Admin Dashboard
                            </Link>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <div className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-text-gray-600">
                            {currentSession?.user?.image && (
                                <img
                                    src={currentSession.user.image}
                                    alt={currentSession.user.name || "User"}
                                    className="tw-h-8 tw-w-8 tw-rounded-full"
                                />
                            )}
                            <span>
                                Welcome, {currentSession?.user?.name?.split(" ")[0] || "User"}
                            </span>
                        </div>
                        <div className="tw-flex tw-space-x-2">
                            <Link
                                href="/profile"
                                className="tw-rounded-md tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
                                title="View Profile"
                            >
                                <i className="fas fa-user tw-mr-1" />
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="tw-mb-16 tw-text-center">
                    <div className="tw-mb-6">
                        <h1 className="tw-mb-6 tw-text-5xl tw-font-bold tw-text-secondary md:tw-text-6xl">
                            VWC Engineering Verticals
                        </h1>
                        <div className="tw-mx-auto tw-mb-4 tw-h-1 tw-w-24 tw-rounded tw-bg-primary" />
                    </div>
                    <p className="tw-mx-auto tw-max-w-3xl tw-text-xl tw-leading-relaxed tw-text-black md:tw-text-2xl">
                        Master the skills you need for a successful career in tech. Our
                        comprehensive verticals are designed specifically for veterans and military
                        spouses.
                    </p>
                </div>

                {/* Engineering Verticals */}
                <div className="tw-mb-16 tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {/* Software Engineering Vertical */}
                    <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl">
                        <div className="tw-bg-gradient-to-br tw-from-primary tw-via-primary tw-to-primary/80 tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center">
                                <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                    <i className="fas fa-code tw-text-3xl tw-text-white" />
                                </div>
                                <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                    Software Engineering
                                </h3>
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Master full-stack development, system design, and software
                                architecture to build scalable applications.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700">
                                    <i className="fas fa-clock tw-mr-2 tw-text-primary" />
                                    <span>16-20 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-success/10 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-success">
                                    Comprehensive
                                </span>
                            </div>
                            <div className="tw-mb-6">
                                <div className="tw-flex tw-flex-wrap tw-gap-3">
                                    <span className="tw-rounded-lg tw-bg-primary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-primary">
                                        JavaScript
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-primary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-primary">
                                        React
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-primary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-primary">
                                        Node.js
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-primary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-primary">
                                        System Design
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/software-engineering"
                                className="tw-group tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-bg-primary tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition-all tw-duration-200 hover:tw-bg-primary/90 hover:tw-shadow-lg"
                            >
                                <span>View Vertical</span>
                                <i className="fas fa-arrow-right tw-ml-2 tw-transition-transform tw-duration-200 group-hover:tw-translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Data Engineering Vertical */}
                    <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl">
                        <div className="tw-bg-gradient-to-br tw-from-secondary tw-via-secondary tw-to-secondary/80 tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center">
                                <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                    <i className="fas fa-database tw-text-3xl tw-text-white" />
                                </div>
                                <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                    Data Engineering
                                </h3>
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Build data pipelines, work with big data technologies, and create
                                robust data infrastructure systems.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700">
                                    <i className="fas fa-clock tw-mr-2 tw-text-secondary" />
                                    <span>18-22 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-warning/10 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-warning">
                                    Advanced
                                </span>
                            </div>
                            <div className="tw-mb-6">
                                <div className="tw-flex tw-flex-wrap tw-gap-3">
                                    <span className="tw-rounded-lg tw-bg-secondary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-secondary">
                                        Python
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-secondary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-secondary">
                                        SQL
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-secondary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-secondary">
                                        Apache Spark
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-secondary/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-secondary">
                                        AWS/GCP
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/data-engineering"
                                className="tw-group tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-bg-secondary tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition-all tw-duration-200 hover:tw-bg-secondary/90 hover:tw-shadow-lg"
                            >
                                <span>View Vertical</span>
                                <i className="fas fa-arrow-right tw-ml-2 tw-transition-transform tw-duration-200 group-hover:tw-translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* AI Engineering Vertical */}
                    <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl">
                        <div className="tw-bg-gradient-to-br tw-from-success tw-via-success tw-to-success/80 tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center">
                                <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                    <i className="fas fa-brain tw-text-3xl tw-text-white" />
                                </div>
                                <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                    AI Engineering
                                </h3>
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Develop AI/ML models, work with neural networks, and build
                                intelligent systems for real-world applications.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700">
                                    <i className="fas fa-clock tw-mr-2 tw-text-success" />
                                    <span>20-24 weeks</span>
                                </div>
                                <span className="tw-rounded-full tw-bg-danger/10 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-danger">
                                    Expert
                                </span>
                            </div>
                            <div className="tw-mb-6">
                                <div className="tw-flex tw-flex-wrap tw-gap-3">
                                    <span className="tw-rounded-lg tw-bg-success/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-success">
                                        Python
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-success/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-success">
                                        TensorFlow
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-success/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-success">
                                        PyTorch
                                    </span>
                                    <span className="tw-rounded-lg tw-bg-success/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-success">
                                        MLOps
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/courses/ai-engineering"
                                className="tw-group tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-bg-success tw-px-6 tw-py-4 tw-font-semibold tw-text-white tw-transition-all tw-duration-200 hover:tw-bg-success/90 hover:tw-shadow-lg"
                            >
                                <span>View Vertical</span>
                                <i className="fas fa-arrow-right tw-ml-2 tw-transition-transform tw-duration-200 group-hover:tw-translate-x-1" />
                            </Link>
                        </div>
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
