import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React, { useState } from "react";
import prisma from "@/lib/prisma";
import { options } from "@/pages/api/auth/options";

type Course = {
    id: string;
    title: string;
    description: string | null;
    difficulty: string;
    category: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    moduleCount: number;
    enrollmentCount: number;
};

type PageProps = {
    courses: Course[];
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const AdminCoursesPage: PageWithLayout = ({ courses: initialCourses }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
    const [difficultyFilter, setDifficultyFilter] = useState<
        "all" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
    >("all");

    // Filter courses
    const filteredCourses = initialCourses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "published" && course.isPublished) ||
            (statusFilter === "draft" && !course.isPublished);
        const matchesDifficulty =
            difficultyFilter === "all" || course.difficulty === difficultyFilter;
        return matchesSearch && matchesStatus && matchesDifficulty;
    });

    const getStatusBadge = (isPublished: boolean) => {
        if (isPublished) {
            return (
                <span className="tw-rounded-full tw-bg-gold-light/30 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-gold-deep">
                    Published
                </span>
            );
        }
        return (
            <span className="tw-rounded-full tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-gray-600">
                Draft
            </span>
        );
    };

    const getDifficultyBadge = (difficulty: string) => {
        const styles = {
            BEGINNER: "tw-bg-green-100 tw-text-green-800",
            INTERMEDIATE: "tw-bg-yellow-100 tw-text-yellow-800",
            ADVANCED: "tw-bg-red-100 tw-text-red-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-2 tw-py-1 tw-text-xs tw-font-medium ${
                    styles[difficulty as keyof typeof styles] || styles.BEGINNER
                }`}
            >
                {difficulty}
            </span>
        );
    };

    return (
        <>
            <SEO title="Course Management - Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                ]}
                currentPage="Course Management"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-ink">
                            Course Management
                        </h1>
                        <p className="tw-text-gray-300">Create and manage learning content</p>
                    </div>
                    <div className="tw-flex tw-space-x-3">
                        <button
                            type="button"
                            className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white tw-transition-colors"
                        >
                            <i className="fas fa-plus tw-mr-2" />
                            New Course
                        </button>
                        <Link
                            href="/admin"
                            className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
                        >
                            <i className="fas fa-arrow-left tw-mr-2" />
                            Back to Admin
                        </Link>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                    <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-5">
                        {/* Search */}
                        <div className="md:tw-col-span-2">
                            <label
                                htmlFor="search"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Search Courses
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Title, description, or category..."
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
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <label
                                htmlFor="difficulty"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                value={difficultyFilter}
                                onChange={(e) =>
                                    setDifficultyFilter(e.target.value as typeof difficultyFilter)
                                }
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            >
                                <option value="all">All Levels</option>
                                <option value="BEGINNER">Beginner</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="ADVANCED">Advanced</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="tw-flex tw-items-end">
                            <div className="tw-text-sm tw-text-gray-300">
                                Showing {filteredCourses.length} of {initialCourses.length} courses
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md"
                        >
                            <div className="tw-mb-4 tw-flex tw-items-start tw-justify-between">
                                <div className="tw-flex tw-space-x-2">
                                    {getStatusBadge(course.isPublished)}
                                    {getDifficultyBadge(course.difficulty)}
                                </div>
                                <div className="tw-flex tw-space-x-1">
                                    <button
                                        type="button"
                                        className="tw-text-navy-royal hover:tw-text-blue-900"
                                        title="Edit Course"
                                    >
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-text-gold hover:tw-text-green-900"
                                        title="View Course"
                                    >
                                        <i className="fas fa-eye" />
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-text-red-600 hover:tw-text-red-900"
                                        title="Delete Course"
                                    >
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-ink">
                                {course.title}
                            </h3>

                            <p className="tw-mb-4 tw-line-clamp-2 tw-text-sm tw-text-gray-300">
                                {course.description || "No description"}
                            </p>

                            <div className="tw-mb-4 tw-space-y-2">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-tag tw-mr-2 tw-w-4" />
                                    {course.category}
                                </div>
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-users tw-mr-2 tw-w-4" />
                                    {course.enrollmentCount} students
                                </div>
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-book tw-mr-2 tw-w-4" />
                                    {course.moduleCount} modules
                                </div>
                            </div>

                            <div className="tw-mt-4 tw-border-t tw-pt-4">
                                <div className="tw-text-xs tw-text-gray-400">
                                    Updated {new Date(course.updatedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="tw-mt-8 tw-text-center tw-text-gray-500">
                        <i className="fas fa-search tw-mb-2 tw-text-3xl" />
                        <p>No courses found matching your criteria.</p>
                        <button
                            type="button"
                            className="hover:tw-bg-primary-dark tw-mt-4 tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white tw-transition-colors"
                        >
                            Create Your First Course
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

AdminCoursesPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // Redirect if not authenticated
    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/admin/courses",
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

    // Fetch all courses with module and enrollment counts
    const coursesWithCounts = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            category: true,
            isPublished: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    modules: true,
                    enrollments: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    // Transform data for component
    const courses: Course[] = coursesWithCounts.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        difficulty: course.difficulty,
        category: course.category,
        isPublished: course.isPublished,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
        moduleCount: course._count.modules,
        enrollmentCount: course._count.enrollments,
    }));

    return {
        props: {
            courses,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AdminCoursesPage;
