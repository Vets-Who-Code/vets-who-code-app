import { fireEvent, render, screen } from "@testing-library/react";
import { forwardRef, type ReactElement } from "react";
import { assessmentQuestions } from "@/data/assessment-questions";
import donate from "@/data/innerpages/donate.json";
import AdminDashboard from "@/pages/admin/index";
import AdminUsersPage from "@/pages/admin/users";
import Assessment from "@/pages/assessment";
import Donate from "@/pages/donate";

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

// The real form embeds a Donorbox iframe, which happy-dom would fetch over the network.
vi.mock("@components/forms/donate-form", () => ({
    default: forwardRef<HTMLDivElement>((_props, ref) => <div ref={ref} />),
}));

vi.mock("@/lib/prisma", () => ({
    default: {},
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const okJson = (body: unknown) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

const h1Texts = () => screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent);

beforeEach(() => {
    mockFetch.mockImplementation(() => okJson([]));
});

describe("pages that render their own h1 alongside a hidden breadcrumb title", () => {
    const pages: Array<[string, () => ReactElement, string]> = [
        ["/assessment", () => <Assessment />, "Coding Assessment"],
        ["/donate", () => <Donate data={{ page: donate }} />, "Support Our Mission"],
        [
            "/admin",
            () => <AdminDashboard stats={{ totalStudents: 0 }} userName="Test" />,
            "Admin Dashboard",
        ],
        ["/admin/users", () => <AdminUsersPage users={[]} />, "User Management"],
    ];

    it.each(pages)("%s has exactly one h1", async (_route, page, title) => {
        render(page());
        await screen.findAllByRole("heading", { level: 1 });
        expect(h1Texts()).toEqual([title]);
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

