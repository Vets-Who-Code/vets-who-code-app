import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockInterview from "@/components/jobs/MockInterview";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("MockInterview", () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("renders setup form initially", () => {
        render(<MockInterview />);

        expect(screen.getByText("Start a Mock Interview")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Frontend Developer/)).toBeInTheDocument();
        expect(screen.getByText("Start Interview")).toBeInTheDocument();
    });

    it("disables start button when job title is empty", () => {
        render(<MockInterview />);

        expect(screen.getByText("Start Interview")).toBeDisabled();
    });

    it("starts interview and shows first question", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                session_id: "int-123",
                question: "Tell me about React.",
                question_number: 1,
                total_questions: 5,
                interview_type: "mixed",
            }),
        });

        render(<MockInterview />);

        fireEvent.change(screen.getByPlaceholderText(/Frontend Developer/), {
            target: { value: "Frontend Developer" },
        });

        fireEvent.click(screen.getByText("Start Interview"));

        await waitFor(() => {
            expect(screen.getByText("Tell me about React.")).toBeInTheDocument();
            expect(screen.getByText("Question 1 of 5")).toBeInTheDocument();
        });

        expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/jobs/interview/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: expect.stringContaining("Frontend Developer"),
        });
    });

    it("submits answer and shows next question", async () => {
        // Start interview
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                session_id: "int-123",
                question: "Question 1?",
                question_number: 1,
                total_questions: 3,
                interview_type: "mixed",
            }),
        });

        render(<MockInterview />);

        fireEvent.change(screen.getByPlaceholderText(/Frontend Developer/), {
            target: { value: "Dev" },
        });
        fireEvent.click(screen.getByText("Start Interview"));

        await waitFor(() => {
            expect(screen.getByText("Question 1?")).toBeInTheDocument();
        });

        // Submit answer
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                feedback: "Good answer!",
                score: 7,
                next_question: "Question 2?",
                session_complete: false,
            }),
        });

        fireEvent.change(screen.getByPlaceholderText("Type your answer..."), {
            target: { value: "My answer about React" },
        });
        fireEvent.click(screen.getByText("Submit Answer"));

        await waitFor(() => {
            expect(screen.getByText("Question 2?")).toBeInTheDocument();
            expect(screen.getByText("Good answer!")).toBeInTheDocument();
        });

        expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/jobs/interview/int-123/answer", expect.objectContaining({
            method: "POST",
        }));
    });

    it("shows complete state when interview is done", async () => {
        // Start
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                session_id: "int-123",
                question: "Q1?",
                question_number: 1,
                total_questions: 1,
                interview_type: "mixed",
            }),
        });

        render(<MockInterview />);

        fireEvent.change(screen.getByPlaceholderText(/Frontend Developer/), {
            target: { value: "Dev" },
        });
        fireEvent.click(screen.getByText("Start Interview"));

        await waitFor(() => screen.getByText("Q1?"));

        // Submit final answer → complete
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                feedback: "Done",
                score: 8,
                session_complete: true,
            }),
        });

        fireEvent.change(screen.getByPlaceholderText("Type your answer..."), {
            target: { value: "Final answer" },
        });
        fireEvent.click(screen.getByText("Submit Answer"));

        await waitFor(() => {
            expect(screen.getByText("Interview Complete")).toBeInTheDocument();
        });
    });

    it("displays error when start fails", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ error: "Backend unavailable" }),
        });

        render(<MockInterview />);

        fireEvent.change(screen.getByPlaceholderText(/Frontend Developer/), {
            target: { value: "Dev" },
        });
        fireEvent.click(screen.getByText("Start Interview"));

        await waitFor(() => {
            expect(screen.getByText("Backend unavailable")).toBeInTheDocument();
        });
    });

    it("can reset after complete and start a new interview", async () => {
        // Start
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                session_id: "int-1",
                question: "Q?",
                question_number: 1,
                total_questions: 1,
                interview_type: "mixed",
            }),
        });

        render(<MockInterview />);

        fireEvent.change(screen.getByPlaceholderText(/Frontend Developer/), {
            target: { value: "Dev" },
        });
        fireEvent.click(screen.getByText("Start Interview"));

        await waitFor(() => screen.getByText("Q?"));

        // Submit final answer → complete
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                feedback: "Done",
                score: 6,
                session_complete: true,
            }),
        });

        fireEvent.change(screen.getByPlaceholderText("Type your answer..."), {
            target: { value: "Answer" },
        });
        fireEvent.click(screen.getByText("Submit Answer"));

        await waitFor(() => screen.getByText("Start New Interview"));

        fireEvent.click(screen.getByText("Start New Interview"));

        expect(screen.getByText("Start a Mock Interview")).toBeInTheDocument();
    });
});
