import { useCallback, useEffect, useState } from "react";

interface MatchedJob {
    title: string;
    company: string;
    fit_pct: number;
    matched_skills: string[];
    gap_skills: string[];
    url: string;
}

interface MatchResponse {
    matched_jobs?: MatchedJob[];
    [key: string]: unknown;
}

export default function JobMatch() {
    const [jobs, setJobs] = useState<MatchedJob[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMatches = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/j0di3/jobs/match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to load matches");
            }
            const body = (await res.json()) as MatchResponse;
            const list = Array.isArray(body.matched_jobs) ? body.matched_jobs : [];
            // Backend returns descending by fit_pct, but sort defensively
            // in case ordering ever changes upstream.
            const sorted = [...list].sort((a, b) => (b.fit_pct ?? 0) - (a.fit_pct ?? 0));
            setJobs(sorted);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load matches");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    return (
        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <div>
                    <h2 className="tw-text-xl tw-font-bold tw-text-ink">Your Matches</h2>
                    <p className="tw-text-sm tw-text-navy/60">
                        Roles ranked by fit against the skills on your resume.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={fetchMatches}
                    disabled={isLoading}
                    className="tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5 disabled:tw-opacity-50"
                >
                    <i className="fas fa-sync tw-mr-2" />
                    {isLoading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {error && (
                <div className="tw-mb-4 tw-rounded-md tw-border tw-border-red-200 tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-700">
                    {error}
                </div>
            )}

            {isLoading && jobs === null && (
                <div className="tw-rounded-md tw-border tw-border-navy/10 tw-p-8 tw-text-center tw-text-navy/60">
                    Scoring matches...
                </div>
            )}

            {jobs !== null && jobs.length === 0 && !isLoading && (
                <div className="tw-rounded-md tw-border tw-border-navy/10 tw-p-8 tw-text-center tw-text-navy/60">
                    No matches yet. Update your resume from the Resume Scorer tab and try again.
                </div>
            )}

            {jobs !== null && jobs.length > 0 && (
                <ul className="tw-space-y-4">
                    {jobs.map((job, idx) => (
                        <JobMatchCard key={`${job.url}-${idx}`} job={job} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function JobMatchCard({ job }: { job: MatchedJob }) {
    const fitColor = (pct: number) => {
        if (pct >= 80) return "tw-bg-green-100 tw-text-green-800";
        if (pct >= 60) return "tw-bg-yellow-100 tw-text-yellow-800";
        return "tw-bg-red-100 tw-text-red-800";
    };
    return (
        <li className="tw-rounded-md tw-border tw-border-navy/10 tw-p-4 tw-transition-shadow hover:tw-shadow-sm">
            <div className="tw-flex tw-items-start tw-justify-between tw-gap-3 tw-mb-3">
                <div className="tw-min-w-0">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-text-base tw-font-semibold tw-text-ink hover:tw-text-primary"
                    >
                        {job.title}
                    </a>
                    <p className="tw-text-sm tw-text-ink/60 tw-mt-0.5">{job.company}</p>
                </div>
                <span
                    className={`tw-shrink-0 tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-bold ${fitColor(
                        job.fit_pct
                    )}`}
                >
                    {Math.round(job.fit_pct)}% fit
                </span>
            </div>

            {job.matched_skills.length > 0 && (
                <div className="tw-mb-2">
                    <div className="tw-text-[10px] tw-font-mono tw-uppercase tw-tracking-widest tw-text-navy/50 tw-mb-1">
                        Matched skills
                    </div>
                    <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                        {job.matched_skills.map((s) => (
                            <span
                                key={`m-${s}`}
                                className="tw-rounded-full tw-bg-green-100 tw-px-2 tw-py-0.5 tw-text-[11px] tw-font-medium tw-text-green-800"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {job.gap_skills.length > 0 && (
                <div>
                    <div className="tw-text-[10px] tw-font-mono tw-uppercase tw-tracking-widest tw-text-navy/50 tw-mb-1">
                        Skill gaps
                    </div>
                    <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                        {job.gap_skills.map((s) => (
                            <span
                                key={`g-${s}`}
                                className="tw-rounded-full tw-bg-amber-100 tw-px-2 tw-py-0.5 tw-text-[11px] tw-font-medium tw-text-amber-800"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="tw-mt-3">
                <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-inline-flex tw-items-center tw-gap-1 tw-text-sm tw-text-primary hover:tw-underline"
                >
                    View posting
                    <i className="fas fa-external-link-alt tw-text-[10px]" />
                </a>
            </div>
        </li>
    );
}
