import type { Mock } from "vitest";

vi.mock("@/lib/j0di3-proxy", () => ({
    j0di3Proxy: vi.fn((_method: string, _path: string | Function) => {
        const handler = vi.fn();
        handler._method = _method;
        handler._path = _path;
        return handler;
    }),
}));

import { j0di3Proxy } from "@/lib/j0di3-proxy";

describe("J0dI3 Learning API routes", () => {
    it("learning/explain wires to POST /api/v1/learning/explain", async () => {
        await import("@/pages/api/j0di3/learning/explain");

        expect(j0di3Proxy).toHaveBeenCalledWith("POST", "/api/v1/learning/explain");
    });

    it("learning/debug wires to POST /api/v1/learning/debug", async () => {
        await import("@/pages/api/j0di3/learning/debug");

        expect(j0di3Proxy).toHaveBeenCalledWith("POST", "/api/v1/learning/debug");
    });
});
