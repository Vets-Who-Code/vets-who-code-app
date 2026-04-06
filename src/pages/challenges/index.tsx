import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { useCallback, useEffect, useState } from "react";
import { options } from "@/pages/api/auth/options";

interface Challenge {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: string;
    language: string;
    estimated_minutes?: number;
}

interface ChallengeAttempt {
    id: string;
    challenge_id: string;
    title: string;
    topic: string;
    difficulty: string;
    passed: boolean;
    score?: number;
    submitted_at: string;
}

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

// Aligned with Hashflag Stack modules
const TOPICS = [
    "terminal",
    "git",
    "html-css",
    "javascript",
    "python",
    "typescript",
    "nextjs",
    "testing",
    "cicd",
    "fastapi",
    "gemini",
    "prompt-engineering",
    "rag",
    "ai-agents",
    "algorithms",
    "data-structures",
];

const DIFFICULTIES = ["easy", "medium", "hard"];

const ChallengesPage: PageWithLayout = () => {
    const [recommended, setRecommended] = useState<Challenge[]>([]);
    const [history, setHistory] = useState<ChallengeAttempt[]>([]);
    const [isLoadingRec, setIsLoadingRec] = useState(true);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Start challenge form
    const [selectedTopic, setSelectedTopic] = useState("javascript");
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    const [isStarting, setIsStarting] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<Challenge & { starter_code?: string } | null>(null);

    // Submission state
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; score?: number; feedback?: string } | null>(null);
    const [hints, setHints] = useState<string[]>([]);
    const [isLoadingHint, setIsLoadingHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [solution, setSolution] = useState<string | null>(null);

    const fetchRecommended = useCallback(async () => {
        try {
            const res = await fetch("/api/j0di3/challenges/recommended");
            if (res.ok) {
                const data = await res.json();
                setRecommended(Array.isArray(data) ? data : data.challenges || []);
            }
        } catch {
            // non-critical
        } finally {
            setIsLoadingRec(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        try {
            const res = await fetch("/api/j0di3/challenges/history");
            if (res.ok) {
                const data = await res.json();
                setHistory(Array.isArray(data) ? data : data.attempts || []);
            }
        } catch {
            // non-critical
        } finally {
            setIsLoadingHist(false);
        }
    }, []);

    useEffect(() => {
        fetchRecommended();
        fetchHistory();
    }, [fetchRecommended, fetchHistory]);

    const handleStartChallenge = async () => {
        setIsStarting(true);
        setError(null);
        setResult(null);
        setHints([]);
        setSolution(null);
        setShowSolution(false);

        try {
            const res = await fetch("/api/j0di3/challenges/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: selectedTopic,
                    difficulty: selectedDifficulty,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to start challenge");
            }

            const data = await res.json();
            setActiveChallenge(data);
            setCode(data.starter_code || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to start challenge");
        } finally {
            setIsStarting(false);
        }
    };

    const handleSubmit = async () => {
        if (!activeChallenge) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`/api/j0di3/challenges/${activeChallenge.id}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language: activeChallenge.language }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Submission failed");
            }

            const data = await res.json();
            setResult(data);
            fetchHistory();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGetHint = async () => {
        if (!activeChallenge) return;
        setIsLoadingHint(true);

        try {
            const res = await fetch(`/api/j0di3/challenges/${activeChallenge.id}/hint`);
            if (res.ok) {
                const data = await res.json();
                setHints((prev) => [...prev, data.hint || data.message || "No more hints available."]);
            }
        } catch {
            // non-critical
        } finally {
            setIsLoadingHint(false);
        }
    };

    const handleShowSolution = async () => {
        if (!activeChallenge) return;

        try {
            const res = await fetch(`/api/j0di3/challenges/${activeChallenge.id}/solution`);
            if (res.ok) {
                const data = await res.json();
                setSolution(data.solution || data.code || "Solution not available.");
                setShowSolution(true);
            }
        } catch {
            // non-critical
        }
    };

    const difficultyColor = (d: string) => {
        switch (d.toLowerCase()) {
            case "easy":
                return "tw-bg-green-100 tw-text-green-800";
            case "medium":
                return "tw-bg-yellow-100 tw-text-yellow-800";
            case "hard":
                return "tw-bg-red-100 tw-text-red-800";
            default:
                return "tw-bg-gray-100 tw-text-gray-800";
        }
    };

    return (
        <>
            <SEO
                title="Code Challenges - Vets Who Code"
                description="Sharpen your coding skills with AI-powered challenges tailored to your learning progress."
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Challenges"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <div className="tw-mb-12">
                    <h1 className="tw-text-4xl tw-font-bold tw-text-ink tw-mb-4">
                        Code Challenges
                    </h1>
                    <p className="tw-text-xl tw-text-navy/60">
                        AI-powered coding challenges that adapt to your skill level
                    </p>
                </div>

                {error && (
                    <div className="tw-mb-6 tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-4 tw-text-red-700">
                        {error}
                    </div>
                )}

                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
                    {/* Left Column — Challenge Area */}
                    <div className="lg:tw-col-span-2 tw-space-y-6">
                        {/* Start a Challenge */}
                        {!activeChallenge && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                                <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                                    Start a Challenge
                                </h2>
                                <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-4">
                                    <div>
                                        <label htmlFor="topic" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                            Topic
                                        </label>
                                        <select
                                            id="topic"
                                            value={selectedTopic}
                                            onChange={(e) => setSelectedTopic(e.target.value)}
                                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                        >
                                            {TOPICS.map((t) => (
                                                <option key={t} value={t}>
                                                    {t.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="difficulty" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                            Difficulty
                                        </label>
                                        <select
                                            id="difficulty"
                                            value={selectedDifficulty}
                                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                        >
                                            {DIFFICULTIES.map((d) => (
                                                <option key={d} value={d}>
                                                    {d.charAt(0).toUpperCase() + d.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleStartChallenge}
                                    disabled={isStarting}
                                    className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                                >
                                    {isStarting ? "Generating..." : "Start Challenge"}
                                </button>
                            </div>
                        )}

                        {/* Recommended Challenges */}
                        {!activeChallenge && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                                <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                                    Recommended for You
                                </h2>
                                {isLoadingRec ? (
                                    <p className="tw-text-navy/60">Loading recommendations...</p>
                                ) : recommended.length === 0 ? (
                                    <p className="tw-text-navy/60">
                                        Complete some challenges to get personalized recommendations.
                                    </p>
                                ) : (
                                    <div className="tw-space-y-3">
                                        {recommended.map((ch) => (
                                            <div
                                                key={ch.id}
                                                className="tw-flex tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-navy/10 tw-p-4"
                                            >
                                                <div>
                                                    <h3 className="tw-font-semibold tw-text-ink">{ch.title}</h3>
                                                    <div className="tw-flex tw-gap-2 tw-mt-1">
                                                        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-blue-800">
                                                            {ch.topic}
                                                        </span>
                                                        <span className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium ${difficultyColor(ch.difficulty)}`}>
                                                            {ch.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedTopic(ch.topic);
                                                        setSelectedDifficulty(ch.difficulty);
                                                        handleStartChallenge();
                                                    }}
                                                    className="tw-rounded-md tw-bg-primary tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-text-white"
                                                >
                                                    Start
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Active Challenge */}
                        {activeChallenge && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                                <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
                                    <div>
                                        <h2 className="tw-text-xl tw-font-bold tw-text-ink">
                                            {activeChallenge.title}
                                        </h2>
                                        <div className="tw-flex tw-gap-2 tw-mt-1">
                                            <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-blue-800">
                                                {activeChallenge.topic}
                                            </span>
                                            <span className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium ${difficultyColor(activeChallenge.difficulty)}`}>
                                                {activeChallenge.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setActiveChallenge(null);
                                            setResult(null);
                                            setHints([]);
                                            setSolution(null);
                                            setShowSolution(false);
                                        }}
                                        className="tw-text-sm tw-text-ink/60 hover:tw-text-ink/80"
                                    >
                                        Back to challenges
                                    </button>
                                </div>

                                <p className="tw-mb-4 tw-text-ink/80">{activeChallenge.description}</p>

                                {/* Code Editor */}
                                <div className="tw-mb-4">
                                    <label htmlFor="code-editor" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                        Your Solution ({activeChallenge.language})
                                    </label>
                                    <textarea
                                        id="code-editor"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        rows={15}
                                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-bg-navy/5 tw-px-4 tw-py-3 tw-font-mono tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                                        placeholder="Write your solution here..."
                                        spellCheck={false}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="tw-flex tw-gap-3 tw-mb-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !code.trim()}
                                        className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Solution"}
                                    </button>
                                    <button
                                        onClick={handleGetHint}
                                        disabled={isLoadingHint}
                                        className="tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5"
                                    >
                                        {isLoadingHint ? "Loading..." : `Get Hint (${hints.length} used)`}
                                    </button>
                                    {!showSolution && (
                                        <button
                                            onClick={handleShowSolution}
                                            className="tw-rounded-md tw-border tw-border-red-300 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-red-600 hover:tw-bg-red-50"
                                        >
                                            Reveal Solution
                                        </button>
                                    )}
                                </div>

                                {/* Hints */}
                                {hints.length > 0 && (
                                    <div className="tw-mb-4 tw-space-y-2">
                                        {hints.map((hint, i) => (
                                            <div key={i} className="tw-rounded-md tw-bg-blue-50 tw-border tw-border-blue-200 tw-p-3">
                                                <span className="tw-text-xs tw-font-semibold tw-text-blue-600 tw-uppercase">
                                                    Hint {i + 1}
                                                </span>
                                                <p className="tw-text-sm tw-text-blue-800 tw-mt-1">{hint}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Solution */}
                                {showSolution && solution && (
                                    <div className="tw-mb-4 tw-rounded-md tw-bg-amber-50 tw-border tw-border-amber-200 tw-p-4">
                                        <span className="tw-text-xs tw-font-semibold tw-text-amber-600 tw-uppercase">
                                            Solution
                                        </span>
                                        <pre className="tw-mt-2 tw-text-sm tw-font-mono tw-text-amber-900 tw-whitespace-pre-wrap">
                                            {solution}
                                        </pre>
                                    </div>
                                )}

                                {/* Result */}
                                {result && (
                                    <div
                                        className={`tw-rounded-md tw-p-4 tw-border ${
                                            result.passed
                                                ? "tw-bg-green-50 tw-border-green-200"
                                                : "tw-bg-red-50 tw-border-red-200"
                                        }`}
                                    >
                                        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                                            <i
                                                className={`fas ${
                                                    result.passed ? "fa-check-circle tw-text-green-600" : "fa-times-circle tw-text-red-600"
                                                }`}
                                            />
                                            <span className={`tw-font-semibold ${result.passed ? "tw-text-green-800" : "tw-text-red-800"}`}>
                                                {result.passed ? "Challenge Passed!" : "Not quite right"}
                                            </span>
                                            {result.score !== undefined && (
                                                <span className="tw-text-sm tw-text-ink/60 tw-ml-2">
                                                    Score: {result.score}/100
                                                </span>
                                            )}
                                        </div>
                                        {result.feedback && (
                                            <p className="tw-text-sm tw-text-ink/80 tw-whitespace-pre-wrap">
                                                {result.feedback}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column — History */}
                    <div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                                Your History
                            </h2>
                            {isLoadingHist ? (
                                <p className="tw-text-navy/60 tw-text-sm">Loading...</p>
                            ) : history.length === 0 ? (
                                <p className="tw-text-navy/60 tw-text-sm">
                                    No challenges attempted yet. Start one!
                                </p>
                            ) : (
                                <div className="tw-space-y-3">
                                    {history.slice(0, 20).map((attempt) => (
                                        <div
                                            key={attempt.id}
                                            className="tw-border-b tw-border-navy/5 tw-pb-3 last:tw-border-0"
                                        >
                                            <div className="tw-flex tw-items-center tw-justify-between">
                                                <span className="tw-text-sm tw-font-medium tw-text-ink">
                                                    {attempt.title}
                                                </span>
                                                <i
                                                    className={`fas ${
                                                        attempt.passed
                                                            ? "fa-check-circle tw-text-green-500"
                                                            : "fa-times-circle tw-text-red-400"
                                                    }`}
                                                />
                                            </div>
                                            <div className="tw-flex tw-gap-2 tw-mt-1">
                                                <span className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-xs ${difficultyColor(attempt.difficulty)}`}>
                                                    {attempt.difficulty}
                                                </span>
                                                <span className="tw-text-xs tw-text-ink/60">
                                                    {new Date(attempt.submitted_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ChallengesPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/challenges",
                permanent: false,
            },
        };
    }

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

export default ChallengesPage;
