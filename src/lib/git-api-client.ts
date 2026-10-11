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
        const res = await fetch(`https://api.github.com${path}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return { status: res.status, data: res.ok ? await res.json() : undefined };
    },
};
