import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { LessonPlayer } from "@/components/lesson-player/LessonPlayer";
import type { NextPage } from "next";

// This will be replaced with real API data
const MOCK_MODULES = [
    {
        id: "1",
        title: "HTML Fundamentals",
        lessons: [
            {
                id: "1",
                title: "Introduction to HTML",
                duration: "15 min",
                completed: true,
            },
            {
                id: "2",
                title: "HTML Elements and Tags",
                duration: "20 min",
                completed: true,
            },
            {
                id: "3",
                title: "Semantic HTML",
                duration: "18 min",
                completed: false,
            },
        ],
    },
    {
        id: "2",
        title: "CSS Styling & Layout",
        lessons: [
            {
                id: "1",
                title: "CSS Basics",
                duration: "22 min",
                completed: false,
            },
            {
                id: "2",
                title: "The Box Model",
                duration: "25 min",
                completed: false,
            },
        ],
    },
];

const MOCK_LESSON = {
    id: "1",
    title: "Introduction to HTML",
    description: "Learn the basics of HTML and how it structures web pages",
    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU", // HTML Tutorial for Beginners
    duration: "15 min",
    content: `
        <h2>What is HTML?</h2>
        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>

        <h3>Key Concepts</h3>
        <ul>
            <li><strong>Elements:</strong> The building blocks of HTML pages</li>
            <li><strong>Tags:</strong> Used to create elements (e.g., &lt;p&gt;, &lt;div&gt;, &lt;h1&gt;)</li>
            <li><strong>Attributes:</strong> Provide additional information about elements</li>
            <li><strong>Semantic HTML:</strong> Using HTML elements that convey meaning</li>
        </ul>

        <h3>Your First HTML Document</h3>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

        <h3>Practice Exercise</h3>
        <p>Create a simple HTML page with:</p>
        <ol>
            <li>A heading</li>
            <li>A paragraph</li>
            <li>An unordered list with 3 items</li>
            <li>A link to your favorite website</li>
        </ol>
    `,
};

const LessonPage: NextPage = () => {
    const router = useRouter();
    const { moduleId, lessonId } = router.query;
    const { data: session } = useSession();
    const [lesson, _setLesson] = useState(MOCK_LESSON);
    const [modules, setModules] = useState(MOCK_MODULES);

    // TODO: Fetch real data from API
    useEffect(() => {
        if (!moduleId || !lessonId) return;

        // Simulate API call
        // fetch(`/api/courses/web-development/${moduleId}/${lessonId}`)
        //   .then(res => res.json())
        //   .then(data => setLesson(data.lesson))
    }, [moduleId, lessonId]);

    const handleComplete = async () => {
        // Mark lesson as complete
        try {
            const response = await fetch("/api/progress", {
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
                // Update local state
                setModules((prev) =>
                    prev.map((mod) => ({
                        ...mod,
                        lessons: mod.lessons.map((l) =>
                            l.id === lesson.id ? { ...l, completed: true } : l
                        ),
                    }))
                );

                // Optionally navigate to next lesson
                handleNext();
            }
        } catch (error) {
            console.error("Failed to mark lesson as complete:", error);
        }
    };

    const handleNext = () => {
        // Find current module and lesson
        const currentModuleIndex = modules.findIndex((m) =>
            m.lessons.some((l) => l.id === lesson.id)
        );
        const currentModule = modules[currentModuleIndex];
        const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === lesson.id);

        // Try next lesson in current module
        if (currentLessonIndex < currentModule.lessons.length - 1) {
            const nextLesson = currentModule.lessons[currentLessonIndex + 1];
            router.push(`/courses/web-development/${currentModule.id}/${nextLesson.id}`);
        }
        // Try first lesson of next module
        else if (currentModuleIndex < modules.length - 1) {
            const nextModule = modules[currentModuleIndex + 1];
            const nextLesson = nextModule.lessons[0];
            router.push(`/courses/web-development/${nextModule.id}/${nextLesson.id}`);
        }
    };

    const handlePrev = () => {
        // Find current module and lesson
        const currentModuleIndex = modules.findIndex((m) =>
            m.lessons.some((l) => l.id === lesson.id)
        );
        const currentModule = modules[currentModuleIndex];
        const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === lesson.id);

        // Try previous lesson in current module
        if (currentLessonIndex > 0) {
            const prevLesson = currentModule.lessons[currentLessonIndex - 1];
            router.push(`/courses/web-development/${currentModule.id}/${prevLesson.id}`);
        }
        // Try last lesson of previous module
        else if (currentModuleIndex > 0) {
            const prevModule = modules[currentModuleIndex - 1];
            const prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
            router.push(`/courses/web-development/${prevModule.id}/${prevLesson.id}`);
        }
    };

    // Require authentication
    if (!session) {
        return (
            <div className="tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-gray-900">
                <div className="tw-text-center">
                    <i className="fas fa-lock tw-mb-4 tw-text-4xl tw-text-gray-400" />
                    <h1 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-white">
                        Authentication Required
                    </h1>
                    <p className="tw-mb-6 tw-text-gray-400">
                        Please sign in to access course content
                    </p>
                    <div className="tw-flex tw-justify-center tw-gap-4">
                        <button
                            type="button"
                            onClick={() => router.push("/dev-login")}
                            className="tw-rounded-lg tw-bg-green-600 tw-px-6 tw-py-3 tw-font-semibold tw-text-white hover:tw-bg-green-700"
                        >
                            <i className="fas fa-code tw-mr-2" />
                            Dev Login
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="tw-rounded-lg tw-bg-blue-600 tw-px-6 tw-py-3 tw-font-semibold tw-text-white hover:tw-bg-blue-700"
                        >
                            <i className="fab fa-github tw-mr-2" />
                            GitHub Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <LessonPlayer
            currentLesson={lesson}
            modules={modules}
            courseId="web-development"
            onComplete={handleComplete}
            onNext={handleNext}
            onPrev={handlePrev}
        />
    );
};

export default LessonPage;
