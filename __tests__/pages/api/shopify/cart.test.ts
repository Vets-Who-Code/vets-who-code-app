import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1203: the cart routes validate input before calling Shopify, return the
 * cart on success, and fail with a 500 when the Storefront call throws.
 */

const shopify = {
    createCart: vi.fn(),
    getCart: vi.fn(),
    addToCart: vi.fn(),
    updateCartLines: vi.fn(),
    removeFromCart: vi.fn(),
};
vi.mock("@lib/shopify", () => shopify);

const CART = { id: "gid://shopify/Cart/1", checkoutUrl: "https://shop.example/checkout" };

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

type Route = () => Promise<{ default: (req: never, res: never) => unknown }>;

async function call(route: Route, req: Record<string, unknown>) {
    const { default: handler } = await route();
    const res = makeRes();
    await handler(req as never, res as never);
    return res;
}

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/shopify/cart/create", () => {
    const create = () => import("@/pages/api/shopify/cart/create");

    it("rejects a non-POST request with 405", async () => {
        const res = await call(create, { method: "GET" });
        expect(res.statusCode).toBe(405);
        expect(shopify.createCart).not.toHaveBeenCalled();
    });

    it("returns 201 with the new cart", async () => {
        shopify.createCart.mockResolvedValue(CART);
        const res = await call(create, { method: "POST" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ cart: CART });
    });

    it("returns 500 when Shopify fails", async () => {
        shopify.createCart.mockRejectedValue(new Error("upstream down"));
        const res = await call(create, { method: "POST" });
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ error: "Failed to create cart" });
    });
});

describe("GET /api/shopify/cart/[cartId]", () => {
    const getCart = () => import("@/pages/api/shopify/cart/[cartId]");

    it("rejects a non-GET request with 405", async () => {
        const res = await call(getCart, { method: "POST", query: { cartId: CART.id } });
        expect(res.statusCode).toBe(405);
        expect(shopify.getCart).not.toHaveBeenCalled();
    });

    it.each([
        ["missing", {}],
        ["repeated", { cartId: ["a", "b"] }],
    ])("rejects a %s cartId with 400", async (_label, query) => {
        const res = await call(getCart, { method: "GET", query });
        expect(res.statusCode).toBe(400);
        expect(shopify.getCart).not.toHaveBeenCalled();
    });

    it("returns 404 when the cart does not exist", async () => {
        shopify.getCart.mockResolvedValue(null);
        const res = await call(getCart, { method: "GET", query: { cartId: CART.id } });
        expect(res.statusCode).toBe(404);
    });

    it("returns 200 with the cart", async () => {
        shopify.getCart.mockResolvedValue(CART);
        const res = await call(getCart, { method: "GET", query: { cartId: CART.id } });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cart: CART });
        expect(shopify.getCart).toHaveBeenCalledWith(CART.id);
    });

    it("returns 500 when Shopify fails", async () => {
        shopify.getCart.mockRejectedValue(new Error("upstream down"));
        const res = await call(getCart, { method: "GET", query: { cartId: CART.id } });
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ error: "Failed to fetch cart" });
    });
});

