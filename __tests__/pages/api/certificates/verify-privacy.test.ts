import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1193: public certificate verification must not leak the student email
 * and must be rate-limited (no enumeration).
 */

const findUnique = vi.fn();
vi.mock("@/lib/prisma", () => ({
    default: { certificate: { findUnique: (...a: unknown[]) => findUnique(...a) } },
}));

function makeReq(ip: string, query: Record<string, string>) {
    return { method: "GET", headers: { "x-forwarded-for": ip }, query, socket: {} } as never;
}
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
    findUnique.mockResolvedValue({
        id: "VWC-2026-000001",
        issuedAt: new Date("2026-01-01"),
        certificateUrl: "https://example/cert.pdf",
        user: { id: "u1", name: "Jane Vet" },
        course: {
            id: "c1",
            title: "Web Dev",
            description: "",
            difficulty: "BEGINNER",
            estimatedHours: 100,
            category: "Web",
        },
    });
});

describe("GET /api/certificates/verify", () => {
    it("returns no student email and never selects it", async () => {
        const { default: handler } = await import("@/pages/api/certificates/verify");
        const res = makeRes();
        await handler(makeReq("10.0.0.1", { number: "VWC-2026-000001" }), res as never);

        expect(findUnique.mock.calls[0][0].include.user.select.email).toBeUndefined();
        const serialized = JSON.stringify(res.body);
        expect(serialized).not.toContain("email");
        expect(serialized).toContain("Jane Vet");
    });

    it("rate-limits after the window budget (429)", async () => {
        const { default: handler } = await import("@/pages/api/certificates/verify");
        let last = makeRes();
        for (let i = 0; i < 31; i++) {
            last = makeRes();
            // same IP -> same bucket
            // eslint-disable-next-line no-await-in-loop
            await handler(makeReq("10.9.9.9", { number: "x" }), last as never);
        }
        expect(last.statusCode).toBe(429);
    });
});

describe("GET /api/certificates/[certificateId]", () => {
    it("returns no student email and never selects it", async () => {
        const { default: handler } = await import("@/pages/api/certificates/[certificateId]");
        const res = makeRes();
        await handler(makeReq("10.0.0.2", { certificateId: "VWC-2026-000001" }), res as never);

        expect(findUnique.mock.calls[0][0].include.user.select.email).toBeUndefined();
        expect(JSON.stringify(res.body)).not.toContain("email");
    });
});
