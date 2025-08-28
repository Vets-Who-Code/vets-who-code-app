import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type LessonData = {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    duration: string;
    content: string;
    assignment?: {
        title: string;
        description: string;
        requirements: string[];
        submissionUrl?: string;
    };
    nextLesson?: {
        moduleId: string;
        lessonId: string;
        title: string;
    };
    prevLesson?: {
        moduleId: string;
        lessonId: string;
        title: string;
    };
};

type ModuleData = {
    id: string;
    title: string;
    description: string;
    totalLessons: number;
};

type PageProps = {
    lesson: LessonData;
    module: ModuleData;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

// Assignment Component
const AssignmentSection: React.FC<{
    assignment: LessonData["assignment"];
    showAssignment: boolean;
    setShowAssignment: (show: boolean) => void;
}> = ({ assignment, showAssignment, setShowAssignment }) => {
    if (!assignment) return null;

    return (
        <div className="tw-mb-8 tw-rounded-lg tw-border tw-border-orange-200 tw-bg-orange-50 tw-p-6">
            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                <h3 className="tw-text-xl tw-font-bold tw-text-orange-900">
                    <i className="fas fa-tasks tw-mr-2" />
                    Assignment: {assignment.title}
                </h3>
                <button
                    type="button"
                    onClick={() => setShowAssignment(!showAssignment)}
                    className="tw-text-orange-600 hover:tw-text-orange-800"
                >
                    {showAssignment ? (
                        <i className="fas fa-chevron-up" />
                    ) : (
                        <i className="fas fa-chevron-down" />
                    )}
                </button>
            </div>

            {showAssignment && (
                <div>
                    <p className="tw-mb-4 tw-text-orange-800">{assignment.description}</p>

                    <h4 className="tw-mb-2 tw-font-semibold tw-text-orange-900">Requirements:</h4>
                    <ul className="tw-mb-4 tw-space-y-1">
                        {assignment.requirements.map((req) => (
                            <li key={req} className="tw-flex tw-items-start tw-text-orange-800">
                                <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-orange-600" />
                                {req}
                            </li>
                        ))}
                    </ul>

                    {assignment.submissionUrl && (
                        <Link
                            href={assignment.submissionUrl}
                            className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-orange-600 tw-px-4 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-orange-700"
                        >
                            <i className="fas fa-upload tw-mr-2" />
                            Submit Assignment
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

const LessonPage: PageWithLayout = ({ lesson, module }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [completed, setCompleted] = useState(false);
    const [showAssignment, setShowAssignment] = useState(false);

    useEffect(() => {
        // TODO: Check if lesson is completed from database
        // For now, check localStorage for demo
        const lessonKey = `lesson_${lesson.id}_completed`;
        setCompleted(localStorage.getItem(lessonKey) === "true");
    }, [lesson.id]);

    const markAsCompleted = () => {
        // TODO: Update database with lesson completion
        // For now, use localStorage for demo
        const lessonKey = `lesson_${lesson.id}_completed`;
        localStorage.setItem(lessonKey, "true");
        setCompleted(true);
    };

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading lesson...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        router.push("/courses");
        return null;
    }

    return (
        <>
            <SEO title={`${lesson.title} - ${module.title}`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                    { path: "/courses/web-development", label: "web development" },
                ]}
                currentPage={lesson.title}
                showTitle={false}
            />

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-8 tw-flex tw-flex-col tw-items-start tw-justify-between lg:tw-flex-row lg:tw-items-center">
                    <div className="tw-mb-4 tw-flex-1 lg:tw-mb-0">
                        <div className="tw-mb-2 tw-text-sm tw-text-gray-600">{module.title}</div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                            {lesson.title}
                        </h1>
                        <p className="tw-text-gray-600">{lesson.description}</p>
                    </div>
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <div className="tw-text-sm tw-text-gray-500">
                            <i className="fas fa-clock tw-mr-1" />
                            {lesson.duration}
                        </div>
                        {completed && (
                            <div className="tw-flex tw-items-center tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-green-800">
                                <i className="fas fa-check tw-mr-1" />
                                Completed
                            </div>
                        )}
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-4">
                    {/* Main Content */}
                    <div className="lg:tw-col-span-3">
                        {/* Video Player */}
                        {lesson.videoUrl && (
                            <div className="tw-mb-8">
                                <div className="tw-aspect-video tw-overflow-hidden tw-rounded-lg tw-bg-gray-900">
                                    <iframe
                                        src={lesson.videoUrl}
                                        title={lesson.title}
                                        className="tw-h-full tw-w-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Lesson Content */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h2 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-gray-900">
                                Lesson Content
                            </h2>
                            <div
                                className="tw-prose tw-prose-lg tw-max-w-none"
                                dangerouslySetInnerHTML={{ __html: lesson.content }}
                            />
                        </div>

                        {/* Assignment Section */}
                        <AssignmentSection
                            assignment={lesson.assignment}
                            showAssignment={showAssignment}
                            setShowAssignment={setShowAssignment}
                        />

                        {/* Lesson Navigation */}
                        <div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-pt-8">
                            <div>
                                {lesson.prevLesson && (
                                    <Link
                                        href={`/courses/web-development/${lesson.prevLesson.moduleId}/${lesson.prevLesson.lessonId}`}
                                        className="hover:tw-text-primary-dark tw-inline-flex tw-items-center tw-text-primary tw-transition-colors"
                                    >
                                        <i className="fas fa-chevron-left tw-mr-2" />
                                        Previous: {lesson.prevLesson.title}
                                    </Link>
                                )}
                            </div>

                            <div className="tw-flex tw-items-center tw-space-x-4">
                                {!completed && (
                                    <button
                                        type="button"
                                        onClick={markAsCompleted}
                                        className="tw-rounded-md tw-bg-green-600 tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-green-700"
                                    >
                                        <i className="fas fa-check tw-mr-2" />
                                        Mark as Complete
                                    </button>
                                )}

                                {lesson.nextLesson && (
                                    <Link
                                        href={`/courses/web-development/${lesson.nextLesson.moduleId}/${lesson.nextLesson.lessonId}`}
                                        className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors"
                                    >
                                        Next: {lesson.nextLesson.title}
                                        <i className="fas fa-chevron-right tw-ml-2" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:tw-col-span-1">
                        {/* Course Progress */}
                        <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                Course Progress
                            </h3>
                            <div className="tw-mb-2 tw-flex tw-justify-between tw-text-sm tw-text-gray-600">
                                <span>Module Progress</span>
                                <span>3/12 lessons</span>
                            </div>
                            <div className="tw-mb-4 tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-200">
                                <div className="tw-h-2 tw-w-[25%] tw-rounded-full tw-bg-blue-600" />
                            </div>

                            <div className="tw-mb-2 tw-flex tw-justify-between tw-text-sm tw-text-gray-600">
                                <span>Overall Progress</span>
                                <span>15%</span>
                            </div>
                            <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-200">
                                <div className="tw-h-2 tw-w-[15%] tw-rounded-full tw-bg-green-600" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                Quick Links
                            </h3>
                            <div className="tw-space-y-2">
                                <Link
                                    href="/courses/web-development"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-book tw-mr-2" />
                                    Course Overview
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-tachometer-alt tw-mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/assignments"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-tasks tw-mr-2" />
                                    All Assignments
                                </Link>
                                <Link
                                    href="/support"
                                    className="hover:tw-text-primary-dark tw-block tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-question-circle tw-mr-2" />
                                    Get Help
                                </Link>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                Lesson Resources
                            </h3>
                            <div className="tw-space-y-2">
                                <button
                                    type="button"
                                    className="hover:tw-text-primary-dark tw-block tw-w-full tw-text-left tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-download tw-mr-2" />
                                    Download Code Files
                                </button>
                                <button
                                    type="button"
                                    className="hover:tw-text-primary-dark tw-block tw-w-full tw-text-left tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-external-link-alt tw-mr-2" />
                                    HTML Documentation
                                </button>
                                <button
                                    type="button"
                                    className="hover:tw-text-primary-dark tw-block tw-w-full tw-text-left tw-text-primary tw-transition-colors"
                                >
                                    <i className="fas fa-users tw-mr-2" />
                                    Discussion Forum
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

LessonPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
    const { moduleId, lessonId } = params as { moduleId: string; lessonId: string };

    // Mock data - in real implementation, fetch from database
    const mockLessons: Record<string, Record<string, LessonData>> = {
        "1": {
            "1": {
                id: "1-1",
                title: "Introduction to HTML",
                description: "Learn the fundamentals of HTML and semantic markup",
                videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
                duration: "45 minutes",
                content: `
                    <h3>Welcome to HTML Fundamentals</h3>
                    <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup elements.</p>
                    
                    <h4>What you'll learn:</h4>
                    <ul>
                        <li>HTML document structure</li>
                        <li>Common HTML elements</li>
                        <li>Semantic markup principles</li>
                        <li>Best practices for accessibility</li>
                    </ul>
                    
                    <h4>Key Concepts:</h4>
                    <p>HTML elements are the building blocks of HTML pages. They are represented by tags, which label pieces of content such as "heading", "paragraph", "table", and so on.</p>
                `,
                assignment: {
                    title: "Create Your First HTML Page",
                    description:
                        "Create a simple HTML page that showcases proper document structure and semantic elements.",
                    requirements: [
                        "Use proper HTML5 document structure",
                        "Include at least 5 different semantic elements",
                        "Add a navigation menu with links",
                        "Include an image with proper alt text",
                        "Validate your HTML using W3C validator",
                    ],
                    submissionUrl: "/assignments/submit/1-1",
                },
                nextLesson: {
                    moduleId: "1",
                    lessonId: "2",
                    title: "HTML Elements and Attributes",
                },
            },
            "2": {
                id: "1-2",
                title: "HTML Elements and Attributes",
                description: "Dive deeper into HTML elements and their attributes",
                videoUrl: "https://www.youtube.com/embed/88PXJAA6szs",
                duration: "50 minutes",
                content: `
                    <h3>Understanding HTML Elements and Attributes</h3>
                    <p>In this lesson, we'll explore the various HTML elements and how attributes provide additional information about elements.</p>
                    
                    <h4>Common HTML Elements:</h4>
                    <ul>
                        <li><strong>Headings:</strong> h1, h2, h3, h4, h5, h6</li>
                        <li><strong>Text:</strong> p, span, strong, em</li>
                        <li><strong>Lists:</strong> ul, ol, li</li>
                        <li><strong>Links:</strong> a</li>
                        <li><strong>Images:</strong> img</li>
                    </ul>
                    
                    <h4>Essential Attributes:</h4>
                    <p>Attributes provide additional information about elements and are always specified in the start tag.</p>
                `,
                assignment: {
                    title: "Build a Personal Bio Page",
                    description:
                        "Create a comprehensive personal biography page using various HTML elements and attributes.",
                    requirements: [
                        "Use all heading levels appropriately",
                        "Include both ordered and unordered lists",
                        "Add multiple images with descriptive alt text",
                        "Create internal page navigation with anchor links",
                        "Use proper semantic structure throughout",
                    ],
                    submissionUrl: "/assignments/submit/1-2",
                },
                prevLesson: {
                    moduleId: "1",
                    lessonId: "1",
                    title: "Introduction to HTML",
                },
                nextLesson: {
                    moduleId: "1",
                    lessonId: "3",
                    title: "Forms and Input Elements",
                },
            },
        },
    };

    const lesson = mockLessons[moduleId]?.[lessonId];

    if (!lesson) {
        return {
            notFound: true,
        };
    }

    const moduleData: ModuleData = {
        id: moduleId,
        title: "HTML Fundamentals",
        description: "Learn the building blocks of the web with semantic HTML",
        totalLessons: 12,
    };

    return {
        props: {
            lesson,
            module: moduleData,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default LessonPage;
