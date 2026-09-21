import crypto from "crypto";
import { Readable } from "stream";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1201: the orders/updated webhook syncs financial and fulfillment status
 * onto an existing Order row without clobbering fields the payload omits.
 */

const db = {
    order: { updateMany: vi.fn() },
};
vi.mock("@/lib/prisma", () => ({ default: db }));

const SECRET = "test-webhook-secret";
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET;

function makeReq(body: string, opts: { hmac?: string | null; method?: string } = {}) {
    const hmac =
        opts.hmac === undefined
            ? crypto.createHmac("sha256", SECRET).update(body, "utf8").digest("base64")
            : opts.hmac;
    const req = Readable.from([Buffer.from(body)]) as unknown as Record<string, unknown>;
    req.method = opts.method ?? "POST";
    req.headers = hmac ? { "x-shopify-hmac-sha256": hmac } : {};
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

const PAID_AND_FULFILLED = JSON.stringify({
    id: 555,
    financial_status: "paid",
    fulfillment_status: "fulfilled",
});

async function post(body: string, opts?: { hmac?: string | null; method?: string }) {
    const { default: handler } = await import("@/pages/api/shopify/webhooks/orders/updated");
    const res = makeRes();
    await handler(makeReq(body, opts), res as never);
    return res;
}

beforeEach(() => {
    vi.clearAllMocks();
    db.order.updateMany.mockResolvedValue({ count: 1 });
});
afterAll(() => {
    delete process.env.SHOPIFY_WEBHOOK_SECRET;
});

describe("POST /api/shopify/webhooks/orders/updated", () => {
    it("rejects a missing HMAC header with 401", async () => {
        const res = await post(PAID_AND_FULFILLED, { hmac: null });
        expect(res.statusCode).toBe(401);
        expect(db.order.updateMany).not.toHaveBeenCalled();
    });

    it("rejects an invalid HMAC signature with 401", async () => {
        const res = await post(PAID_AND_FULFILLED, { hmac: "bm90LXRoZS1yaWdodC1kaWdlc3Q=" });
        expect(res.statusCode).toBe(401);
        expect(db.order.updateMany).not.toHaveBeenCalled();
    });

    it("rejects a non-POST request with 405", async () => {
        const res = await post(PAID_AND_FULFILLED, { method: "GET" });
        expect(res.statusCode).toBe(405);
        expect(db.order.updateMany).not.toHaveBeenCalled();
    });

    it("syncs both statuses onto the matching order", async () => {
        const res = await post(PAID_AND_FULFILLED);
        expect(res.statusCode).toBe(200);
        expect(db.order.updateMany).toHaveBeenCalledWith({
            where: { shopifyId: "555" },
            data: { financialStatus: "paid", fulfillmentStatus: "fulfilled" },
        });
    });

    it("writes a null fulfillmentStatus when Shopify unfulfills the order", async () => {
        await post(JSON.stringify({ id: 555, financial_status: "paid", fulfillment_status: null }));
        expect(db.order.updateMany).toHaveBeenCalledWith({
            where: { shopifyId: "555" },
            data: { financialStatus: "paid", fulfillmentStatus: null },
        });
    });

    it("does not clobber financialStatus when the payload omits it", async () => {
        await post(JSON.stringify({ id: 555, fulfillment_status: "fulfilled" }));
        const { data } = db.order.updateMany.mock.calls[0][0];
        expect(data).not.toHaveProperty("financialStatus");
        expect(data).toEqual({ fulfillmentStatus: "fulfilled" });
    });

    it("skips the write when the payload carries no status fields", async () => {
        const res = await post(JSON.stringify({ id: 555, note: "gift wrap" }));
        expect(res.statusCode).toBe(200);
        expect(db.order.updateMany).not.toHaveBeenCalled();
    });

    it("rejects a payload with no id instead of matching every order", async () => {
        const res = await post(JSON.stringify({ financial_status: "refunded" }));
        expect(res.statusCode).toBe(400);
        // Prisma strips `undefined` filter values, so an id-less where clause would
        // collapse to {} and rewrite the status columns on the whole table.
        expect(db.order.updateMany).not.toHaveBeenCalled();
    });

    it("returns 500 when a recently created order is missing (the create race)", async () => {
        db.order.updateMany.mockResolvedValue({ count: 0 });
        const res = await post(
            JSON.stringify({
                id: 555,
                financial_status: "paid",
                created_at: new Date(Date.now() - 60_000).toISOString(),
            })
        );
        expect(res.statusCode).toBe(500);
    });

    it("acks an unknown order that is too old to be the create race", async () => {
        db.order.updateMany.mockResolvedValue({ count: 0 });
        const res = await post(
            JSON.stringify({
                id: 555,
                financial_status: "paid",
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            })
        );
        // Retrying forever would burn Shopify's 48-hour schedule on an order that
        // predates webhook registration and risk the subscription being removed.
        expect(res.statusCode).toBe(200);
    });

    it("returns 500 when the DB write fails (so Shopify retries)", async () => {
        db.order.updateMany.mockRejectedValue(new Error("connection reset"));
        const res = await post(PAID_AND_FULFILLED);
        expect(res.statusCode).toBe(500);
    });
});
