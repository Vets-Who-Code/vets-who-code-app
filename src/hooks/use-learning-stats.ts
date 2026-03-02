import { useEffect, useState } from "react";
import type { LearningStatsData } from "@/types/profile";

interface UseLearningStatsReturn {
    data: LearningStatsData | null;
    isLoading: boolean;
    error: string | null;
}

export default function useLearningStats(userId?: string): UseLearningStatsReturn {
    const [data, setData] = useState<LearningStatsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchStats() {
            try {
                const url = userId
                    ? `/api/user/learning-stats?userId=${encodeURIComponent(userId)}`
                    : "/api/user/learning-stats";
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

        fetchStats();
        return () => { cancelled = true; };
    }, [userId]);

    return { data, isLoading, error };
}
