import { useEffect, useState } from "react";

interface Placement {
    id?: string;
    company?: string;
    role?: string;
    start_date?: string;
    status?: string;
}

interface MosRelevance {
    mos?: string;
    target_role?: string;
    relevance?: number;
    matched_skills?: string[];
    gap_skills?: string[];
}

const ProfileSettings = () => {
    const [placements, setPlacements] = useState<Placement[] | null>(null);
    const [mosRel, setMosRel] = useState<MosRelevance | null>(null);
    const [busy, setBusy] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [pRes, mRes] = await Promise.all([
                    fetch("/api/j0di3/troops/placements"),
                    fetch("/api/j0di3/troops/mos-relevance"),
                ]);
                if (pRes.ok) {
                    const body = await pRes.json();
                    setPlacements(Array.isArray(body) ? body : (body.placements ?? []));
                }
                if (mRes.ok) {
                    setMosRel(await mRes.json());
                }
            } catch {
                // non-critical
            }
        })();
    }, []);

    const exportData = async () => {
        setBusy("export");
        try {
            const res = await fetch("/api/j0di3/troops/export");
            if (!res.ok) {
                setMessage("Export failed.");
                return;
            }
            const body = await res.json();
            const blob = new Blob([JSON.stringify(body, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "j0di3-export.json";
            a.click();
            URL.revokeObjectURL(url);
            setMessage("Export downloaded.");
        } finally {
            setBusy(null);
        }
    };

    const wipeResumeHistory = async () => {
        if (!window.confirm("Erase all resume history from J0dI3? This cannot be undone.")) return;
        setBusy("resume");
        try {
            const res = await fetch("/api/j0di3/troops/resume-history", { method: "DELETE" });
            setMessage(res.ok ? "Resume history erased." : "Wipe failed.");
        } finally {
            setBusy(null);
        }
    };

    const deleteTroop = async () => {
        if (
            !window.confirm(
                "Delete your J0dI3 troop profile? This removes all your J0dI3 progress permanently."
            )
        )
            return;
        setBusy("delete");
        try {
            const res = await fetch("/api/j0di3/troops/delete", { method: "DELETE" });
            setMessage(res.ok ? "J0dI3 troop profile deleted." : "Delete failed.");
        } finally {
            setBusy(null);
        }
    };

    return (
        <div className="tw-space-y-6">
            {message && (
                <div className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-navy-sky/20 tw-px-4 tw-py-2 tw-text-sm tw-text-navy-deep">
                    {message}
                </div>
            )}

            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Notifications
                </h3>
                <div className="tw-space-y-3">
                    <Toggle label="Email notifications for course updates" defaultChecked={true} />
                    <Toggle label="Weekly progress reports" defaultChecked={true} />
                    <Toggle label="New assignment alerts" defaultChecked={false} />
                </div>
            </div>

            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Privacy
                </h3>
                <div className="tw-space-y-3">
                    <Toggle label="Make profile visible to other veterans" defaultChecked={false} />
                    <Toggle label="Show progress on leaderboards" defaultChecked={true} />
                    <Toggle label="Display GitHub stats on profile" defaultChecked={true} />
                </div>
            </div>

            {mosRel && (mosRel.relevance != null || mosRel.target_role) && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        MOS → role relevance
                    </h3>
                    <div className="tw-text-sm tw-text-ink/80 tw-space-y-1">
                        {mosRel.mos && (
                            <div>
                                <strong>MOS:</strong> {mosRel.mos}
                            </div>
                        )}
                        {mosRel.target_role && (
                            <div>
                                <strong>Target:</strong> {mosRel.target_role}
                            </div>
                        )}
                        {mosRel.relevance != null && (
                            <div>
                                <strong>Relevance:</strong> {Math.round(mosRel.relevance * 100)}%
                            </div>
                        )}
                        {mosRel.matched_skills && mosRel.matched_skills.length > 0 && (
                            <div>
                                <strong>Matched:</strong> {mosRel.matched_skills.join(", ")}
                            </div>
                        )}
                        {mosRel.gap_skills && mosRel.gap_skills.length > 0 && (
                            <div>
                                <strong>Gaps:</strong> {mosRel.gap_skills.join(", ")}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {placements && placements.length > 0 && (
                <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Placements
                    </h3>
                    <ul className="tw-space-y-2">
                        {placements.map((p, i) => (
                            <li
                                key={p.id || i}
                                className="tw-flex tw-items-center tw-justify-between tw-text-sm"
                            >
                                <div>
                                    <span className="tw-font-semibold tw-text-ink">
                                        {p.role || "Role"}
                                    </span>
                                    {p.company && (
                                        <span className="tw-text-ink/60"> @ {p.company}</span>
                                    )}
                                </div>
                                {p.status && (
                                    <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-[10px] tw-text-navy-deep">
                                        {p.status}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Data
                </h3>
                <div className="tw-flex tw-flex-wrap tw-gap-3">
                    <button
                        type="button"
                        onClick={exportData}
                        disabled={busy === "export"}
                        className="tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-ink hover:tw-bg-navy/5 disabled:tw-opacity-50"
                    >
                        {busy === "export" ? "Exporting..." : "Export J0dI3 data"}
                    </button>
                    <button
                        type="button"
                        onClick={wipeResumeHistory}
                        disabled={busy === "resume"}
                        className="tw-rounded-md tw-border tw-border-red tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-red-dark hover:tw-bg-cream disabled:tw-opacity-50"
                    >
                        {busy === "resume" ? "Erasing..." : "Erase resume history"}
                    </button>
                    <button
                        type="button"
                        onClick={deleteTroop}
                        disabled={busy === "delete"}
                        className="tw-rounded-md tw-bg-red tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-red-dark disabled:tw-opacity-50"
                    >
                        {busy === "delete" ? "Deleting..." : "Delete J0dI3 troop profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

function Toggle({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
    return (
        <label className="tw-flex tw-items-center tw-gap-3 tw-cursor-pointer tw-group">
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="tw-h-4 tw-w-4 tw-rounded tw-border-navy/20 tw-text-navy focus:tw-ring-gold/50"
            />
            <span className="tw-font-mono tw-text-xs tw-text-gray-300 group-hover:tw-text-ink tw-transition-colors">
                {label}
            </span>
        </label>
    );
}

export default ProfileSettings;
