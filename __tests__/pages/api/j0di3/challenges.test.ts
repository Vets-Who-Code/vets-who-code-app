vi.mock("@/lib/j0di3-proxy", () => ({
    j0di3Proxy: vi.fn((_method: string, _path: string | Function) => vi.fn()),
}));

vi.mock("@/lib/rbac", () => ({
    requireAuth: vi.fn((handler) => handler),
}));

import { j0di3Proxy } from "@/lib/j0di3-proxy";

describe("J0dI3 Challenges API routes", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.mock("@/lib/j0di3-proxy", () => ({
            j0di3Proxy: vi.fn((_method: string, _path: string | Function) => vi.fn()),
        }));
    });

    it("challenges/start wires to POST /api/v1/challenges/start", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/start");

        expect(proxy).toHaveBeenCalledWith("POST", "/api/v1/challenges/start");
    });

    it("challenges/[id]/submit uses dynamic path with POST", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/[id]/submit");

        expect(proxy).toHaveBeenCalledWith("POST", expect.any(Function));

        // Verify the dynamic path function
        const pathFn = (proxy as any).mock.calls[0][1];
        const result = pathFn({ query: { id: "abc-123" } });
        expect(result).toBe("/api/v1/challenges/abc-123/submit");
    });

    it("challenges/[id]/hint uses dynamic path with GET", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/[id]/hint");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        expect(pathFn({ query: { id: "xyz" } })).toBe("/api/v1/challenges/xyz/hint");
    });

    it("challenges/[id]/solution uses dynamic path with GET", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/[id]/solution");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        expect(pathFn({ query: { id: "sol-1" } })).toBe("/api/v1/challenges/sol-1/solution");
    });

    it("challenges/recommended uses dynamic path with troop ID", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/recommended");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        const result = pathFn({ user: { troopId: "troop-42" } });
        expect(result).toBe("/api/v1/challenges/recommended/troop-42");
    });

    it("challenges/history uses dynamic path with troop ID", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/challenges/history");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        const result = pathFn({ user: { troopId: "troop-99" } });
        expect(result).toBe("/api/v1/challenges/history/troop-99");
    });
});
