export type TestCase = {
    input: string;
    expected_output: string;
    hidden?: boolean;
};

export type Challenge = {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: string;
    language: string;
    starter_code?: string;
    test_cases?: TestCase[];
    estimated_minutes?: number;
};

export type ClientTestResult = {
    test_case_index: number;
    input: string;
    expected_output: string;
    actual_output: string | null;
    passed: boolean;
    error: string | null;
    hidden: boolean;
};

export type ClientResults = {
    all_passed: boolean;
    test_results: ClientTestResult[];
    execution_ms?: number;
    runtime?: "browser-js" | "browser-pyodide" | "server";
};

export type RunChallengeOptions = {
    /** Only run test cases where hidden !== true. Used by the Run button. */
    visibleOnly?: boolean;
    /** Per-test timeout in milliseconds. Defaults to 3000. */
    perTestTimeoutMs?: number;
    /** Overall timeout budget. Defaults to perTestTimeoutMs * testCount + 2000. */
    totalTimeoutMs?: number;
};

/** Messages the worker posts back to the main thread. */
export type WorkerMessage =
    | { type: "result"; index: number; result: ClientTestResult }
    | { type: "done" }
    | { type: "fatal"; error: string };

/** Message the main thread sends into the worker. */
export type WorkerInput = {
    solution: string;
    testCases: TestCase[];
};
