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

const courseIdToSlug = (courseId: string): string | null => {
    const id = courseId.toLowerCase();
    if (id.includes("devops") || id.includes("cloud")) return "devops";
    if (id.includes("web") || id.includes("frontend") || id.includes("full-stack"))
        return "web-development";
    return null;
};

const CoursesIndex: PageWithLayout = ({ user }) => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await fetch("/api/enrollment/enroll");
                const data = await response.json();
                if (response.ok) {
                    setEnrollments(data.enrollments ?? []);
                }
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    const activeEnrollments = enrollments.filter((e) => e.status === "ACTIVE");

    return (
        <>
            <SEO title="Courses" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Courses"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <div className="tw-mb-8 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4">
                    <div className="tw-flex tw-items-center tw-gap-3 tw-text-sm tw-text-gray-300">
                        {user.image && (
                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="tw-h-8 tw-w-8 tw-rounded-full"
                            />
                        )}
                        <span>Welcome, {user.name?.split(" ")[0] || "User"}</span>
                    </div>
                    <div className="tw-flex tw-gap-2">
                        {user.role === "ADMIN" && (
                            <Link
                                href="/admin"
                                className="tw-rounded-md tw-bg-primary/10 tw-px-4 tw-py-2 tw-text-primary tw-transition-colors hover:tw-bg-primary/20"
                            >
                                <i className="fas fa-crown tw-mr-2" />
                                Admin Dashboard
                            </Link>
                        )}
                        <Link
                            href="/profile"
                            className="tw-rounded-md tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
                        >
                            <i className="fas fa-user tw-mr-1" />
                            Profile
                        </Link>
                    </div>
                </div>

                <div className="tw-mb-10">
                    <h1 className="tw-mb-3 tw-text-4xl tw-font-bold tw-text-secondary md:tw-text-5xl">
                        Your Courses
                    </h1>
                    <p className="tw-text-lg tw-text-body">
                        Active enrollments for {user.name?.split(" ")[0] || "your account"}.
                    </p>
                </div>

                {loading ? (
                    <div className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-p-8 tw-text-center tw-text-body">
                        Loading your courses…
                    </div>
                ) : activeEnrollments.length === 0 ? (
                    <div className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-p-8 tw-text-center">
                        <h2 className="tw-mb-3 tw-text-xl tw-font-semibold tw-text-secondary">
                            No active enrollments
                        </h2>
                        <p className="tw-mb-6 tw-text-body">
                            Once you&apos;re accepted into a cohort, your course will appear here.
                            In the meantime, explore the full curriculum.
                        </p>
                        <Link
                            href="/subjects/all"
                            className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-primary tw-px-5 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                        >
                            View Curriculum
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                ) : (
                    <ul className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2">
                        {activeEnrollments.map((enrollment) => {
                            const slug = courseIdToSlug(enrollment.courseId);
                            return (
                                <li
                                    key={enrollment.id}
                                    className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-p-6 tw-shadow-sm"
                                >
                                    <h2 className="tw-mb-2 tw-text-xl tw-font-semibold tw-text-secondary">
                                        {enrollment.courseId}
                                    </h2>
                                    <p className="tw-mb-4 tw-text-sm tw-text-body">
                                        Progress: {enrollment.progress}%
                                    </p>
                                    {slug && (
                                        <Link
                                            href={`/courses/${slug}`}
                                            className="tw-inline-flex tw-items-center tw-gap-2 tw-text-primary hover:tw-underline"
                                        >
                                            Continue
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

CoursesIndex.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
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
