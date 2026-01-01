import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type Submission = {
    id: string;
    githubUrl: string | null;
    liveUrl: string | null;
    notes: string | null;
    status: string;
    score: number | null;
    feedback: string | null;
    submittedAt: string;
    gradedAt: string | null;
    assignment: {
        id: string;
        title: string;
        description: string;
        dueDate: string | null;
        maxPoints: number;
        course: {
            id: string;
            title: string;
        };
    };
};

type PageWithLayout = NextPage & {
    Layout?: typeof Layout01;
};

const SubmissionsPage: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "graded" | "pending">("all");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/submissions");
            return;
        }

        if (status === "authenticated") {
            fetchSubmissions();
        }
    }, [status, router]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/lms/submissions");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch submissions");
            }

            setSubmissions(data.submissions);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load submissions");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            SUBMITTED: "tw-bg-blue-100 tw-text-blue-800",
            GRADED: "tw-bg-green-100 tw-text-green-800",
            RETURNED: "tw-bg-yellow-100 tw-text-yellow-800",
        };
        return (
            <span
                className={`tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-semibold ${
                    styles[status as keyof typeof styles] || styles.SUBMITTED
                }`}
            >
                {status}
            </span>
        );
    };

    const filteredSubmissions = submissions.filter((submission) => {
        if (filter === "all") return true;
        if (filter === "graded") return submission.status === "GRADED";
        if (filter === "pending") return submission.status === "SUBMITTED";
        return true;
    });

    if (loading) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-300">Loading submissions...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title="My Submissions" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/dashboard", label: "dashboard" },
                ]}
                currentPage="My Submissions"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-ink">
                            My Submissions
                        </h1>
                        <p className="tw-text-gray-300">
                            Track your assignment submissions and view feedback
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-arrow-left tw-mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                {error && (
                    <div className="tw-mb-6 tw-rounded-md tw-bg-red-50 tw-p-4 tw-text-red-800">
                        <div className="tw-flex">
                            <i className="fas fa-exclamation-circle tw-mr-2 tw-text-red-400" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {/* Filter Buttons */}
                <div className="tw-mb-6 tw-flex tw-space-x-2">
                    <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className={`tw-rounded-md tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors ${
                            filter === "all"
                                ? "tw-bg-primary tw-text-white"
                                : "tw-bg-gray-100 tw-text-gray-200 hover:tw-bg-gray-50"
                        }`}
                    >
                        All ({submissions.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter("pending")}
                        className={`tw-rounded-md tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors ${
                            filter === "pending"
                                ? "tw-bg-primary tw-text-white"
                                : "tw-bg-gray-100 tw-text-gray-200 hover:tw-bg-gray-50"
                        }`}
                    >
                        Pending ({submissions.filter((s) => s.status === "SUBMITTED").length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter("graded")}
                        className={`tw-rounded-md tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors ${
                            filter === "graded"
                                ? "tw-bg-primary tw-text-white"
                                : "tw-bg-gray-100 tw-text-gray-200 hover:tw-bg-gray-50"
                        }`}
                    >
                        Graded ({submissions.filter((s) => s.status === "GRADED").length})
                    </button>
                </div>

                {/* Submissions List */}
                {filteredSubmissions.length === 0 ? (
                    <div className="tw-rounded-lg tw-bg-white tw-p-12 tw-text-center tw-shadow-md">
                        <i className="fas fa-inbox tw-mb-4 tw-text-5xl tw-text-gray-400" />
                        <h3 className="tw-mb-2 tw-text-xl tw-font-semibold tw-text-gray-200">
                            No submissions yet
                        </h3>
                        <p className="tw-mb-6 tw-text-gray-500">
                            {filter === "all"
                                ? "You haven't submitted any assignments yet."
                                : `No ${filter} submissions.`}
                        </p>
                        <Link
                            href="/courses"
                            className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-medium tw-text-white tw-transition-colors"
                        >
                            <i className="fas fa-book tw-mr-2" />
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="tw-space-y-4">
                        {filteredSubmissions.map((submission) => (
                            <div
                                key={submission.id}
                                className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md tw-transition-shadow hover:tw-shadow-lg"
                            >
                                <div className="tw-mb-4 tw-flex tw-items-start tw-justify-between">
                                    <div className="tw-flex-1">
                                        <div className="tw-mb-2 tw-flex tw-items-center tw-space-x-3">
                                            <h3 className="tw-text-lg tw-font-semibold tw-text-ink">
                                                {submission.assignment.title}
                                            </h3>
                                            {getStatusBadge(submission.status)}
                                        </div>
                                        <p className="tw-text-sm tw-text-gray-500">
                                            {submission.assignment.course.title}
                                        </p>
                                    </div>

                                    {submission.score !== null && (
                                        <div className="tw-ml-4 tw-text-right">
                                            <div className="tw-text-2xl tw-font-bold tw-text-primary">
                                                {submission.score}/{submission.assignment.maxPoints}
                                            </div>
                                            <div className="tw-text-xs tw-text-gray-500">
                                                {Math.round(
                                                    (submission.score / submission.assignment.maxPoints) *
                                                        100
                                                )}
                                                %
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="tw-mb-4 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
                                    {submission.githubUrl && (
                                        <div>
                                            <p className="tw-mb-1 tw-text-xs tw-font-medium tw-text-gray-500">
                                                GitHub Repository
                                            </p>
                                            <a
                                                href={submission.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tw-flex tw-items-center tw-text-sm tw-text-primary hover:tw-underline"
                                            >
                                                <i className="fab fa-github tw-mr-2" />
                                                View Code
                                                <i className="fas fa-external-link-alt tw-ml-1 tw-text-xs" />
                                            </a>
                                        </div>
                                    )}

                                    {submission.liveUrl && (
                                        <div>
                                            <p className="tw-mb-1 tw-text-xs tw-font-medium tw-text-gray-500">
                                                Live Demo
                                            </p>
                                            <a
                                                href={submission.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tw-flex tw-items-center tw-text-sm tw-text-primary hover:tw-underline"
                                            >
                                                <i className="fas fa-globe tw-mr-2" />
                                                View App
                                                <i className="fas fa-external-link-alt tw-ml-1 tw-text-xs" />
                                            </a>
                                        </div>
                                    )}

                                    <div>
                                        <p className="tw-mb-1 tw-text-xs tw-font-medium tw-text-gray-500">
                                            Submitted
                                        </p>
                                        <p className="tw-text-sm tw-text-gray-200">
                                            {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                                            {new Date(submission.submittedAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>

                                {submission.notes && (
                                    <div className="tw-mb-4 tw-rounded-md tw-bg-gray-50 tw-p-4">
                                        <p className="tw-mb-1 tw-text-xs tw-font-medium tw-text-gray-500">
                                            Your Notes
                                        </p>
                                        <p className="tw-text-sm tw-text-gray-200">
                                            {submission.notes}
                                        </p>
                                    </div>
                                )}

                                {submission.feedback && (
                                    <div className="tw-rounded-md tw-border-l-4 tw-border-primary tw-bg-blue-50 tw-p-4">
                                        <p className="tw-mb-2 tw-flex tw-items-center tw-text-xs tw-font-medium tw-text-primary">
                                            <i className="fas fa-comment-alt tw-mr-2" />
                                            Instructor Feedback
                                            {submission.gradedAt && (
                                                <span className="tw-ml-auto tw-text-gray-500">
                                                    {new Date(submission.gradedAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </p>
                                        <p className="tw-text-sm tw-text-blue-900">
                                            {submission.feedback}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

SubmissionsPage.Layout = Layout01;

export default SubmissionsPage;
