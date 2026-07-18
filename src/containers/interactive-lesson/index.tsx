import CodeEditor, { type CodeEditorMode } from "@components/code-editor";
import LessonConsole from "@components/lesson-console";
import LessonTestResults, { type RunStatus } from "@components/lesson-test-results";
import MarkdownRenderer from "@components/markdown-renderer";
import { SafeLocalStorage } from "@utils/safe-storage";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, CheckCircle2, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import type {
    InteractiveLesson,
    LessonFile,
    LessonFileName,
    LessonNavRef,
} from "@/lib/interactive-lessons/types";
import { buildSrcdoc } from "@/lib/lesson-sandbox/build-srcdoc";
import type { ConsoleEntry, LessonMessage, TestResult } from "@/lib/lesson-sandbox/messages";
import { isLessonMessage } from "@/lib/lesson-sandbox/messages";

type Props = {
    lesson: InteractiveLesson;
    prev: LessonNavRef | null;
    next: LessonNavRef | null;
};

const EDITOR_MODE: Record<LessonFileName, CodeEditorMode> = {
    "index.html": "html",
    "index.css": "css",
    "index.js": "javascript",
};

// ponytail: parent-thread timeout catches a hung run only when the browser isolates
// the sandboxed iframe onto its own thread (Chrome usually does). A synchronous infinite
// loop in a same-thread iframe would block this timer too. Upgrade path if it matters:
// run learner code in a terminable Web Worker. Good enough for authored lessons.
const RUN_TIMEOUT_MS = 5000;

const storageKey = (slug: string, file: string) => `interactive-lesson:${slug}:${file}`;

/**
 * A view-switcher button. These toggle a pane rather than implementing the full
 * ARIA tabs contract (roving tabindex + tabpanel wiring), so they expose honest
 * `aria-pressed` toggle semantics. Inactive text uses a light token — the earlier
 * dark grays were designed for light backgrounds and vanished on the navy bars.
 */
const TabButton = ({
    active,
    onClick,
    mono = false,
    children,
}: {
    active: boolean;
    onClick: () => void;
    mono?: boolean;
    children: ReactNode;
}) => (
    <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={clsx(
            "tw-px-4 tw-py-2 tw-text-sm",
            mono ? "tw-font-mono" : "tw-font-semibold tw-uppercase tw-tracking-wide",
            active ? "tw-bg-navy-deep tw-text-gold" : "tw-text-gray-100 hover:tw-text-cream"
        )}
    >
        {children}
    </button>
);

