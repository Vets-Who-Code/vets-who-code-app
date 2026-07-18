import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1190: progress writes must validate the enrollment is ACTIVE and the
 * lesson belongs to the enrollment's course; GET /api/courses must not leak
 * unpublished courses to non-admins.
 */

const db = {
    enrollment: { findUnique: vi.fn(), update: vi.fn() },
    lesson: { findUnique: vi.fn(), count: vi.fn(), groupBy: vi.fn() },
    progress: { upsert: vi.fn(), count: vi.fn() },
    course: { findMany: vi.fn(), count: vi.fn() },
};
vi.mock("@/lib/prisma", () => ({ default: db }));

let role = "STUDENT";
vi.mock("@/lib/rbac", () => ({
    requireAuth:
        (handler: (req: unknown, res: unknown) => Promise<void>) =>
        (req: { user?: unknown }, res: unknown) => {
            req.user = { id: "u1", role };
            return handler(req, res);
        },
    requireRole: () => (handler: unknown) => handler,
}));

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
    return res as Record<string, unknown> & {
        statusCode: number;
        status: ReturnType<typeof vi.fn>;
    };
}

beforeEach(() => {
    vi.clearAllMocks();
    role = "STUDENT";
});

describe("POST /api/progress validation", () => {
    function postReq(body: Record<string, unknown>) {
        return { method: "POST", query: {}, headers: {}, body } as never;
    }

    it("rejects a write to a non-active enrollment", async () => {
        db.enrollment.findUnique.mockResolvedValue({
            userId: "u1",
            courseId: "c1",
            status: "DROPPED",
        });
        const { default: handler } = await import("@/pages/api/progress");
        const res = makeRes();
        await handler(postReq({ enrollmentId: "e1", lessonId: "l1" }), res as never);
        expect(res.statusCode).toBe(400);
        expect(db.progress.upsert).not.toHaveBeenCalled();
    });

    it("rejects a lesson that belongs to a different course", async () => {
        db.enrollment.findUnique.mockResolvedValue({
            userId: "u1",
            courseId: "c1",
            status: "ACTIVE",
        });
        db.lesson.findUnique.mockResolvedValue({ id: "l1", module: { courseId: "OTHER" } });
        const { default: handler } = await import("@/pages/api/progress");
        const res = makeRes();
        await handler(postReq({ enrollmentId: "e1", lessonId: "l1" }), res as never);
        expect(res.statusCode).toBe(400);
        expect(db.progress.upsert).not.toHaveBeenCalled();
    });

    it("accepts a valid write (active enrollment, matching course)", async () => {
        db.enrollment.findUnique.mockResolvedValue({
            id: "e1",
            userId: "u1",
            courseId: "c1",
            status: "ACTIVE",
            completedAt: null,
        });
        db.lesson.findUnique.mockResolvedValue({ id: "l1", module: { courseId: "c1" } });
        db.progress.upsert.mockResolvedValue({ id: "p1" });
        db.lesson.count.mockResolvedValue(1);
        db.progress.count.mockResolvedValue(1);
        db.enrollment.update.mockResolvedValue({ id: "e1", progress: 100 });
        const { default: handler } = await import("@/pages/api/progress");
        const res = makeRes();
        await handler(
            postReq({ enrollmentId: "e1", lessonId: "l1", completed: true }),
            res as never
        );
        expect(db.progress.upsert).toHaveBeenCalled();
    });
});

describe("GET /api/courses unpublished leak", () => {
    beforeEach(() => {
        db.course.findMany.mockResolvedValue([]);
        db.course.count.mockResolvedValue(0);
        db.lesson.groupBy.mockResolvedValue([]);
    });

    it("forces isPublished=true for a student even with ?isPublished=false", async () => {
        const { default: handler } = await import("@/pages/api/courses");
        const req = { method: "GET", query: { isPublished: "false" }, headers: {} } as never;
        await handler(req, makeRes() as never);
        expect(db.course.findMany.mock.calls[0][0].where.isPublished).toBe(true);
    });

    it("lets an admin filter unpublished courses", async () => {
        role = "ADMIN";
        const { default: handler } = await import("@/pages/api/courses");
        const req = { method: "GET", query: { isPublished: "false" }, headers: {} } as never;
        await handler(req, makeRes() as never);
        expect(db.course.findMany.mock.calls[0][0].where.isPublished).toBe(false);
    });
});
