import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type AssignmentData = {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    dueDate: string;
    module: string;
    lesson: string;
    maxFileSize: string;
    allowedFormats: string[];
};

type PageProps = {
    assignment: AssignmentData;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const AssignmentSubmissionPage: PageWithLayout = ({ assignment }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Prepare submission data
            // Note: File upload to cloud storage (S3, Cloudinary) not implemented
            // Files would need to be uploaded first, then URLs passed to API
            const submissionData = {
                assignmentId: assignment.id,
                githubUrl: githubUrl || undefined,
                liveUrl: liveUrl || undefined,
                notes: notes || undefined,
                // files: would contain array of uploaded file URLs
            };

            const response = await fetch("/api/lms/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit assignment. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting assignment:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading assignment...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        router.push("/courses");
        return null;
    }

    if (submitted) {
        return (
            <>
                <SEO title="Assignment Submitted" />
                <Breadcrumb
                    pages={[
                        { path: "/", label: "home" },
                        { path: "/courses", label: "courses" },
                        { path: "/courses/web-development", label: "web development" },
                    ]}
                    currentPage="Assignment Submitted"
                    showTitle={false}
                />

                <div className="tw-container tw-py-16">
                    <div className="tw-mx-auto tw-max-w-2xl tw-text-center">
                        <div className="tw-mb-8">
                            <div className="tw-mx-auto tw-mb-4 tw-flex tw-h-20 tw-w-20 tw-items-center tw-justify-center tw-rounded-full tw-bg-green-100">
                                <i className="fas fa-check tw-text-3xl tw-text-green-600" />
                            </div>
                            <h1 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-gray-900">
                                Assignment Submitted Successfully!
                            </h1>
                            <p className="tw-text-xl tw-text-gray-600">
                                Your submission for &quot;{assignment.title}&quot; has been received
                                and will be reviewed by your mentor.
                            </p>
                        </div>

                        <div className="tw-mb-8 tw-rounded-lg tw-bg-blue-50 tw-p-6">
                            <h3 className="tw-mb-2 tw-font-semibold tw-text-blue-900">
                                What happens next?
                            </h3>
                            <ul className="tw-space-y-2 tw-text-left tw-text-blue-800">
                                <li className="tw-flex tw-items-center">
                                    <i className="fas fa-clock tw-mr-2 tw-text-blue-600" />
                                    Your mentor will review your submission within 2-3 business days
                                </li>
                                <li className="tw-flex tw-items-center">
                                    <i className="fas fa-comments tw-mr-2 tw-text-blue-600" />
                                    You&apos;ll receive detailed feedback on your work
                                </li>
                                <li className="tw-flex tw-items-center">
                                    <i className="fas fa-trophy tw-mr-2 tw-text-blue-600" />
                                    Upon approval, you can continue to the next lesson
                                </li>
                            </ul>
                        </div>

                        <div className="tw-flex tw-flex-col tw-justify-center tw-space-y-4 sm:tw-flex-row sm:tw-space-x-4 sm:tw-space-y-0">
                            <Link
                                href="/dashboard"
                                className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-medium tw-text-white tw-transition-colors"
                            >
                                <i className="fas fa-tachometer-alt tw-mr-2" />
                                Go to Dashboard
                            </Link>
                            <Link
                                href="/courses/web-development"
                                className="tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-medium tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-book tw-mr-2" />
                                Back to Course
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title={`Submit Assignment: ${assignment.title}`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                    { path: "/courses/web-development", label: "web development" },
                ]}
                currentPage={`Submit: ${assignment.title}`}
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                <div className="tw-mx-auto tw-max-w-4xl">
                    {/* Assignment Header */}
                    <div className="tw-mb-8">
                        <div className="tw-mb-2 tw-text-sm tw-text-gray-600">
                            {assignment.module} • {assignment.lesson}
                        </div>
                        <h1 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Submit Assignment: {assignment.title}
                        </h1>
                        <p className="tw-text-gray-600">{assignment.description}</p>
                    </div>

                    <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                        {/* Assignment Details */}
                        <div className="lg:tw-col-span-1">
                            <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                    Assignment Requirements
                                </h3>
                                <ul className="tw-space-y-2">
                                    {assignment.requirements.map((requirement) => (
                                        <li
                                            key={requirement}
                                            className="tw-flex tw-items-start tw-text-gray-700"
                                        >
                                            <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-green-500" />
                                            {requirement}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="tw-mb-6 tw-rounded-lg tw-bg-orange-50 tw-p-6">
                                <h3 className="tw-mb-2 tw-font-semibold tw-text-orange-900">
                                    <i className="fas fa-exclamation-triangle tw-mr-2" />
                                    Important Information
                                </h3>
                                <div className="tw-space-y-2 tw-text-sm tw-text-orange-800">
                                    <p>
                                        <strong>Due Date:</strong> {assignment.dueDate}
                                    </p>
                                    <p>
                                        <strong>Max File Size:</strong> {assignment.maxFileSize}
                                    </p>
                                    <p>
                                        <strong>Allowed Formats:</strong>{" "}
                                        {assignment.allowedFormats.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <div className="lg:tw-col-span-2">
                            <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                                {error && (
                                    <div className="tw-mb-6 tw-rounded-md tw-bg-red-100 tw-px-4 tw-py-3 tw-text-sm tw-text-red-800">
                                        <i className="fas fa-exclamation-circle tw-mr-2" />
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="tw-space-y-6">
                                    {/* GitHub Repository URL */}
                                    <div>
                                        <label
                                            htmlFor="github-url"
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            GitHub Repository URL (Recommended)
                                        </label>
                                        <input
                                            type="url"
                                            id="github-url"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            placeholder="https://github.com/username/repository"
                                            className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-gray-900 tw-placeholder-gray-500 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                        />
                                        <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
                                            Share your code via GitHub for easy review and
                                            collaboration
                                        </p>
                                    </div>

                                    {/* Live Demo URL */}
                                    <div>
                                        <label
                                            htmlFor="live-url"
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            Live Demo URL (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            id="live-url"
                                            value={liveUrl}
                                            onChange={(e) => setLiveUrl(e.target.value)}
                                            placeholder="https://your-project.vercel.app"
                                            className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-gray-900 tw-placeholder-gray-500 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                        />
                                        <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
                                            Provide a link to your deployed application
                                        </p>
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label
                                            htmlFor="files"
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            Upload Files (Alternative to GitHub)
                                        </label>
                                        
                                        {/* Warning Banner */}
                                        <div className="tw-mb-3 tw-rounded-md tw-bg-yellow-50 tw-border tw-border-yellow-200 tw-px-4 tw-py-3">
                                            <div className="tw-flex">
                                                <div className="tw-flex-shrink-0">
                                                    <i className="fas fa-exclamation-triangle tw-text-yellow-600" />
                                                </div>
                                                <div className="tw-ml-3">
                                                    <p className="tw-text-sm tw-text-yellow-800">
                                                        <strong>File uploads are not yet functional.</strong> Please use the GitHub Repository URL or Live Demo URL fields above to submit your work.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="tw-relative tw-opacity-50 tw-pointer-events-none">
                                            <input
                                                type="file"
                                                id="files"
                                                multiple
                                                onChange={handleFileChange}
                                                accept={assignment.allowedFormats
                                                    .map((format) => `.${format}`)
                                                    .join(",")}
                                                className="tw-sr-only"
                                                disabled
                                            />
                                            <label
                                                htmlFor="files"
                                                className="tw-flex tw-cursor-not-allowed tw-items-center tw-justify-center tw-rounded-md tw-border-2 tw-border-dashed tw-border-gray-300 tw-bg-gray-50 tw-py-6"
                                            >
                                                <span className="tw-sr-only">
                                                    Choose files to upload
                                                </span>
                                                <div className="tw-text-center">
                                                    <i className="fas fa-cloud-upload-alt tw-mb-2 tw-text-2xl tw-text-gray-400" />
                                                    <p className="tw-text-sm tw-text-gray-600">
                                                        <span className="tw-font-medium tw-text-gray-600">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="tw-text-xs tw-text-gray-500">
                                                        {assignment.allowedFormats.join(", ")} up to{" "}
                                                        {assignment.maxFileSize}
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        {files && files.length > 0 && (
                                            <div className="tw-mt-2">
                                                <p className="tw-text-sm tw-font-medium tw-text-gray-700">
                                                    Selected files:
                                                </p>
                                                <ul className="tw-mt-1 tw-space-y-1">
                                                    {Array.from(files).map((file) => (
                                                        <li
                                                            key={`${file.name}-${file.size}`}
                                                            className="tw-text-sm tw-text-gray-600"
                                                        >
                                                            {file.name} (
                                                            {Math.round(file.size / 1024)} KB)
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label
                                            htmlFor="notes"
                                            className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                        >
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            rows={4}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Any additional information about your submission, challenges faced, or questions for your mentor..."
                                            className="tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-gray-900 tw-placeholder-gray-500 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-pt-6">
                                        <Link
                                            href="/courses/web-development/1/1"
                                            className="hover:tw-text-primary-dark tw-text-primary tw-transition-colors"
                                        >
                                            <i className="fas fa-arrow-left tw-mr-2" />
                                            Back to Lesson
                                        </Link>

                                        <button
                                            type="submit"
                                            disabled={
                                                submitting ||
                                                (!githubUrl && !liveUrl)
                                            }
                                            className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-medium tw-text-white tw-transition-colors disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                                        >
                                            {submitting ? (
                                                <>
                                                    <i className="fas fa-spinner tw-mr-2 tw-animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-paper-plane tw-mr-2" />
                                                    Submit Assignment
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AssignmentSubmissionPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
    const { assignmentId } = params as { assignmentId: string };

    // Mock assignment data - in real implementation, fetch from database
    const mockAssignments: Record<string, AssignmentData> = {
        "1-1": {
            id: "1-1",
            title: "Create Your First HTML Page",
            description:
                "Create a simple HTML page that showcases proper document structure and semantic elements.",
            requirements: [
                "Use proper HTML5 document structure (DOCTYPE, html, head, body)",
                "Include at least 5 different semantic elements (header, nav, main, section, footer)",
                "Add a navigation menu with at least 3 links",
                "Include an image with proper alt text for accessibility",
                "Validate your HTML using the W3C HTML validator",
            ],
            dueDate: "September 5, 2025",
            module: "HTML Fundamentals",
            lesson: "Introduction to HTML",
            maxFileSize: "10 MB",
            allowedFormats: ["html", "css", "js", "zip", "pdf"],
        },
        "1-2": {
            id: "1-2",
            title: "Build a Personal Bio Page",
            description:
                "Create a comprehensive personal biography page using various HTML elements and attributes.",
            requirements: [
                "Use all heading levels (h1-h6) appropriately in a hierarchical structure",
                "Include both ordered and unordered lists with proper content",
                "Add multiple images with descriptive alt text",
                "Create internal page navigation using anchor links",
                "Use proper semantic structure throughout the document",
            ],
            dueDate: "September 8, 2025",
            module: "HTML Fundamentals",
            lesson: "HTML Elements and Attributes",
            maxFileSize: "10 MB",
            allowedFormats: ["html", "css", "js", "zip", "pdf"],
        },
    };

    const assignment = mockAssignments[assignmentId];

    if (!assignment) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            assignment,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AssignmentSubmissionPage;
