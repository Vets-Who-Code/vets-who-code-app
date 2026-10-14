/**
 * Structured server logger. Writes one JSON line per entry to the console,
 * which Vercel captures from stdout/stderr as the app's log stream.
 *
 * Values under sensitive keys (tokens, secrets, cookies, auth headers, ...)
 * are replaced with "[REDACTED]" at any depth. Errors are reduced to their
 * name, message and stack.
 */

type Level = "info" | "warn" | "error";
type Context = Record<string, unknown>;

const SENSITIVE_KEYS = ["authorization", "token", "secret", "password", "apikey", "cookie"];

function isSensitive(key: string): boolean {
    const normalized = key.toLowerCase().replace(/[-_]/g, "");
    return SENSITIVE_KEYS.some((sensitive) => normalized.includes(sensitive));
}

function sanitize(value: unknown, depth = 0): unknown {
    if (value instanceof Error) {
        return { name: value.name, message: value.message, stack: value.stack };
    }
    if (value === null || typeof value !== "object") return value;
    if (depth > 5) return "[Truncated]";
    if (Array.isArray(value)) return value.map((item) => sanitize(item, depth + 1));
    const result: Context = {};
    for (const [key, entry] of Object.entries(value)) {
        result[key] = isSensitive(key) ? "[REDACTED]" : sanitize(entry, depth + 1);
    }
    return result;
}

function write(level: Level, msg: string, context?: Context): void {
    const entry = {
        level,
        msg,
        timestamp: new Date().toISOString(),
        ...(context ? { context: sanitize(context) } : {}),
    };
    // biome-ignore lint/suspicious/noConsole: the logger is the one sanctioned console writer
    console[level](JSON.stringify(entry));
}

export const logger = {
    info: (msg: string, context?: Context) => write("info", msg, context),
    warn: (msg: string, context?: Context) => write("warn", msg, context),
    error: (msg: string, context?: Context) => write("error", msg, context),
};
