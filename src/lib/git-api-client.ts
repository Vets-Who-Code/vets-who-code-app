const token = process.env.GITHUB_TOKEN || "";

// Log token status for debugging (without exposing the actual token)
if (!token) {
    console.warn(
        "WARNING: GITHUB_TOKEN environment variable is not set. GitHub API requests may fail."
    );
}

export const gitAPI = {
    // Resolves with the status on every response; callers in github.ts branch on it.
    async get(path: string): Promise<{ status: number; data: unknown }> {
        // The token rides on every request, so refuse any path that would send it off-host
        // (e.g. "//evil.com" or "@evil.com").
        const url = new URL(path, "https://api.github.com");
        if (url.origin !== "https://api.github.com" || !path.startsWith("/")) {
            throw new Error(`Refusing non-GitHub API path: ${path}`);
        }
        const res = await fetch(url.href, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return { status: res.status, data: res.ok ? await res.json() : undefined };
    },
};
