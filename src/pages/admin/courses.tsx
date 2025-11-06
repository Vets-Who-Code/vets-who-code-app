import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type Course = {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    enrollments: number;
    status: "published" | "draft" | "archived";
    createdAt: string;
    updatedAt: string;
    modules: number;
    lessons: number;
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

const ADMIN_GITHUB_USERNAME = "jeromehardaway";

const AdminCoursesPage: PageWithLayout = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">(
        "all"
    );
    const [levelFilter, setLevelFilter] = useState<
        "all" | "Beginner" | "Intermediate" | "Advanced"
    >("all");

    useEffect(() => {
        // TODO: Fetch real course data from API
        // Mock data for demonstration
        const mockCourses: Course[] = [
            {
                id: "1",
                title: "Introduction to Web Development",
                description: "Learn the basics of HTML, CSS, and JavaScript",
                instructor: "Jerome Hardaway",
                duration: "8 weeks",
                level: "Beginner",
                enrollments: 47,
                status: "published",
                createdAt: "2025-07-01",
                updatedAt: "2025-08-15",
                modules: 4,
                lessons: 24,
            },
            {
                id: "2",
                title: "JavaScript Fundamentals",
                description: "Deep dive into JavaScript programming concepts",
                instructor: "Alex Thompson",
                duration: "6 weeks",
                level: "Intermediate",
                enrollments: 32,
                status: "published",
                createdAt: "2025-07-15",
                updatedAt: "2025-08-10",
                modules: 3,
                lessons: 18,
            },
            {
                id: "3",
                title: "React Development Bootcamp",
                description: "Build modern web applications with React",
                instructor: "Sarah Chen",
                duration: "12 weeks",
                level: "Advanced",
                enrollments: 23,
                status: "draft",
                createdAt: "2025-08-01",
                updatedAt: "2025-08-28",
                modules: 6,
                lessons: 36,
            },
            {
                id: "4",
                title: "Python for Veterans",
                description: "Programming fundamentals with Python",
                instructor: "Mike Rodriguez",
                duration: "10 weeks",
                level: "Beginner",
                enrollments: 15,
                status: "published",
                createdAt: "2025-06-15",
                updatedAt: "2025-08-20",
                modules: 5,
                lessons: 30,
            },
        ];
        setCourses(mockCourses);
    }, []);

    if (sessionStatus === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    // Check admin access
    // In development mode, allow access (DEV_MODE)
    const isDevelopment = process.env.NODE_ENV === "development";
    const hasAccess = isDevelopment || (session && session.user?.email === `${ADMIN_GITHUB_USERNAME}@users.noreply.github.com`);

    if (!hasAccess && (sessionStatus as string) !== "loading") {
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

    // Filter courses
    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || course.status === statusFilter;
        const matchesLevel = levelFilter === "all" || course.level === levelFilter;
        return matchesSearch && matchesStatus && matchesLevel;
    });

    const getStatusBadge = (courseStatus: Course["status"]) => {
        const styles = {
            published: "tw-bg-green-100 tw-text-green-800",
            draft: "tw-bg-yellow-100 tw-text-yellow-800",
            archived: "tw-bg-gray-100 tw-text-gray-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-2 tw-py-1 tw-text-xs tw-font-medium ${styles[courseStatus]}`}
            >
                {courseStatus.charAt(0).toUpperCase() + courseStatus.slice(1)}
            </span>
        );
    };

    const getLevelBadge = (level: Course["level"]) => {
        const styles = {
            Beginner: "tw-bg-blue-100 tw-text-blue-800",
            Intermediate: "tw-bg-purple-100 tw-text-purple-800",
            Advanced: "tw-bg-orange-100 tw-text-orange-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-2 tw-py-1 tw-text-xs tw-font-medium ${styles[level]}`}
            >
                {level}
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
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Course Management
                        </h1>
                        <p className="tw-text-gray-600">Create and manage learning content</p>
                    </div>
                    <div className="tw-flex tw-space-x-3">
                        <Link
                            href="/admin/courses/create"
                            className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white tw-transition-colors"
                        >
                            <i className="fas fa-plus tw-mr-2" />
                            New Course
                        </Link>
                        <Link
                            href="/admin"
                            className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
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
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Search Courses
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Title, description, or instructor..."
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
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        {/* Level Filter */}
                        <div>
                            <label
                                htmlFor="level"
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Level
                            </label>
                            <select
                                id="level"
                                value={levelFilter}
                                onChange={(e) =>
                                    setLevelFilter(e.target.value as typeof levelFilter)
                                }
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                            >
                                <option value="all">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="tw-flex tw-items-end">
                            <div className="tw-text-sm tw-text-gray-600">
                                Showing {filteredCourses.length} of {courses.length} courses
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
                                    {getStatusBadge(course.status)}
                                    {getLevelBadge(course.level)}
                                </div>
                                <div className="tw-flex tw-space-x-1">
                                    <button
                                        type="button"
                                        className="tw-text-blue-600 hover:tw-text-blue-900"
                                        title="Edit Course"
                                    >
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-text-green-600 hover:tw-text-green-900"
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

                            <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-gray-900">
                                {course.title}
                            </h3>

                            <p className="tw-mb-4 tw-line-clamp-2 tw-text-sm tw-text-gray-600">
                                {course.description}
                            </p>

                            <div className="tw-mb-4 tw-space-y-2">
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-user tw-mr-2 tw-w-4" />
                                    {course.instructor}
                                </div>
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-clock tw-mr-2 tw-w-4" />
                                    {course.duration}
                                </div>
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                                    <i className="fas fa-users tw-mr-2 tw-w-4" />
                                    {course.enrollments} students
                                </div>
                            </div>

                            <div className="tw-flex tw-justify-between tw-text-sm tw-text-gray-500">
                                <span>{course.modules} modules</span>
                                <span>{course.lessons} lessons</span>
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

export default AdminCoursesPage;
