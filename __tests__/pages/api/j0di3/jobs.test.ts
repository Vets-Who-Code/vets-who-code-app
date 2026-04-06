describe("J0dI3 Jobs API routes", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.mock("@/lib/j0di3-proxy", () => ({
            j0di3Proxy: vi.fn((_method: string, _path: string | Function) => vi.fn()),
        }));
    });

    const postRoutes = [
        { module: "@/pages/api/j0di3/jobs/resume/score", endpoint: "/api/v1/jobs/resume/score" },
        { module: "@/pages/api/j0di3/jobs/resume/tailor", endpoint: "/api/v1/jobs/resume/tailor" },
        { module: "@/pages/api/j0di3/jobs/match", endpoint: "/api/v1/jobs/match" },
        { module: "@/pages/api/j0di3/jobs/apply-coach", endpoint: "/api/v1/jobs/apply-coach" },
        { module: "@/pages/api/j0di3/jobs/interview/start", endpoint: "/api/v1/jobs/interview/start" },
        { module: "@/pages/api/j0di3/jobs/offer/evaluate", endpoint: "/api/v1/jobs/offer/evaluate" },
    ];

    for (const { module, endpoint } of postRoutes) {
        it(`wires to POST ${endpoint}`, async () => {
            const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
            await import(module);

            expect(proxy).toHaveBeenCalledWith("POST", endpoint);
        });
    }

    it("interview/[id]/answer uses dynamic POST path", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/jobs/interview/[id]/answer");

        expect(proxy).toHaveBeenCalledWith("POST", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        expect(pathFn({ query: { id: "int-1" } })).toBe("/api/v1/jobs/interview/int-1/answer");
    });

    it("interview/[id]/report uses dynamic GET path", async () => {
        const { j0di3Proxy: proxy } = await import("@/lib/j0di3-proxy");
        await import("@/pages/api/j0di3/jobs/interview/[id]/report");

        expect(proxy).toHaveBeenCalledWith("GET", expect.any(Function));

        const pathFn = (proxy as any).mock.calls[0][1];
        expect(pathFn({ query: { id: "int-2" } })).toBe("/api/v1/jobs/interview/int-2/report");
    });
});
