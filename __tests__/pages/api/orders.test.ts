import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1203: GET /api/orders returns the signed-in user's orders, matched by
 * userId or by the normalized email the order webhook stores.
 */

const db = {
    user: { findUnique: vi.fn() },
    order: { findMany: vi.fn() },
};
vi.mock("@/lib/prisma", () => ({ default: db }));

let sessionUser: { id: string; email?: string } | null = null;
vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(async () => (sessionUser ? { user: sessionUser } : null)),
}));
vi.mock("@/lib/auth-options", () => ({ options: {} }));

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

async function call(method: string) {
    const { default: handler } = await import("@/pages/api/orders");
    const res = makeRes();
    await handler({ method } as never, res as never);
    return res;
}

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
    sessionUser = { id: "user-1", email: "  Vet@Example.COM " };
    db.user.findUnique.mockResolvedValue(null);
});

describe("GET /api/orders", () => {
    it("rejects an unauthenticated request with 401", async () => {
        sessionUser = null;
        const res = await call("GET");
        expect(res.statusCode).toBe(401);
        expect(db.order.findMany).not.toHaveBeenCalled();
    });

    it("rejects a non-GET request with 405", async () => {
        const res = await call("POST");
        expect(res.statusCode).toBe(405);
        expect(db.order.findMany).not.toHaveBeenCalled();
    });

    it("returns the user's orders matched by userId or normalized email", async () => {
        const orders = [{ id: "o1", items: [] }];
        db.order.findMany.mockResolvedValue(orders);
        const res = await call("GET");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ orders });
        expect(db.order.findMany).toHaveBeenCalledWith({
            where: { OR: [{ userId: "user-1" }, { customerEmail: "vet@example.com" }] },
            include: { items: { orderBy: { createdAt: "asc" } } },
            orderBy: { orderCreatedAt: "desc" },
        });
    });

    it("returns 500 without the error detail when the DB query fails", async () => {
        db.order.findMany.mockRejectedValue(new Error("connection reset"));
        const res = await call("GET");
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Failed to fetch orders" });
    });
});
