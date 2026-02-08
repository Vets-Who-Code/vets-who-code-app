import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React from "react";
import { options } from "@/pages/api/auth/options";

type DashboardStats = {
    totalStudents: number;
    activeCourses: number;
    totalEnrollments: number;
    completedEnrollments: number;
};

type PageProps = {
    stats: DashboardStats;
    userName: string;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const AdminDashboard: PageWithLayout = ({ stats, userName }) => {
    const completionRate =
        stats.totalEnrollments > 0
            ? Math.round((stats.completedEnrollments / stats.totalEnrollments) * 100)
            : 0;

    return (
        <>
            <SEO title="Admin Dashboard" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Admin Dashboard"
                showTitle={false}
            />

            <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
                <div className="tw-mx-auto tw-max-w-7xl tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-mb-8">
                        <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Admin Dashboard</h1>
                        <p className="tw-mt-2 tw-text-gray-300">
                            Welcome back, {userName}! Manage your VWC platform here.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4">
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Total Students
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">
                                {stats.totalStudents}
                            </p>
                            <Link
                                href="/admin/users"
                                className="tw-mt-2 tw-text-sm tw-text-gold hover:tw-underline"
                            >
                                View all users →
                            </Link>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Active Courses
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">
                                {stats.activeCourses}
                            </p>
                            <Link
                                href="/admin/courses"
                                className="tw-mt-2 tw-text-sm tw-text-gold hover:tw-underline"
                            >
                                Manage courses →
                            </Link>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Total Enrollments
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">
                                {stats.totalEnrollments}
                            </p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                                {stats.completedEnrollments} completed
                            </p>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Completion Rate
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">
                                {completionRate}%
                            </p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">Platform average</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                        <h2 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-ink">
                            Quick Actions
                        </h2>
                        <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
                            <Link
                                href="/admin/users"
                                className="tw-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-users tw-mr-3 tw-text-2xl tw-text-primary" />
                                <div>
                                    <h3 className="tw-font-medium tw-text-ink">Manage Users</h3>
                                    <p className="tw-text-sm tw-text-gray-500">
                                        View and manage all users
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/courses"
                                className="tw-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-book tw-mr-3 tw-text-2xl tw-text-primary" />
                                <div>
                                    <h3 className="tw-font-medium tw-text-ink">Manage Courses</h3>
                                    <p className="tw-text-sm tw-text-gray-500">
                                        Create and edit courses
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/blog-images"
                                className="tw-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-image tw-mr-3 tw-text-2xl tw-text-primary" />
                                <div>
                                    <h3 className="tw-font-medium tw-text-ink">Manage Images</h3>
                                    <p className="tw-text-sm tw-text-gray-500">
                                        Upload and manage blog images
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AdminDashboard.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // Redirect if not authenticated
    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/admin",
                permanent: false,
            },
        };
    }

    // Check for ADMIN role
    if (session.user.role !== "ADMIN") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // Import prisma here to avoid issues
    const { default: prisma } = await import("@/lib/prisma");

    // Fetch real statistics from database
    const [totalStudents, activeCourses, enrollmentStats] = await Promise.all([
        // Count total students (users with STUDENT role)
        prisma.user.count({
            where: {
                role: "STUDENT",
            },
        }),
        // Count published courses
        prisma.course.count({
            where: {
                isPublished: true,
            },
        }),
        // Get enrollment statistics
        prisma.enrollment.groupBy({
            by: ["status"],
            _count: true,
        }),
    ]);

    // Calculate enrollment totals
    const totalEnrollments = enrollmentStats.reduce((sum, stat) => sum + stat._count, 0);
    const completedEnrollments =
        enrollmentStats.find((stat) => stat.status === "COMPLETED")?._count || 0;

    const stats: DashboardStats = {
        totalStudents,
        activeCourses,
        totalEnrollments,
        completedEnrollments,
    };

    return {
        props: {
            stats,
            userName: session.user.name || "Admin",
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AdminDashboard;
