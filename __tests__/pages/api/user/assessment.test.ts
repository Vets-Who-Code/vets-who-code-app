import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Regression tests for the x-dev-user-id auth bypass (issue #1169).
 * Identity must come from the authenticated session only — the header must
 * have no effect, and unauthenticated requests must be rejected.
 */

const findUnique = vi.fn();
const update = vi.fn();

vi.mock("@/lib/prisma", () => ({
    default: {
        user: {
            findUnique: (...a: unknown[]) => findUnique(...a),
            update: (...a: unknown[]) => update(...a),
        },
    },
}));

// Simulate the real requireAuth contract: reject when there is no session,
// otherwise attach req.user from the session — never from headers.
let sessionUserId: string | null = "session-user";
vi.mock("@/lib/rbac", () => ({
    requireAuth:
        (handler: (req: unknown, res: unknown) => Promise<void>) =>
        async (
            req: { user?: { id: string } },
            res: { status: (n: number) => { json: (b: unknown) => void } }
        ) => {
            if (!sessionUserId) {
                return res.status(401).json({ error: "Unauthorized - Please sign in" });
            }
            req.user = { id: sessionUserId };
            return handler(req, res);
        },
}));

function makeRes() {
    const res: Record<string, unknown> = {};
    res.statusCode = 0;
    res.body = undefined;
    res.status = vi.fn((code: number) => {
        res.statusCode = code;
        return res;
    });
    res.json = vi.fn((payload: unknown) => {
        res.body = payload;
        return res;
    });
    res.setHeader = vi.fn();
    return res as {
        statusCode: number;
        body: unknown;
        status: ReturnType<typeof vi.fn>;
        json: ReturnType<typeof vi.fn>;
        setHeader: ReturnType<typeof vi.fn>;
    };
}

describe("GET/POST /api/user/assessment", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionUserId = "session-user";
        findUnique.mockResolvedValue({
            skillLevel: "JUNIOR",
            assessmentScore: 100,
            assessmentDate: null,
        });
        update.mockResolvedValue({
            skillLevel: "MID",
            assessmentScore: 150,
            assessmentDate: new Date(),
        });
    });

    it("ignores the x-dev-user-id header — identity comes from the session", async () => {
        const { default: handler } = await import("@/pages/api/user/assessment");
        const res = makeRes();

        await handler(
            {
                method: "GET",
                headers: { "x-dev-user-id": "victim-user" },
                query: {},
                body: {},
            } as never,
            res as never
        );

        expect(findUnique).toHaveBeenCalledWith(
            expect.objectContaining({ where: { id: "session-user" } })
        );
        expect(findUnique).not.toHaveBeenCalledWith(
            expect.objectContaining({ where: { id: "victim-user" } })
        );
    });

    it("rejects unauthenticated requests even with the header set", async () => {
        sessionUserId = null;
        const { default: handler } = await import("@/pages/api/user/assessment");
        const res = makeRes();

        await handler(
            {
                method: "POST",
                headers: { "x-dev-user-id": "victim-user" },
                query: {},
                body: { score: 10, skillLevel: "JUNIOR" },
            } as never,
            res as never
        );

        expect(res.status).toHaveBeenCalledWith(401);
        expect(findUnique).not.toHaveBeenCalled();
        expect(update).not.toHaveBeenCalled();
    });

    it("writes assessment data for the session user only", async () => {
        const { default: handler } = await import("@/pages/api/user/assessment");
        const res = makeRes();

        await handler(
            {
                method: "POST",
                headers: { "x-dev-user-id": "victim-user" },
                query: {},
                body: { score: 150, skillLevel: "MID", completedQuestions: 10, totalQuestions: 10 },
            } as never,
            res as never
        );

        expect(update).toHaveBeenCalledWith(
            expect.objectContaining({ where: { id: "session-user" } })
        );
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("still validates score and skill level", async () => {
        const { default: handler } = await import("@/pages/api/user/assessment");
        const res = makeRes();

        await handler(
            {
                method: "POST",
                headers: {},
                query: {},
                body: { score: 9999, skillLevel: "MID" },
            } as never,
            res as never
        );

        expect(res.status).toHaveBeenCalledWith(400);
        expect(update).not.toHaveBeenCalled();
    });
});
