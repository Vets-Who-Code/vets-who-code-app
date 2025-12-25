import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import type { Role } from "@/lib/rbac";

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

const CreateCoursePage: PageWithLayout = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">(
        "BEGINNER"
    );
    const [estimatedHours, setEstimatedHours] = useState(0);
    const [prerequisites, setPrerequisites] = useState("");
    const [tags, setTags] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    difficulty,
                    estimatedHours,
                    prerequisites: prerequisites.split("\n").filter((p) => p.trim()),
                    tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
                    isPublished,
                    imageUrl: imageUrl || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/admin/courses/${data.course.id}`);
            } else {
                setError(data.error || "Failed to create course");
            }
        } catch (err) {
            console.error("Error creating course:", err);
            setError("An unexpected error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const userRole = (session?.user as any)?.role as Role | undefined;
    if (!session || !["ADMIN", "INSTRUCTOR"].includes(userRole || "")) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Access Denied
                    </h1>
                    <p className="tw-text-gray-600">
                        This page is only accessible to admins and instructors.
                    </p>
                    <Link href="/admin/courses" className="tw-mt-4 tw-inline-block tw-text-primary">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Create New Course - Admin" />
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
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Create New Course
                        </h1>
                        <p className="tw-text-gray-600">
                            Set up a new course for students to enroll in
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

                {error && (
                    <div className="tw-mb-6 tw-rounded-md tw-bg-red-100 tw-px-4 tw-py-3 tw-text-sm tw-text-red-800">
                        <i className="fas fa-exclamation-circle tw-mr-2" />
                        {error}
                    </div>
                )}

                <div className="tw-mx-auto tw-max-w-4xl">
                    <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                        <form onSubmit={handleSubmit} className="tw-space-y-6">
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Full Stack Web Development"
                                    className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    required
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what students will learn in this course..."
                                    className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2">
                                {/* Category */}
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="e.g., Web Development"
                                        className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    />
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <label
                                        htmlFor="difficulty"
                                        className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Difficulty Level *
                                    </label>
                                    <select
                                        id="difficulty"
                                        value={difficulty}
                                        onChange={(e) =>
                                            setDifficulty(
                                                e.target.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
                                            )
                                        }
                                        className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    >
                                        <option value="BEGINNER">Beginner</option>
                                        <option value="INTERMEDIATE">Intermediate</option>
                                        <option value="ADVANCED">Advanced</option>
                                    </select>
                                </div>

                                {/* Estimated Hours */}
                                <div>
                                    <label
                                        htmlFor="estimatedHours"
                                        className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Estimated Hours
                                    </label>
                                    <input
                                        type="number"
                                        id="estimatedHours"
                                        min="0"
                                        value={estimatedHours}
                                        onChange={(e) =>
                                            setEstimatedHours(parseInt(e.target.value) || 0)
                                        }
                                        placeholder="e.g., 40"
                                        className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label
                                        htmlFor="imageUrl"
                                        className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                    >
                                        Course Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="imageUrl"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Prerequisites */}
                            <div>
                                <label
                                    htmlFor="prerequisites"
                                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Prerequisites (one per line)
                                </label>
                                <textarea
                                    id="prerequisites"
                                    rows={3}
                                    value={prerequisites}
                                    onChange={(e) => setPrerequisites(e.target.value)}
                                    placeholder="Basic computer skills&#10;Familiarity with command line"
                                    className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label
                                    htmlFor="tags"
                                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                >
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="javascript, react, node.js"
                                    className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                />
                            </div>

                            {/* Publish */}
                            <div className="tw-flex tw-items-center">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={isPublished}
                                    onChange={(e) => setIsPublished(e.target.checked)}
                                    className="tw-h-4 tw-w-4 tw-rounded tw-border-gray-300 tw-text-primary focus:tw-ring-primary"
                                />
                                <label
                                    htmlFor="isPublished"
                                    className="tw-ml-2 tw-block tw-text-sm tw-text-gray-700"
                                >
                                    Publish course immediately (students can enroll)
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="tw-flex tw-items-center tw-justify-end tw-space-x-4 tw-border-t tw-pt-6">
                                <Link
                                    href="/admin/courses"
                                    className="tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-2 tw-font-medium tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <i className="fas fa-spinner tw-mr-2 tw-animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus tw-mr-2" />
                                            Create Course
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
