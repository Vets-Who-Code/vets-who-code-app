import type { NextApiHandler } from "next";
import { handleApiError } from "@/lib/api-error-handler";
import { logger } from "@/lib/logger";
import { getClientIp } from "@/lib/rate-limit";

/**
 * Wraps an API route so every request is logged with method, path, status,
 * duration and client IP. Unhandled errors are logged and, if nothing has been
 * sent yet, answered with a safe 500. Request bodies and headers are never logged.
 */
export function withApiLogging<T>(handler: NextApiHandler<T>): NextApiHandler<T> {
    return async (req, res) => {
        const start = Date.now();
        try {
            await handler(req, res);
        } catch (error) {
            if (res.headersSent) {
                logger.error("Unhandled API error after response was sent", { error });
            } else {
                handleApiError(error, res);
            }
        } finally {
            logger.info("API request", {
                method: req.method,
                path: req.url?.split("?")[0],
                status: res.statusCode,
                durationMs: Date.now() - start,
                ip: getClientIp(req),
            });
        }
    };
}
