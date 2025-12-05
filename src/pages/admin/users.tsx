import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import type { Role } from "@/lib/rbac";

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
    lastActive: string;
    enrollments: number;
    progress: number;
    status: "active" | "inactive" | "suspended";
    militaryBranch?: string;
    rank?: string;
};

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

const AdminUsersPage: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">(
        "all"
    );
    const [sortBy, setSortBy] = useState<"name" | "joinDate" | "progress">("joinDate");

    useEffect(() => {
        // TODO: Fetch real user data from API
        // Mock data for demonstration
        const mockUsers: User[] = [
            {
                id: "1",
                name: "Sarah Chen",
                email: "sarah.chen@email.com",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=50&h=50&fit=crop&crop=face",
                joinDate: "2025-08-15",
                lastActive: "2025-08-28",
                enrollments: 2,
                progress: 75,
                status: "active",
                militaryBranch: "Army",
                rank: "Sergeant",
            },
            {
                id: "2",
                name: "Mike Rodriguez",
                email: "mike.rodriguez@email.com",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                joinDate: "2025-08-10",
                lastActive: "2025-08-27",
                enrollments: 1,
                progress: 45,
                status: "active",
                militaryBranch: "Marines",
                rank: "Corporal",
            },
            {
                id: "3",
                name: "Jennifer Kim",
                email: "jennifer.kim@email.com",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
                joinDate: "2025-08-05",
                lastActive: "2025-08-28",
                enrollments: 3,
                progress: 92,
                status: "active",
                militaryBranch: "Navy",
                rank: "Petty Officer",
            },
            {
                id: "4",
                name: "David Thompson",
                email: "david.thompson@email.com",
                joinDate: "2025-07-28",
                lastActive: "2025-08-20",
                enrollments: 1,
                progress: 25,
                status: "inactive",
                militaryBranch: "Air Force",
                rank: "Staff Sergeant",
            },
        ];
        setUsers(mockUsers);
    }, []);

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    // Check admin access using RBAC
    const userRole = (session?.user as any)?.role as Role | undefined;
    if (!session || userRole !== 'ADMIN') {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Access Denied
                    </h1>
                    <p className="tw-text-gray-600">Administrator access required.</p>
                    <Link href="/admin" className="tw-mt-4 tw-inline-block tw-text-primary">
                        ← Back to Admin
                    </Link>
                </div>
            </div>
        );
    }

    // Filter and sort users
    const filteredUsers = users
        .filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || user.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "progress":
                    return b.progress - a.progress;
                case "joinDate":
                default:
                    return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
            }
        });

    const getStatusBadge = (userStatus: User["status"]) => {
        const styles = {
            active: "tw-bg-green-100 tw-text-green-800",
            inactive: "tw-bg-yellow-100 tw-text-yellow-800",
            suspended: "tw-bg-red-100 tw-text-red-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-2 tw-py-1 tw-text-xs tw-font-medium ${styles[userStatus]}`}
            >
                {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
            </span>
        );
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 75) return "tw-bg-green-500";
        if (progress >= 50) return "tw-bg-yellow-500";
        return "tw-bg-red-500";
    };

    const getProgressWidth = (progress: number) => {
        if (progress >= 90) return "tw-w-full";
        if (progress >= 75) return "tw-w-4/5";
        if (progress >= 50) return "tw-w-1/2";
        if (progress >= 25) return "tw-w-1/4";
        return "tw-w-1/12";
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
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            User Management
                        </h1>
                        <p className="tw-text-gray-600">
                            Manage student accounts and monitor progress
                        </p>
                    </div>
                    <Link
                        href="/admin"
                        className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
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
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
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
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
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
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label
                                htmlFor="sort"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Sort By
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            >
                                <option value="joinDate">Join Date</option>
                                <option value="name">Name</option>
                                <option value="progress">Progress</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="tw-flex tw-items-end">
                            <div className="tw-text-sm tw-text-gray-600">
                                Showing {filteredUsers.length} of {users.length} users
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
                                        Military Info
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Courses
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Progress
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Status
                                    </th>
                                    <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                        Last Active
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
                                                {user.avatar ? (
                                                    <img
                                                        className="tw-mr-4 tw-h-10 tw-w-10 tw-rounded-full"
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                ) : (
                                                    <div className="tw-mr-4 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-300">
                                                        <i className="fas fa-user tw-text-gray-600" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="tw-text-sm tw-text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            {user.militaryBranch && user.rank ? (
                                                <div>
                                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                                        {user.rank}
                                                    </div>
                                                    <div className="tw-text-sm tw-text-gray-500">
                                                        {user.militaryBranch}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="tw-text-sm tw-text-gray-400">
                                                    Not provided
                                                </span>
                                            )}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-text-gray-900">
                                            {user.enrollments} enrolled
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            <div className="tw-flex tw-items-center">
                                                <div className="tw-mr-2 tw-w-16 tw-text-sm tw-text-gray-900">
                                                    {user.progress}%
                                                </div>
                                                <div className="tw-relative tw-h-2 tw-w-20 tw-overflow-hidden tw-rounded-full tw-bg-gray-200">
                                                    <div
                                                        className={`tw-absolute tw-left-0 tw-top-0 tw-h-full tw-rounded-full ${getProgressColor(user.progress)} ${getProgressWidth(user.progress)}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                            {getStatusBadge(user.status)}
                                        </td>
                                        <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-text-gray-500">
                                            {new Date(user.lastActive).toLocaleDateString()}
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
                                                    className="tw-text-green-600 hover:tw-text-green-900"
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

export default AdminUsersPage;
