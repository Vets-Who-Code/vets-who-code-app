/// <reference lib="webworker" />

// Runs inside a dedicated Web Worker. The student's code is compiled and
// executed here, isolated from the main thread — an infinite loop in their
// solution can only block this worker, and the main thread will terminate it.

import { stringifyForCatalog } from "./stringify";
import type { ClientTestResult, TestCase, WorkerInput, WorkerMessage } from "./types";

declare const self: DedicatedWorkerGlobalScope;

/**
 * Extracts the name of the first top-level function declared in the
 * student's solution. Matches:
 *   function NAME(...)
 *   const NAME = function (...)
 *   const NAME = async function (...)
 *   const NAME = (args) => ...
 *   const NAME = async args => ...
 *   (and the same with let/var)
 *
 * Bare value assignments like `const NUM = 5` or `const x = something()`
 * are intentionally rejected so the caller surfaces a clear "no function
 * declaration found" error rather than a downstream "x is not a function".
 */
function detectFunctionName(code: string): string | null {
    const fnDecl = code.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (fnDecl) return fnDecl[1];
    const assigned = code.match(
        /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/
    );
    if (assigned) return assigned[1];
    return null;
}

function failedResult(
    index: number,
    tc: TestCase,
    error: string
): ClientTestResult {
    return {
        test_case_index: index,
        input: tc.input,
        expected_output: tc.expected_output,
        actual_output: null,
        passed: false,
        error,
        hidden: tc.hidden ?? false,
    };
}

self.onmessage = (e: MessageEvent<WorkerInput>) => {
    const { solution, testCases } = e.data;
    const post = (msg: WorkerMessage) => self.postMessage(msg);

    const fnName = detectFunctionName(solution);
    if (!fnName) {
        post({
            type: "fatal",
            error: "Could not find a function declaration in your solution. Expected `function name(...)` or `const name = ...`.",
        });
        return;
    }

    // Compile the student's solution once and capture the named function,
    // then call it with parsed args per test. Avoids recompiling the full
    // solution body for every test case.
    let studentFn: (...args: unknown[]) => unknown;
    try {
        const compiled = new Function(`${solution}\nreturn ${fnName};`);
        const candidate = compiled() as unknown;
        if (typeof candidate !== "function") {
            post({
                type: "fatal",
                error: `\`${fnName}\` is not a function. Make sure your solution defines a function named \`${fnName}\`.`,
            });
            return;
        }
        studentFn = candidate as (...args: unknown[]) => unknown;
    } catch (err) {
        post({
            type: "fatal",
            error: err instanceof Error ? err.message : String(err),
        });
        return;
    }

    for (let i = 0; i < testCases.length; i += 1) {
        const tc = testCases[i];
        try {
            // Parse the catalog input string ("5", "[1,2,3]", "'hello'",
            // "5, 10", "true") via JS's own expression parser so every
            // catalog format works without bespoke handling.
            const args = new Function(`return [${tc.input}];`)() as unknown[];
            const actual = studentFn(...args);
            const actualStr = stringifyForCatalog(actual);
            post({
                type: "result",
                index: i,
                result: {
                    test_case_index: i,
                    input: tc.input,
                    expected_output: tc.expected_output,
                    actual_output: actualStr,
                    passed: actualStr === tc.expected_output,
                    error: null,
                    hidden: tc.hidden ?? false,
                },
            });
        } catch (err) {
            post({
                type: "result",
                index: i,
                result: failedResult(i, tc, err instanceof Error ? err.message : String(err)),
            });
        }
    }
    post({ type: "done" });
};

export {};
