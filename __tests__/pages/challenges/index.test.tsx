import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock next/router
vi.mock("next/router", () => ({
    useRouter: () => ({ push: vi.fn(), query: {} }),
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
import ChallengesPage from "@/pages/challenges/index";

describe("ChallengesPage", () => {
    beforeEach(() => {
        mockFetch.mockReset();

        // Default: recommended returns empty, history returns empty
        mockFetch.mockImplementation((url: string) => {
            if (url.includes("recommended")) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([]),
                });
            }
            if (url.includes("history")) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([]),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
        });
    });

    it("renders page title and description", async () => {
        render(<ChallengesPage />);

        expect(screen.getByText("Code Challenges")).toBeInTheDocument();
        expect(screen.getByText(/AI-powered coding challenges/)).toBeInTheDocument();
    });

    it("renders topic and difficulty selectors", async () => {
        render(<ChallengesPage />);

        expect(screen.getByLabelText("Topic")).toBeInTheDocument();
        expect(screen.getByLabelText("Difficulty")).toBeInTheDocument();
    });

    it("renders start challenge button", async () => {
        render(<ChallengesPage />);

        expect(screen.getByText("Start Challenge")).toBeInTheDocument();
    });

    it("fetches recommended challenges on mount", async () => {
        render(<ChallengesPage />);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/challenges/recommended");
        });
    });

    it("fetches challenge history on mount", async () => {
        render(<ChallengesPage />);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/challenges/history");
        });
    });

    it("shows empty state for history when no attempts", async () => {
        render(<ChallengesPage />);

        await waitFor(() => {
            expect(screen.getByText("No challenges attempted yet. Start one!")).toBeInTheDocument();
        });
    });

    it("starts a challenge and shows code editor", async () => {
        mockFetch.mockImplementation((url: string, opts?: any) => {
            if (url.includes("start") && opts?.method === "POST") {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: "ch-1",
                        title: "FizzBuzz",
                        description: "Write a FizzBuzz function",
                        topic: "javascript",
                        difficulty: "easy",
                        language: "javascript",
                        starter_code: "function fizzBuzz(n) {\n  // your code\n}",
                    }),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        fireEvent.click(screen.getByText("Start Challenge"));

        await waitFor(() => {
            expect(screen.getByText("FizzBuzz")).toBeInTheDocument();
            expect(screen.getByText("Write a FizzBuzz function")).toBeInTheDocument();
            expect(screen.getByLabelText("Your Solution (javascript)")).toBeInTheDocument();
            expect(screen.getByText("Submit Solution")).toBeInTheDocument();
            expect(screen.getByText("Get Hint (0 used)")).toBeInTheDocument();
            expect(screen.getByText("Reveal Solution")).toBeInTheDocument();
        });
    });

    it("submits a solution and shows result", async () => {
        // Start challenge
        mockFetch.mockImplementation((url: string, opts?: any) => {
            if (url.includes("start") && opts?.method === "POST") {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: "ch-2",
                        title: "Sum Array",
                        description: "Sum all elements",
                        topic: "javascript",
                        difficulty: "easy",
                        language: "javascript",
                    }),
                });
            }
            if (url.includes("submit") && opts?.method === "POST") {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        passed: true,
                        score: 100,
                        feedback: "Perfect solution!",
                    }),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        fireEvent.click(screen.getByText("Start Challenge"));

        await waitFor(() => screen.getByText("Sum Array"));

        // Type code and submit
        fireEvent.change(screen.getByLabelText("Your Solution (javascript)"), {
            target: { value: "const sum = arr => arr.reduce((a, b) => a + b, 0);" },
        });
        fireEvent.click(screen.getByText("Submit Solution"));

        await waitFor(() => {
            expect(screen.getByText("Challenge Passed!")).toBeInTheDocument();
            expect(screen.getByText("Score: 100/100")).toBeInTheDocument();
            expect(screen.getByText("Perfect solution!")).toBeInTheDocument();
        });
    });

    it("shows recommended challenges when available", async () => {
        mockFetch.mockImplementation((url: string) => {
            if (url.includes("recommended")) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        {
                            id: "rec-1",
                            title: "Binary Search",
                            description: "Implement binary search",
                            topic: "algorithms",
                            difficulty: "medium",
                            language: "javascript",
                        },
                    ]),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        await waitFor(() => {
            expect(screen.getByText("Binary Search")).toBeInTheDocument();
            expect(screen.getByText("algorithms")).toBeInTheDocument();
            expect(screen.getByText("medium")).toBeInTheDocument();
        });
    });

    it("shows history with pass/fail indicators", async () => {
        mockFetch.mockImplementation((url: string) => {
            if (url.includes("history")) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        {
                            id: "att-1",
                            challenge_id: "ch-1",
                            title: "Two Sum",
                            topic: "arrays",
                            difficulty: "easy",
                            passed: true,
                            submitted_at: "2026-04-01T10:00:00Z",
                        },
                        {
                            id: "att-2",
                            challenge_id: "ch-2",
                            title: "Merge Sort",
                            topic: "algorithms",
                            difficulty: "hard",
                            passed: false,
                            submitted_at: "2026-04-02T10:00:00Z",
                        },
                    ]),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        await waitFor(() => {
            expect(screen.getByText("Two Sum")).toBeInTheDocument();
            expect(screen.getByText("Merge Sort")).toBeInTheDocument();
        });
    });

    it("displays error when starting challenge fails", async () => {
        mockFetch.mockImplementation((url: string, opts?: any) => {
            if (url.includes("start") && opts?.method === "POST") {
                return Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({ error: "Rate limited" }),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        fireEvent.click(screen.getByText("Start Challenge"));

        await waitFor(() => {
            expect(screen.getByText("Rate limited")).toBeInTheDocument();
        });
    });

    it("navigates back from active challenge", async () => {
        mockFetch.mockImplementation((url: string, opts?: any) => {
            if (url.includes("start") && opts?.method === "POST") {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: "ch-1",
                        title: "Test",
                        description: "Test desc",
                        topic: "js",
                        difficulty: "easy",
                        language: "javascript",
                    }),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        render(<ChallengesPage />);

        fireEvent.click(screen.getByText("Start Challenge"));

        await waitFor(() => screen.getByText("Test"));

        fireEvent.click(screen.getByText("Back to challenges"));

        expect(screen.getByText("Start Challenge")).toBeInTheDocument();
    });
});
