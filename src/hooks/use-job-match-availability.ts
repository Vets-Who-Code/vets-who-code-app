import { useEffect, useState } from "react";

export type JobMatchAvailability = "unknown" | "available" | "unavailable";

/**
 * Probes /api/j0di3/jobs/match once to see whether job matching is enabled
 * on the backend. The backend returns 503 with code "SERVICE_UNAVAILABLE"
 * when the JOB_MATCH_ENABLED flag is off — that's a product-state signal,
 * not an error, so we use it to decide whether to render the Matches tab.
 */
export default function useJobMatchAvailability(): JobMatchAvailability {
    const [status, setStatus] = useState<JobMatchAvailability>("unknown");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await fetch("/api/j0di3/jobs/match", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                });

                if (cancelled) return;

                if (res.status === 503) {
                    const body = await res.json().catch(() => null);
                    const code =
                        (body?.error && typeof body.error === "object" && body.error.code) ||
                        body?.code;
                    if (code === "SERVICE_UNAVAILABLE") {
                        setStatus("unavailable");
                        return;
                    }
                }

                setStatus("available");
            } catch {
                if (!cancelled) setStatus("available");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return status;
}
