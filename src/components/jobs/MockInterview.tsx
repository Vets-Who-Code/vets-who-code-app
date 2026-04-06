import { useState } from "react";

interface AnswerFeedback {
    feedback: string;
    score: number;
    stronger_version?: string;
    what_landed?: string;
    what_to_improve?: string;
    next_question?: string;
    session_complete: boolean;
}

type InterviewPhase = "setup" | "active" | "complete";

export default function MockInterview() {
    const [phase, setPhase] = useState<InterviewPhase>("setup");

    // Setup
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [isStarting, setIsStarting] = useState(false);

    // Active
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalQuestions, setTotalQuestions] = useState(5);
    const [answer, setAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [history, setHistory] = useState<{
        question: string;
        answer: string;
        feedback: string;
        score: number;
        stronger_version?: string;
        what_landed?: string;
        what_to_improve?: string;
    }[]>([]);

    const [error, setError] = useState<string | null>(null);

    const handleStart = async () => {
        if (!jobTitle.trim()) return;
        setIsStarting(true);
        setError(null);

        try {
            const res = await fetch("/api/j0di3/jobs/interview/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    job_title: jobTitle,
                    job_description: jobDescription || undefined,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to start interview");
            }

            const data = await res.json();
            setSessionId(data.session_id);
            setCurrentQuestion(data.question);
            setQuestionNumber(data.question_number);
            setTotalQuestions(data.total_questions);
            setPhase("active");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to start");
        } finally {
            setIsStarting(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!answer.trim() || !sessionId) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`/api/j0di3/jobs/interview/${sessionId}/answer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to submit answer");
            }

            const data: AnswerFeedback = await res.json();

            setHistory((prev) => [
                ...prev,
                {
                    question: currentQuestion,
                    answer,
                    feedback: data.feedback,
                    score: data.score,
                    stronger_version: data.stronger_version,
                    what_landed: data.what_landed,
                    what_to_improve: data.what_to_improve,
                },
            ]);
            setAnswer("");

            if (data.session_complete) {
                setPhase("complete");
            } else if (data.next_question) {
                setCurrentQuestion(data.next_question);
                setQuestionNumber((n) => n + 1);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit answer");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setPhase("setup");
        setSessionId(null);
        setCurrentQuestion("");
        setQuestionNumber(1);
        setAnswer("");
        setHistory([]);
        setError(null);
    };

    const scoreColor = (score: number) => {
        if (score >= 8) return "tw-text-green-600";
        if (score >= 5) return "tw-text-yellow-600";
        return "tw-text-red-600";
    };

    const avgScore = history.length > 0
        ? Math.round((history.reduce((sum, h) => sum + h.score, 0) / history.length) * 10)
        : 0;

    return (
        <div className="tw-space-y-6">
            {error && (
                <div className="tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-4 tw-text-red-700">
                    {error}
                </div>
            )}

            {/* Setup */}
            {phase === "setup" && (
                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                    <h2 className="tw-text-xl tw-font-bold tw-font-mono tw-text-ink tw-mb-4">
                        <i className="fas fa-comments tw-mr-2 tw-text-primary" />
                        Start a Mock Interview
                    </h2>
                    <p className="tw-text-navy/60 tw-mb-4">
                        Practice with AI-powered interview questions tailored to your target role.
                    </p>
                    <div className="tw-space-y-4">
                        <div>
                            <label htmlFor="job-title" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                Job Title *
                            </label>
                            <input
                                id="job-title"
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none"
                                placeholder="e.g., Frontend Developer, AI Engineer"
                            />
                        </div>
                        <div>
                            <label htmlFor="job-desc-interview" className="tw-block tw-text-sm tw-font-medium tw-text-ink/80 tw-mb-2">
                                Job Description (optional)
                            </label>
                            <textarea
                                id="job-desc-interview"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={4}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-3 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                                placeholder="Paste the job description for more targeted questions..."
                            />
                        </div>
                        <button
                            onClick={handleStart}
                            disabled={isStarting || !jobTitle.trim()}
                            className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                        >
                            {isStarting ? "Preparing interview..." : "Start Interview"}
                        </button>
                    </div>
                </div>
            )}

            {/* Active */}
            {phase === "active" && (
                <div className="tw-space-y-6">
                    {/* Past Q&A */}
                    {history.map((item, i) => (
                        <div key={i} className="tw-rounded-lg tw-bg-white tw-p-5 tw-shadow-sm tw-border tw-border-navy/5">
                            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                                <p className="tw-font-medium tw-text-ink">
                                    <i className="fas fa-question-circle tw-mr-2 tw-text-primary" />
                                    Q{i + 1}: {item.question}
                                </p>
                                <span className={`tw-font-bold ${scoreColor(item.score)}`}>{item.score}/10</span>
                            </div>
                            <p className="tw-text-sm tw-text-navy/60 tw-mb-2 tw-pl-6">{item.answer}</p>
                            <div className="tw-pl-6 tw-space-y-2">
                                <p className="tw-text-sm tw-text-ink/80 tw-italic">{item.feedback}</p>
                                {item.what_landed && (
                                    <p className="tw-text-sm tw-text-green-700">
                                        <i className="fas fa-check tw-mr-1" /> {item.what_landed}
                                    </p>
                                )}
                                {item.what_to_improve && (
                                    <p className="tw-text-sm tw-text-amber-700">
                                        <i className="fas fa-arrow-up tw-mr-1" /> {item.what_to_improve}
                                    </p>
                                )}
                                {item.stronger_version && (
                                    <details className="tw-text-sm">
                                        <summary className="tw-cursor-pointer tw-text-primary tw-font-medium">Stronger answer</summary>
                                        <p className="tw-mt-1 tw-text-ink/80 tw-pl-4 tw-border-l-2 tw-border-primary">
                                            {item.stronger_version}
                                        </p>
                                    </details>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Current Question */}
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                            <h3 className="tw-text-lg tw-font-bold tw-text-ink">
                                Question {questionNumber} of {totalQuestions}
                            </h3>
                        </div>
                        <p className="tw-text-ink/80 tw-mb-4">{currentQuestion}</p>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={6}
                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-3 tw-text-sm focus:tw-border-primary focus:tw-outline-none tw-mb-4"
                            placeholder="Type your answer..."
                        />
                        <div className="tw-flex tw-gap-3">
                            <button
                                onClick={handleSubmitAnswer}
                                disabled={isSubmitting || !answer.trim()}
                                className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark disabled:tw-opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Answer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Complete */}
            {phase === "complete" && (
                <div className="tw-space-y-6">
                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                        <div className="tw-flex tw-items-center tw-gap-4 tw-mb-6">
                            <div className={`tw-text-5xl tw-font-bold ${avgScore >= 70 ? "tw-text-green-600" : avgScore >= 50 ? "tw-text-yellow-600" : "tw-text-red-600"}`}>
                                {avgScore}
                            </div>
                            <div>
                                <h2 className="tw-text-xl tw-font-bold tw-font-mono tw-text-ink">Interview Complete</h2>
                                <p className="tw-text-sm tw-text-navy/60">{jobTitle} — {history.length} questions answered</p>
                            </div>
                        </div>

                        <div className="tw-space-y-4">
                            {history.map((item, i) => (
                                <div key={i} className="tw-border-b tw-border-navy/5 tw-pb-4 last:tw-border-0">
                                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                                        <span className="tw-text-sm tw-font-medium tw-text-ink">Q{i + 1}: {item.question}</span>
                                        <span className={`tw-font-bold ${scoreColor(item.score)}`}>{item.score}/10</span>
                                    </div>
                                    <p className="tw-text-xs tw-text-navy/60">{item.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2.5 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary-dark"
                    >
                        Start New Interview
                    </button>
                </div>
            )}
        </div>
    );
}