describe("POST /api/shopify/cart/add", () => {
    const add = () => import("@/pages/api/shopify/cart/add");
    const lines = [{ merchandiseId: "gid://shopify/ProductVariant/1", quantity: 2 }];

    it("rejects a non-POST request with 405", async () => {
        const res = await call(add, { method: "GET", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(405);
        expect(shopify.addToCart).not.toHaveBeenCalled();
    });

    it.each([
        ["no cartId", { lines }],
        ["no lines", { cartId: CART.id }],
        ["empty lines", { cartId: CART.id, lines: [] }],
        ["a line without merchandiseId", { cartId: CART.id, lines: [{ quantity: 1 }] }],
        ["a zero quantity", { cartId: CART.id, lines: [{ merchandiseId: "v1", quantity: 0 }] }],
        [
            "a negative quantity",
            { cartId: CART.id, lines: [{ merchandiseId: "v1", quantity: -1 }] },
        ],
        ["a string quantity", { cartId: CART.id, lines: [{ merchandiseId: "v1", quantity: "2" }] }],
    ])("rejects %s with 400", async (_label, body) => {
        const res = await call(add, { method: "POST", body });
        expect(res.statusCode).toBe(400);
        expect(shopify.addToCart).not.toHaveBeenCalled();
    });

    it("returns 200 with the updated cart", async () => {
        shopify.addToCart.mockResolvedValue(CART);
        const res = await call(add, { method: "POST", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cart: CART });
        expect(shopify.addToCart).toHaveBeenCalledWith(CART.id, lines);
    });

    it("returns 500 when Shopify fails", async () => {
        shopify.addToCart.mockRejectedValue(new Error("upstream down"));
        const res = await call(add, { method: "POST", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ error: "Failed to add items to cart" });
    });
});

describe("POST /api/shopify/cart/update", () => {
    const update = () => import("@/pages/api/shopify/cart/update");
    const lines = [{ id: "gid://shopify/CartLine/1", quantity: 3 }];

    it("rejects a non-POST request with 405", async () => {
        const res = await call(update, { method: "PUT", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(405);
        expect(shopify.updateCartLines).not.toHaveBeenCalled();
    });

    it.each([
        ["no cartId", { lines }],
        ["non-array lines", { cartId: CART.id, lines: "l1" }],
        ["empty lines", { cartId: CART.id, lines: [] }],
        ["a line without id", { cartId: CART.id, lines: [{ quantity: 1 }] }],
        ["a negative quantity", { cartId: CART.id, lines: [{ id: "l1", quantity: -1 }] }],
    ])("rejects %s with 400", async (_label, body) => {
        const res = await call(update, { method: "POST", body });
        expect(res.statusCode).toBe(400);
        expect(shopify.updateCartLines).not.toHaveBeenCalled();
    });

    it("returns 200 with the updated cart", async () => {
        shopify.updateCartLines.mockResolvedValue(CART);
        const res = await call(update, { method: "POST", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cart: CART });
        expect(shopify.updateCartLines).toHaveBeenCalledWith(CART.id, lines);
    });

    it("accepts a zero quantity", async () => {
        shopify.updateCartLines.mockResolvedValue(CART);
        const zero = [{ id: "l1", quantity: 0 }];
        const res = await call(update, { method: "POST", body: { cartId: CART.id, lines: zero } });
        expect(res.statusCode).toBe(200);
        expect(shopify.updateCartLines).toHaveBeenCalledWith(CART.id, zero);
    });

    it("returns 500 when Shopify fails", async () => {
        shopify.updateCartLines.mockRejectedValue(new Error("upstream down"));
        const res = await call(update, { method: "POST", body: { cartId: CART.id, lines } });
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ error: "Failed to update cart" });
    });
});

describe("POST /api/shopify/cart/remove", () => {
    const remove = () => import("@/pages/api/shopify/cart/remove");
    const lineIds = ["gid://shopify/CartLine/1"];

    it("rejects a non-POST request with 405", async () => {
        const res = await call(remove, { method: "DELETE", body: { cartId: CART.id, lineIds } });
        expect(res.statusCode).toBe(405);
        expect(shopify.removeFromCart).not.toHaveBeenCalled();
    });

    it.each([
        ["no cartId", { lineIds }],
        ["no lineIds", { cartId: CART.id }],
        ["empty lineIds", { cartId: CART.id, lineIds: [] }],
        ["a non-string lineId", { cartId: CART.id, lineIds: [42] }],
    ])("rejects %s with 400", async (_label, body) => {
        const res = await call(remove, { method: "POST", body });
        expect(res.statusCode).toBe(400);
        expect(shopify.removeFromCart).not.toHaveBeenCalled();
    });

    it("returns 200 with the updated cart", async () => {
        shopify.removeFromCart.mockResolvedValue(CART);
        const res = await call(remove, { method: "POST", body: { cartId: CART.id, lineIds } });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cart: CART });
        expect(shopify.removeFromCart).toHaveBeenCalledWith(CART.id, lineIds);
    });

    it("returns 500 when Shopify fails", async () => {
        shopify.removeFromCart.mockRejectedValue(new Error("upstream down"));
        const res = await call(remove, { method: "POST", body: { cartId: CART.id, lineIds } });
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ error: "Failed to remove items from cart" });
    });
});
