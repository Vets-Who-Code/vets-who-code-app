import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import type { Role } from "@/lib/rbac";

type Submission = {
    id: string;
    githubUrl: string | null;
    liveUrl: string | null;
    notes: string | null;
    status: string;
    submittedAt: string;
    user: {
        id: string;
        name: string | null;
        email: string;
    };
    assignment: {
        id: string;
        title: string;
        totalPoints: number;
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

const InstructorGrading: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [grading, setGrading] = useState<string | null>(null);
    const [score, setScore] = useState<Record<string, number>>({});
    const [feedback, setFeedback] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!session) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/lms/submissions/pending");
                const data = await response.json();

                if (response.ok && data.submissions) {
                    setSubmissions(data.submissions);
                }
            } catch (err) {
                console.error("Error fetching submissions:", err);
                setError("Failed to load submissions");
            } finally {
                setLoading(false);
            }
        };

        if (status !== "loading") {
            fetchSubmissions();
        }
    }, [session, status]);

    const handleGrade = async (submissionId: string) => {
        setGrading(submissionId);
        setError(null);

        try {
            const response = await fetch(`/api/lms/submissions/${submissionId}/grade`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    score: score[submissionId],
                    feedback: feedback[submissionId],
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Remove graded submission from list
                setSubmissions(submissions.filter((s) => s.id !== submissionId));
                // Clear form data
                setScore({ ...score, [submissionId]: 0 });
                setFeedback({ ...feedback, [submissionId]: "" });
            } else {
                setError(data.error || "Failed to grade submission");
            }
        } catch (err) {
            console.error("Error grading submission:", err);
            setError("An unexpected error occurred");
        } finally {
            setGrading(null);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading submissions...</p>
                </div>
            </div>
        );
    }

    const userRole = (session?.user as any)?.role as Role | undefined;
    if (!session || !["INSTRUCTOR", "MENTOR", "ADMIN"].includes(userRole || "")) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Access Denied
                    </h1>
                    <p className="tw-text-gray-600">
                        This page is only accessible to instructors, mentors, and admins.
                    </p>
                    <Link
                        href="/dashboard"
                        className="tw-mt-4 tw-inline-block tw-text-primary"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Grade Submissions - Instructor Dashboard" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/instructor", label: "instructor" },
                ]}
                currentPage="Grade Submissions"
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                <div className="tw-mb-8">
                    <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                        Grade Submissions
                    </h1>
                    <p className="tw-text-gray-600">
                        Review and grade student assignment submissions
                    </p>
                </div>

                {error && (
                    <div className="tw-mb-6 tw-rounded-md tw-bg-red-100 tw-px-4 tw-py-3 tw-text-sm tw-text-red-800">
                        <i className="fas fa-exclamation-circle tw-mr-2" />
                        {error}
                    </div>
                )}

                <div className="tw-mb-6 tw-rounded-lg tw-bg-blue-50 tw-p-4 tw-text-sm tw-text-blue-800">
                    <i className="fas fa-info-circle tw-mr-2" />
                    {submissions.length} pending submission{submissions.length !== 1 ? "s" : ""}{" "}
                    to review
                </div>

                {submissions.length > 0 ? (
                    <div className="tw-space-y-6">
                        {submissions.map((submission) => (
                            <div
                                key={submission.id}
                                className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md"
                            >
                                <div className="tw-mb-4 tw-flex tw-items-start tw-justify-between">
                                    <div>
                                        <h3 className="tw-mb-1 tw-text-xl tw-font-semibold tw-text-gray-900">
                                            {submission.assignment.title}
                                        </h3>
                                        <p className="tw-text-gray-600">
                                            Submitted by {submission.user.name || submission.user.email}
                                        </p>
                                        <p className="tw-text-sm tw-text-gray-500">
                                            {new Date(submission.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className="tw-rounded-full tw-bg-yellow-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-yellow-800">
                                        Pending Review
                                    </span>
                                </div>

                                <div className="tw-mb-4 tw-space-y-2 tw-border-t tw-pt-4">
                                    {submission.githubUrl && (
                                        <div>
                                            <strong className="tw-text-gray-700">GitHub:</strong>{" "}
                                            <a
                                                href={submission.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tw-text-primary hover:tw-underline"
                                            >
                                                {submission.githubUrl}
                                            </a>
                                        </div>
                                    )}
                                    {submission.liveUrl && (
                                        <div>
                                            <strong className="tw-text-gray-700">Live Demo:</strong>{" "}
                                            <a
                                                href={submission.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tw-text-primary hover:tw-underline"
                                            >
                                                {submission.liveUrl}
                                            </a>
                                        </div>
                                    )}
                                    {submission.notes && (
                                        <div>
                                            <strong className="tw-text-gray-700">Notes:</strong>
                                            <p className="tw-mt-1 tw-text-gray-600">{submission.notes}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-border-t tw-pt-4 md:tw-grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor={`score-${submission.id}`}
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            Score (out of {submission.assignment.totalPoints})
                                        </label>
                                        <input
                                            type="number"
                                            id={`score-${submission.id}`}
                                            min="0"
                                            max={submission.assignment.totalPoints}
                                            value={score[submission.id] || ""}
                                            onChange={(e) =>
                                                setScore({
                                                    ...score,
                                                    [submission.id]: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                        />
                                    </div>

                                    <div className="md:tw-col-span-2">
                                        <label
                                            htmlFor={`feedback-${submission.id}`}
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            Feedback
                                        </label>
                                        <textarea
                                            id={`feedback-${submission.id}`}
                                            rows={3}
                                            value={feedback[submission.id] || ""}
                                            onChange={(e) =>
                                                setFeedback({
                                                    ...feedback,
                                                    [submission.id]: e.target.value,
                                                })
                                            }
                                            placeholder="Provide constructive feedback for the student..."
                                            className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="tw-mt-4 tw-flex tw-justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleGrade(submission.id)}
                                        disabled={
                                            grading === submission.id ||
                                            !score[submission.id] ||
                                            !feedback[submission.id]
                                        }
                                        className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                                    >
                                        {grading === submission.id ? (
                                            <>
                                                <i className="fas fa-spinner tw-mr-2 tw-animate-spin" />
                                                Grading...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-check tw-mr-2" />
                                                Submit Grade
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="tw-rounded-lg tw-border-2 tw-border-dashed tw-border-gray-300 tw-bg-gray-50 tw-p-12 tw-text-center">
                        <i className="fas fa-check-circle tw-mb-4 tw-text-5xl tw-text-gray-400" />
                        <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-gray-900">
                            All Caught Up!
                        </h3>
                        <p className="tw-text-gray-600">
                            There are no pending submissions to review at this time.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

InstructorGrading.Layout = Layout01;

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

export default InstructorGrading;
