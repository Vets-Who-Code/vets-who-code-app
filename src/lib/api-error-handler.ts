import type { NextApiResponse } from "next";

/**
 * Handles API errors consistently across all routes.
 *
 * Logs the error server-side and returns a 500 with a safe message. The
 * underlying error text is exposed as `details` only in development so
 * internal failures are never leaked to production clients.
 *
 * @param error - The error that was caught
 * @param res - Next.js API response object
 * @param customMessage - Client-facing message; defaults to a generic one
 *
 * @example
 * } catch (error) {
 *     handleApiError(error, res, "Failed to fetch courses");
 *     return;
 * }
 */
export function handleApiError(error: unknown, res: NextApiResponse, customMessage?: string): void {
    const message = customMessage || "An unexpected error occurred";

    console.error(message, error);

    res.status(500).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && error instanceof Error
            ? { details: error.message }
            : {}),
    });
}
