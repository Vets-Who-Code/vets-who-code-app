import type { NextApiResponse } from "next";
import type { Mock } from "vitest";

vi.mock("@/lib/rbac", () => ({
    requireAuth: vi.fn((handler) => handler),
}));

vi.mock("@/lib/j0di3-client", () => ({
    default: {
        get: vi.fn(),
        patch: vi.fn(),
    },
}));

vi.mock("axios", () => ({
    default: {
        isAxiosError: vi.fn(() => false),
    },
}));

import j0di3 from "@/lib/j0di3-client";

function createRes() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
}

describe("troops/me API route", () => {
    let handler: any;

    beforeEach(async () => {
        vi.resetModules();
        vi.mock("@/lib/rbac", () => ({
            requireAuth: vi.fn((h) => h),
        }));
        vi.mock("@/lib/j0di3-client", () => ({
            default: { get: vi.fn(), patch: vi.fn() },
        }));
        vi.mock("axios", () => ({
            default: { isAxiosError: vi.fn(() => false) },
        }));

        const mod = await import("@/pages/api/j0di3/troops/me");
        handler = mod.default;
    });

    it("returns 400 when user has no troopId", async () => {
        const req = {
            method: "GET",
            user: { id: "u1", troopId: null },
        } as any;
        const res = createRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("handles GET by calling j0di3.get with troop ID", async () => {
        const { default: client } = await import("@/lib/j0di3-client");
        (client.get as Mock).mockResolvedValue({ data: { name: "Test Troop" } });

        const req = {
            method: "GET",
            user: { id: "u1", troopId: "troop-1" },
        } as any;
        const res = createRes();

        await handler(req, res);

        expect(client.get).toHaveBeenCalledWith("/api/v1/troops/troop-1");
        expect(res.json).toHaveBeenCalledWith({ name: "Test Troop" });
    });

    it("handles PATCH by calling j0di3.patch with body", async () => {
        const { default: client } = await import("@/lib/j0di3-client");
        (client.patch as Mock).mockResolvedValue({ data: { updated: true } });

        const req = {
            method: "PATCH",
            body: { curriculum_week: 5 },
            user: { id: "u1", troopId: "troop-1" },
        } as any;
        const res = createRes();

        await handler(req, res);

        expect(client.patch).toHaveBeenCalledWith("/api/v1/troops/troop-1", { curriculum_week: 5 });
        expect(res.json).toHaveBeenCalledWith({ updated: true });
    });

    it("returns 405 for unsupported methods", async () => {
        const req = {
            method: "DELETE",
            user: { id: "u1", troopId: "troop-1" },
        } as any;
        const res = createRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
    });
});

describe("troops/dashboard API route", () => {
    it("wires to GET with dynamic troop path", async () => {
        vi.resetModules();
        vi.mock("@/lib/j0di3-proxy", () => ({
            j0di3Proxy: vi.fn((_method: string, _path: string | Function) => vi.fn()),
        }));
        vi.mock("@/lib/rbac", () => ({
            requireAuth: vi.fn((h) => h),
        }));

        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/troops/dashboard");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        const result = pathFn({ user: { troopId: "troop-abc" } });
        expect(result).toBe("/api/v1/troops/troop-abc/dashboard");
    });
});
