import { useCallback, useRef, useState } from "react";
import usePdfUpload from "@/hooks/use-pdf-upload";

const TARGET_ROLES = [
    "Junior Software Engineer",
    "Software Engineer",
    "Senior Software Engineer",
    "Staff Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Data Engineer",
    "Data Analyst",
    "DevOps Engineer",
    "SRE / Platform Engineer",
    "Cloud Engineer",
    "Security Engineer",
    "QA / Test Engineer",
    "Mobile Developer (iOS/Android)",
    "React Developer",
    "Python Developer",
    "Node.js Developer",
    "Solutions Architect",
    "Technical Project Manager",
    "Engineering Manager",
    "Product Manager (Technical)",
    "Developer Advocate",
];

interface Dimension {
    score: number;
    max_score: number;
    details: string;
}

interface RewriteSuggestion {
    original_bullet: string;
    suggested_bullet: string;
    reason: string;
}

interface WeakVerb {
    verb: string;
    context?: string;
    suggestion?: string;
}

interface FraudDetection {
    keyword_stuffing: boolean;
    hidden_text_suspected: boolean;
    copy_paste_from_jd: boolean;
    acronym_stacking: boolean;
    overall_flag: boolean;
    details: string;
}

interface EmploymentRedFlags {
    gaps_over_6_months: string[];
    job_hopping: boolean;
    job_hopping_details: string;
    career_regression: boolean;
    career_regression_details: string;
    experience_recency: string;
    details: string;
}

interface JdMatch {
    match_score: number;
    matched_skills: string[];
    missing_skills: string[];
    recommendations: string[];
}

interface ScoreResult {
    session_id: string;
    overall_score: number;
    pass_fail: string;
    dimensions: {
        ats_compatibility: Dimension;
        ai_readability: Dimension;
        quantified_achievements: Dimension;
        keyword_optimization: Dimension;
        harvard_formatting: Dimension;
        role_tailoring: Dimension;
    };
    strengths: string[];
    improvements: string[];
    detected_technologies: string[];
    missing_skills: string[];
    recommended_skills: string[];
    learning_recommendations: string[];
    weak_verbs: WeakVerb[];
    harvard_violations: string[];
    fraud_detection: FraudDetection;
    employment_red_flags: EmploymentRedFlags;
    jd_match: JdMatch | null;
    coaching_feedback: string;
    rewrite_suggestions: RewriteSuggestion[];
}

interface TailorResult {
    response: string;
}

// Safely render a value that might be a string or an object
function renderText(val: unknown): string {
    if (typeof val === "string") return val;
    if (val && typeof val === "object") {
        // Try common field names
        const obj = val as Record<string, unknown>;
        return obj.name as string || obj.skill as string || obj.text as string || obj.label as string || JSON.stringify(val);
    }
    return String(val);
}

