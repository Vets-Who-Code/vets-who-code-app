import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import { runChallenge } from "@/lib/challenge-runner";
import type { Challenge, ClientResults, ClientTestResult, TestCase } from "@/lib/challenge-runner";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useCallback, useEffect, useState } from "react";
import { options } from "@/pages/api/auth/options";

interface SubmissionResponse {
    passed?: boolean;
    score?: number;
    feedback?: string;
    [key: string]: unknown;
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

const ChallengeDetailPage: PageWithLayout = () => {
    const router = useRouter();
    const idParam = router.query.id;
    const id = typeof idParam === "string" ? idParam : undefined;

    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [localResults, setLocalResults] = useState<ClientResults | null>(null);
    const [serverResult, setServerResult] = useState<SubmissionResponse | null>(null);
    const [hints, setHints] = useState<string[]>([]);
    const [isLoadingHint, setIsLoadingHint] = useState(false);
    const [solutionText, setSolutionText] = useState<string | null>(null);
    const [showSolution, setShowSolution] = useState(false);

    const fetchChallenge = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setLoadError(null);
        try {
            const res = await fetch(`/api/j0di3/challenges/${id}`);
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to load challenge");
            }
            const data = (await res.json()) as Challenge;
            setChallenge(data);
            setCode(data.starter_code || "");
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : "Failed to load challenge");
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (router.isReady && id) {
            fetchChallenge();
        }
    }, [router.isReady, id, fetchChallenge]);

    const handleRun = async () => {
        if (!challenge) return;
        if (!challenge.test_cases || challenge.test_cases.length === 0) {
            setError("This challenge has no test cases — try reloading it.");
            return;
        }
        setIsRunning(true);
        setError(null);
        try {
            const results = await runChallenge(code, challenge, { visibleOnly: true });
            setLocalResults(results);
            setServerResult(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to run your solution");
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (!challenge) return;
        if (!challenge.test_cases || challenge.test_cases.length === 0) {
            setError("This challenge has no test cases — try reloading it.");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            const clientResults = await runChallenge(code, challenge);
            setLocalResults(clientResults);

            const res = await fetch(`/api/j0di3/challenges/${challenge.id}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ solution: code, client_results: clientResults }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Submission failed");
            }
            setServerResult((await res.json()) as SubmissionResponse);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGetHint = async () => {
        if (!challenge) return;
        setIsLoadingHint(true);
        try {
            const res = await fetch(`/api/j0di3/challenges/${challenge.id}/hint`);
            if (res.ok) {
                const body = await res.json();
                setHints((prev) => [...prev, body.hint || body.message || "No more hints available."]);
            }
        } catch {
            // non-critical
        } finally {
            setIsLoadingHint(false);
        }
    };

    const handleShowSolution = async () => {
        if (!challenge) return;
        try {
            const res = await fetch(`/api/j0di3/challenges/${challenge.id}/solution`);
            if (res.ok) {
                const body = await res.json();
                setSolutionText(body.solution || body.code || "Solution not available.");
                setShowSolution(true);
            }
        } catch {
            // non-critical
        }
    };

    const difficultyColor = (d: string) => {
        switch (d.toLowerCase()) {
            case "warmup":
                return "tw-bg-emerald-100 tw-text-emerald-800";
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

    const visibleTestCount =
        challenge?.test_cases?.filter((tc: TestCase) => !(tc.hidden ?? false)).length ?? 0;
    const hasTestCases = (challenge?.test_cases?.length ?? 0) > 0;

    return (
        <>
            <SEO title={challenge?.title ? `${challenge.title} — Challenge` : "Challenge"} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/challenges", label: "challenges" },
                ]}
                currentPage={challenge?.title ?? "Challenge"}
                showTitle={false}
            />

            <div className="tw-container tw-py-12">
                {isLoading && (
                    <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-text-center tw-shadow-sm">
                        <p className="tw-text-navy/60">Loading challenge...</p>
                    </div>
                )}

                {loadError && !isLoading && (
                    <div className="tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-6 tw-text-center">
                        <p className="tw-text-red-700 tw-mb-3">{loadError}</p>
                        <Link
                            href="/challenges"
                            className="tw-text-sm tw-text-primary hover:tw-underline"
                        >
                            ← Back to challenges
                        </Link>
                    </div>
                )}

                {challenge && !isLoading && !loadError && (
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                        <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
                            <div>
                                <h1 className="tw-text-2xl tw-font-bold tw-text-ink">
                                    {challenge.title}
                                </h1>
                                <div className="tw-flex tw-gap-2 tw-mt-2">
                                    <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-blue-800">
                                        {challenge.topic}
                                    </span>
                                    <span
                                        className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium ${difficultyColor(
                                            challenge.difficulty
                                        )}`}
                                    >
                                        {challenge.difficulty}
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/challenges"
                                className="tw-text-sm tw-text-ink/60 hover:tw-text-ink/80"
                            >
                                ← All challenges
                            </Link>
                        </div>

                        <p className="tw-mb-4 tw-text-ink/80">{challenge.description}</p>

                        <div className="tw-mb-4">
                            <label
                                htmlFor="code-editor"
                                className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2"
                            >
                                Your Solution ({challenge.language})
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

                        {error && (
                            <div className="tw-mb-4 tw-rounded-md tw-border tw-border-red-200 tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="tw-flex tw-flex-wrap tw-gap-3 tw-mb-4">
                            <button
                                type="button"
                                onClick={handleRun}
                                disabled={isRunning || isSubmitting || !code.trim() || !hasTestCases}
                                className="tw-rounded-md tw-border tw-border-primary tw-px-6 tw-py-2 tw-font-medium tw-text-primary tw-transition-colors hover:tw-bg-primary/5 disabled:tw-opacity-50"
                            >
                                {isRunning
                                    ? "Running..."
                                    : `Run (${visibleTestCount} visible test${visibleTestCount === 1 ? "" : "s"})`}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isRunning || isSubmitting || !code.trim() || !hasTestCases}
                                className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Solution"}
                            </button>
                            <button
                                type="button"
                                onClick={handleGetHint}
                                disabled={isLoadingHint}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5"
                            >
                                {isLoadingHint ? "Loading..." : `Get Hint (${hints.length} used)`}
                            </button>
                            {!showSolution && (
                                <button
                                    type="button"
                                    onClick={handleShowSolution}
                                    className="tw-rounded-md tw-border tw-border-red-300 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-red-600 hover:tw-bg-red-50"
                                >
                                    Reveal Solution
                                </button>
                            )}
                        </div>

                        {hints.length > 0 && (
                            <div className="tw-mb-4 tw-space-y-2">
                                {hints.map((hint, i) => (
                                    <div
                                        key={i}
                                        className="tw-rounded-md tw-bg-blue-50 tw-border tw-border-blue-200 tw-p-3"
                                    >
                                        <span className="tw-text-xs tw-font-semibold tw-text-blue-600 tw-uppercase">
                                            Hint {i + 1}
                                        </span>
                                        <p className="tw-text-sm tw-text-blue-800 tw-mt-1">{hint}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showSolution && solutionText && (
                            <div className="tw-mb-4 tw-rounded-md tw-bg-amber-50 tw-border tw-border-amber-200 tw-p-4">
                                <span className="tw-text-xs tw-font-semibold tw-text-amber-600 tw-uppercase">
                                    Solution
                                </span>
                                <pre className="tw-mt-2 tw-text-sm tw-font-mono tw-text-amber-900 tw-whitespace-pre-wrap">
                                    {solutionText}
                                </pre>
                            </div>
                        )}

                        {localResults && <TestResultsPanel results={localResults} />}

                        {serverResult && (() => {
                            const passed =
                                typeof serverResult.passed === "boolean"
                                    ? serverResult.passed
                                    : (localResults?.all_passed ?? false);
                            return (
                                <div
                                    className={`tw-mt-4 tw-rounded-md tw-p-4 tw-border ${
                                        passed
                                            ? "tw-bg-green-50 tw-border-green-200"
                                            : "tw-bg-red-50 tw-border-red-200"
                                    }`}
                                >
                                    <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                                        <i
                                            className={`fas ${
                                                passed
                                                    ? "fa-check-circle tw-text-green-600"
                                                    : "fa-times-circle tw-text-red-600"
                                            }`}
                                        />
                                        <span
                                            className={`tw-font-semibold ${
                                                passed ? "tw-text-green-800" : "tw-text-red-800"
                                            }`}
                                        >
                                            {passed ? "Challenge Passed!" : "Not quite right"}
                                        </span>
                                        {serverResult.score !== undefined && (
                                            <span className="tw-text-sm tw-text-ink/60 tw-ml-2">
                                                Score: {serverResult.score}/100
                                            </span>
                                        )}
                                    </div>
                                    {serverResult.feedback && (
                                        <p className="tw-text-sm tw-text-ink/80 tw-whitespace-pre-wrap">
                                            {serverResult.feedback}
                                        </p>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
        </>
    );
};

function TestResultsPanel({ results }: { results: ClientResults }) {
    const passedCount = results.test_results.filter((r) => r.passed).length;
    const total = results.test_results.length;
    const headerClass = results.all_passed
        ? "tw-bg-green-50 tw-border-green-200"
        : "tw-bg-red-50 tw-border-red-200";

    return (
        <div className={`tw-rounded-md tw-p-4 tw-border ${headerClass}`}>
            <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3">
                <i
                    className={`fas ${
                        results.all_passed
                            ? "fa-check-circle tw-text-green-600"
                            : "fa-times-circle tw-text-red-600"
                    }`}
                />
                <span
                    className={`tw-font-semibold ${
                        results.all_passed ? "tw-text-green-800" : "tw-text-red-800"
                    }`}
                >
                    {passedCount} / {total} tests passing
                </span>
                {typeof results.execution_ms === "number" && (
                    <span className="tw-text-xs tw-text-ink/60 tw-ml-2">
                        {results.execution_ms}ms
                    </span>
                )}
            </div>
            <ul className="tw-space-y-2">
                {results.test_results.map((r) => (
                    <TestResultRow key={r.test_case_index} result={r} />
                ))}
            </ul>
        </div>
    );
}

function TestResultRow({ result }: { result: ClientTestResult }) {
    const rowClass = result.passed
        ? "tw-border-green-200 tw-bg-white"
        : "tw-border-red-200 tw-bg-white";
    return (
        <li className={`tw-rounded-md tw-border tw-p-3 tw-text-sm ${rowClass}`}>
            <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                <i
                    className={`fas ${
                        result.passed
                            ? "fa-check tw-text-green-600"
                            : "fa-times tw-text-red-600"
                    }`}
                />
                <span className="tw-font-semibold tw-text-ink">
                    Test {result.test_case_index + 1}
                </span>
                {result.hidden && (
                    <span className="tw-rounded-full tw-bg-navy/10 tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-navy/70">
                        hidden
                    </span>
                )}
            </div>
            {!result.hidden && (
                <div className="tw-mt-1 tw-space-y-1 tw-font-mono tw-text-xs tw-text-ink/80">
                    <div>
                        <span className="tw-text-ink/50">Input:</span> {result.input}
                    </div>
                    <div>
                        <span className="tw-text-ink/50">Expected:</span> {result.expected_output}
                    </div>
                    {!result.passed && (
                        <div className="tw-text-red-700">
                            <span className="tw-text-ink/50">Got:</span>{" "}
                            {result.actual_output ?? "(no output)"}
                        </div>
                    )}
                </div>
            )}
            {result.hidden && !result.passed && (
                <div className="tw-mt-1 tw-text-xs tw-text-red-700">
                    Hidden test failed — adjust your solution and try again.
                </div>
            )}
            {result.error && (
                <div className="tw-mt-1 tw-text-xs tw-text-red-700">
                    <span className="tw-text-ink/50">Error:</span> {result.error}
                </div>
            )}
        </li>
    );
}

ChallengeDetailPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, options);
    if (!session?.user) {
        const id = context.params?.id ?? "";
        return {
            redirect: {
                destination: `/login?callbackUrl=/challenges/${id}`,
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

export default ChallengeDetailPage;
