import { fireEvent, render, screen } from "@testing-library/react";
import { forwardRef, type ReactElement } from "react";
import { assessmentQuestions } from "@/data/assessment-questions";
import donate from "@/data/innerpages/donate.json";
import AdminDashboard from "@/pages/admin/index";
import BudgetPage from "@/pages/admin/j0di3/budget";
import CohortDetail from "@/pages/admin/j0di3/cohorts/[id]";
import CohortsPage from "@/pages/admin/j0di3/cohorts/index";
import FunnelPage from "@/pages/admin/j0di3/funnel";
import J0di3AdminPage from "@/pages/admin/j0di3/index";
import LearningFeedbackPage from "@/pages/admin/j0di3/learning-feedback";
import LessonReviewPage from "@/pages/admin/j0di3/lessons/index";
import PlacementDetail from "@/pages/admin/j0di3/placements/[id]";
import PlacementsPage from "@/pages/admin/j0di3/placements/index";
import TroopsStuckPage from "@/pages/admin/j0di3/troops-stuck";
import AdminUsersPage from "@/pages/admin/users";
import Assessment from "@/pages/assessment";
import ChallengeDetailPage from "@/pages/challenges/[id]";
import BrowseChallengesPage from "@/pages/challenges/browse";
import ChallengesPage from "@/pages/challenges/index";
import CommunityPage from "@/pages/community/index";
import Donate from "@/pages/donate";
import MosPage from "@/pages/jobs/mos/[code]";
import JodiePage from "@/pages/jodie/index";
import LessonsIndex from "@/pages/lessons/index";
import LessonPage from "@/pages/lessons/lesson/[id]";
import ModuleLessonsPage from "@/pages/lessons/module/[module]";
import PublicProfilePage from "@/pages/p/[callsign]";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("next/router", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        isReady: true,
        query: { id: "item-1", code: "11B", module: "3" },
    }),
}));

vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth-options", () => ({
    options: {},
}));

vi.mock("next-auth/react", () => ({
    useSession: () => ({
        data: { user: { id: "u1", name: "Test" } },
        status: "authenticated",
    }),
    signOut: vi.fn(),
}));

// happy-dom has no Web Worker; the runner is covered by its own tests.
vi.mock("@/lib/challenge-runner", () => ({
    runChallenge: vi.fn(),
}));

// The real editor loads react-ace through next/dynamic.
vi.mock("@components/code-editor", () => ({
    default: () => <textarea aria-label="editor" />,
}));

// The real form embeds a Donorbox iframe, which happy-dom would fetch over the network.
vi.mock("@components/forms/donate-form", () => ({
    default: forwardRef<HTMLDivElement>((_props, ref) => <div ref={ref} />),
}));

