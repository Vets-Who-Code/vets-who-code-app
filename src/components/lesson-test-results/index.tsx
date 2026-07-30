import clsx from "clsx";
import { Check, Loader2, X } from "lucide-react";
import type { TestResult } from "@/lib/lesson-sandbox/messages";

export type RunStatus = "idle" | "running" | "done" | "timeout";

type Props = {
    results: TestResult[] | null;
    status: RunStatus;
};

const LessonTestResults = ({ results, status }: Props) => {
    if (status === "running") {
        return (
            <p className="tw-flex tw-items-center tw-gap-2 tw-p-4 tw-text-sm tw-text-gray-100">
                <Loader2 className="tw-h-4 tw-w-4 tw-animate-spin" aria-hidden="true" />
                Running your code…
            </p>
        );
    }

    if (status === "timeout") {
        return (
            <p className="tw-p-4 tw-text-sm tw-text-red-signal">
                Your code took too long to run — check for an infinite loop, then hit RUN again.
            </p>
        );
    }

    if (!results || status === "idle") {
        return (
            <p className="tw-p-4 tw-text-sm tw-text-gray-100">
                Hit <span className="tw-font-semibold tw-text-gold">RUN</span> to check your work
                against the tests.
            </p>
        );
    }

    const passed = results.filter((r) => r.passed).length;
    const allPassed = passed === results.length;

    return (
        <div>
            <p
                className={clsx(
                    "tw-m-0 tw-border-b tw-border-navy-deep tw-px-4 tw-py-2 tw-text-sm tw-font-semibold",
                    allPassed ? "tw-text-success" : "tw-text-cream"
                )}
            >
                {passed} / {results.length} tests passing
                {allPassed ? " — nice work, engineer." : ""}
            </p>
            <ul className="tw-m-0 tw-list-none tw-p-0">
                {results.map((result) => (
                    <li
                        key={result.name}
                        className="tw-flex tw-gap-2 tw-border-b tw-border-navy-deep tw-px-4 tw-py-2 tw-text-sm"
                    >
                        {result.passed ? (
                            <Check
                                className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-success"
                                aria-hidden="true"
                            />
                        ) : (
                            <X
                                className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-red-signal"
                                aria-hidden="true"
                            />
                        )}
                        <span className="tw-min-w-0">
                            <span className="tw-text-cream">{result.name}</span>
                            {!result.passed && result.error ? (
                                <span className="tw-mt-0.5 tw-block tw-font-mono tw-text-xs tw-text-red-signal">
                                    {result.error}
                                </span>
                            ) : null}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonTestResults;
