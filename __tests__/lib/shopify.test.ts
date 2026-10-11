import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getProduct } from "@/lib/shopify";

/**
 * Issue #1204: getProduct returns null only when the product is missing; GraphQL
 * errors and HTTP failures throw so callers can tell an outage from a 404.
 */

function respond(status: number, body: unknown) {
    vi.mocked(fetch).mockResolvedValue(
        new Response(JSON.stringify(body), { status, statusText: "status" })
    );
}

beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("getProduct", () => {
    it("requests the 2026-10 Storefront API", async () => {
        respond(200, { data: { product: null } });
        await getProduct("tee");
        expect(String(vi.mocked(fetch).mock.calls[0][0])).toContain("/api/2026-10/graphql.json");
    });

    it("returns null when the product does not exist", async () => {
        respond(200, { data: { product: null } });
        await expect(getProduct("missing")).resolves.toBeNull();
    });

    it("throws on GraphQL errors", async () => {
        respond(200, { data: { product: null }, errors: [{ message: "Throttled" }] });
        await expect(getProduct("tee")).rejects.toThrow("Failed to fetch product");
    });

    it("throws on a 5xx response", async () => {
        respond(503, {});
        await expect(getProduct("tee")).rejects.toThrow("Shopify API error: 503");
    });
});