vi.mock("@/lib/j0di3-client", () => ({
    default: { get: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({
    default: {},
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const okJson = (body: unknown) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
const failJson = () => Promise.resolve({ ok: false, json: () => Promise.resolve({}) });

const h1Texts = () => screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent);

beforeEach(() => {
    mockFetch.mockImplementation(() => okJson([]));
});

describe("pages that render their own h1 alongside a hidden breadcrumb title", () => {
    const pages: Array<[string, () => ReactElement, string]> = [
        ["/assessment", () => <Assessment />, "Coding Assessment"],
        ["/challenges", () => <ChallengesPage />, "Code Challenges"],
        ["/challenges/browse", () => <BrowseChallengesPage />, "Challenge Catalog"],
        ["/community", () => <CommunityPage />, "Community"],
        ["/donate", () => <Donate data={{ page: donate }} />, "Support Our Mission"],
        ["/jodie", () => <JodiePage />, "J0d!e"],
        ["/lessons", () => <LessonsIndex />, "Lessons"],
        [
            "/p/[callsign]",
            () => <PublicProfilePage troop={{ callsign: "ghost", name: "Ghost" }} />,
            "Ghost",
        ],
        ["/p/[callsign] (not found)", () => <PublicProfilePage troop={null} />, "Troop not found"],
        [
            "/admin",
            () => <AdminDashboard stats={{ totalStudents: 0 }} userName="Test" />,
            "Admin Dashboard",
        ],
        ["/admin/users", () => <AdminUsersPage users={[]} />, "User Management"],
        ["/admin/j0di3", () => <J0di3AdminPage />, "J0dI3 Admin"],
        ["/admin/j0di3/budget", () => <BudgetPage />, "Budget"],
        ["/admin/j0di3/cohorts", () => <CohortsPage />, "Cohorts"],
        ["/admin/j0di3/cohorts/[id]", () => <CohortDetail />, "Cohort"],
        ["/admin/j0di3/funnel", () => <FunnelPage />, "Funnel"],
        ["/admin/j0di3/learning-feedback", () => <LearningFeedbackPage />, "Learning feedback"],
        ["/admin/j0di3/lessons", () => <LessonReviewPage />, "Lesson review queue"],
        ["/admin/j0di3/placements", () => <PlacementsPage />, "Placements"],
        ["/admin/j0di3/troops-stuck", () => <TroopsStuckPage />, "Stuck troops"],
    ];

    it.each(pages)("%s has exactly one h1", async (_route, page, title) => {
        render(page());
        await screen.findAllByRole("heading", { level: 1 });
        expect(h1Texts()).toEqual([title]);
    });

    it("/admin/j0di3/placements/[id] has exactly one h1 once the placement loads", async () => {
        mockFetch.mockImplementation(() => okJson({ id: "p1", company: "Acme" }));
        render(<PlacementDetail />);
        await screen.findByText("Edit placement");
        expect(h1Texts()).toEqual(["Edit placement"]);
    });

    it("/assessment has exactly one h1 on the completion screen", async () => {
        mockFetch.mockImplementation(() => okJson({}));
        render(<Assessment />);
        await screen.findAllByRole("heading", { level: 1 });
        for (let i = 0; i < assessmentQuestions.length - 1; i += 1) {
            fireEvent.click(screen.getByText("Next"));
        }
        fireEvent.click(screen.getByText("Finish"));
        await screen.findByText("Assessment Complete!");
        expect(h1Texts()).toEqual(["Assessment Complete!"]);
    });
});

describe("pages whose own h1 only exists once data has loaded", () => {
    const pages = [
        {
            route: "/challenges/[id]",
            page: () => <ChallengeDetailPage />,
            fallback: "Challenge",
            errorCopy: "Failed to load challenge",
            payload: {
                id: "item-1",
                title: "Two Sum",
                topic: "arrays",
                difficulty: "easy",
                language: "javascript",
                description: "d",
            },
            title: "Two Sum",
        },
        {
            route: "/jobs/mos/[code]",
            page: () => <MosPage />,
            fallback: "MOS 11B",
            errorCopy: "MOS not found.",
            payload: { code: "11B", title: "Infantry" },
            title: "11B — Infantry",
        },
        {
            route: "/lessons/lesson/[id]",
            page: () => <LessonPage />,
            fallback: "Lesson",
            errorCopy: "Failed to load this lesson",
            payload: { id: "item-1", title: "React Hooks", module: 3 },
            title: "React Hooks",
        },
        {
            route: "/lessons/module/[module]",
            page: () => <ModuleLessonsPage />,
            fallback: "Module 3",
            errorCopy: "Failed to load module.",
            payload: { title: "JavaScript", lessons: [] },
            title: "JavaScript",
        },
    ];

    it.each(pages)("$route keeps the breadcrumb h1 while loading", ({ page, fallback }) => {
        mockFetch.mockReturnValue(new Promise(() => {}));
        render(page());
        expect(h1Texts()).toEqual([fallback]);
    });

    it.each(pages)("$route keeps the breadcrumb h1 on error", async ({
        page,
        fallback,
        errorCopy,
    }) => {
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        mockFetch.mockImplementation(failJson);
        render(page());
        await screen.findByText(errorCopy);
        expect(h1Texts()).toEqual([fallback]);
        errorSpy.mockRestore();
    });

    it.each(pages)("$route has exactly one h1 once loaded", async ({ page, payload, title }) => {
        mockFetch.mockImplementation(() => okJson(payload));
        render(page());
        await screen.findAllByRole("heading", { level: 1, name: title });
        expect(h1Texts()).toEqual([title]);
    });
});
