/**
 * Logs a client-side fetch/submit failure with context and returns a
 * user-safe message for rendering in a component error state.
 */
export function handleClientError(error: unknown, context: string): string {
    console.error(`[${context}]`, error);
    return error instanceof Error && error.message
        ? error.message
        : "Something went wrong. Please try again.";
}
