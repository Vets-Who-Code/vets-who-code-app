import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type Submission = {
    id: string;
    submittedAt: string;
    githubUrl?: string;
    liveUrl?: string;
    notes?: string;
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
    assignment: {
        id: string;
        title: string;
        maxPoints: number;
        course: {
            id: string;
            title: string;
        };
    };
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

const GradingPage: PageWithLayout = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [grading, setGrading] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchPendingSubmissions();
    }, []);

    const fetchPendingSubmissions = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/submissions/pending");
            const data = await response.json();

            if (response.ok) {
                setSubmissions(data.submissions);
            } else {
                console.error("Failed to fetch submissions:", data.error);
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGradeSubmission = async () => {
        if (!selectedSubmission) return;

        try {
            setGrading(true);
            const response = await fetch(`/api/submissions/${selectedSubmission.id}/grade`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ score, feedback }),
            });

            const data = await response.json();

            if (response.ok) {
                // Remove graded submission from list
                setSubmissions((prev) => prev.filter((s) => s.id !== selectedSubmission.id));
                setSelectedSubmission(null);
                setScore(0);
                setFeedback("");
                alert("Submission graded successfully! Student has been notified via email.");
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error grading submission:", error);
            alert("Failed to grade submission");
        } finally {
            setGrading(false);
        }
    };

    if (sessionStatus === "loading" || loading) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading submissions...</p>
                </div>
            </div>
        );
    }

    // Check admin/instructor access
    // In development mode, allow access if there's any session (DEV_MODE creates a mock session)
    // In production, check for proper email
    const isDevelopment = process.env.NODE_ENV === "development";
    const hasAccess = isDevelopment || (session && session.user?.email === `${ADMIN_GITHUB_USERNAME}@users.noreply.github.com`);

    if (!hasAccess && (sessionStatus as string) !== "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Access Denied
                    </h1>
                    <p className="tw-text-gray-600">
                        Instructor or Administrator access required.
                    </p>
                    <Link href="/admin" className="tw-mt-4 tw-inline-block tw-text-primary">
                        ← Back to Admin
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Grade Submissions - Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                ]}
                currentPage="Grade Submissions"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Grade Submissions
                        </h1>
                        <p className="tw-text-gray-600">
                            Review and grade student assignment submissions
                        </p>
                    </div>
                    <div className="tw-flex tw-space-x-3">
                        <Link
                            href="/admin"
                            className="tw-rounded-md tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
                        >
                            <i className="fas fa-arrow-left tw-mr-2" />
                            Back to Admin
                        </Link>
                    </div>
                </div>

                {submissions.length === 0 ? (
                    <div className="tw-rounded-lg tw-bg-white tw-p-12 tw-text-center tw-shadow-md">
                        <i className="fas fa-check-circle tw-mb-4 tw-text-6xl tw-text-green-500" />
                        <h2 className="tw-mb-2 tw-text-2xl tw-font-bold tw-text-gray-900">
                            All caught up!
                        </h2>
                        <p className="tw-text-gray-600">
                            There are no pending submissions to grade at this time.
                        </p>
                    </div>
                ) : (
                    <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-3">
                        {/* Submissions List */}
                        <div className="lg:tw-col-span-1">
                            <div className="tw-mb-4 tw-rounded-lg tw-bg-blue-50 tw-p-4">
                                <h3 className="tw-font-semibold tw-text-blue-900">
                                    Pending: {submissions.length}
                                </h3>
                            </div>

                            <div className="tw-space-y-3">
                                {submissions.map((submission) => (
                                    <button
                                        type="button"
                                        key={submission.id}
                                        onClick={() => {
                                            setSelectedSubmission(submission);
                                            setScore(submission.assignment.maxPoints);
                                            setFeedback("");
                                        }}
                                        className={`tw-w-full tw-rounded-lg tw-bg-white tw-p-4 tw-text-left tw-shadow-md tw-transition-all hover:tw-shadow-lg ${
                                            selectedSubmission?.id === submission.id
                                                ? "tw-ring-2 tw-ring-primary"
                                                : ""
                                        }`}
                                    >
                                        <div className="tw-mb-2 tw-flex tw-items-center tw-space-x-2">
                                            {submission.user.image && (
                                                <img
                                                    src={submission.user.image}
                                                    alt={submission.user.name}
                                                    className="tw-h-8 tw-w-8 tw-rounded-full"
                                                />
                                            )}
                                            <div className="tw-flex-1">
                                                <p className="tw-font-semibold tw-text-gray-900">
                                                    {submission.user.name}
                                                </p>
                                                <p className="tw-text-xs tw-text-gray-500">
                                                    {submission.assignment.course.title}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="tw-text-sm tw-font-medium tw-text-gray-700">
                                            {submission.assignment.title}
                                        </p>
                                        <p className="tw-mt-1 tw-text-xs tw-text-gray-500">
                                            Submitted{" "}
                                            {new Date(submission.submittedAt).toLocaleDateString()}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grading Panel */}
                        <div className="lg:tw-col-span-2">
                            {selectedSubmission ? (
                                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                    <h2 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-gray-900">
                                        {selectedSubmission.assignment.title}
                                    </h2>

                                    {/* Student Info */}
                                    <div className="tw-mb-6 tw-rounded-lg tw-bg-gray-50 tw-p-4">
                                        <div className="tw-flex tw-items-center tw-space-x-3">
                                            {selectedSubmission.user.image && (
                                                <img
                                                    src={selectedSubmission.user.image}
                                                    alt={selectedSubmission.user.name}
                                                    className="tw-h-12 tw-w-12 tw-rounded-full"
                                                />
                                            )}
                                            <div>
                                                <p className="tw-font-semibold tw-text-gray-900">
                                                    {selectedSubmission.user.name}
                                                </p>
                                                <p className="tw-text-sm tw-text-gray-600">
                                                    {selectedSubmission.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submission Links */}
                                    <div className="tw-mb-6 tw-space-y-3">
                                        {selectedSubmission.githubUrl && (
                                            <div>
                                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                                                    GitHub Repository
                                                </label>
                                                <a
                                                    href={selectedSubmission.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tw-mt-1 tw-inline-flex tw-items-center tw-text-blue-600 hover:tw-underline"
                                                >
                                                    <i className="fab fa-github tw-mr-2" />
                                                    {selectedSubmission.githubUrl}
                                                    <i className="fas fa-external-link-alt tw-ml-2 tw-text-xs" />
                                                </a>
                                            </div>
                                        )}
                                        {selectedSubmission.liveUrl && (
                                            <div>
                                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                                                    Live Demo
                                                </label>
                                                <a
                                                    href={selectedSubmission.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tw-mt-1 tw-inline-flex tw-items-center tw-text-blue-600 hover:tw-underline"
                                                >
                                                    <i className="fas fa-globe tw-mr-2" />
                                                    {selectedSubmission.liveUrl}
                                                    <i className="fas fa-external-link-alt tw-ml-2 tw-text-xs" />
                                                </a>
                                            </div>
                                        )}
                                        {selectedSubmission.notes && (
                                            <div>
                                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                                                    Student Notes
                                                </label>
                                                <p className="tw-mt-1 tw-rounded tw-bg-gray-50 tw-p-3 tw-text-sm tw-text-gray-700">
                                                    {selectedSubmission.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Grading Form */}
                                    <div className="tw-space-y-4 tw-border-t tw-pt-6">
                                        <div>
                                            <label
                                                htmlFor="score"
                                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                            >
                                                Score (out of {selectedSubmission.assignment.maxPoints}
                                                )
                                            </label>
                                            <input
                                                type="number"
                                                id="score"
                                                min="0"
                                                max={selectedSubmission.assignment.maxPoints}
                                                value={score}
                                                onChange={(e) =>
                                                    setScore(Number(e.target.value))
                                                }
                                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="feedback"
                                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                            >
                                                Feedback (optional)
                                            </label>
                                            <textarea
                                                id="feedback"
                                                rows={6}
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                                placeholder="Provide constructive feedback for the student..."
                                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleGradeSubmission}
                                            disabled={grading}
                                            className="tw-w-full tw-rounded-md tw-bg-primary tw-px-4 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                                        >
                                            {grading ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin tw-mr-2" />
                                                    Grading...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-check tw-mr-2" />
                                                    Submit Grade & Notify Student
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="tw-rounded-lg tw-bg-gray-50 tw-p-12 tw-text-center">
                                    <i className="fas fa-hand-pointer tw-mb-4 tw-text-4xl tw-text-gray-400" />
                                    <p className="tw-text-gray-600">
                                        Select a submission from the left to begin grading
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

GradingPage.Layout = Layout01;

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

export default GradingPage;
