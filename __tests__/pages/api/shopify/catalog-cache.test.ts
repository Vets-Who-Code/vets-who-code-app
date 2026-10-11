import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1276: public catalog reads are CDN-cacheable on success, and errors are not.
 */

const shopify = {
    getProducts: vi.fn(),
    getProduct: vi.fn(),
    getCollections: vi.fn(),
    getCollection: vi.fn(),
};
vi.mock("@lib/shopify", () => shopify);

const PUBLIC = "public, s-maxage=300, stale-while-revalidate=600";

function makeRes() {
    const res: Record<string, unknown> = { statusCode: 0, headers: {} };
    res.status = vi.fn((c: number) => {
        res.statusCode = c;
        return res;
    });
    res.json = vi.fn(() => res);
    res.setHeader = vi.fn((name: string, value: string) => {
        (res.headers as Record<string, string>)[name] = value;
        return res;
    });
    return res as Record<string, unknown> & {
        statusCode: number;
        headers: Record<string, string>;
    };
}

type Route = () => Promise<{ default: (req: never, res: never) => unknown }>;

async function call(route: Route, query: Record<string, string>) {
    const { default: handler } = await route();
    const res = makeRes();
    await handler({ method: "GET", query } as never, res as never);
    return res;
}

const routes: [string, Route, keyof typeof shopify, Record<string, string>][] = [
    ["products", () => import("@/pages/api/shopify/products"), "getProducts", {}],
    [
        "products/[handle]",
        () => import("@/pages/api/shopify/products/[handle]"),
        "getProduct",
        { handle: "tee" },
    ],
    ["collections", () => import("@/pages/api/shopify/collections"), "getCollections", {}],
    [
        "collections/[handle]",
        () => import("@/pages/api/shopify/collections/[handle]"),
        "getCollection",
        { handle: "apparel" },
    ],
];

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("Shopify catalog Cache-Control", () => {
    it.each(routes)("caches a successful %s read publicly", async (_label, route, fn, query) => {
        shopify[fn].mockResolvedValue({ id: "1" });
        const res = await call(route, query);
        expect(res.statusCode).toBe(200);
        expect(res.headers["Cache-Control"]).toBe(PUBLIC);
    });

    it.each(routes)("does not cache a failed %s read", async (_label, route, fn, query) => {
        shopify[fn].mockRejectedValue(new Error("upstream down"));
        const res = await call(route, query);
        expect(res.statusCode).toBe(500);
        expect(res.headers["Cache-Control"]).toBeUndefined();
    });
});
