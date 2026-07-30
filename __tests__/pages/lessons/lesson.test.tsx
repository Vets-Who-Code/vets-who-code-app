import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock next/router
vi.mock("next/router", () => ({
    useRouter: () => ({ push: vi.fn(), query: { id: "lesson-1" } }),
}));

// Mock next-auth
vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(),
}));

// Mock auth options
vi.mock("@/pages/api/auth/options", () => ({
    options: {},
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

// We test the component behavior, not getServerSideProps
import LessonPage from "@/pages/lessons/lesson/[id]";

function mockLessonFetch(explain?: (opts?: any) => Promise<any>) {
    mockFetch.mockImplementation((url: string, opts?: any) => {
        if (url === "/api/j0di3/lessons/lesson-1") {
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        id: "lesson-1",
                        title: "React Hooks",
                        module: 3,
                        content: "Hooks let you use state in function components.",
                    }),
            });
        }
        if (url === "/api/j0di3/learning/explain" && explain) {
            return explain(opts);
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
}

describe("LessonPage AI teaching assistant", () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("renders the floating assistant button", async () => {
        mockLessonFetch();

        render(<LessonPage />);

        await screen.findByText("Mark complete");
        expect(screen.getByLabelText("Open AI teaching assistant")).toBeInTheDocument();
        expect(screen.queryByText("J0d!e - AI Teaching Assistant")).not.toBeInTheDocument();
    });

    it("opens the assistant with lesson context when the button is clicked", async () => {
        mockLessonFetch();

        render(<LessonPage />);

        await screen.findByText("Mark complete");
        fireEvent.click(screen.getByLabelText("Open AI teaching assistant"));

        expect(screen.getByText("J0d!e - AI Teaching Assistant")).toBeInTheDocument();
        expect(screen.getByText(/Vets Who Code \/ Module 3 \/ React Hooks/)).toBeInTheDocument();
    });

    it("sends a question and renders the assistant response", async () => {
        mockLessonFetch(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ response: "useState stores component state." }),
            })
        );

        render(<LessonPage />);

        await screen.findByText("Mark complete");
        fireEvent.click(screen.getByLabelText("Open AI teaching assistant"));

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "What is useState?" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText("useState stores component state.")).toBeInTheDocument();
        });

        const explainCall = mockFetch.mock.calls.find(
            ([url]) => url === "/api/j0di3/learning/explain"
        );
        expect(explainCall).toBeDefined();
        const body = JSON.parse(explainCall![1].body);
        expect(body.concept).toBe("React Hooks");
        expect(body.question).toBe("What is useState?");
    });

    it("renders an error when the assistant request fails", async () => {
        mockLessonFetch(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "Service unavailable" }),
            })
        );

        render(<LessonPage />);

        await screen.findByText("Mark complete");
        fireEvent.click(screen.getByLabelText("Open AI teaching assistant"));

        const input = screen.getByPlaceholderText("Ask me anything...");
        fireEvent.change(input, { target: { value: "Help" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText(/Service unavailable/)).toBeInTheDocument();
        });
    });
});
