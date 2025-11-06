import React, { useState, useEffect } from "react";
import Link from "next/link";

type Lesson = {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
};

type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
};

type LessonPlayerProps = {
    currentLesson: {
        id: string;
        title: string;
        description: string;
        videoUrl?: string;
        duration: string;
        content: string;
    };
    modules: Module[];
    courseId: string;
    onComplete: () => void;
    onNext?: () => void;
    onPrev?: () => void;
};

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
    currentLesson,
    modules,
    courseId,
    onComplete,
    onNext,
    onPrev,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
    const [showTranscript, setShowTranscript] = useState(false);

    // Auto-expand current module
    useEffect(() => {
        const currentModule = modules.find((mod) =>
            mod.lessons.some((lesson) => lesson.id === currentLesson.id)
        );
        if (currentModule) {
            setExpandedModules((prev) => new Set([...prev, currentModule.id]));
        }
    }, [currentLesson.id, modules]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key) {
                case "n":
                    if (onNext) onNext();
                    break;
                case "p":
                    if (onPrev) onPrev();
                    break;
                case "s":
                    setSidebarOpen((prev) => !prev);
                    break;
                case "m":
                    onComplete();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [onNext, onPrev, onComplete]);

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev) => {
            const next = new Set(prev);
            if (next.has(moduleId)) {
                next.delete(moduleId);
            } else {
                next.add(moduleId);
            }
            return next;
        });
    };

    const calculateProgress = () => {
        const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
        const completedLessons = modules.reduce(
            (acc, mod) => acc + mod.lessons.filter((l) => l.completed).length,
            0
        );
        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    };

    return (
        <div className="tw-flex tw-h-screen tw-overflow-hidden tw-bg-gray-900">
            {/* Sidebar */}
            <aside
                className={`tw-flex tw-h-full tw-flex-col tw-border-r tw-border-gray-800 tw-bg-gray-900 tw-transition-all tw-duration-300 ${
                    sidebarOpen ? "tw-w-80" : "tw-w-0"
                } tw-overflow-hidden`}
            >
                {/* Sidebar Header */}
                <div className="tw-border-b tw-border-gray-800 tw-p-4">
                    <div className="tw-mb-3 tw-flex tw-items-center tw-justify-between">
                        <h2 className="tw-text-sm tw-font-semibold tw-text-gray-400">
                            COURSE CONTENT
                        </h2>
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="tw-text-gray-400 hover:tw-text-white"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="tw-mb-2">
                        <div className="tw-mb-1 tw-flex tw-justify-between tw-text-xs tw-text-gray-400">
                            <span>Progress</span>
                            <span>{calculateProgress()}%</span>
                        </div>
                        <div className="tw-h-2 tw-overflow-hidden tw-rounded-full tw-bg-gray-800">
                            <div
                                className="tw-h-full tw-rounded-full tw-bg-green-500 tw-transition-all"
                                style={{ width: `${calculateProgress()}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Module List */}
                <div className="tw-flex-1 tw-overflow-y-auto">
                    {modules.map((module) => (
                        <div key={module.id} className="tw-border-b tw-border-gray-800">
                            {/* Module Header */}
                            <button
                                type="button"
                                onClick={() => toggleModule(module.id)}
                                className="tw-flex tw-w-full tw-items-center tw-justify-between tw-p-4 tw-text-left hover:tw-bg-gray-800"
                            >
                                <div className="tw-flex-1">
                                    <h3 className="tw-text-sm tw-font-semibold tw-text-white">
                                        {module.title}
                                    </h3>
                                    <p className="tw-text-xs tw-text-gray-400">
                                        {module.lessons.filter((l) => l.completed).length} /{" "}
                                        {module.lessons.length} completed
                                    </p>
                                </div>
                                <i
                                    className={`fas fa-chevron-${expandedModules.has(module.id) ? "up" : "down"} tw-text-gray-400`}
                                />
                            </button>

                            {/* Lesson List */}
                            {expandedModules.has(module.id) && (
                                <div className="tw-bg-gray-800/50">
                                    {module.lessons.map((lesson) => (
                                        <Link
                                            key={lesson.id}
                                            href={`/courses/${courseId}/${module.id}/${lesson.id}`}
                                            className={`tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3 tw-transition-colors hover:tw-bg-gray-700 ${
                                                lesson.id === currentLesson.id
                                                    ? "tw-bg-blue-600/20 tw-border-l-4 tw-border-blue-500"
                                                    : ""
                                            }`}
                                        >
                                            <div className="tw-flex tw-flex-1 tw-items-center tw-space-x-3">
                                                {lesson.completed ? (
                                                    <i className="fas fa-check-circle tw-text-green-500" />
                                                ) : (
                                                    <i className="far fa-circle tw-text-gray-600" />
                                                )}
                                                <div className="tw-flex-1">
                                                    <p
                                                        className={`tw-text-sm ${
                                                            lesson.id === currentLesson.id
                                                                ? "tw-font-semibold tw-text-blue-400"
                                                                : "tw-text-gray-300"
                                                        }`}
                                                    >
                                                        {lesson.title}
                                                    </p>
                                                    <p className="tw-text-xs tw-text-gray-500">
                                                        {lesson.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Keyboard Shortcuts */}
                <div className="tw-border-t tw-border-gray-800 tw-p-4">
                    <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-text-gray-400">
                        KEYBOARD SHORTCUTS
                    </p>
                    <div className="tw-space-y-1 tw-text-xs tw-text-gray-500">
                        <div className="tw-flex tw-justify-between">
                            <span>Toggle Sidebar</span>
                            <kbd className="tw-rounded tw-bg-gray-800 tw-px-2 tw-py-1">S</kbd>
                        </div>
                        <div className="tw-flex tw-justify-between">
                            <span>Next Lesson</span>
                            <kbd className="tw-rounded tw-bg-gray-800 tw-px-2 tw-py-1">N</kbd>
                        </div>
                        <div className="tw-flex tw-justify-between">
                            <span>Previous Lesson</span>
                            <kbd className="tw-rounded tw-bg-gray-800 tw-px-2 tw-py-1">P</kbd>
                        </div>
                        <div className="tw-flex tw-justify-between">
                            <span>Mark Complete</span>
                            <kbd className="tw-rounded tw-bg-gray-800 tw-px-2 tw-py-1">M</kbd>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden">
                {/* Top Bar */}
                <header className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-gray-800 tw-bg-gray-900 tw-px-6 tw-py-4">
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        {!sidebarOpen && (
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="tw-text-gray-400 hover:tw-text-white"
                                title="Toggle Sidebar (S)"
                            >
                                <i className="fas fa-bars tw-text-xl" />
                            </button>
                        )}
                        <div>
                            <h1 className="tw-text-lg tw-font-semibold tw-text-white">
                                {currentLesson.title}
                            </h1>
                            <p className="tw-text-sm tw-text-gray-400">
                                {currentLesson.duration}
                            </p>
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center tw-space-x-2">
                        {onPrev && (
                            <button
                                type="button"
                                onClick={onPrev}
                                className="tw-rounded-lg tw-bg-gray-800 tw-px-4 tw-py-2 tw-text-sm tw-text-white hover:tw-bg-gray-700"
                                title="Previous Lesson (P)"
                            >
                                <i className="fas fa-chevron-left tw-mr-2" />
                                Previous
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onComplete}
                            className="tw-rounded-lg tw-bg-green-600 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-green-700"
                            title="Mark as Complete (M)"
                        >
                            <i className="fas fa-check tw-mr-2" />
                            Mark Complete
                        </button>

                        {onNext && (
                            <button
                                type="button"
                                onClick={onNext}
                                className="tw-rounded-lg tw-bg-blue-600 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-blue-700"
                                title="Next Lesson (N)"
                            >
                                Next
                                <i className="fas fa-chevron-right tw-ml-2" />
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <div className="tw-flex tw-flex-1 tw-overflow-hidden">
                    {/* Video/Content Section */}
                    <div className="tw-flex tw-flex-1 tw-flex-col tw-overflow-y-auto">
                        {/* Video Player */}
                        {currentLesson.videoUrl && (
                            <div className="tw-bg-black">
                                <div className="tw-aspect-video">
                                    <iframe
                                        src={currentLesson.videoUrl}
                                        className="tw-h-full tw-w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={currentLesson.title}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tabs: Notes / Transcript */}
                        <div className="tw-border-b tw-border-gray-800 tw-bg-gray-900">
                            <div className="tw-flex tw-space-x-1 tw-px-6">
                                <button
                                    type="button"
                                    onClick={() => setShowTranscript(false)}
                                    className={`tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-transition-colors ${
                                        !showTranscript
                                            ? "tw-border-b-2 tw-border-blue-500 tw-text-blue-500"
                                            : "tw-text-gray-400 hover:tw-text-white"
                                    }`}
                                >
                                    <i className="fas fa-file-alt tw-mr-2" />
                                    Lesson Notes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowTranscript(true)}
                                    className={`tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-transition-colors ${
                                        showTranscript
                                            ? "tw-border-b-2 tw-border-blue-500 tw-text-blue-500"
                                            : "tw-text-gray-400 hover:tw-text-white"
                                    }`}
                                >
                                    <i className="fas fa-closed-captioning tw-mr-2" />
                                    Transcript
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="tw-flex-1 tw-bg-gray-900 tw-p-6">
                            {!showTranscript ? (
                                <div className="tw-prose tw-prose-invert tw-max-w-none">
                                    <div
                                        className="tw-text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                                    />
                                </div>
                            ) : (
                                <div className="tw-text-gray-400">
                                    <p className="tw-italic">Transcript coming soon...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
