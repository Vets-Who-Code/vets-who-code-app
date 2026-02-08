import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React, { useEffect, useState } from "react";
import { options } from "@/pages/api/auth/options";

type Enrollment = {
    id: string;
    courseId: string;
    status: string;
    progress: number;
};

type PageProps = {
    user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
        role: string;
    };
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const CoursesIndex: PageWithLayout = ({ user }) => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/enrollment/enroll");
            const data = await response.json();

            if (response.ok) {
                setEnrollments(data.enrollments);
            }
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to check if user is enrolled in a vertical
    // Map vertical slugs to course titles for enrollment checking
    const verticalCourseMap: Record<string, string[]> = {
        "software-engineering": [
            "Software Engineering",
            "Full-Stack Development",
            "Web Development",
        ],
        "data-engineering": ["Data Engineering", "Data Science"],
        "ai-engineering": ["AI Engineering", "Machine Learning", "Artificial Intelligence"],
        devops: ["DevOps", "Cloud Engineering"],
        "web-development": ["Web Development", "Frontend Development"],
    };

    const isEnrolledInVertical = (verticalSlug: string): boolean => {
        const matchingTitles = verticalCourseMap[verticalSlug] || [];
        return enrollments.some(
            (enrollment) =>
                enrollment.status === "ACTIVE" &&
                matchingTitles.some((title) =>
                    enrollment.courseId.toLowerCase().includes(title.toLowerCase())
                )
        );
    };

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
                        {/* Admin Access Button (only for ADMIN role) */}
                        {user.role === "ADMIN" && (
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
                        <div className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-text-gray-300">
                            {user.image && (
                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    className="tw-h-8 tw-w-8 tw-rounded-full"
                                />
                            )}
                            <span>Welcome, {user.name?.split(" ")[0] || "User"}</span>
                        </div>
                        <div className="tw-flex tw-space-x-2">
                            <Link
                                href="/profile"
                                className="tw-rounded-md tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
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
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center">
                                    <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                        <i className="fas fa-code tw-text-3xl tw-text-white" />
                                    </div>
                                    <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                        Software Engineering
                                    </h3>
                                </div>
                                {!loading && isEnrolledInVertical("software-engineering") && (
                                    <span className="tw-rounded-full tw-bg-white/90 tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-text-primary">
                                        <i className="fas fa-check-circle tw-mr-1" />
                                        Enrolled
                                    </span>
                                )}
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Master full-stack development, system design, and software
                                architecture to build scalable applications.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-200">
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
                                <span>
                                    {!loading && isEnrolledInVertical("software-engineering")
                                        ? "Continue Learning"
                                        : "View Vertical"}
                                </span>
                                <i className="fas fa-arrow-right tw-ml-2 tw-transition-transform tw-duration-200 group-hover:tw-translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Data Engineering Vertical */}
                    <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl">
                        <div className="tw-bg-gradient-to-br tw-from-secondary tw-via-secondary tw-to-secondary/80 tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center">
                                    <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                        <i className="fas fa-database tw-text-3xl tw-text-white" />
                                    </div>
                                    <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                        Data Engineering
                                    </h3>
                                </div>
                                {!loading && isEnrolledInVertical("data-engineering") && (
                                    <span className="tw-rounded-full tw-bg-white/90 tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-text-secondary">
                                        <i className="fas fa-check-circle tw-mr-1" />
                                        Enrolled
                                    </span>
                                )}
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Build data pipelines, work with big data technologies, and create
                                robust data infrastructure systems.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-200">
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
                                <span>
                                    {!loading && isEnrolledInVertical("data-engineering")
                                        ? "Continue Learning"
                                        : "View Vertical"}
                                </span>
                                <i className="fas fa-arrow-right tw-ml-2 tw-transition-transform tw-duration-200 group-hover:tw-translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* AI Engineering Vertical */}
                    <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl">
                        <div className="tw-bg-gradient-to-br tw-from-success tw-via-success tw-to-success/80 tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center">
                                    <div className="tw-rounded-lg tw-bg-white/20 tw-p-3">
                                        <i className="fas fa-brain tw-text-3xl tw-text-white" />
                                    </div>
                                    <h3 className="tw-ml-4 tw-text-2xl tw-font-bold tw-text-white">
                                        AI Engineering
                                    </h3>
                                </div>
                                {!loading && isEnrolledInVertical("ai-engineering") && (
                                    <span className="tw-rounded-full tw-bg-white/90 tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-text-success">
                                        <i className="fas fa-check-circle tw-mr-1" />
                                        Enrolled
                                    </span>
                                )}
                            </div>
                            <p className="tw-text-lg tw-leading-relaxed tw-text-white/95">
                                Develop AI/ML models, work with neural networks, and build
                                intelligent systems for real-world applications.
                            </p>
                        </div>
                        <div className="tw-p-8">
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-200">
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
                                <span>
                                    {!loading && isEnrolledInVertical("ai-engineering")
                                        ? "Continue Learning"
                                        : "View Vertical"}
                                </span>
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

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/courses",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: {
                id: session.user.id,
                name: session.user.name || null,
                email: session.user.email || "",
                image: session.user.image || null,
                role: session.user.role || "STUDENT",
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default CoursesIndex;
