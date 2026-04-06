import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResumeScorer from "@/components/jobs/ResumeScorer";

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock("@/hooks/use-pdf-upload", () => ({
    default: () => ({
        upload: vi.fn(),
        uploading: false,
        error: null,
        progress: 0,
        fileName: null,
        reset: vi.fn(),
    }),
}));

describe("ResumeScorer", () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("renders upload area, resume textarea, target role, and job posting textarea", () => {
        render(<ResumeScorer />);

        expect(screen.getByText(/Drop PDF, DOCX, or TXT/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Or paste your resume text here...")).toBeInTheDocument();
        expect(screen.getByLabelText("Target Role")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Paste the job posting/)).toBeInTheDocument();
    });

    it("renders score and rewrite buttons", () => {
        render(<ResumeScorer />);

        expect(screen.getByText("Score Resume")).toBeInTheDocument();
        expect(screen.getByText("Generate Fixed Resume")).toBeInTheDocument();
    });

    it("disables score button when resume is empty", () => {
        render(<ResumeScorer />);

        const button = screen.getByText("Score Resume").closest("button")!;
        expect(button).toBeDisabled();
    });

    it("calls score endpoint and displays result with strengths, gaps, and bullet rewrites", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                session_id: "s1",
                overall_score: 27,
                pass_fail: "NEEDS WORK",
                dimensions: {
                    ats_compatibility: { score: 30, max_score: 100, details: "OK" },
                    ai_readability: { score: 20, max_score: 100, details: "Poor" },
                    quantified_achievements: { score: 10, max_score: 100, details: "None found" },
                    keyword_optimization: { score: 40, max_score: 100, details: "Some keywords" },
                    harvard_formatting: { score: 25, max_score: 100, details: "Violations" },
                    role_tailoring: { score: 35, max_score: 100, details: "Partially" },
                },
                strengths: ["Lists relevant tech stack"],
                improvements: ["Lacks standard sections", "Uses passive language"],
                detected_technologies: [],
                missing_skills: [],
                recommended_skills: [],
                learning_recommendations: [],
                weak_verbs: [],
                harvard_violations: [],
                fraud_detection: { keyword_stuffing: false, hidden_text_suspected: false, copy_paste_from_jd: false, acronym_stacking: false, overall_flag: false, details: "" },
                employment_red_flags: { gaps_over_6_months: [], job_hopping: false, job_hopping_details: "", career_regression: false, career_regression_details: "", experience_recency: "current", details: "" },
                jd_match: null,
                coaching_feedback: "This resume needs significant improvements.",
                rewrite_suggestions: [
                    {
                        original_bullet: "Helped build microservices.",
                        suggested_bullet: "Architected 5 Python microservices using Docker and AWS.",
                        reason: "Uses strong action verb and quantifies output.",
                    },
                ],
            }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "My resume content" },
        });
        fireEvent.click(screen.getByText("Score Resume"));

        await waitFor(() => {
            expect(screen.getByText("27")).toBeInTheDocument();
            expect(screen.getByText("NEEDS WORK")).toBeInTheDocument();
            expect(screen.getByText("This resume needs significant improvements.")).toBeInTheDocument();
            expect(screen.getByText("Lists relevant tech stack")).toBeInTheDocument();
            expect(screen.getByText("Lacks standard sections")).toBeInTheDocument();
            expect(screen.getByText("Helped build microservices.")).toBeInTheDocument();
            expect(screen.getByText("Architected 5 Python microservices using Docker and AWS.")).toBeInTheDocument();
        });
    });

    it("sends target_role in score request", async () => {
        const emptyDim = { score: 50, max_score: 100, details: "" };
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                session_id: "s1", overall_score: 50, pass_fail: "NEEDS WORK",
                dimensions: { ats_compatibility: emptyDim, ai_readability: emptyDim, quantified_achievements: emptyDim, keyword_optimization: emptyDim, harvard_formatting: emptyDim, role_tailoring: emptyDim },
                strengths: [], improvements: [], detected_technologies: [], missing_skills: [], recommended_skills: [],
                learning_recommendations: [], weak_verbs: [], harvard_violations: [],
                fraud_detection: { keyword_stuffing: false, hidden_text_suspected: false, copy_paste_from_jd: false, acronym_stacking: false, overall_flag: false, details: "" },
                employment_red_flags: { gaps_over_6_months: [], job_hopping: false, job_hopping_details: "", career_regression: false, career_regression_details: "", experience_recency: "current", details: "" },
                jd_match: null, coaching_feedback: "", rewrite_suggestions: [],
            }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "Resume" },
        });
        fireEvent.change(screen.getByLabelText("Target Role"), {
            target: { value: "AI Engineer" },
        });
        fireEvent.click(screen.getByText("Score Resume"));

        await waitFor(() => {
            const body = JSON.parse(mockFetch.mock.calls[0][1].body);
            expect(body.target_role).toBe("AI Engineer");
        });
    });

    it("calls rewrite endpoint and displays fixed resume", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                original_score: 30,
                rewritten_resume: "Fixed resume text here",
                rewrite_score: 75,
                changes_made: ["Replaced weak verbs"],
            }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "My resume" },
        });
        fireEvent.click(screen.getByText("Generate Fixed Resume"));

        await waitFor(() => {
            expect(screen.getByText("Fixed resume text here")).toBeInTheDocument();
            expect(screen.getByText("Replaced weak verbs")).toBeInTheDocument();
        });
    });

    it("calls tailor endpoint with job_posting when job posting is provided", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ response: "Tailored resume text" }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "My resume" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Paste the job posting/), {
            target: { value: "Job posting text" },
        });
        fireEvent.click(screen.getByText("Tailor for Job Posting"));

        await waitFor(() => {
            expect(screen.getByText("Tailored resume text")).toBeInTheDocument();
        });

        const body = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(body.job_posting).toBe("Job posting text");
    });

    it("shows download buttons after results", async () => {
        const emptyDim = { score: 80, max_score: 100, details: "" };
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                session_id: "s1", overall_score: 85, pass_fail: "PASS",
                dimensions: { ats_compatibility: emptyDim, ai_readability: emptyDim, quantified_achievements: emptyDim, keyword_optimization: emptyDim, harvard_formatting: emptyDim, role_tailoring: emptyDim },
                strengths: ["Good"], improvements: [], detected_technologies: [], missing_skills: [], recommended_skills: [],
                learning_recommendations: [], weak_verbs: [], harvard_violations: [],
                fraud_detection: { keyword_stuffing: false, hidden_text_suspected: false, copy_paste_from_jd: false, acronym_stacking: false, overall_flag: false, details: "" },
                employment_red_flags: { gaps_over_6_months: [], job_hopping: false, job_hopping_details: "", career_regression: false, career_regression_details: "", experience_recency: "current", details: "" },
                jd_match: null, coaching_feedback: "Nice", rewrite_suggestions: [],
            }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "Resume" },
        });
        fireEvent.click(screen.getByText("Score Resume"));

        await waitFor(() => {
            expect(screen.getByText("Download JSON")).toBeInTheDocument();
        });
    });

    it("displays error when scoring fails", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ error: "Service unavailable" }),
        });

        render(<ResumeScorer />);

        fireEvent.change(screen.getByPlaceholderText("Or paste your resume text here..."), {
            target: { value: "Resume text" },
        });
        fireEvent.click(screen.getByText("Score Resume"));

        await waitFor(() => {
            expect(screen.getByText("Service unavailable")).toBeInTheDocument();
        });
    });
});
