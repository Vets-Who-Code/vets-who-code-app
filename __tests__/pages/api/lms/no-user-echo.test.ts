import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Regression tests for issue #1196: LMS endpoints must not echo req.user —
 * it carries the caller's troopToken (J0dI3 access credential).
 */

const AUTH_USER = {
    id: "user-1",
    name: "Test User",
    email: "test@vetswhocode.io",
    role: "ADMIN",
    troopId: "troop-uuid",
    troopToken: "SECRET-TROOP-TOKEN",
};

vi.mock("@/lib/rbac", () => ({
    requireAuth:
        (handler: (req: unknown, res: unknown) => Promise<void>) =>
        (req: { user?: unknown }, res: unknown) => {
            req.user = { ...AUTH_USER };
            return handler(req, res);
        },
    requireRole:
        () =>
        (handler: (req: unknown, res: unknown) => Promise<void>) =>
        (req: { user?: unknown }, res: unknown) => {
            req.user = { ...AUTH_USER };
            return handler(req, res);
        },
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        user: {
            count: vi.fn().mockResolvedValue(1),
            findUnique: vi
                .fn()
                .mockResolvedValue({
                    id: "user-1",
                    email: "t@t.io",
                    name: "T",
                    role: "ADMIN",
                    cohort: null,
                }),
        },
        course: { count: vi.fn().mockResolvedValue(0), findMany: vi.fn().mockResolvedValue([]) },
        cohort: { count: vi.fn().mockResolvedValue(0) },
    },
}));

function makeRes() {
    const res: Record<string, unknown> = { body: undefined };
    res.status = vi.fn(() => res);
    res.json = vi.fn((payload: unknown) => {
        res.body = payload;
        return res;
    });
    res.setHeader = vi.fn();
    return res as {
        body: unknown;
        status: ReturnType<typeof vi.fn>;
        json: ReturnType<typeof vi.fn>;
    };
}

const ROUTES = [
    ["GET /api/lms/courses", "@/pages/api/lms/courses/index"],
    ["GET /api/lms/test", "@/pages/api/lms/test"],
    ["GET /api/lms/admin-only", "@/pages/api/lms/admin-only"],
] as const;

describe("LMS endpoints do not leak the troop token", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it.each(ROUTES)("%s response contains no troopToken", async (_label, modulePath) => {
        const { default: handler } = await import(modulePath);
        const res = makeRes();

        await handler({ method: "GET", query: {}, headers: {} } as never, res as never);

        expect(res.json).toHaveBeenCalled();
        const serialized = JSON.stringify(res.body);
        expect(serialized).not.toContain("SECRET-TROOP-TOKEN");
        expect(serialized).not.toContain("troopToken");
    });
});
