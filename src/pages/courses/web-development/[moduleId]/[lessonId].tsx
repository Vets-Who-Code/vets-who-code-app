import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import { AITeachingAssistant } from "@components/ai-assistant";
import { PrismaClient } from '@prisma/client';

type LessonData = {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    duration: string;
    content: string;
    audioUrl?: string;
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
        <div className="tw-mb-8 tw-rounded-lg tw-border tw-border-red-signal/30 tw-bg-red-signal/10 tw-p-6">
            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                <h3 className="tw-text-xl tw-font-bold tw-text-red-maroon">
                    <i className="fas fa-tasks tw-mr-2" />
                    Assignment: {assignment.title}
                </h3>
                <button
                    type="button"
                    onClick={() => setShowAssignment(!showAssignment)}
                    className="tw-text-red hover:tw-text-red-dark"
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
                    <p className="tw-mb-4 tw-text-red-dark">{assignment.description}</p>

                    <h4 className="tw-mb-2 tw-font-semibold tw-text-red-maroon">Requirements:</h4>
                    <ul className="tw-mb-4 tw-space-y-1">
                        {assignment.requirements.map((req) => (
                            <li key={req} className="tw-flex tw-items-start tw-text-red-dark">
                                <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-red" />
                                {req}
                            </li>
                        ))}
                    </ul>

                    {assignment.submissionUrl && (
                        <Link
                            href={assignment.submissionUrl}
                            className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-red tw-px-4 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-red-crimson"
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
    const [completed, setCompleted] = useState(false);
    const [showAssignment, setShowAssignment] = useState(false);
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [moduleProgress, setModuleProgress] = useState({ completed: 0, total: module.totalLessons });

    // Fetch lesson progress and module progress on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                // Fetch current lesson progress
                const lessonResponse = await fetch(`/api/lms/progress?lessonId=${lesson.id}`);
                const lessonData = await lessonResponse.json();

                if (lessonResponse.ok && lessonData.progress.length > 0) {
                    setCompleted(lessonData.progress[0].completed);
                }

                // Fetch module progress
                const moduleResponse = await fetch(`/api/lms/progress?moduleId=${module.id}`);
                const moduleData = await moduleResponse.json();

                if (moduleResponse.ok) {
                    const completedCount = moduleData.progress.filter(
                        (p: { completed: boolean }) => p.completed
                    ).length;
                    setModuleProgress({
                        completed: completedCount,
                        total: module.totalLessons,
                    });
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };

        fetchProgress();
    }, [lesson.id, module.id, module.totalLessons]);

    // Keyboard shortcut for AI Assistant ('A' key)
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only trigger if not typing in an input field
            if (
                e.key.toLowerCase() === 'a' &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.altKey &&
                document.activeElement?.tagName !== 'INPUT' &&
                document.activeElement?.tagName !== 'TEXTAREA'
            ) {
                setIsAIAssistantOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const markAsCompleted = async () => {
        try {
            setUpdating(true);
            const response = await fetch("/api/lms/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    completed: true,
                }),
            });

            if (response.ok) {
                setCompleted(true);
                // Refresh module progress
                setModuleProgress((prev) => ({
                    ...prev,
                    completed: prev.completed + 1,
                }));
            } else {
                const data = await response.json();
                console.error("Failed to mark as completed:", data.error);
            }
        } catch (error) {
            console.error("Error marking lesson as completed:", error);
        } finally {
            setUpdating(false);
        }
    };

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
                        <div className="tw-mb-2 tw-text-sm tw-text-gray-300">{module.title}</div>
                        <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-ink">
                            {lesson.title}
                        </h1>
                        <p className="tw-text-gray-300">{lesson.description}</p>
                        {lesson.audioUrl && (
                            <div className="tw-mt-4">
                                <audio controls src={lesson.audioUrl}>
                                    <track kind="captions" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                    </div>
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <div className="tw-text-sm tw-text-gray-500">
                            <i className="fas fa-clock tw-mr-1" />
                            {lesson.duration}
                        </div>
                        {completed && (
                            <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gold-light/30 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-gold-deep">
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
                                <div className="tw-aspect-video tw-overflow-hidden tw-rounded-lg tw-bg-ink">
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
                            <h2 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-ink">
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
                                        disabled={updating}
                                        className="tw-rounded-md tw-bg-gold-rich tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-green-700 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                                    >
                                        <i className={`fas ${updating ? "fa-spinner fa-spin" : "fa-check"} tw-mr-2`} />
                                        {updating ? "Saving..." : "Mark as Complete"}
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
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
                                Course Progress
                            </h3>
                            <div className="tw-mb-2 tw-flex tw-justify-between tw-text-sm tw-text-gray-300">
                                <span>Module Progress</span>
                                <span>
                                    {moduleProgress.completed}/{moduleProgress.total} lessons
                                </span>
                            </div>
                            <div className="tw-mb-4 tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-50">
                                <div
                                    className="tw-h-2 tw-rounded-full tw-bg-navy-royal tw-transition-all"
                                    style={{
                                        width: `${
                                            moduleProgress.total > 0
                                                ? (moduleProgress.completed / moduleProgress.total) * 100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>

                            <div className="tw-mb-2 tw-flex tw-justify-between tw-text-sm tw-text-gray-300">
                                <span>Module Completion</span>
                                <span>
                                    {moduleProgress.total > 0
                                        ? Math.round((moduleProgress.completed / moduleProgress.total) * 100)
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-50">
                                <div
                                    className="tw-h-2 tw-rounded-full tw-bg-gold-rich tw-transition-all"
                                    style={{
                                        width: `${
                                            moduleProgress.total > 0
                                                ? (moduleProgress.completed / moduleProgress.total) * 100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
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

                        {/* AI Teaching Assistant */}
                        <div className="tw-mb-6 tw-rounded-lg tw-bg-gradient-to-br tw-from-purple-50 tw-to-blue-50 tw-p-6 tw-shadow-md tw-border tw-border-purple-200">
                            <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-ink">
                                <i className="fas fa-robot tw-mr-2 tw-text-navy" />
                                AI Teaching Assistant
                            </h3>
                            <p className="tw-mb-4 tw-text-sm tw-text-gray-300">
                                Need help? Ask J0d!e for explanations and guidance!
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsAIAssistantOpen(true)}
                                className="tw-w-full tw-rounded-md tw-bg-navy tw-px-4 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-purple-700"
                            >
                                <i className="fas fa-comment-dots tw-mr-2" />
                                Ask J0d!e
                            </button>
                            <p className="tw-mt-2 tw-text-xs tw-text-center tw-text-gray-500">
                                Keyboard shortcut: Press &apos;A&apos;
                            </p>
                        </div>

                        {/* Resources */}
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
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

            {/* AI Teaching Assistant Modal */}
            <AITeachingAssistant
                isOpen={isAIAssistantOpen}
                onClose={() => setIsAIAssistantOpen(false)}
                lessonContext={{
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    moduleTitle: module.title,
                    courseTitle: "Web Development",
                    content: lesson.content.replace(/<[^>]*>/g, '').slice(0, 1000),
                }}
            />
        </>
    );
};

LessonPage.Layout = Layout01;

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: `/login?callbackUrl=${  encodeURIComponent(context.resolvedUrl)}`,
                permanent: false,
            },
        };
    }

    const { lessonId } = context.params as { moduleId: string; lessonId: string };

    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
            module: {
                include: {
                    lessons: true,
                },
            },
        },
    });

    if (!lesson) {
        return {
            notFound: true,
        };
    }

    const currentLessonIndex = lesson.module.lessons.findIndex((l) => l.id === lessonId);
    const prevLesson = lesson.module.lessons[currentLessonIndex - 1];
    const nextLesson = lesson.module.lessons[currentLessonIndex + 1];

    const lessonData: LessonData = {
        id: lesson.id,
        title: lesson.title,
        description: lesson.content.substring(0, 100), // Or a dedicated description field
        videoUrl: lesson.videoUrl || undefined,
        duration: `${lesson.duration} minutes`,
        content: lesson.content,
        audioUrl: lesson.audioUrl || undefined,
        nextLesson: nextLesson ? { moduleId: nextLesson.moduleId, lessonId: nextLesson.id, title: nextLesson.title } : undefined,
        prevLesson: prevLesson ? { moduleId: prevLesson.moduleId, lessonId: prevLesson.id, title: prevLesson.title } : undefined,
    };

    const moduleData: ModuleData = {
        id: lesson.moduleId,
        title: lesson.module.title,
        description: lesson.module.description || "",
        totalLessons: lesson.module.lessons.length,
    };

    return {
        props: {
            lesson: lessonData,
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
