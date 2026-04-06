vi.mock("@/lib/j0di3-proxy", () => ({
    j0di3Proxy: vi.fn((_method: string, _path: string | Function) => vi.fn()),
}));

import { j0di3Proxy } from "@/lib/j0di3-proxy";

describe("J0dI3 Coding API routes", () => {
    const routes = [
        { module: "@/pages/api/j0di3/coding/review", endpoint: "/api/v1/coding/review" },
        { module: "@/pages/api/j0di3/coding/refactor", endpoint: "/api/v1/coding/refactor" },
        { module: "@/pages/api/j0di3/coding/explain", endpoint: "/api/v1/coding/explain" },
        { module: "@/pages/api/j0di3/coding/generate", endpoint: "/api/v1/coding/generate" },
        { module: "@/pages/api/j0di3/coding/architecture", endpoint: "/api/v1/coding/architecture" },
    ];

    for (const { module, endpoint } of routes) {
        it(`wires to POST ${endpoint}`, async () => {
            vi.resetModules();
            vi.mock("@/lib/j0di3-proxy", () => ({
                j0di3Proxy: vi.fn(() => vi.fn()),
            }));

            const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
            await import(module);

            expect(proxy).toHaveBeenCalledWith("POST", endpoint);
        });
    }
});
