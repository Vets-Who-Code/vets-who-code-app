import { render, screen, waitFor } from "@testing-library/react";
import TroopDashboard from "@/components/profile/TroopDashboard";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("TroopDashboard", () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("shows loading state initially", () => {
        mockFetch.mockReturnValue(new Promise(() => {})); // never resolves

        render(<TroopDashboard />);

        expect(screen.getByText("Loading J0dI3 dashboard...")).toBeInTheDocument();
    });

    it("renders stats grid when data loads successfully", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: {
                    name: "Test User",
                    email: "test@test.com",
                    branch: "Army",
                    mos_afsc: "25B",
                    current_module: 4,
                    skill_level: "beginner",
                    enrolled: true,
                },
                challenges_completed: 10,
                challenges_attempted: 12,
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("10")).toBeInTheDocument(); // challenges completed
            expect(screen.getByText("12")).toBeInTheDocument(); // attempted
            expect(screen.getByText("83%")).toBeInTheDocument(); // pass rate (10/12)
        });
    });

    it("renders troop profile info with actual J0dI3 field names", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: {
                    name: "Jane",
                    email: "jane@test.com",
                    branch: "Navy",
                    mos_afsc: "IT",
                    current_module: 7,
                    skill_level: "junior",
                    target_role: "Frontend Dev",
                    enrolled: true,
                },
                challenges_completed: 0,
                challenges_attempted: 0,
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("junior")).toBeInTheDocument();
            expect(screen.getByText("Navy")).toBeInTheDocument();
            expect(screen.getByText("IT")).toBeInTheDocument();
            expect(screen.getByText("Frontend Dev")).toBeInTheDocument();
            expect(screen.getByText("Active")).toBeInTheDocument();
            // current_module is in a <select> dropdown
            const moduleSelect = screen.getByDisplayValue("Module 7") as HTMLSelectElement;
            expect(moduleSelect.value).toBe("7");
        });
    });

    it("shows Inactive when not enrolled", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: {
                    name: "Test",
                    email: "t@t.com",
                    branch: "",
                    mos_afsc: null,
                    current_module: 1,
                    skill_level: null,
                    enrolled: false,
                },
                challenges_completed: 0,
                challenges_attempted: 0,
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("Inactive")).toBeInTheDocument();
        });
    });

    it("shows error when troop profile not linked", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: "No troop profile" }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(
                screen.getByText(/J0dI3 profile not linked/)
            ).toBeInTheDocument();
        });
    });

    it("shows generic error on fetch failure", async () => {
        mockFetch.mockRejectedValue(new Error("Network error"));

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load dashboard")).toBeInTheDocument();
        });
    });

    it("calls the correct API endpoint", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: { current_module: 1, enrolled: false },
                challenges_completed: 0,
                challenges_attempted: 0,
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith("/api/j0di3/troops/dashboard");
        });
    });

    it("renders scores when present", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: { current_module: 1, enrolled: true },
                challenges_completed: 0,
                challenges_attempted: 0,
                resume_score: 72,
                github_score: 85,
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("72")).toBeInTheDocument();
            expect(screen.getByText("Resume")).toBeInTheDocument();
            expect(screen.getByText("85")).toBeInTheDocument();
            expect(screen.getByText("GitHub")).toBeInTheDocument();
        });
    });

    it("renders current module topics when present", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                troop: { current_module: 3, enrolled: true },
                challenges_completed: 0,
                challenges_attempted: 0,
                current_module_topics: ["JavaScript", "React", "CSS"],
                recent_conversations: [],
            }),
        });

        render(<TroopDashboard />);

        await waitFor(() => {
            expect(screen.getByText("JavaScript")).toBeInTheDocument();
            expect(screen.getByText("React")).toBeInTheDocument();
            expect(screen.getByText("CSS")).toBeInTheDocument();
        });
    });
});
