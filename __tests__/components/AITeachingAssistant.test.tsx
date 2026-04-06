import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AITeachingAssistant from "@/components/ai-assistant/AITeachingAssistant";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("AITeachingAssistant", () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
    };

    beforeEach(() => {
        mockFetch.mockReset();
        defaultProps.onClose.mockReset();
    });

    it("renders when isOpen is true", () => {
        render(<AITeachingAssistant {...defaultProps} />);

        expect(screen.getByText("J0d!e - AI Teaching Assistant")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
        render(<AITeachingAssistant {...defaultProps} isOpen={false} />);

        expect(screen.queryByText("J0d!e - AI Teaching Assistant")).not.toBeInTheDocument();
    });

    it("shows lesson context in header when provided", () => {
        render(
            <AITeachingAssistant
                {...defaultProps}
                lessonContext={{
                    lessonId: "l1",
                    lessonTitle: "React Hooks",
                    moduleTitle: "Advanced React",
                    courseTitle: "Frontend",
                }}
            />
        );

        expect(screen.getByText(/Frontend \/ Advanced React \/ React Hooks/)).toBeInTheDocument();
    });

    it("sends message to J0dI3 learning/explain endpoint", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ response: "React is a UI library" }),
        });

        render(<AITeachingAssistant {...defaultProps} />);

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "What is React?" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/learning/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: expect.stringContaining("What is React?"),
            });
        });

        await waitFor(() => {
            expect(screen.getByText("React is a UI library")).toBeInTheDocument();
        });
    });

    it("sends lesson context when available", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ response: "An answer" }),
        });

        render(
            <AITeachingAssistant
                {...defaultProps}
                lessonContext={{
                    lessonId: "l1",
                    lessonTitle: "Hooks",
                    moduleTitle: "React",
                    courseTitle: "Frontend",
                    content: "Lesson content here",
                }}
            />
        );

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "Help" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            const body = JSON.parse(mockFetch.mock.calls[0][1].body);
            expect(body.concept).toBe("Hooks");
            expect(body.question).toBe("Help");
        });
    });

    it("displays error when API returns non-ok response", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ error: "Unauthorized" }),
        });

        render(<AITeachingAssistant {...defaultProps} />);

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "Test" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText(/Unauthorized/)).toBeInTheDocument();
        });
    });

    it("disables input while loading", async () => {
        mockFetch.mockReturnValue(new Promise(() => {})); // never resolves

        render(<AITeachingAssistant {...defaultProps} />);

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "Test" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(input).toBeDisabled();
            expect(screen.getByText("Thinking...")).toBeInTheDocument();
        });
    });

    it("calls onClose when close button is clicked", () => {
        render(<AITeachingAssistant {...defaultProps} />);

        fireEvent.click(screen.getByLabelText("Close"));

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("handles response field variants (explanation, answer)", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ explanation: "This is an explanation" }),
        });

        render(<AITeachingAssistant {...defaultProps} />);

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "Explain" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText("This is an explanation")).toBeInTheDocument();
        });
    });
});
