/**
 * Types for interactive coding lessons (learnjavascript.online-style).
 *
 * Lesson CONTENT lives in git as TS data files under `src/data/interactive-lessons/`
 * — it is authored material, not user data. User PROGRESS through lessons is stored
 * in Neon (see the `InteractiveProgress` Prisma model + `/api/learn/progress`).
 */

/** The three editable files a lesson can ship. Fixed set keeps the sandbox assembly trivial. */
export type LessonFileName = "index.html" | "index.css" | "index.js";

export interface LessonFile {
    name: LessonFileName;
    contents: string;
    /** Provided-but-locked files (e.g. given data or fixed markup). */
    readOnly?: boolean;
}

/**
 * A single assertion test. `body` is JS source executed inside the sandboxed iframe
 * after the learner's code runs. It has `assert(cond, msg)` and
 * `assertEqual(actual, expected, msg)` in scope, plus `document`/`window`. Throw to fail.
 */
export interface LessonTest {
    name: string;
    body: string;
}

export interface InteractiveLesson {
    slug: string;
    title: string;
    /** Hashflag Stack curriculum module this lesson belongs to. */
    module: 4 | 5;
    moduleTitle: string;
    /** Position within the module (ascending). Drives Back/Next ordering. */
    order: number;
    /** Markdown. Rendered via the shared MarkdownRenderer. */
    instructions: string;
    /** Starter files. Array order = tab order. */
    files: LessonFile[];
    /**
     * `false` => pure-JS lesson (no visible page); the Console tab leads and the
     * Browser tab is hidden. The sandbox still runs and tests still execute.
     */
    hasPreview: boolean;
    tests: LessonTest[];
    /** Reference solution — used by the Playwright spec and a future reveal-solution UI. */
    solutionFiles: LessonFile[];
    /** Reserved. "browser-pyodide" would unlock Python lessons later (Module 6). */
    runtime: "browser-web";
}

/** Lightweight reference for Back/Next navigation (keeps page props small). */
export interface LessonNavRef {
    slug: string;
    title: string;
}
