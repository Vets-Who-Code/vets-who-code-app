import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1170: profile GET must not leak troopAccessToken/email for arbitrary
 * userIds. Cross-user requests get public fields only; self/admin get more.
 */

const findUnique = vi.fn();
vi.mock("@/lib/prisma", () => ({
    default: {
        user: {
            findUnique: (...a: unknown[]) => findUnique(...a),
            update: vi.fn(),
        },
    },
}));

let sessionUser: { id: string; role?: string } | null = { id: "self", role: "STUDENT" };
vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(async () => (sessionUser ? { user: sessionUser } : null)),
}));
vi.mock("@/pages/api/auth/options", () => ({ options: {} }));

function makeRes() {
    const res: Record<string, unknown> = { statusCode: 200, body: undefined };
    res.status = vi.fn((c: number) => {
        res.statusCode = c;
        return res;
    });
    res.json = vi.fn((b: unknown) => {
        res.body = b;
        return res;
    });
    res.setHeader = vi.fn();
    return res as Record<string, unknown> & { status: ReturnType<typeof vi.fn> };
}

describe("GET /api/user/profile field exposure", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionUser = { id: "self", role: "STUDENT" };
        findUnique.mockResolvedValue({ id: "target", name: "T", skills: null, deployments: null });
    });

    it("never selects troopAccessToken or troopId", async () => {
        const { default: handler } = await import("@/pages/api/user/profile");
        await handler({ method: "GET", query: { userId: "target" } } as never, makeRes() as never);

        const select = findUnique.mock.calls[0][0].select;
        expect(select.troopAccessToken).toBeUndefined();
        expect(select.troopId).toBeUndefined();
    });

    it("cross-user requests get the public select (no email)", async () => {
        const { default: handler } = await import("@/pages/api/user/profile");
        await handler({ method: "GET", query: { userId: "other" } } as never, makeRes() as never);

        const select = findUnique.mock.calls[0][0].select;
        expect(select.email).toBeUndefined();
        expect(select.name).toBe(true);
    });

    it("self requests get the private select (email included)", async () => {
        const { default: handler } = await import("@/pages/api/user/profile");
        await handler({ method: "GET", query: { userId: "self" } } as never, makeRes() as never);

        expect(findUnique.mock.calls[0][0].select.email).toBe(true);
    });

    it("admins get the private select for any user", async () => {
        sessionUser = { id: "admin", role: "ADMIN" };
        const { default: handler } = await import("@/pages/api/user/profile");
        await handler({ method: "GET", query: { userId: "other" } } as never, makeRes() as never);

        expect(findUnique.mock.calls[0][0].select.email).toBe(true);
    });

    it("rejects unauthenticated requests", async () => {
        sessionUser = null;
        const { default: handler } = await import("@/pages/api/user/profile");
        const res = makeRes();
        await handler({ method: "GET", query: {} } as never, res as never);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(findUnique).not.toHaveBeenCalled();
    });
});
