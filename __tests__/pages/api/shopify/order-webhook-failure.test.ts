import crypto from "crypto";
import { Readable } from "stream";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1200: the order webhook must fail loud (5xx) on a DB write failure so
 * Shopify retries, and be idempotent on shopifyId so a replay yields one row.
 */

const db = {
    user: { findUnique: vi.fn() },
    order: { findUnique: vi.fn(), create: vi.fn() },
};
vi.mock("@/lib/prisma", () => ({ default: db }));

const SECRET = "test-webhook-secret";
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET;

function makeReq(body: string) {
    const hmac = crypto.createHmac("sha256", SECRET).update(body, "utf8").digest("base64");
    const req = Readable.from([Buffer.from(body)]) as unknown as Record<string, unknown>;
    req.method = "POST";
    req.headers = { "x-shopify-hmac-sha256": hmac };
    return req as never;
}
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
    return res as Record<string, unknown> & { statusCode: number };
}

const ORDER_BODY = JSON.stringify({
    id: 555,
    email: "a@b.com",
    created_at: "2026-01-01",
    line_items: [],
});

beforeEach(() => {
    vi.clearAllMocks();
    db.user.findUnique.mockResolvedValue(null);
    db.order.findUnique.mockResolvedValue(null);
});
afterAll(() => {
    delete process.env.SHOPIFY_WEBHOOK_SECRET;
});

describe("POST /api/shopify/webhooks/orders/create", () => {
    it("returns 5xx when the DB write fails (so Shopify retries)", async () => {
        db.order.create.mockRejectedValue(new Error("connection reset"));
        const { default: handler } = await import("@/pages/api/shopify/webhooks/orders/create");
        const res = makeRes();
        await handler(makeReq(ORDER_BODY), res as never);
        expect(res.statusCode).toBe(500);
    });

    it("is idempotent on a duplicate shopifyId (P2002 -> 200, no error)", async () => {
        db.order.create.mockRejectedValue(Object.assign(new Error("dup"), { code: "P2002" }));
        const { default: handler } = await import("@/pages/api/shopify/webhooks/orders/create");
        const res = makeRes();
        await handler(makeReq(ORDER_BODY), res as never);
        expect(res.statusCode).toBe(200);
        expect((res.body as { existing?: boolean }).existing).toBe(true);
    });

    it("returns 200 for an already-stored order (fast path)", async () => {
        db.order.findUnique.mockResolvedValue({ id: "existing" });
        const { default: handler } = await import("@/pages/api/shopify/webhooks/orders/create");
        const res = makeRes();
        await handler(makeReq(ORDER_BODY), res as never);
        expect(res.statusCode).toBe(200);
        expect(db.order.create).not.toHaveBeenCalled();
    });
});