const InteractiveLessonWorkspace = ({ lesson, prev, next }: Props) => {
    const { status } = useSession();

    const [fileContents, setFileContents] = useState<Record<string, string>>(() =>
        Object.fromEntries(lesson.files.map((f) => [f.name, f.contents]))
    );
    const contentsRef = useRef(fileContents);

    // Open on the first editable file — the locked/provided files aren't where the work is.
    const [activeFile, setActiveFile] = useState<LessonFileName>(
        (lesson.files.find((f) => !f.readOnly) ?? lesson.files[0]).name
    );
    const [rightTab, setRightTab] = useState<"instructions" | "browser">(
        lesson.hasPreview ? "browser" : "instructions"
    );
    const [bottomTab, setBottomTab] = useState<"tests" | "console">(
        lesson.hasPreview ? "tests" : "console"
    );

    // Paint the starter page synchronously on first render so the preview is never
    // blank (pure string build — SSR-safe). The mount effect re-runs with any
    // localStorage-stored code a tick later. runId -1 is a sentinel: real runs start
    // at 1 and runIdRef starts at 0, so this throwaway paint's messages never pass the
    // runId guard and can't be mistaken for a real run's results.
    const [srcdoc, setSrcdoc] = useState(() => buildSrcdoc(lesson.files, lesson.tests, -1));
    // runId lives in state AND a ref: state keys the iframe so each run mounts a
    // fresh element (robust against StrictMode remounts + mid-load srcDoc mutation);
    // the ref lets the message listener drop stale messages without a stale closure.
    const [runId, setRunId] = useState(0);
    const runIdRef = useRef(0);
    const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
    const [testResults, setTestResults] = useState<TestResult[] | null>(null);
    const [runStatus, setRunStatus] = useState<RunStatus>("idle");

    const [completed, setCompleted] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentFiles = useCallback(
        (): LessonFile[] =>
            lesson.files.map((f) => ({
                ...f,
                contents: contentsRef.current[f.name] ?? f.contents,
            })),
        [lesson.files]
    );

    const run = useCallback(() => {
        const nextRunId = runIdRef.current + 1;
        runIdRef.current = nextRunId;
        setRunId(nextRunId);
        setConsoleEntries([]);
        setTestResults(null);
        setRunStatus("running");
        setSrcdoc(buildSrcdoc(currentFiles(), lesson.tests, nextRunId));

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (runIdRef.current === nextRunId) {
                setRunStatus((prevStatus) => (prevStatus === "running" ? "timeout" : prevStatus));
            }
        }, RUN_TIMEOUT_MS);
    }, [currentFiles, lesson.tests]);

    // Hydrate editable files from localStorage, then auto-run once so the preview
    // and initial tests reflect the learner's stored code. The run is deferred one
    // macrotask so it fires against a settled tree (past React StrictMode's
    // dev-mode mount/unmount/mount churn), which otherwise leaves the iframe blank.
    useEffect(() => {
        const hydrated = Object.fromEntries(
            lesson.files.map((f) => [
                f.name,
                f.readOnly
                    ? f.contents
                    : SafeLocalStorage.getItem(storageKey(lesson.slug, f.name), f.contents),
            ])
        );
        contentsRef.current = hydrated;
        setFileContents(hydrated);
        const id = setTimeout(run, 0);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lesson.slug]);

    const applyMessage = useCallback((message: LessonMessage) => {
        if (message.type === "console") {
            setConsoleEntries((prev) => [...prev, { level: message.level, args: message.args }]);
            return;
        }
        setTestResults(message.results);
        setRunStatus("done");
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    // Relay messages from the sandbox. Authenticate by frame identity + runId;
    // shape is validated by isLessonMessage. Opaque-origin frames can only target "*".
    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.source !== iframeRef.current?.contentWindow) return;
            const data = event.data;
            if (!isLessonMessage(data)) return;
            if (data.runId !== runIdRef.current) return;
            applyMessage(data);
        }
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [applyMessage]);

    useEffect(
        () => () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        []
    );

    const markComplete = useCallback(async () => {
        try {
            const res = await fetch("/api/learn/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: lesson.slug, completed: true }),
            });
            if (res.ok) setCompleted(true);
        } catch {
            // Non-fatal: progress is a convenience, not a gate on doing the lesson.
        }
    }, [lesson.slug]);

    // Load existing completion state for signed-in learners.
    useEffect(() => {
        if (status !== "authenticated") return;
        let cancelled = false;
        fetch("/api/learn/progress")
            .then((r) => (r.ok ? r.json() : { completed: [] }))
            .then((data: { completed?: string[] }) => {
                if (!cancelled && Array.isArray(data.completed)) {
                    setCompleted(data.completed.includes(lesson.slug));
                }
            })
            .catch(() => {
                // Non-fatal: failing to load prior progress just shows it unstarted.
            });
        return () => {
            cancelled = true;
        };
    }, [status, lesson.slug]);

    // Auto-record completion the moment every test passes.
    useEffect(() => {
        if (!testResults || testResults.length === 0) return;
        if (testResults.every((r) => r.passed) && status === "authenticated" && !completed) {
            void markComplete();
        }
    }, [testResults, status, completed, markComplete]);

    const updateFile = useCallback(
        (name: LessonFileName, value: string) => {
            contentsRef.current = { ...contentsRef.current, [name]: value };
            setFileContents((prev) => ({ ...prev, [name]: value }));
            // ponytail: write straight through on change — localStorage.setItem on a few
            // KB per keystroke is cheap; add debounce only if profiling shows jank.
            SafeLocalStorage.setItem(storageKey(lesson.slug, name), value);
        },
        [lesson.slug]
    );

    const reset = useCallback(() => {
        const starters = Object.fromEntries(
            lesson.files.map((f) => {
                if (!f.readOnly) SafeLocalStorage.removeItem(storageKey(lesson.slug, f.name));
                return [f.name, f.contents];
            })
        );
        contentsRef.current = starters;
        setFileContents(starters);
        run();
    }, [lesson.files, lesson.slug, run]);

    const activeFileMeta = lesson.files.find((f) => f.name === activeFile) ?? lesson.files[0];
    const passedCount = testResults?.filter((r) => r.passed).length ?? 0;
    const allPassed =
        testResults != null && testResults.length > 0 && passedCount === testResults.length;
    // The iframe is always mounted (it runs the code), but only shown on the Browser tab.
    const previewVisible = lesson.hasPreview && rightTab === "browser";

    return (
        <div className="tw-mx-auto tw-max-w-7xl tw-px-4 tw-py-6">
            {/* Header */}
            <header className="tw-mb-4">
                <Link
                    href="/learn"
                    className="tw-inline-flex tw-items-center tw-gap-1 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wide tw-text-navy-royal hover:tw-text-red"
                >
                    <ArrowLeft className="tw-h-4 tw-w-4" aria-hidden="true" /> All Lessons
                </Link>
                <div className="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-gap-3">
                    <h1 className="tw-m-0 tw-font-heading tw-text-2xl tw-text-navy-deep md:tw-text-3xl">
                        {lesson.title}
                    </h1>
                    {completed ? (
                        <span className="tw-inline-flex tw-items-center tw-gap-1 tw-bg-success/10 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-success">
                            <CheckCircle2 className="tw-h-4 tw-w-4" aria-hidden="true" /> Completed
                        </span>
                    ) : null}
                </div>
                <p className="tw-m-0 tw-mt-1 tw-text-sm tw-text-gray-500">
                    Module {lesson.module} · {lesson.moduleTitle}
                </p>
            </header>

            {/* Workspace */}
            <div className="tw-grid tw-gap-4 lg:tw-grid-cols-2">
                {/* Left: editor */}
                <section className="tw-flex tw-flex-col tw-overflow-hidden tw-border tw-border-navy-deep tw-bg-navy-midnight">
                    <div
                        className="tw-flex tw-items-stretch tw-border-b tw-border-navy-deep"
                        role="group"
                        aria-label="Files"
                    >
                        {lesson.files.map((file) => (
                            <TabButton
                                key={file.name}
                                mono={true}
                                active={activeFile === file.name}
                                onClick={() => setActiveFile(file.name)}
                            >
                                {file.name}
                                {file.readOnly ? (
                                    <span className="tw-ml-1 tw-text-xs tw-text-gray-100">
                                        (locked)
                                    </span>
                                ) : null}
                            </TabButton>
                        ))}
                    </div>

                    <div className="tw-min-h-[24rem] lg:tw-h-[58vh]">
                        <CodeEditor
                            key={activeFile}
                            name={`editor-${lesson.slug}-${activeFile}`}
                            mode={EDITOR_MODE[activeFile]}
                            value={fileContents[activeFile] ?? ""}
                            onChange={(value) => updateFile(activeFile, value)}
                            readOnly={activeFileMeta.readOnly ?? false}
                            height="100%"
                        />
                    </div>

                    <div className="tw-flex tw-items-center tw-gap-3 tw-border-t tw-border-navy-deep tw-bg-navy-midnight tw-p-3">
                        <button
                            type="button"
                            onClick={run}
                            className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-gold tw-px-5 tw-py-2 tw-text-sm tw-font-bold tw-uppercase tw-tracking-wide tw-text-navy-deep hover:tw-bg-gold-bright"
                        >
                            <Play className="tw-h-4 tw-w-4" aria-hidden="true" /> Run
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-gray-500 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wide tw-text-cream hover:tw-border-red hover:tw-text-red"
                        >
                            <RotateCcw className="tw-h-4 tw-w-4" aria-hidden="true" /> Reset
                        </button>
                    </div>
                </section>

                {/* Right: instructions / browser + tests / console */}
                <section className="tw-flex tw-flex-col tw-gap-4">
                    {/* Top: instructions overlaying an always-mounted preview iframe */}
                    <div className="tw-flex tw-flex-col tw-overflow-hidden tw-border tw-border-navy-deep">
                        <div
                            className="tw-flex tw-border-b tw-border-navy-deep tw-bg-navy-midnight"
                            role="group"
                            aria-label="Instructions and preview"
                        >
                            <TabButton
                                active={rightTab === "instructions"}
                                onClick={() => setRightTab("instructions")}
                            >
                                Instructions
                            </TabButton>
                            {lesson.hasPreview ? (
                                <TabButton
                                    active={rightTab === "browser"}
                                    onClick={() => setRightTab("browser")}
                                >
                                    Browser
                                </TabButton>
                            ) : null}
                        </div>

                        <div className="tw-relative tw-h-[38vh] tw-min-h-[18rem] tw-bg-white">
                            <iframe
                                key={runId}
                                ref={iframeRef}
                                title="Lesson preview"
                                srcDoc={srcdoc}
                                sandbox="allow-scripts"
                                // Kept mounted to run the code, but removed from the tab order and
                                // a11y tree while the Instructions overlay covers it (or on JS-only lessons).
                                aria-hidden={!previewVisible}
                                tabIndex={previewVisible ? 0 : -1}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-border-0"
                            />
                            {rightTab === "instructions" ? (
                                <div className="tw-absolute tw-inset-0 tw-overflow-auto tw-bg-white tw-p-5">
                                    <MarkdownRenderer content={lesson.instructions} />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Bottom: tests / console */}
                    <div className="tw-flex tw-flex-col tw-overflow-hidden tw-border tw-border-navy-deep tw-bg-navy-midnight">
                        <div
                            className="tw-flex tw-border-b tw-border-navy-deep"
                            role="group"
                            aria-label="Tests and console"
                        >
                            <TabButton
                                active={bottomTab === "tests"}
                                onClick={() => setBottomTab("tests")}
                            >
                                Tests{testResults ? ` (${passedCount}/${testResults.length})` : ""}
                            </TabButton>
                            <TabButton
                                active={bottomTab === "console"}
                                onClick={() => setBottomTab("console")}
                            >
                                Console{consoleEntries.length ? ` (${consoleEntries.length})` : ""}
                            </TabButton>
                        </div>
                        {/* aria-live so screen readers announce run status + results without moving focus */}
                        <div
                            className="tw-h-[24vh] tw-min-h-[10rem] tw-overflow-auto tw-bg-navy-midnight"
                            aria-live="polite"
                        >
                            {bottomTab === "tests" ? (
                                <LessonTestResults results={testResults} status={runStatus} />
                            ) : (
                                <LessonConsole entries={consoleEntries} />
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Sign-in nudge for anonymous learners */}
            {status === "unauthenticated" ? (
                <p className="tw-mt-4 tw-text-sm tw-text-gray-500">
                    <Link
                        href={`/login?callbackUrl=/learn/${lesson.slug}`}
                        className="tw-font-semibold tw-text-navy-royal hover:tw-text-red"
                    >
                        Sign in
                    </Link>{" "}
                    to save your progress across lessons.
                </p>
            ) : null}

            {/* Footer nav */}
            <nav className="tw-mt-6 tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-200 tw-pt-4">
                {prev ? (
                    <Link
                        href={`/learn/${prev.slug}`}
                        className="tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wide tw-text-navy-royal hover:tw-text-red"
                    >
                        <ArrowLeft className="tw-h-4 tw-w-4" aria-hidden="true" /> Back
                    </Link>
                ) : (
                    <span />
                )}
                {next ? (
                    <Link
                        href={`/learn/${next.slug}`}
                        className={clsx(
                            "tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-uppercase tw-tracking-wide",
                            allPassed
                                ? "tw-bg-navy-deep tw-text-cream hover:tw-bg-navy-royal"
                                : "tw-text-navy-royal hover:tw-text-red"
                        )}
                    >
                        Next Lesson <ArrowRight className="tw-h-4 tw-w-4" aria-hidden="true" />
                    </Link>
                ) : (
                    <span />
                )}
            </nav>
        </div>
    );
};

export default InteractiveLessonWorkspace;
