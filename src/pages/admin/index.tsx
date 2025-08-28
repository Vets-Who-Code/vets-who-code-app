import React, { useState, useEffect } from "react";
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

// Admin-only access for Jerome Hardaway
const ADMIN_GITHUB_USERNAME = "jeromehardaway";

const AdminDashboard: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEnrollments: 0,
        activeAssignments: 0,
        completedAssignments: 0,
        avgProgress: 0,
    });

    useEffect(() => {
        // TODO: Fetch real stats from API
        // For now, set mock data
        setStats({
            totalUsers: 147,
            totalEnrollments: 89,
            activeAssignments: 23,
            completedAssignments: 156,
            avgProgress: 72,
        });
    }, []);

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    // Check if user is signed in and is the admin
    if (!session || session.user?.email !== `${ADMIN_GITHUB_USERNAME}@users.noreply.github.com`) {
        return (
            <>
                <SEO title="Access Denied" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Admin"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <div className="tw-mb-8">
                            <i className="fas fa-shield-alt tw-mb-4 tw-text-6xl tw-text-red-400" />
                            <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                                Admin Access Denied
                            </h1>
                            <p className="tw-mx-auto tw-max-w-2xl tw-text-xl tw-text-gray-600">
                                This area is restricted to authorized administrators only.
                            </p>
                        </div>

                        {!session ? (
                            <Link
                                href="/login"
                                className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                            >
                                <i className="fas fa-sign-in-alt tw-mr-2" />
                                Sign In
                            </Link>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                            >
                                <i className="fas fa-tachometer-alt tw-mr-2" />
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Admin Dashboard" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Admin Dashboard"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Admin Header */}
                <div className="tw-mb-8">
                    <div className="tw-flex tw-items-center tw-justify-between">
                        <div>
                            <h1 className="tw-mb-2 tw-text-4xl tw-font-bold tw-text-gray-900">
                                Admin Dashboard
                            </h1>
                            <p className="tw-text-xl tw-text-gray-600">
                                Welcome, Jerome! Manage your learning platform.
                            </p>
                        </div>
                        <div className="tw-flex tw-items-center tw-space-x-4">
                            {/* View Switcher */}
                            <div className="tw-flex tw-items-center tw-space-x-2">
                                <Link
                                    href="/courses"
                                    className="tw-rounded-md tw-bg-secondary/10 tw-px-4 tw-py-2 tw-text-secondary tw-transition-colors hover:tw-bg-secondary/20"
                                    title="Switch to Student View"
                                >
                                    <i className="fas fa-eye tw-mr-2" />
                                    Student View
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="tw-rounded-md tw-bg-primary/10 tw-px-4 tw-py-2 tw-text-primary tw-transition-colors hover:tw-bg-primary/20"
                                    title="User Dashboard"
                                >
                                    <i className="fas fa-tachometer-alt tw-mr-2" />
                                    Dashboard
                                </Link>
                            </div>
                            <div className="tw-flex tw-items-center tw-space-x-2 tw-rounded-lg tw-bg-success/10 tw-px-4 tw-py-2">
                                <i className="fas fa-crown tw-text-success" />
                                <span className="tw-font-medium tw-text-success">
                                    Administrator
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="tw-mb-12 tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-5">
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-blue-600">
                            {stats.totalUsers}
                        </div>
                        <div className="tw-text-gray-600">Total Users</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-green-600">
                            {stats.totalEnrollments}
                        </div>
                        <div className="tw-text-gray-600">Course Enrollments</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-orange-600">
                            {stats.activeAssignments}
                        </div>
                        <div className="tw-text-gray-600">Pending Reviews</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-purple-600">
                            {stats.completedAssignments}
                        </div>
                        <div className="tw-text-gray-600">Completed Tasks</div>
                    </div>
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                        <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-indigo-600">
                            {stats.avgProgress}%
                        </div>
                        <div className="tw-text-gray-600">Avg Progress</div>
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                    {/* Quick Actions */}
                    <div className="lg:tw-col-span-2">
                        <h2 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-gray-900">
                            Quick Actions
                        </h2>

                        <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2">
                            {/* User Management */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <div className="tw-mb-4 tw-flex tw-items-center">
                                    <div className="tw-mr-4 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-lg tw-bg-blue-100">
                                        <i className="fas fa-users tw-text-xl tw-text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                                            User Management
                                        </h3>
                                        <p className="tw-text-sm tw-text-gray-600">
                                            Manage student accounts and progress
                                        </p>
                                    </div>
                                </div>
                                <div className="tw-space-y-2">
                                    <Link
                                        href="/admin/users"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-list tw-mr-2" />
                                        View All Users
                                    </Link>
                                    <Link
                                        href="/admin/enrollments"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-graduation-cap tw-mr-2" />
                                        Manage Enrollments
                                    </Link>
                                </div>
                            </div>

                            {/* Course Management */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <div className="tw-mb-4 tw-flex tw-items-center">
                                    <div className="tw-mr-4 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-lg tw-bg-green-100">
                                        <i className="fas fa-book tw-text-xl tw-text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                                            Course Content
                                        </h3>
                                        <p className="tw-text-sm tw-text-gray-600">
                                            Manage courses, modules, and lessons
                                        </p>
                                    </div>
                                </div>
                                <div className="tw-space-y-2">
                                    <Link
                                        href="/admin/courses"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-edit tw-mr-2" />
                                        Edit Courses
                                    </Link>
                                    <Link
                                        href="/admin/lessons"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-video tw-mr-2" />
                                        Manage Lessons
                                    </Link>
                                </div>
                            </div>

                            {/* Assignment Reviews */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <div className="tw-mb-4 tw-flex tw-items-center">
                                    <div className="tw-mr-4 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-lg tw-bg-orange-100">
                                        <i className="fas fa-tasks tw-text-xl tw-text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                                            Assignment Reviews
                                        </h3>
                                        <p className="tw-text-sm tw-text-gray-600">
                                            Review and grade student submissions
                                        </p>
                                    </div>
                                </div>
                                <div className="tw-space-y-2">
                                    <Link
                                        href="/admin/assignments/pending"
                                        className="hover:tw-text-primary-dark tw-flex tw-items-center tw-justify-between tw-text-primary tw-transition-colors"
                                    >
                                        <span>
                                            <i className="fas fa-clock tw-mr-2" />
                                            Pending Reviews
                                        </span>
                                        <span className="tw-rounded-full tw-bg-orange-100 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-orange-800">
                                            {stats.activeAssignments}
                                        </span>
                                    </Link>
                                    <Link
                                        href="/admin/assignments/all"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-list tw-mr-2" />
                                        All Submissions
                                    </Link>
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <div className="tw-mb-4 tw-flex tw-items-center">
                                    <div className="tw-mr-4 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-lg tw-bg-purple-100">
                                        <i className="fas fa-chart-bar tw-text-xl tw-text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                                            Analytics
                                        </h3>
                                        <p className="tw-text-sm tw-text-gray-600">
                                            Track platform performance and usage
                                        </p>
                                    </div>
                                </div>
                                <div className="tw-space-y-2">
                                    <Link
                                        href="/admin/analytics"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-chart-line tw-mr-2" />
                                        Usage Reports
                                    </Link>
                                    <Link
                                        href="/admin/analytics/progress"
                                        className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-trophy tw-mr-2" />
                                        Student Progress
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Sidebar */}
                    <div>
                        <h3 className="tw-mb-6 tw-text-xl tw-font-bold tw-text-gray-900">
                            Recent Activity
                        </h3>

                        {/* Pending Assignment Reviews */}
                        <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h4 className="tw-mb-4 tw-font-semibold tw-text-gray-900">
                                <i className="fas fa-exclamation-circle tw-mr-2 tw-text-orange-500" />
                                Needs Your Attention
                            </h4>
                            <div className="tw-space-y-3">
                                <div className="tw-border-l-4 tw-border-orange-500 tw-pl-4">
                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                        New HTML Assignment Submission
                                    </div>
                                    <div className="tw-text-xs tw-text-gray-600">
                                        by Sarah Chen • 2 hours ago
                                    </div>
                                </div>
                                <div className="tw-border-l-4 tw-border-blue-500 tw-pl-4">
                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                        Student Question Posted
                                    </div>
                                    <div className="tw-text-xs tw-text-gray-600">
                                        by Mike Rodriguez • 4 hours ago
                                    </div>
                                </div>
                                <div className="tw-border-l-4 tw-border-green-500 tw-pl-4">
                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                        Course Completion
                                    </div>
                                    <div className="tw-text-xs tw-text-gray-600">
                                        by Jennifer Kim • 1 day ago
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/admin/activity"
                                className="hover:tw-text-primary-dark tw-mt-4 tw-block tw-text-center tw-text-sm tw-text-primary tw-transition-colors"
                            >
                                View All Activity →
                            </Link>
                        </div>

                        {/* System Status */}
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h4 className="tw-mb-4 tw-font-semibold tw-text-gray-900">
                                <i className="fas fa-server tw-mr-2 tw-text-green-500" />
                                System Status
                            </h4>
                            <div className="tw-space-y-3">
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    <span className="tw-text-sm tw-text-gray-600">Platform</span>
                                    <span className="tw-flex tw-items-center tw-text-sm tw-text-green-600">
                                        <i className="fas fa-circle tw-mr-1 tw-text-xs" />
                                        Online
                                    </span>
                                </div>
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    <span className="tw-text-sm tw-text-gray-600">Database</span>
                                    <span className="tw-flex tw-items-center tw-text-sm tw-text-green-600">
                                        <i className="fas fa-circle tw-mr-1 tw-text-xs" />
                                        Connected
                                    </span>
                                </div>
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    <span className="tw-text-sm tw-text-gray-600">
                                        Video Hosting
                                    </span>
                                    <span className="tw-flex tw-items-center tw-text-sm tw-text-green-600">
                                        <i className="fas fa-circle tw-mr-1 tw-text-xs" />
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AdminDashboard.Layout = Layout01;

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

export default AdminDashboard;
