interface SafeError {
    name?: string;
    message: string;
    code?: string;
    status?: number;
    method?: string;
    path?: string;
}

/**
 * Reduces an unknown server-side error to fields that are safe to log.
 * HTTP client errors (e.g. axios) carry the request config, headers and body,
 * so logging them raw can leak credentials and user data.
 */
export function toSafeError(error: unknown): SafeError {
    if (!(error instanceof Error)) return { message: String(error) };

    const { code, response, config } = error as Error & {
        code?: unknown;
        response?: { status?: unknown };
        config?: { method?: unknown; url?: unknown };
    };
    const safe: SafeError = { name: error.name, message: error.message };
    if (typeof code === "string") safe.code = code;
    if (typeof response?.status === "number") safe.status = response.status;
    if (typeof config?.method === "string") safe.method = config.method.toUpperCase();
    if (typeof config?.url === "string") safe.path = config.url.split("?")[0];
    return safe;
}
