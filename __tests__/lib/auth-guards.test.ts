import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

// Mock next-auth so we don't hit real session logic.
vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(),
}));

// Stub the auth options import chain — the real module pulls in prisma and
// ensure-troop, neither of which we need for pure guard logic.
vi.mock("@/pages/api/auth/options", () => ({
    options: {},
}));

import { requireAdminSSR, requireAuthSSR } from "@/lib/auth-guards";

const mockGetServerSession = getServerSession as unknown as ReturnType<typeof vi.fn>;

function buildContext(resolvedUrl: string): GetServerSidePropsContext {
    return {
        req: {} as GetServerSidePropsContext["req"],
        res: {} as GetServerSidePropsContext["res"],
        resolvedUrl,
        query: {},
        params: undefined,
    } as GetServerSidePropsContext;
}

function buildSession(overrides: Partial<Session["user"]> = {}): Session {
    return {
        expires: "2099-01-01T00:00:00.000Z",
        user: {
            id: "user-123",
            name: "Test Troop",
            email: "troop@example.com",
            image: null,
            role: "STUDENT",
            ...overrides,
        },
    };
}

describe("auth-guards", () => {
    beforeEach(() => {
        mockGetServerSession.mockReset();
    });

    describe("requireAuthSSR", () => {
        it("redirects to /login with URI-encoded resolvedUrl when unauthenticated", async () => {
            mockGetServerSession.mockResolvedValueOnce(null);
            const context = buildContext("/admin/courses?page=2&sort=new");

            const result = await requireAuthSSR(context);

            expect(result.ok).toBe(false);
            if (result.ok) return; // type narrow
            expect(result.result).toEqual({
                redirect: {
                    destination:
                        "/login?callbackUrl=%2Fadmin%2Fcourses%3Fpage%3D2%26sort%3Dnew",
                    permanent: false,
                },
            });
        });

        it("redirects to /login when session exists but has no user", async () => {
            mockGetServerSession.mockResolvedValueOnce({
                expires: "2099-01-01T00:00:00.000Z",
            } as Session);
            const context = buildContext("/profile");

            const result = await requireAuthSSR(context);

            expect(result.ok).toBe(false);
            if (result.ok) return;
            expect(result.result).toEqual({
                redirect: {
                    destination: "/login?callbackUrl=%2Fprofile",
                    permanent: false,
                },
            });
        });

        it("returns ok:true with the session when authenticated", async () => {
            const session = buildSession({ role: "STUDENT" });
            mockGetServerSession.mockResolvedValueOnce(session);

            const result = await requireAuthSSR(buildContext("/profile"));

            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.session).toBe(session);
        });
    });

    describe("requireAdminSSR", () => {
        it("redirects unauthenticated requests to /login (delegates to requireAuthSSR)", async () => {
            mockGetServerSession.mockResolvedValueOnce(null);

            const result = await requireAdminSSR(buildContext("/admin"));

            expect(result.ok).toBe(false);
            if (result.ok) return;
            expect(result.result).toEqual({
                redirect: {
                    destination: "/login?callbackUrl=%2Fadmin",
                    permanent: false,
                },
            });
        });

        it("redirects authenticated non-admins to /", async () => {
            mockGetServerSession.mockResolvedValueOnce(buildSession({ role: "STUDENT" }));

            const result = await requireAdminSSR(buildContext("/admin/users"));

            expect(result.ok).toBe(false);
            if (result.ok) return;
            expect(result.result).toEqual({
                redirect: { destination: "/", permanent: false },
            });
        });

        it("redirects authenticated users with undefined role to / (defensive)", async () => {
            mockGetServerSession.mockResolvedValueOnce(buildSession({ role: undefined }));

            const result = await requireAdminSSR(buildContext("/admin"));

            expect(result.ok).toBe(false);
            if (result.ok) return;
            expect(result.result).toEqual({
                redirect: { destination: "/", permanent: false },
            });
        });

        it("returns ok:true with the session when the user is ADMIN", async () => {
            const session = buildSession({ role: "ADMIN" });
            mockGetServerSession.mockResolvedValueOnce(session);

            const result = await requireAdminSSR(buildContext("/admin"));

            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.session).toBe(session);
            expect(result.session.user.role).toBe("ADMIN");
        });
    });
});
