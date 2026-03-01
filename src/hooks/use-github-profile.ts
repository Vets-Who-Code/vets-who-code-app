import { useEffect, useState } from "react";
import type { GitHubData } from "@/types/profile";

interface UseGitHubProfileReturn {
    data: GitHubData | null;
    isLoading: boolean;
    error: string | null;
}

export default function useGitHubProfile(): UseGitHubProfileReturn {
    const [data, setData] = useState<GitHubData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchGitHub() {
            try {
                const res = await fetch("/api/user/github");
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
    }, []);

    return { data, isLoading, error };
}
