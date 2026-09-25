import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import MemberProfile from "@/pages/profile/[id]";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth-options", () => ({
    options: {},
}));

vi.mock("@/lib/prisma", () => ({
    default: {},
}));

vi.mock("next-auth/react", () => ({
    useSession: () => ({
        data: { user: { id: "u1", name: "Test" } },
        status: "authenticated",
    }),
    signOut: vi.fn(),
}));

// Every motion usage under src/components/profile is motion.div.
vi.mock("motion/react", () => ({
    motion: {
        div: ({ children, className }: { children: ReactNode; className?: string }) => (
            <div className={className}>{children}</div>
        ),
    },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("/profile/[id]", () => {
    beforeEach(() => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({ ok: false, json: () => Promise.resolve({}) })
        );
    });

    it("has exactly one h1, the profile header name", async () => {
        render(
            <MemberProfile
                user={{ id: "u1", name: "Test", email: "", image: null }}
                isOwner={true}
            />
        );
        const headings = await screen.findAllByRole("heading", { level: 1 });
        expect(headings.map((h) => h.textContent)).toEqual(["Test"]);
    });
});
