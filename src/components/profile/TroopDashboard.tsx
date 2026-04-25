import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface DashboardData {
    troop?: {
        name: string;
        email: string;
        branch: string | null;
        mos_afsc: string | null;
        current_module: number;
        skill_level: string | null;
        target_role: string | null;
        github_username: string | null;
        enrolled: boolean;
    };
    // Top-level stats from J0dI3
    challenges_completed?: number;
    challenges_attempted?: number;
    resume_score?: number | null;
    github_score?: number | null;
    portfolio_score?: number | null;
    current_module_topics?: string[];
    recent_conversations?: {
        id: string;
        pillar?: string;
        summary?: string;
        created_at?: string;
    }[];
}

interface WarmupChallenge {
    id?: string;
    challenge_id?: string;
    title: string;
    topic: string;
    difficulty: string;
}

interface ModuleProgress {
    curriculum_module: number;
    total: number;
    attempted: number;
    completed: number;
}

interface ProgressData {
    troop_id: string;
    current_module: number;
    current_module_progress: ModuleProgress | null;
    by_module: ModuleProgress[];
    overall_completed: number;
    overall_total: number;
}

export default function TroopDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [warmups, setWarmups] = useState<WarmupChallenge[]>([]);
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingWarmups, setIsLoadingWarmups] = useState(true);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdatingModule, setIsUpdatingModule] = useState(false);

    const handleModuleChange = async (newModule: number) => {
        setIsUpdatingModule(true);
        try {
            const res = await fetch("/api/j0di3/troops/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_module: newModule }),
            });
            if (res.ok) {
                setData((prev) => prev ? {
                    ...prev,
                    troop: prev.troop ? { ...prev.troop, current_module: newModule } : prev.troop,
                } : prev);
            }
        } catch {
            // non-critical
        } finally {
            setIsUpdatingModule(false);
        }
    };

    const fetchDashboard = useCallback(async () => {
        try {
            const res = await fetch("/api/j0di3/troops/dashboard");
            if (res.ok) {
                setData(await res.json());
            } else if (res.status === 400) {
                setError("J0dI3 profile not linked yet. Sign out and back in to activate.");
            } else {
                setError("Failed to load dashboard");
            }
        } catch {
            setError("Failed to load dashboard");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchWarmups = useCallback(async () => {
        try {
            const res = await fetch("/api/j0di3/challenges/recommended-warmups?count=5");
            if (res.ok) {
                const body = await res.json();
                setWarmups(Array.isArray(body) ? body : (body.challenges ?? []));
            }
        } catch {
            // non-critical — tray just stays hidden
        } finally {
            setIsLoadingWarmups(false);
        }
    }, []);

    const fetchProgress = useCallback(async () => {
        try {
            const res = await fetch("/api/j0di3/troops/progress");
            if (res.ok) {
                setProgress(await res.json());
            }
        } catch {
            // non-critical
        } finally {
            setIsLoadingProgress(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
        fetchWarmups();
        fetchProgress();
    }, [fetchDashboard, fetchWarmups, fetchProgress]);

    if (isLoading) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-8 tw-shadow-sm tw-text-center">
                <p className="tw-text-gray-300">Loading J0dI3 dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-red/20 tw-bg-red/5 tw-p-6 tw-text-center">
                <i className="fas fa-exclamation-triangle tw-text-red tw-text-2xl tw-mb-2" />
                <p className="tw-font-mono tw-text-sm tw-text-red/80">{error}</p>
            </div>
        );
    }

    const challengesCompleted = data?.challenges_completed ?? 0;
    const challengesAttempted = data?.challenges_attempted ?? 0;
    const passRate =
        challengesAttempted > 0
            ? Math.round((challengesCompleted / challengesAttempted) * 100)
            : 0;
    const conversationCount = data?.recent_conversations?.length ?? 0;

    return (
        <div className="tw-space-y-6">
            {/* Reps tray — confidence loop entry point */}
            <RepsTray warmups={warmups} loading={isLoadingWarmups} />

            {/* Stats Grid */}
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
                {[
                    {
                        label: "Challenges Completed",
                        value: challengesCompleted,
                        icon: "fa-code",
                        color: "tw-text-primary",
                    },
                    {
                        label: "Attempted",
                        value: challengesAttempted,
                        icon: "fa-clipboard-check",
                        color: "tw-text-blue-600",
                    },
                    {
                        label: "Pass Rate",
                        value: `${passRate}%`,
                        icon: "fa-chart-line",
                        color: passRate >= 70 ? "tw-text-green-600" : "tw-text-yellow-600",
                    },
                    {
                        label: "Conversations",
                        value: conversationCount,
                        icon: "fa-comments",
                        color: "tw-text-blue-600",
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-4 tw-shadow-sm tw-text-center"
                    >
                        <i className={`fas ${stat.icon} tw-text-2xl ${stat.color} tw-mb-2`} />
                        <div className="tw-text-2xl tw-font-bold tw-text-ink">{stat.value}</div>
                        <div className="tw-text-xs tw-text-gray-400 tw-uppercase tw-tracking-wide">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scores */}
            {(data?.resume_score != null || data?.github_score != null || data?.portfolio_score != null) && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                        Scores
                    </h3>
                    <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-text-center">
                        {data.resume_score != null && (
                            <div>
                                <div className="tw-text-2xl tw-font-bold tw-text-ink">{data.resume_score}</div>
                                <div className="tw-text-xs tw-text-gray-400">Resume</div>
                            </div>
                        )}
                        {data.github_score != null && (
                            <div>
                                <div className="tw-text-2xl tw-font-bold tw-text-ink">{data.github_score}</div>
                                <div className="tw-text-xs tw-text-gray-400">GitHub</div>
                            </div>
                        )}
                        {data.portfolio_score != null && (
                            <div>
                                <div className="tw-text-2xl tw-font-bold tw-text-ink">{data.portfolio_score}</div>
                                <div className="tw-text-xs tw-text-gray-400">Portfolio</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Troop Info */}
            {data?.troop && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                        Troop Profile
                    </h3>
                    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4 tw-text-sm">
                        <div>
                            <span className="tw-text-gray-400">Current Module</span>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <select
                                    value={data.troop.current_module}
                                    onChange={(e) => handleModuleChange(Number(e.target.value))}
                                    disabled={isUpdatingModule}
                                    className="tw-font-semibold tw-text-ink tw-border tw-border-gray-200 tw-rounded tw-px-2 tw-py-0.5 tw-text-sm focus:tw-border-primary focus:tw-outline-none disabled:tw-opacity-50"
                                >
                                    {Array.from({ length: 25 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>Module {m}</option>
                                    ))}
                                </select>
                                <span className="tw-text-xs tw-text-gray-400">of 25</span>
                            </div>
                        </div>
                        {data.troop.skill_level && (
                            <div>
                                <span className="tw-text-gray-400">Skill Level</span>
                                <p className="tw-font-semibold tw-text-ink tw-capitalize">{data.troop.skill_level}</p>
                            </div>
                        )}
                        {data.troop.branch && (
                            <div>
                                <span className="tw-text-gray-400">Branch</span>
                                <p className="tw-font-semibold tw-text-ink">{data.troop.branch}</p>
                            </div>
                        )}
                        {data.troop.mos_afsc && (
                            <div>
                                <span className="tw-text-gray-400">MOS/AFSC</span>
                                <p className="tw-font-semibold tw-text-ink">{data.troop.mos_afsc}</p>
                            </div>
                        )}
                        {data.troop.target_role && (
                            <div>
                                <span className="tw-text-gray-400">Target Role</span>
                                <p className="tw-font-semibold tw-text-ink">{data.troop.target_role}</p>
                            </div>
                        )}
                        <div>
                            <span className="tw-text-gray-400">Enrollment</span>
                            <p className="tw-font-semibold tw-text-ink">
                                {data.troop.enrolled ? "Active" : "Inactive"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Module Topics */}
            {data?.current_module_topics && data.current_module_topics.length > 0 && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                        Current Module Topics
                    </h3>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {data.current_module_topics.map((topic) => (
                            <span
                                key={topic}
                                className="tw-rounded-full tw-bg-navy-sky tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-blue-800"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Module progress bars */}
            <ModuleProgressPanel progress={progress} loading={isLoadingProgress} />

            {/* Recent Conversations */}
            {data?.recent_conversations && data.recent_conversations.length > 0 && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4">
                        Recent AI Conversations
                    </h3>
                    <div className="tw-space-y-3">
                        {data.recent_conversations.slice(0, 5).map((conv) => (
                            <div
                                key={conv.id}
                                className="tw-border-b tw-border-gray-100 tw-pb-2 last:tw-border-0"
                            >
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    {conv.pillar && (
                                        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-blue-800 tw-capitalize">
                                            {conv.pillar}
                                        </span>
                                    )}
                                    {conv.created_at && (
                                        <span className="tw-text-xs tw-text-gray-400">
                                            {new Date(conv.created_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                {conv.summary && (
                                    <p className="tw-text-sm tw-text-gray-200 tw-mt-1 tw-line-clamp-2">{conv.summary}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function RepsTray({
    warmups,
    loading,
}: {
    warmups: WarmupChallenge[];
    loading: boolean;
}) {
    if (loading) {
        return null;
    }
    if (warmups.length === 0) {
        return null;
    }
    return (
        <div className="tw-rounded-lg tw-border tw-border-primary/20 tw-bg-white tw-p-6 tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <div>
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-mb-1">
                        Reps
                    </h3>
                    <p className="tw-text-sm tw-text-ink/70">
                        Knock one out — most take 30 seconds.
                    </p>
                </div>
            </div>
            <ul className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-gap-3">
                {warmups.map((w) => {
                    const id = w.id ?? w.challenge_id ?? "";
                    return (
                        <li key={id || w.title}>
                            <Link
                                href={`/challenges/${id}`}
                                className="tw-block tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-3 tw-transition-shadow hover:tw-shadow-md hover:tw-border-primary"
                            >
                                <div className="tw-text-sm tw-font-semibold tw-text-ink tw-line-clamp-2 tw-mb-2">
                                    {w.title}
                                </div>
                                <div className="tw-flex tw-flex-wrap tw-gap-1">
                                    <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-blue-800">
                                        {w.topic}
                                    </span>
                                    <span className="tw-rounded-full tw-bg-green-100 tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-green-800">
                                        warmup
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function ModuleProgressPanel({
    progress,
    loading,
}: {
    progress: ProgressData | null;
    loading: boolean;
}) {
    if (loading) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm tw-text-center">
                <p className="tw-text-gray-300 tw-text-sm">Loading progress...</p>
            </div>
        );
    }
    if (!progress || !Array.isArray(progress.by_module) || progress.by_module.length === 0) {
        return null;
    }
    const overallPct =
        progress.overall_total > 0
            ? Math.round((progress.overall_completed / progress.overall_total) * 100)
            : 0;
    return (
        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Module Progress
                </h3>
                <span className="tw-text-xs tw-text-ink/60">
                    {progress.overall_completed} / {progress.overall_total} overall ({overallPct}%)
                </span>
            </div>
            <ul className="tw-space-y-2">
                {progress.by_module
                    .slice()
                    .sort((a, b) => a.curriculum_module - b.curriculum_module)
                    .map((m) => {
                        const pct = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0;
                        const isCurrent = m.curriculum_module === progress.current_module;
                        return (
                            <li key={m.curriculum_module} className="tw-text-sm">
                                <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                                    <span
                                        className={`tw-font-medium ${
                                            isCurrent ? "tw-text-primary" : "tw-text-ink/80"
                                        }`}
                                    >
                                        Module {m.curriculum_module}
                                        {isCurrent && (
                                            <span className="tw-ml-2 tw-rounded-full tw-bg-primary/10 tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-semibold tw-text-primary tw-uppercase">
                                                Current
                                            </span>
                                        )}
                                    </span>
                                    <span className="tw-text-xs tw-text-ink/60">
                                        {m.completed} / {m.total}
                                    </span>
                                </div>
                                <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-navy/5 tw-overflow-hidden">
                                    <div
                                        className={`tw-h-full ${
                                            isCurrent ? "tw-bg-primary" : "tw-bg-navy/30"
                                        }`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
