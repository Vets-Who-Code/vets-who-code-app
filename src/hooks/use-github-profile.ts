import { useEffect, useState } from "react";
import type { GitHubData } from "@/types/profile";

interface UseGitHubProfileReturn {
    data: GitHubData | null;
    isLoading: boolean;
    error: string | null;
}

export default function useGitHubProfile(userId?: string): UseGitHubProfileReturn {
    const [data, setData] = useState<GitHubData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchGitHub() {
            try {
                const url = userId
                    ? `/api/user/github?userId=${encodeURIComponent(userId)}`
                    : "/api/user/github";
                const res = await fetch(url);
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    throw new Error(body.error || `HTTP ${res.status}`);
                }
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchGitHub();
        return () => { cancelled = true; };
    }, [userId]);

    return { data, isLoading, error };
}
