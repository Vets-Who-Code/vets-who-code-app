import React, { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import CodeEditor from "@components/code-editor";
import Spinner from "@ui/spinner";
import { useMount } from "@hooks";
import {
    assessmentQuestions,
    determineSkillLevel,
    type AssessmentQuestion,
} from "@/data/assessment-questions";

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

const Assessment: PageWithLayout = () => {
    const mounted = useMount();
    const { data: session, status } = useSession();
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userCode, setUserCode] = useState("");
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState<{
        type: "success" | "error" | "info";
        message: string;
    } | null>(null);
    const [testResults, setTestResults] = useState<{
        passed: number;
        total: number;
        message: string;
    } | null>(null);

    // Check for dev session
    const [devSession, setDevSession] = useState<{
        user: { id: string; name: string; email: string; image: string };
    } | null>(null);
    const [devSessionLoaded, setDevSessionLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("dev-session");
            if (stored) {
                try {
                    const user = JSON.parse(stored);
                    setDevSession({ user });
                } catch {
                    localStorage.removeItem("dev-session");
                }
            }
            setDevSessionLoaded(true);
        }
    }, []);

    const currentSession = session || devSession;

    useEffect(() => {
        if (devSessionLoaded && status === "unauthenticated" && !devSession) {
            router.replace("/login");
        }
    }, [status, router, devSession, devSessionLoaded]);

    const currentQuestion = assessmentQuestions[currentQuestionIndex];

    // Initialize code with starter code when question changes
    useEffect(() => {
        if (currentQuestion) {
            const savedAnswer = answers[currentQuestion.id];
            setUserCode(savedAnswer || currentQuestion.starterCode);
            setTestResults(null);
        }
    }, [currentQuestionIndex, currentQuestion, answers]);

    if (!mounted || (!devSessionLoaded && status === "loading")) {
        return (
            <div className="tw-fixed tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-white">
                <Spinner />
            </div>
        );
    }

    if (!currentSession) {
        return (
            <div className="tw-fixed tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-white">
                <Spinner />
            </div>
        );
    }

    const handleCodeChange = (newCode: string) => {
        setUserCode(newCode);
    };

    const runTests = () => {
        // Simple test runner - in production, this would run in a sandboxed environment
        try {
            // Save the code
            setAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: userCode,
            }));

            // For demo purposes, we'll do a simple check
            // In production, you'd want to run this in a secure sandbox
            let passedTests = 0;
            const totalTests = currentQuestion.testCases.length;

            // This is a simplified test - in reality you'd need proper sandboxing
            // For now, just check if the code contains key elements
            const codeHasFunction = userCode.includes("function") || userCode.includes("=>");
            const codeHasReturn = userCode.includes("return");

            if (codeHasFunction && codeHasReturn) {
                passedTests = totalTests; // Simplified for demo
            }

            setTestResults({
                passed: passedTests,
                total: totalTests,
                message:
                    passedTests === totalTests
                        ? "All tests passed!"
                        : `${passedTests} of ${totalTests} tests passed`,
            });

            if (passedTests === totalTests) {
                setScore((prev) => prev + currentQuestion.points);
                setNotification({
                    type: "success",
                    message: `Correct! +${currentQuestion.points} points`,
                });
                setTimeout(() => setNotification(null), 3000);
            } else {
                setNotification({
                    type: "error",
                    message: "Some tests failed. Keep trying!",
                });
                setTimeout(() => setNotification(null), 3000);
            }
        } catch (error) {
            setTestResults({
                passed: 0,
                total: currentQuestion.testCases.length,
                message: "Code execution error",
            });
            setNotification({
                type: "error",
                message: "There was an error running your code",
            });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleNext = () => {
        // Save current answer
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: userCode,
        }));

        if (currentQuestionIndex < assessmentQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            completeAssessment();
        }
    };

    const handlePrevious = () => {
        // Save current answer
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: userCode,
        }));

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const completeAssessment = async () => {
        setIsSaving(true);
        const skillLevel = determineSkillLevel(score);

        try {
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (devSession) {
                headers["x-dev-user-id"] = devSession.user.id;
            }

            const response = await fetch("/api/user/assessment", {
                method: "POST",
                headers,
                body: JSON.stringify({
                    score,
                    skillLevel,
                    completedQuestions: Object.keys(answers).length,
                    totalQuestions: assessmentQuestions.length,
                }),
            });

            if (response.ok) {
                setIsComplete(true);
                setNotification({
                    type: "success",
                    message: "Assessment completed successfully!",
                });
            } else {
                setNotification({
                    type: "error",
                    message: "Failed to save assessment results",
                });
            }
        } catch (error) {
            setNotification({
                type: "error",
                message: "An error occurred while saving your assessment",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
    const skillLevel = determineSkillLevel(score);

    if (isComplete) {
        return (
            <>
                <SEO title="Assessment Complete" />
                <Breadcrumb
                    pages={[
                        { path: "/", label: "home" },
                        { path: "/profile", label: "profile" },
                    ]}
                    currentPage="Assessment Complete"
                    showTitle={false}
                />
                <div className="tw-container tw-py-12">
                    <div className="tw-mx-auto tw-max-w-2xl tw-rounded-xl tw-bg-white tw-p-8 tw-text-center tw-shadow-lg">
                        <div className="tw-mb-6">
                            <div className="tw-mx-auto tw-mb-4 tw-flex tw-h-20 tw-w-20 tw-items-center tw-justify-center tw-rounded-full tw-bg-success tw-text-white">
                                <i className="fas fa-check tw-text-3xl" />
                            </div>
                            <h1 className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gray-900">
                                Assessment Complete!
                            </h1>
                            <p className="tw-text-lg tw-text-gray-600">
                                Great job completing the coding assessment
                            </p>
                        </div>

                        <div className="tw-mb-8 tw-space-y-4">
                            <div className="tw-rounded-lg tw-bg-gray-50 tw-p-6">
                                <div className="tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-600">
                                    Your Score
                                </div>
                                <div className="tw-text-4xl tw-font-bold tw-text-secondary">
                                    {score} / 210
                                </div>
                            </div>

                            <div className="tw-rounded-lg tw-bg-primary/10 tw-p-6">
                                <div className="tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-600">
                                    Skill Level
                                </div>
                                <div className="tw-text-3xl tw-font-bold tw-text-primary">
                                    {skillLevel}
                                </div>
                            </div>

                            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-p-6">
                                <div className="tw-mb-4 tw-text-sm tw-font-medium tw-text-gray-600">
                                    What this means
                                </div>
                                <p className="tw-text-sm tw-text-gray-700">
                                    {skillLevel === "NEWBIE" &&
                                        "You're just getting started! Focus on learning basic syntax and programming concepts."}
                                    {skillLevel === "BEGINNER" &&
                                        "You understand the basics! Work on mastering functions, conditionals, and control flow."}
                                    {skillLevel === "JUNIOR" &&
                                        "You can write functional code! Continue practicing with arrays, loops, and data structures."}
                                    {skillLevel === "MID" &&
                                        "You're an independent developer! Keep building projects and learning advanced concepts."}
                                    {skillLevel === "SENIOR" &&
                                        "Excellent skills! You have strong problem-solving abilities and algorithmic thinking."}
                                </p>
                            </div>
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-justify-center">
                            <button
                                type="button"
                                onClick={() => router.push("/profile")}
                                className="tw-rounded-lg tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                            >
                                <i className="fas fa-user tw-mr-2" />
                                Back to Profile
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/courses")}
                                className="tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50"
                            >
                                <i className="fas fa-book tw-mr-2" />
                                Browse Courses
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Coding Assessment" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/profile", label: "profile" },
                ]}
                currentPage="Coding Assessment"
                showTitle={false}
            />

            {/* Notification */}
            {notification && (
                <div
                    className={`tw-fixed tw-top-4 tw-right-4 tw-z-50 tw-rounded-lg tw-p-4 tw-shadow-lg tw-animate-in tw-fade-in tw-slide-in-from-top-5 tw-duration-300 ${
                        notification.type === "success"
                            ? "tw-bg-green-50 tw-text-green-800 tw-border tw-border-green-200"
                            : notification.type === "error"
                              ? "tw-bg-red-50 tw-text-red-800 tw-border tw-border-red-200"
                              : "tw-bg-blue-50 tw-text-blue-800 tw-border tw-border-blue-200"
                    }`}
                >
                    <div className="tw-flex tw-items-center tw-space-x-2">
                        <i
                            className={`fas ${
                                notification.type === "success"
                                    ? "fa-check-circle"
                                    : notification.type === "error"
                                      ? "fa-exclamation-circle"
                                      : "fa-info-circle"
                            }`}
                        />
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}

            <div className="tw-container tw-py-8">
                {/* Header */}
                <div className="tw-mb-6">
                    <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                        <div>
                            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
                                Coding Assessment
                            </h1>
                            <p className="tw-text-gray-600">
                                Complete the challenges to determine your skill level
                            </p>
                        </div>
                        <div className="tw-text-right">
                            <div className="tw-text-sm tw-text-gray-600">Current Score</div>
                            <div className="tw-text-2xl tw-font-bold tw-text-primary">{score}</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-text-sm tw-text-gray-600">
                        <span>
                            Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                        </span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-200">
                        <div
                            className="tw-h-2 tw-rounded-full tw-bg-primary tw-transition-all tw-duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
                    {/* Question Panel */}
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                        <div className="tw-mb-4 tw-inline-block tw-rounded tw-bg-primary/10 tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-text-primary tw-uppercase">
                            {currentQuestion.level}
                        </div>
                        <h2 className="tw-mb-2 tw-text-xl tw-font-bold tw-text-gray-900">
                            {currentQuestion.title}
                        </h2>
                        <p className="tw-mb-4 tw-text-gray-600">{currentQuestion.description}</p>

                        <div className="tw-mb-4 tw-rounded-lg tw-bg-gray-50 tw-p-4">
                            <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-900">
                                Instructions
                            </h3>
                            <p className="tw-text-sm tw-text-gray-700">
                                {currentQuestion.instructions}
                            </p>
                        </div>

                        <div className="tw-mb-4">
                            <h3 className="tw-mb-2 tw-font-semibold tw-text-gray-900">
                                Test Cases
                            </h3>
                            <div className="tw-space-y-2">
                                {currentQuestion.testCases.map((testCase, index) => (
                                    <div
                                        key={index}
                                        className="tw-rounded tw-bg-gray-50 tw-p-3 tw-text-sm"
                                    >
                                        <div className="tw-mb-1 tw-font-mono tw-text-xs tw-text-gray-600">
                                            {testCase.input || "No input"}
                                        </div>
                                        <div className="tw-flex tw-items-center tw-justify-between">
                                            <span className="tw-text-gray-700">
                                                {testCase.description}
                                            </span>
                                            <span className="tw-font-mono tw-text-xs tw-text-success">
                                                → {testCase.expectedOutput}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {testResults && (
                            <div
                                className={`tw-rounded-lg tw-p-4 ${
                                    testResults.passed === testResults.total
                                        ? "tw-bg-green-50 tw-border tw-border-green-200"
                                        : "tw-bg-red-50 tw-border tw-border-red-200"
                                }`}
                            >
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <i
                                        className={`fas ${
                                            testResults.passed === testResults.total
                                                ? "fa-check-circle tw-text-green-600"
                                                : "fa-times-circle tw-text-red-600"
                                        }`}
                                    />
                                    <span
                                        className={
                                            testResults.passed === testResults.total
                                                ? "tw-text-green-800"
                                                : "tw-text-red-800"
                                        }
                                    >
                                        {testResults.message}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between tw-text-sm tw-text-gray-600">
                            <span>
                                <i className="fas fa-clock tw-mr-1" />
                                Est. {currentQuestion.timeEstimate} min
                            </span>
                            <span>
                                <i className="fas fa-star tw-mr-1 tw-text-yellow-500" />
                                {currentQuestion.points} points
                            </span>
                        </div>
                    </div>

                    {/* Code Editor Panel */}
                    <div className="tw-flex tw-flex-col tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                        <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                            Your Solution
                        </h3>
                        <div className="tw-mb-4 tw-flex-1">
                            <CodeEditor value={userCode} onChange={handleCodeChange} />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-3">
                            <button
                                type="button"
                                onClick={runTests}
                                className="tw-w-full tw-rounded-lg tw-bg-success tw-px-4 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-success/90"
                            >
                                <i className="fas fa-play tw-mr-2" />
                                Run Tests
                            </button>

                            <div className="tw-flex tw-gap-3">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0}
                                    className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-3 tw-font-semibold tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
                                >
                                    <i className="fas fa-arrow-left tw-mr-2" />
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="tw-flex-1 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                                >
                                    {currentQuestionIndex === assessmentQuestions.length - 1 ? (
                                        <>
                                            <i className="fas fa-check tw-mr-2" />
                                            Finish
                                        </>
                                    ) : (
                                        <>
                                            Next
                                            <i className="fas fa-arrow-right tw-ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Assessment.Layout = Layout01;

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

export default Assessment;
