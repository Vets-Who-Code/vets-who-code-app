import React, { useState } from "react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";
import prisma from "@/lib/prisma";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type User = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
    isActive: boolean;
    branch: string | null;
    rank: string | null;
    enrollmentCount: number;
};

type PageProps = {
    users: User[];
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const AdminUsersPage: PageWithLayout = ({ users: initialUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [sortBy, setSortBy] = useState<"name" | "createdAt" | "enrollments">("createdAt");

    // Filter and sort users
    const filteredUsers = initialUsers
        .filter((user) => {
            const matchesSearch =
                (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && user.isActive) ||
                (statusFilter === "inactive" && !user.isActive);
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return (a.name || "").localeCompare(b.name || "");
                case "enrollments":
                    return b.enrollmentCount - a.enrollmentCount;
                case "createdAt":
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    const getStatusBadge = (isActive: boolean) => {
        if (isActive) {
            return (
                <span className="tw-rounded-full tw-bg-gold-light/30 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-gold-deep">
                    Active
                </span>
            );
        }
        return (
            <span className="tw-rounded-full tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-gray-600">
                Inactive
            </span>
        );
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            ADMIN: "tw-bg-red-100 tw-text-red-800",
            INSTRUCTOR: "tw-bg-blue-100 tw-text-blue-800",
            MENTOR: "tw-bg-purple-100 tw-text-purple-800",
            STUDENT: "tw-bg-green-100 tw-text-green-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-2 tw-py-1 tw-text-xs tw-font-medium ${
                    styles[role as keyof typeof styles] || styles.STUDENT
                }`}
            >
                {role}
            </span>
        );
    };

    return (
        <>
            <SEO title="User Management - Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                ]}
                currentPage="User Management"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-ink">
                            User Management
                        </h1>
                        <p className="tw-text-gray-300">
                            Manage student accounts and monitor progress
                        </p>
                    </div>
                    <Link
                        href="/admin"
                        className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-arrow-left tw-mr-2" />
                        Back to Admin
                    </Link>
                </div>

                {/* Filters and Search */}
                <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                    <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-4">
                        {/* Search */}
                        <div>
                            <label
                                htmlFor="search"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Search Users
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Name or email..."
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label
                                htmlFor="status"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as typeof statusFilter)
                                }
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label
                                htmlFor="sort"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Sort By
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            >
                                <option value="createdAt">Join Date</option>
                                <option value="name">Name</option>
                                <option value="enrollments">Enrollments</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="tw-flex tw-items-end">
                            <div className="tw-text-sm tw-text-gray-300">
                                Showing {filteredUsers.length} of {initialUsers.length} users
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md">
                    <div className="tw-overflow-x-auto">
                        <table className="tw-w-full tw-divide-y tw-divide-gray-200">
                            <thead className="tw-bg-gray-50">
                                <tr>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        User
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Role
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Military Info
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Enrollments
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Status
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Joined
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="tw-divide-y tw-divide-gray-200 tw-bg-white">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:tw-bg-gray-50">
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            <div className="tw-flex tw-items-center">
                                                {user.image ? (
                                                    <img
                                                        className="tw-mr-4 tw-h-10 tw-w-10 tw-rounded-full"
                                                        src={user.image}
                                                        alt={user.name || "User"}
                                                    />
                                                ) : (
                                                    <div className="tw-mr-4 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-300">
                                                        <i className="fas fa-user tw-text-gray-300" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="tw-text-sm tw-font-medium tw-text-ink">
                                                        {user.name || "No name"}
                                                    </div>
                                                    <div className="tw-text-sm tw-text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            {user.branch && user.rank ? (
                                                <div>
                                                    <div className="tw-text-sm tw-font-medium tw-text-ink">
                                                        {user.rank}
                                                    </div>
                                                    <div className="tw-text-sm tw-text-gray-500">
                                                        {user.branch}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="tw-text-sm tw-text-gray-400">
                                                    Not provided
                                                </span>
                                            )}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-text-ink">
                                            {user.enrollmentCount}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            {getStatusBadge(user.isActive)}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-font-medium">
                                            <div className="tw-flex tw-space-x-2">
                                                <button
                                                    type="button"
                                                    className="hover:tw-text-primary-dark tw-text-primary"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="tw-text-gold hover:tw-text-green-900"
                                                    title="Send Message"
                                                >
                                                    <i className="fas fa-envelope" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="tw-text-red-600 hover:tw-text-red-900"
                                                    title="Manage Access"
                                                >
                                                    <i className="fas fa-cog" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="tw-mt-8 tw-text-center tw-text-gray-500">
                        <i className="fas fa-search tw-mb-2 tw-text-3xl" />
                        <p>No users found matching your criteria.</p>
                    </div>
                )}
            </div>
        </>
    );
};

AdminUsersPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // Redirect if not authenticated
    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/admin/users",
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

    // Fetch all users with enrollment counts
    const usersWithEnrollments = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            isActive: true,
            branch: true,
            rank: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    enrollments: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Transform data for component
    const users: User[] = usersWithEnrollments.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        isActive: user.isActive,
        branch: user.branch,
        rank: user.rank,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        enrollmentCount: user._count.enrollments,
    }));

    return {
        props: {
            users,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AdminUsersPage;