export default function ResumeScorer() {
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [targetRole, setTargetRole] = useState(TARGET_ROLES[0]);
    const [isScoring, setIsScoring] = useState(false);
    const [isTailoring, setIsTailoring] = useState(false);
    const [isRewriting, setIsRewriting] = useState(false);
    const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
    const [tailorResult, setTailorResult] = useState<TailorResult | null>(null);
    const [rewriteResult, setRewriteResult] = useState<{
        original_score: number;
        rewritten_resume: string;
        rewrite_score: number;
        changes_made: string[];
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload, uploading, error: uploadError, progress, fileName, reset: resetUpload } = usePdfUpload();

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await upload(file);
            setResumeText(text);
        } catch {
            // handled by hook
        }
    }, [upload]);

    const handleTextFileRead = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setResumeText(e.target?.result as string || "");
        reader.readAsText(file);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        if (file.type === "text/plain") handleTextFileRead(file);
        else upload(file).then(setResumeText).catch(() => {});
    }, [upload, handleTextFileRead]);

    const handleScore = async () => {
        if (!resumeText.trim()) return;
        setIsScoring(true);
        setError(null);
        setScoreResult(null);
        try {
            const res = await fetch("/api/j0di3/jobs/resume/score", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resume_text: resumeText,
                    target_role: targetRole,
                    current_date: new Date().toISOString().split("T")[0],
                    ...(jobDescription.trim() ? { job_description: jobDescription } : {}),
                }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Scoring failed");
            }
            setScoreResult(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Scoring failed");
        } finally {
            setIsScoring(false);
        }
    };

    const handleTailor = async () => {
        if (!resumeText.trim() || !jobDescription.trim()) return;
        setIsTailoring(true);
        setError(null);
        setTailorResult(null);
        try {
            const res = await fetch("/api/j0di3/jobs/resume/tailor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resume_text: resumeText, job_posting: jobDescription }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Tailoring failed");
            }
            setTailorResult(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Tailoring failed");
        } finally {
            setIsTailoring(false);
        }
    };

    const handleRewrite = async () => {
        if (!resumeText.trim()) return;
        setIsRewriting(true);
        setError(null);
        setRewriteResult(null);
        try {
            const res = await fetch("/api/j0di3/jobs/resume/rewrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resume_text: resumeText,
                    current_date: new Date().toISOString().split("T")[0],
                }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Rewrite failed");
            }
            setRewriteResult(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Rewrite failed");
        } finally {
            setIsRewriting(false);
        }
    };

    const handleDownloadRewrittenResume = (format: "txt" | "md") => {
        if (!rewriteResult) return;
        const ext = format === "md" ? "md" : "txt";
        const mime = format === "md" ? "text/markdown" : "text/plain";
        const blob = new Blob([rewriteResult.rewritten_resume], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resume-fixed.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadJSON = () => {
        if (!scoreResult) return;
        const blob = new Blob([JSON.stringify(scoreResult, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume-analysis.json";
        a.click();
        URL.revokeObjectURL(url);
    };


    const dimColor = (score: number) => {
        if (score >= 80) return "tw-bg-green-500";
        if (score >= 60) return "tw-bg-yellow-500";
        if (score >= 40) return "tw-bg-orange-500";
        return "tw-bg-red-500";
    };

    const scoreTextColor = (score: number) => {
        if (score >= 80) return "tw-text-green-600";
        if (score >= 60) return "tw-text-yellow-600";
        if (score >= 40) return "tw-text-orange-500";
        return "tw-text-red-600";
    };

    const passFailColor = (pf: string) => {
        return pf === "PASS" ? "tw-bg-green-100 tw-text-green-800" : "tw-bg-red-100 tw-text-red-800";
    };

    const DIMENSION_LABELS: Record<string, { label: string; icon: string }> = {
        ats_compatibility: { label: "Will it pass an ATS?", icon: "fa-robot" },
        ai_readability: { label: "Can AI recruiters read it?", icon: "fa-brain" },
        quantified_achievements: { label: "Quantified achievements?", icon: "fa-chart-line" },
        keyword_optimization: { label: "Right keywords present?", icon: "fa-key" },
        harvard_formatting: { label: "ATS/Recruiter formatting?", icon: "fa-align-left" },
        role_tailoring: { label: "Tailored to target role?", icon: "fa-bullseye" },
    };

    // Sanitize coaching feedback — strip references to internal scoring methodology
    const sanitizeText = (text: string) =>
        text
            .replace(/harvard\s*format(ting|ted)?/gi, "ATS/recruiter formatting")
            .replace(/harvard/gi, "ATS/recruiter")
            .replace(/Please check formatting\.?/gi, "Try pasting your resume text directly for best results.")
            .replace(/Could not be analyzed\.?/gi, "We had trouble reading this resume.")
            .replace(/Could not analyze/gi, "Unable to evaluate");

    const r = scoreResult;

    return (
        <div className="tw-space-y-6">
            {/* Upload & Input */}
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6">
                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                    <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3">
                        <i className="fas fa-file-alt tw-mr-2 tw-text-primary" />
                        Your Resume
                    </h2>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="tw-mb-3 tw-border-2 tw-border-dashed tw-border-navy/10 tw-rounded-lg tw-p-4 tw-text-center tw-cursor-pointer hover:tw-border-primary tw-transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="tw-hidden" />
                        {uploading ? (
                            <div>
                                <i className="fas fa-spinner fa-spin tw-text-primary tw-text-xl tw-mb-2" />
                                <p className="tw-text-sm tw-text-navy/60">Parsing {fileName}... {progress}%</p>
                                <div className="tw-mt-2 tw-h-1.5 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                                    <div className="tw-h-full tw-bg-primary tw-transition-all" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        ) : fileName && resumeText ? (
                            <div>
                                <i className="fas fa-check-circle tw-text-green-500 tw-text-xl tw-mb-1" />
                                <p className="tw-text-sm tw-text-green-700 tw-font-medium">{fileName} loaded</p>
                                <button onClick={(e) => { e.stopPropagation(); resetUpload(); setResumeText(""); }} className="tw-text-xs tw-text-ink/60 hover:tw-text-red-500 tw-mt-1">Clear</button>
                            </div>
                        ) : (
                            <div>
                                <i className="fas fa-cloud-upload-alt tw-text-navy/60 tw-text-2xl tw-mb-2" />
                                <p className="tw-text-sm tw-text-navy/60">Drop PDF, DOCX, or TXT here — or click to browse</p>
                                <p className="tw-text-xs tw-text-ink/60 tw-mt-1">Max 5MB</p>
                            </div>
                        )}
                        {uploadError && <p className="tw-text-xs tw-text-red-500 tw-mt-2">{uploadError}</p>}
                    </div>
                    <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={8}
                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-3 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                        placeholder="Or paste your resume text here..." />
                    {resumeText && (
                        <p className="tw-text-xs tw-text-ink/70 tw-mt-1">
                            {resumeText.length.toLocaleString()} characters loaded. Review the text above to make sure it looks right before scoring.
                        </p>
                    )}
                    <div className="tw-mt-3">
                        <label htmlFor="target-role" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-1">Target Role</label>
                        <select id="target-role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)}
                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none">
                            {TARGET_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                    </div>
                </div>

                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                    <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3">
                        <i className="fas fa-clipboard-list tw-mr-2 tw-text-primary" />
                        Job Posting
                        <span className="tw-text-xs tw-font-normal tw-text-ink/70 tw-ml-2">optional — enables JD match analysis and job-specific tailoring</span>
                    </h2>
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={14}
                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-3 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                        placeholder="Paste the job posting for JD match analysis and AI rewrite..." />
                </div>
            </div>

            {/* Actions */}
            <div className="tw-flex tw-flex-wrap tw-gap-3">
                <button onClick={handleScore} disabled={isScoring || !resumeText.trim()}
                    className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-white hover:tw-bg-primary-dark disabled:tw-opacity-50 tw-transition-colors">
                    {isScoring ? <span><i className="fas fa-spinner fa-spin tw-mr-2" />Scoring...</span> : <span><i className="fas fa-chart-bar tw-mr-2" />Score Resume</span>}
                </button>
                <button onClick={handleRewrite} disabled={isRewriting || !resumeText.trim()}
                    className="tw-rounded-md tw-border tw-border-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-primary hover:tw-bg-primary hover:tw-text-white disabled:tw-opacity-50 tw-transition-colors">
                    {isRewriting ? <span><i className="fas fa-spinner fa-spin tw-mr-2" />Generating...</span> : <span><i className="fas fa-magic tw-mr-2" />Generate Fixed Resume</span>}
                </button>
                {jobDescription.trim() && (
                    <button onClick={handleTailor} disabled={isTailoring || !resumeText.trim()}
                        className="tw-rounded-md tw-border tw-border-navy/10 tw-px-6 tw-py-2.5 tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5 disabled:tw-opacity-50 tw-transition-colors">
                        {isTailoring ? <span><i className="fas fa-spinner fa-spin tw-mr-2" />Tailoring...</span> : <span><i className="fas fa-crosshairs tw-mr-2" />Tailor for Job Posting</span>}
                    </button>
                )}
                {r && <button onClick={handleDownloadJSON} className="tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2.5 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5">
                    <i className="fas fa-download tw-mr-2" />Download JSON</button>}
            </div>

            {error && <div className="tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-4 tw-text-red-700">{error}</div>}

            {/* Results */}
            {r && (
                <div className="tw-space-y-6">
                    {/* Score + Pass/Fail */}
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                        <div className="tw-flex tw-items-center tw-gap-6 tw-mb-6">
                            <div className="tw-relative tw-flex-shrink-0">
                                <svg className="tw-w-28 tw-h-28 tw-transform -tw-rotate-90" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                    <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                                        style={{ strokeDasharray: `${(r.overall_score / 100) * 327} 327`, stroke: r.overall_score >= 80 ? "#22c55e" : r.overall_score >= 60 ? "#eab308" : r.overall_score >= 40 ? "#f97316" : "#ef4444" }} />
                                </svg>
                                <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center">
                                    <span className={`tw-text-3xl tw-font-bold ${scoreTextColor(r.overall_score)}`}>{r.overall_score}</span>
                                    <span className={`tw-text-xs tw-font-bold tw-rounded-full tw-px-2 tw-py-0.5 ${passFailColor(r.pass_fail)}`}>{r.pass_fail}</span>
                                </div>
                            </div>
                            <div className="tw-flex-1">
                                <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-1">Resume Analysis</h3>
                                <p className="tw-text-sm tw-text-navy/60 tw-mb-2">Target: {targetRole}</p>
                                <p className="tw-text-sm tw-text-ink/80">{sanitizeText(r.coaching_feedback)}</p>
                            </div>
                        </div>

                        {/* 6 Dimensions */}
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
                            {Object.entries(r.dimensions).map(([key, dim]) => {
                                const meta = DIMENSION_LABELS[key] || { label: key, icon: "fa-circle" };
                                return (
                                    <div key={key} className="tw-flex tw-items-center tw-gap-3 tw-p-3 tw-rounded-md tw-border tw-border-navy/5">
                                        <i className={`fas ${meta.icon} tw-text-ink/60 tw-w-5 tw-text-center`} />
                                        <div className="tw-flex-1">
                                            <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                                                <span className="tw-text-xs tw-font-medium tw-text-ink/80">{meta.label}</span>
                                                <span className={`tw-text-xs tw-font-bold ${scoreTextColor(dim.score)}`}>{dim.score}/{dim.max_score}</span>
                                            </div>
                                            <div className="tw-h-2 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                                                <div className={`tw-h-full tw-rounded-full tw-transition-all ${dimColor(dim.score)}`} style={{ width: `${dim.score}%` }} />
                                            </div>
                                            {dim.details && dim.details !== "Could not analyze" && (
                                                <p className="tw-text-xs tw-text-ink/60 tw-mt-1">{sanitizeText(dim.details)}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Strengths & Improvements */}
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3 tw-flex tw-items-center tw-gap-2">
                                <span className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-green-100 tw-flex tw-items-center tw-justify-center"><i className="fas fa-check tw-text-green-600 tw-text-xs" /></span>
                                Strengths
                            </h3>
                            {r.strengths.length > 0 ? (
                                <ul className="tw-space-y-2">{r.strengths.map((s: any, i: number) => (
                                    <li key={i} className="tw-flex tw-gap-2 tw-text-sm tw-text-ink/80"><i className="fas fa-check tw-text-green-500 tw-mt-0.5 tw-flex-shrink-0" />{renderText(s)}</li>
                                ))}</ul>
                            ) : <p className="tw-text-sm tw-text-ink/60">None identified.</p>}
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3 tw-flex tw-items-center tw-gap-2">
                                <span className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-amber-100 tw-flex tw-items-center tw-justify-center"><i className="fas fa-exclamation tw-text-amber-600 tw-text-xs" /></span>
                                Improvements
                            </h3>
                            {r.improvements.length > 0 ? (
                                <ul className="tw-space-y-2">{r.improvements.map((s: any, i: number) => (
                                    <li key={i} className="tw-flex tw-gap-2 tw-text-sm tw-text-ink/80"><i className="fas fa-arrow-up tw-text-amber-500 tw-mt-0.5 tw-flex-shrink-0" />{renderText(s)}</li>
                                ))}</ul>
                            ) : <p className="tw-text-sm tw-text-ink/60">None identified.</p>}
                        </div>
                    </div>

                    {/* Skills: Detected / Missing / Recommended */}
                    {(r.detected_technologies.length > 0 || r.missing_skills.length > 0 || r.recommended_skills.length > 0) && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4"><i className="fas fa-microchip tw-mr-2 tw-text-primary" />Skills Analysis</h3>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
                                {r.detected_technologies.length > 0 && (
                                    <div>
                                        <h4 className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mb-2">Detected</h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                            {r.detected_technologies.map((t, i) => <span key={i} className="tw-rounded-full tw-bg-green-100 tw-text-green-800 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium">{renderText(t)}</span>)}
                                        </div>
                                    </div>
                                )}
                                {r.missing_skills.length > 0 && (
                                    <div>
                                        <h4 className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mb-2">Missing</h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                            {r.missing_skills.map((t, i) => <span key={i} className="tw-rounded-full tw-bg-red-100 tw-text-red-800 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium">{renderText(t)}</span>)}
                                        </div>
                                    </div>
                                )}
                                {r.recommended_skills.length > 0 && (
                                    <div>
                                        <h4 className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mb-2">Recommended</h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                            {r.recommended_skills.map((t, i) => <span key={i} className="tw-rounded-full tw-bg-blue-100 tw-text-blue-800 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium">{renderText(t)}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Learning Recommendations */}
                    {r.learning_recommendations.length > 0 && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3"><i className="fas fa-graduation-cap tw-mr-2 tw-text-primary" />Learning Recommendations</h3>
                            <ul className="tw-space-y-2">{r.learning_recommendations.map((l: any, i: number) => (
                                <li key={i} className="tw-text-sm tw-text-ink/80">
                                    {typeof l === "string" ? (
                                        <span className="tw-flex tw-gap-2"><i className="fas fa-book tw-text-primary tw-mt-0.5" />{l}</span>
                                    ) : (
                                        <div className="tw-flex tw-gap-2">
                                            <i className="fas fa-book tw-text-primary tw-mt-0.5 tw-flex-shrink-0" />
                                            <div>
                                                <span className="tw-font-medium tw-text-ink">{l.skill}</span>
                                                {l.reason && <span className="tw-text-navy/60"> — {l.reason}</span>}
                                                {l.resource && <a href={l.resource} target="_blank" rel="noopener noreferrer" className="tw-block tw-text-xs tw-text-primary hover:tw-underline tw-mt-0.5">{l.resource}</a>}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}</ul>
                        </div>
                    )}

                    {/* Weak Verbs */}
                    {r.weak_verbs.length > 0 && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3"><i className="fas fa-pen tw-mr-2 tw-text-amber-500" />Weak Verb Detection</h3>
                            <div className="tw-space-y-2">{r.weak_verbs.map((wv, i) => (
                                <div key={i} className="tw-flex tw-items-center tw-gap-3 tw-text-sm tw-p-2 tw-rounded tw-bg-amber-50">
                                    <span className="tw-font-mono tw-text-red-600 tw-line-through">{wv.verb}</span>
                                    {wv.suggestion && <><i className="fas fa-arrow-right tw-text-ink/60" /><span className="tw-font-mono tw-text-green-700 tw-font-medium">{wv.suggestion}</span></>}
                                    {wv.context && <span className="tw-text-xs tw-text-ink/60 tw-ml-auto">{wv.context}</span>}
                                </div>
                            ))}</div>
                        </div>
                    )}

                    {/* Harvard Violations */}
                    {r.harvard_violations.length > 0 && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3"><i className="fas fa-align-left tw-mr-2 tw-text-red-500" />Formatting Violations</h3>
                            <ul className="tw-space-y-1.5">{r.harvard_violations.map((v: any, i: number) => (
                                <li key={i} className="tw-flex tw-gap-2 tw-text-sm tw-text-ink/80"><i className="fas fa-times-circle tw-text-red-400 tw-mt-0.5" />{sanitizeText(renderText(v))}</li>
                            ))}</ul>
                        </div>
                    )}

                    {/* Fraud Detection */}
                    {r.fraud_detection.overall_flag && (
                        <div className="tw-rounded-lg tw-bg-red-50 tw-border tw-border-red-200 tw-p-6">
                            <h3 className="tw-font-bold tw-text-red-800 tw-mb-3"><i className="fas fa-shield-alt tw-mr-2" />Fraud/Gaming Detection</h3>
                            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-3 tw-mb-3">
                                {[
                                    { key: "keyword_stuffing", label: "Keyword Stuffing", val: r.fraud_detection.keyword_stuffing },
                                    { key: "hidden_text_suspected", label: "Hidden Text", val: r.fraud_detection.hidden_text_suspected },
                                    { key: "copy_paste_from_jd", label: "Copy/Paste from JD", val: r.fraud_detection.copy_paste_from_jd },
                                    { key: "acronym_stacking", label: "Acronym Stacking", val: r.fraud_detection.acronym_stacking },
                                ].map((f) => (
                                    <div key={f.key} className={`tw-text-center tw-p-2 tw-rounded ${f.val ? "tw-bg-red-100" : "tw-bg-green-50"}`}>
                                        <i className={`fas ${f.val ? "fa-exclamation-triangle tw-text-red-500" : "fa-check tw-text-green-500"} tw-mb-1`} />
                                        <p className="tw-text-xs tw-font-medium">{f.label}</p>
                                    </div>
                                ))}
                            </div>
                            {r.fraud_detection.details && <p className="tw-text-sm tw-text-red-700">{r.fraud_detection.details}</p>}
                        </div>
                    )}

                    {/* Employment Red Flags */}
                    {(r.employment_red_flags.gaps_over_6_months.length > 0 || r.employment_red_flags.job_hopping || r.employment_red_flags.career_regression) && (
                        <div className="tw-rounded-lg tw-bg-amber-50 tw-border tw-border-amber-200 tw-p-6">
                            <h3 className="tw-font-bold tw-text-amber-800 tw-mb-3"><i className="fas fa-flag tw-mr-2" />Employment Red Flags</h3>
                            <div className="tw-space-y-2 tw-text-sm">
                                {r.employment_red_flags.gaps_over_6_months.length > 0 && (
                                    <p className="tw-text-amber-700"><i className="fas fa-calendar-times tw-mr-2" />Gaps over 6 months: {r.employment_red_flags.gaps_over_6_months.join(", ")}</p>
                                )}
                                {r.employment_red_flags.job_hopping && (
                                    <p className="tw-text-amber-700"><i className="fas fa-running tw-mr-2" />Job hopping detected. {r.employment_red_flags.job_hopping_details}</p>
                                )}
                                {r.employment_red_flags.career_regression && (
                                    <p className="tw-text-amber-700"><i className="fas fa-arrow-down tw-mr-2" />Career regression. {r.employment_red_flags.career_regression_details}</p>
                                )}
                                {r.employment_red_flags.details && <p className="tw-text-ink/60 tw-mt-1">{r.employment_red_flags.details}</p>}
                            </div>
                        </div>
                    )}

                    {/* JD Match Report */}
                    {r.jd_match && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4 tw-flex tw-items-center tw-gap-2">
                                <i className="fas fa-crosshairs tw-text-primary" />
                                JD Match Report
                                <span className={`tw-ml-auto tw-text-lg tw-font-bold ${scoreTextColor(r.jd_match.match_score)}`}>{r.jd_match.match_score}%</span>
                            </h3>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                                {r.jd_match.matched_skills.length > 0 && (
                                    <div>
                                        <h4 className="tw-text-xs tw-font-bold tw-text-green-700 tw-uppercase tw-mb-2">Matched Skills</h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                            {r.jd_match.matched_skills.map((s: any, i: number) => <span key={i} className="tw-rounded-full tw-bg-green-100 tw-text-green-800 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium">{renderText(s)}</span>)}
                                        </div>
                                    </div>
                                )}
                                {r.jd_match.missing_skills.length > 0 && (
                                    <div>
                                        <h4 className="tw-text-xs tw-font-bold tw-text-red-700 tw-uppercase tw-mb-2">Missing Skills</h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                            {r.jd_match.missing_skills.map((s: any, i: number) => <span key={i} className="tw-rounded-full tw-bg-red-100 tw-text-red-800 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium">{renderText(s)}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {r.jd_match.recommendations.length > 0 && (
                                <div>
                                    <h4 className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mb-2">Recommendations</h4>
                                    <ul className="tw-space-y-1">{r.jd_match.recommendations.map((rec: any, i: number) => (
                                        <li key={i} className="tw-flex tw-gap-2 tw-text-sm tw-text-ink/80"><i className="fas fa-lightbulb tw-text-yellow-500 tw-mt-0.5" />{renderText(rec)}</li>
                                    ))}</ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bullet Rewrites */}
                    {r.rewrite_suggestions.length > 0 && (
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                            <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-4 tw-flex tw-items-center tw-gap-2">
                                <span className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center"><i className="fas fa-pen tw-text-blue-600 tw-text-xs" /></span>
                                Bullet Rewrites
                            </h3>
                            <div className="tw-space-y-4">{r.rewrite_suggestions.map((rw, i) => (
                                <div key={i} className="tw-border tw-border-navy/10 tw-rounded-lg tw-overflow-hidden">
                                    <div className="tw-bg-red-50 tw-px-4 tw-py-3 tw-border-b tw-border-navy/10">
                                        <span className="tw-text-xs tw-font-bold tw-text-red-600 tw-uppercase">Before</span>
                                        <p className="tw-text-sm tw-text-red-800 tw-line-through tw-mt-1">{rw.original_bullet}</p>
                                    </div>
                                    <div className="tw-bg-green-50 tw-px-4 tw-py-3 tw-border-b tw-border-navy/10">
                                        <span className="tw-text-xs tw-font-bold tw-text-green-600 tw-uppercase">After</span>
                                        <p className="tw-text-sm tw-text-green-800 tw-font-medium tw-mt-1">{rw.suggested_bullet}</p>
                                    </div>
                                    <div className="tw-px-4 tw-py-3 tw-bg-navy/5">
                                        <p className="tw-text-xs tw-text-ink/60 tw-italic"><i className="fas fa-lightbulb tw-text-yellow-500 tw-mr-1" />{rw.reason}</p>
                                    </div>
                                </div>
                            ))}</div>
                        </div>
                    )}
                </div>
            )}

            {/* Fixed Resume Result */}
            {rewriteResult && (
                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                        <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-flex tw-items-center tw-gap-2">
                            <i className="fas fa-magic tw-text-primary" />Fixed Resume
                        </h3>
                        <div className="tw-flex tw-items-center tw-gap-3">
                            <div className="tw-text-center">
                                <span className="tw-text-xs tw-text-ink/60 tw-block">Before</span>
                                <span className={`tw-text-lg tw-font-bold ${scoreTextColor(rewriteResult.original_score)}`}>{rewriteResult.original_score}</span>
                            </div>
                            <i className="fas fa-arrow-right tw-text-navy/60" />
                            <div className="tw-text-center">
                                <span className="tw-text-xs tw-text-ink/60 tw-block">After</span>
                                <span className={`tw-text-lg tw-font-bold ${scoreTextColor(rewriteResult.rewrite_score)}`}>{rewriteResult.rewrite_score}</span>
                            </div>
                        </div>
                    </div>

                    {rewriteResult.changes_made.length > 0 && (
                        <div className="tw-mb-4">
                            <h4 className="tw-font-mono tw-text-[10px] tw-font-bold tw-text-ink/60 tw-uppercase tw-tracking-widest tw-mb-2">Changes Made</h4>
                            <ul className="tw-space-y-1">
                                {rewriteResult.changes_made.map((c: any, i: number) => (
                                    <li key={i} className="tw-flex tw-gap-2 tw-text-sm tw-text-ink/80">
                                        <i className="fas fa-check tw-text-green-500 tw-mt-0.5 tw-flex-shrink-0" />
                                        {renderText(c)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <pre className="tw-rounded-md tw-bg-navy/5 tw-p-4 tw-text-sm tw-text-ink/80 tw-whitespace-pre-wrap tw-border tw-border-navy/10 tw-max-h-[500px] tw-overflow-y-auto">
                        {rewriteResult.rewritten_resume}
                    </pre>

                    <div className="tw-flex tw-gap-3 tw-mt-4">
                        <button onClick={() => handleDownloadRewrittenResume("txt")} className="tw-rounded-md tw-bg-primary tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-primary-dark tw-transition-colors">
                            <i className="fas fa-download tw-mr-2" />Download as TXT
                        </button>
                        <button onClick={() => handleDownloadRewrittenResume("md")} className="tw-rounded-md tw-border tw-border-navy/10 tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5 tw-transition-colors">
                            <i className="fas fa-download tw-mr-2" />Download as Markdown
                        </button>
                    </div>
                </div>
            )}

            {/* Tailored for Job Posting Result */}
            {tailorResult && (
                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3 tw-flex tw-items-center tw-gap-2">
                        <i className="fas fa-crosshairs tw-text-primary" />Tailored for Job Posting
                    </h3>
                    <pre className="tw-rounded-md tw-bg-navy/5 tw-p-4 tw-text-sm tw-text-ink/80 tw-whitespace-pre-wrap tw-border tw-border-navy/10 tw-max-h-[500px] tw-overflow-y-auto">{tailorResult.response}</pre>
                </div>
            )}
        </div>
    );
}
