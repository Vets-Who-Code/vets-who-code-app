import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1226: the public LMS health endpoint must not disclose operational data
 * (counts, sample records, schema) — only reachability.
 */

const queryRaw = vi.fn();
vi.mock("@/lib/prisma", () => ({ default: { $queryRaw: (...a: unknown[]) => queryRaw(...a) } }));

function makeRes() {
    const res: Record<string, unknown> = { statusCode: 0, body: undefined };
    res.status = vi.fn((c: number) => {
        res.statusCode = c;
        return res;
    });
    res.json = vi.fn((b: unknown) => {
        res.body = b;
        return res;
    });
    return res as Record<string, unknown> & { statusCode: number; body: unknown };
}

beforeEach(() => vi.clearAllMocks());

describe("GET /api/lms/health", () => {
    it("reports healthy with no operational data", async () => {
        queryRaw.mockResolvedValue([{ "?column?": 1 }]);
        const { default: handler } = await import("@/pages/api/lms/health");
        const res = makeRes();
        await handler({ method: "GET" } as never, res as never);

        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body as Record<string, unknown>).sort()).toEqual(["database", "status", "timestamp"]);
        expect(res.body).toMatchObject({ status: "healthy", database: "connected" });

        const serialized = JSON.stringify(res.body);
        // Defense-in-depth: ensure common operational fields don't appear anywhere in the payload.
        for (const leak of [
            "users",
            "courses",
            "cohorts",
            "modules",
            "lessons",
            "stats",
            "sampleData",
            "features",
            "models",
        ]) {
            expect(serialized).not.toContain(leak);
        }

    it("returns 503 with no error details when the DB is down", async () => {
        queryRaw.mockRejectedValue(new Error("connect ECONNREFUSED 10.0.0.1:5432"));
        const { default: handler } = await import("@/pages/api/lms/health");
        const res = makeRes();
        await handler({ method: "GET" } as never, res as never);

        expect(res.statusCode).toBe(503);
        expect(Object.keys(res.body as Record<string, unknown>).sort()).toEqual(["database", "status", "timestamp"]);
        expect(res.body).toMatchObject({ status: "unhealthy", database: "disconnected" });
        expect(JSON.stringify(res.body)).not.toContain("ECONNREFUSED");
});
