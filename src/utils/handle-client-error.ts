/**
 * Centralized client-side error handler.
 *
 * Replaces the `catch { /* non-critical *​/ }` pattern that left the UI in
 * ambiguous states (spinner stops but nothing renders, and devs can't see
 * the failure in the console).
 *
 * Use this whenever a client-side fetch / handler catches an error:
 *
 *     try {
 *         await fetch(...);
 *     } catch (err) {
 *         handleClientError(err, { context: "fetchRecommended" });
 *         setError("We couldn't load recommended challenges.");
 *     }
 *
 * The helper always logs (so failures aren't invisible). When we wire up
 * Sentry / equivalent, add the reporting call here in one place instead of
 * every call site.
 */

export interface HandleClientErrorOptions {
    /** Short label identifying the failure site, e.g. "fetchRecommended". */
    context: string;
    /** When true, the helper rethrows so a surrounding catch can act on it. */
    rethrow?: boolean;
}

export function handleClientError(err: unknown, options: HandleClientErrorOptions): void {
    const { context, rethrow } = options;
    console.error(`[${context}]`, err);
    // TODO(observability): Sentry.captureException(err, { tags: { context } });
    if (rethrow) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}

/**
 * Extract a user-presentable message from an unknown error. Use this when
 * rendering the failure inline instead of just logging it.
 */
export function getErrorMessage(err: unknown, fallback = "Something went wrong."): string {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    return fallback;
}
