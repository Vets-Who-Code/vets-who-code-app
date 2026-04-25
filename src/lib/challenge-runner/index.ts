import type {
    Challenge,
    ClientResults,
    ClientTestResult,
    RunChallengeOptions,
    TestCase,
    WorkerMessage,
} from "./types";

export type { Challenge, ClientResults, ClientTestResult, RunChallengeOptions, TestCase } from "./types";

const DEFAULT_PER_TEST_TIMEOUT_MS = 3000;

function timedOutResult(index: number, tc: TestCase): ClientTestResult {
    return {
        test_case_index: index,
        input: tc.input,
        expected_output: tc.expected_output,
        actual_output: null,
        passed: false,
        error: "execution timeout",
        hidden: tc.hidden ?? false,
    };
}

function fatalResult(index: number, tc: TestCase, message: string): ClientTestResult {
    return {
        test_case_index: index,
        input: tc.input,
        expected_output: tc.expected_output,
        actual_output: null,
        passed: false,
        error: message,
        hidden: tc.hidden ?? false,
    };
}

/**
 * Runs a student's solution against the challenge's test cases in a
 * terminable Web Worker. Guaranteed to resolve — on timeout or fatal
 * worker error, unfinished tests are filled with synthetic failures so
 * the caller always receives a complete ClientResults payload.
 *
 * Browser-only. Throws synchronously if invoked during SSR.
 */
export async function runChallenge(
    solution: string,
    challenge: Challenge,
    options: RunChallengeOptions = {}
): Promise<ClientResults> {
    if (typeof window === "undefined") {
        throw new Error("runChallenge must be called in the browser.");
    }

    const allCases = challenge.test_cases ?? [];
    const testCases = options.visibleOnly
        ? allCases.filter((tc) => !(tc.hidden ?? false))
        : allCases;

    if (testCases.length === 0) {
        return {
            all_passed: false,
            test_results: [],
            execution_ms: 0,
            runtime: "browser-js",
        };
    }

    const perTest = options.perTestTimeoutMs ?? DEFAULT_PER_TEST_TIMEOUT_MS;
    const totalTimeout = options.totalTimeoutMs ?? perTest * testCases.length + 2000;

    const worker = new Worker(new URL("./runner.worker.ts", import.meta.url));
    const start = performance.now();

    try {
        const results = await new Promise<ClientTestResult[]>((resolve) => {
            const collected: (ClientTestResult | undefined)[] = new Array(testCases.length).fill(
                undefined
            );
            let settled = false;

            const finalize = () => {
                if (settled) return;
                settled = true;
                clearTimeout(timeoutId);
                const filled = collected.map((r, i) => r ?? timedOutResult(i, testCases[i]));
                resolve(filled);
            };

            const timeoutId = setTimeout(() => {
                worker.terminate();
                finalize();
            }, totalTimeout);

            worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
                const msg = e.data;
                if (msg.type === "result") {
                    collected[msg.index] = msg.result;
                } else if (msg.type === "done") {
                    finalize();
                } else if (msg.type === "fatal") {
                    const filled = testCases.map((tc, i) => fatalResult(i, tc, msg.error));
                    if (!settled) {
                        settled = true;
                        clearTimeout(timeoutId);
                        resolve(filled);
                    }
                }
            };

            worker.onerror = (e: ErrorEvent) => {
                const message = e.message || "Worker crashed";
                const filled = testCases.map((tc, i) => fatalResult(i, tc, message));
                if (!settled) {
                    settled = true;
                    clearTimeout(timeoutId);
                    resolve(filled);
                }
            };

            worker.postMessage({ solution, testCases });
        });

        return {
            all_passed: results.every((r) => r.passed),
            test_results: results,
            execution_ms: Math.round(performance.now() - start),
            runtime: "browser-js",
        };
    } finally {
        worker.terminate();
    }
}
