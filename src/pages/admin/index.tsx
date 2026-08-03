import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { requireAdminSSR } from "@/lib/auth-guards";

type DashboardStats = {
    totalStudents: number;
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

                    {/* Statistics — course and enrollment numbers live in J0dI3 now */}
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
                                href="/admin/j0di3"
                                className="tw-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-robot tw-mr-3 tw-text-2xl tw-text-primary" />
                                <div>
                                    <h3 className="tw-font-medium tw-text-ink">J0dI3 Console</h3>
                                    <p className="tw-text-sm tw-text-gray-500">
                                        Cohorts, lessons, and placements
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
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;

    const { default: prisma } = await import("@/lib/prisma");

    const totalStudents = await prisma.user.count({
        where: {
            role: "STUDENT",
        },
    });

    return {
        props: {
            stats: { totalStudents },
            userName: guard.session.user.name || "User",
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AdminDashboard;
