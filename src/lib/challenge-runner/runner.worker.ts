/// <reference lib="webworker" />

// Runs inside a dedicated Web Worker. The student's code is compiled and
// executed here, isolated from the main thread — an infinite loop in their
// solution can only block this worker, and the main thread will terminate it.

import { stringifyForCatalog } from "./stringify";
import type { ClientTestResult, TestCase, WorkerInput, WorkerMessage } from "./types";

declare const self: DedicatedWorkerGlobalScope;

/**
 * Extracts the name of the first top-level function declared in the student's
 * solution. Matches:
 *   function NAME(...)
 *   const NAME = (...) =>
 *   let NAME = function (...)
 *   var NAME = ...
 * Returns null if nothing matches — the caller reports a clear error.
 */
function detectFunctionName(code: string): string | null {
    const fnDecl = code.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (fnDecl) return fnDecl[1];
    const assigned = code.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/);
    if (assigned) return assigned[1];
    return null;
}

function runTest(solution: string, fnName: string, tc: TestCase, index: number): ClientTestResult {
    const hidden = tc.hidden ?? false;
    try {
        // Compile solution + call in a single Function so the student's
        // declarations are in scope for the call expression. The test case
        // input is embedded as a bare argument list and evaluated by JS,
        // which handles "5", "[1,2]", "'hello'", "5, 10", "true" uniformly.
        const body = `${solution}\nreturn ${fnName}(${tc.input});`;
        const actual = new Function(body)();
        const actualStr = stringifyForCatalog(actual);
        return {
            test_case_index: index,
            input: tc.input,
            expected_output: tc.expected_output,
            actual_output: actualStr,
            passed: actualStr === tc.expected_output,
            error: null,
            hidden,
        };
    } catch (err) {
        return {
            test_case_index: index,
            input: tc.input,
            expected_output: tc.expected_output,
            actual_output: null,
            passed: false,
            error: err instanceof Error ? err.message : String(err),
            hidden,
        };
    }
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

    for (let i = 0; i < testCases.length; i += 1) {
        const result = runTest(solution, fnName, testCases[i], i);
        post({ type: "result", index: i, result });
    }
    post({ type: "done" });
};

export {};
