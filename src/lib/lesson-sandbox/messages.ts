/**
 * The message contract between the sandboxed lesson iframe (child) and the
 * workspace container (parent). The child posts these via `postMessage`; the
 * harness in `harness.ts` produces exactly these shapes as raw JS.
 *
 * Every message carries `source: "vwc-lesson"` and the `runId` of the run that
 * produced it, so the parent can drop stale messages from a previous Run.
 */

export const LESSON_MESSAGE_SOURCE = "vwc-lesson" as const;

export type ConsoleLevel = "log" | "info" | "warn" | "error";

export interface ConsoleEntry {
    level: ConsoleLevel;
    args: string[];
}

export interface TestResult {
    name: string;
    passed: boolean;
    error: string | null;
}

export type LessonMessage =
    | {
          source: typeof LESSON_MESSAGE_SOURCE;
          runId: number;
          type: "console";
          level: ConsoleLevel;
          args: string[];
      }
    | {
          source: typeof LESSON_MESSAGE_SOURCE;
          runId: number;
          type: "tests";
          results: TestResult[];
          passed: number;
          total: number;
      };

/**
 * Narrow an untrusted `MessageEvent.data` to a LessonMessage. The parent must
 * ALSO verify `event.source === iframe.contentWindow` before trusting this —
 * shape validation alone does not prove origin.
 */
export function isLessonMessage(data: unknown): data is LessonMessage {
    if (typeof data !== "object" || data === null) return false;
    const m = data as Record<string, unknown>;
    if (m.source !== LESSON_MESSAGE_SOURCE) return false;
    if (typeof m.runId !== "number") return false;
    if (m.type === "console") {
        return (
            (m.level === "log" ||
                m.level === "info" ||
                m.level === "warn" ||
                m.level === "error") &&
            Array.isArray(m.args)
        );
    }
    if (m.type === "tests") {
        return (
            Array.isArray(m.results) && typeof m.passed === "number" && typeof m.total === "number"
        );
    }
    return false;
}
