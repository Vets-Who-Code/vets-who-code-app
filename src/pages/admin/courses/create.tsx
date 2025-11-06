import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
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

const ADMIN_GITHUB_USERNAME = "jeromehardaway";

const CreateCoursePage: PageWithLayout = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        category: "Web Development",
        difficulty: "BEGINNER",
        duration: "",
        imageUrl: "",
        isPublished: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    duration: formData.duration ? parseInt(formData.duration, 10) : null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Course created successfully!");
                router.push(`/admin/courses`);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            alert("Failed to create course");
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    if (sessionStatus === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading...</p>
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

    return (
        <>
            <SEO title="Create Course - Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                    { path: "/admin/courses", label: "courses" },
                ]}
                currentPage="Create Course"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Create New Course
                        </h1>
                        <p className="tw-text-gray-600">
                            Set up a new course with basic information
                        </p>
                    </div>
                    <Link
                        href="/admin/courses"
                        className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
                    >
                        <i className="fas fa-arrow-left tw-mr-2" />
                        Back to Courses
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="tw-mx-auto tw-max-w-3xl">
                    <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                        <div className="tw-space-y-6">
                            {/* Course ID */}
                            <div>
                                <label
                                    htmlFor="id"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Course ID (URL-friendly, optional)
                                </label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    placeholder="e.g., web-development"
                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                                <p className="tw-mt-1 tw-text-xs tw-text-gray-500">
                                    Leave empty to auto-generate
                                </p>
                            </div>

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Introduction to Web Development"
                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Provide a brief description of what students will learn..."
                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            {/* Category and Difficulty */}
                            <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    >
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Engineering">Data Engineering</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="AI Engineering">AI Engineering</option>
                                        <option value="Software Engineering">
                                            Software Engineering
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="difficulty"
                                        className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Difficulty Level *
                                    </label>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        required
                                        className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    >
                                        <option value="BEGINNER">Beginner</option>
                                        <option value="INTERMEDIATE">Intermediate</option>
                                        <option value="ADVANCED">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            {/* Duration and Image URL */}
                            <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="duration"
                                        className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Estimated Duration (hours)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="e.g., 40"
                                        className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="imageUrl"
                                        className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Publish */}
                            <div className="tw-flex tw-items-center">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    name="isPublished"
                                    checked={formData.isPublished}
                                    onChange={handleChange}
                                    className="tw-h-4 tw-w-4 tw-rounded tw-border-gray-300 tw-text-primary focus:tw-ring-primary"
                                />
                                <label
                                    htmlFor="isPublished"
                                    className="tw-ml-2 tw-text-sm tw-text-gray-700"
                                >
                                    Publish course immediately (students can enroll)
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="tw-mt-8 tw-flex tw-space-x-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="tw-flex-1 tw-rounded-md tw-bg-primary tw-px-4 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin tw-mr-2" />
                                        Creating Course...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-plus tw-mr-2" />
                                        Create Course
                                    </>
                                )}
                            </button>
                            <Link
                                href="/admin/courses"
                                className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-3 tw-text-center tw-font-semibold tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                    <div className="tw-mt-4 tw-rounded-lg tw-bg-blue-50 tw-p-4">
                        <p className="tw-text-sm tw-text-blue-900">
                            <i className="fas fa-info-circle tw-mr-2" />
                            After creating the course, you can add modules and lessons from the
                            course management page.
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

CreateCoursePage.Layout = Layout01;

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

export default CreateCoursePage;
