import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1198: the resume download must be scoped to the caller's troop so a
 * user cannot download another user's resume by guessing a sessionId. We assert
 * the request is troop-scoped (troop_id + X-Troop-Token forwarded) and that a
 * caller without a linked troop is rejected before any J0dI3 call.
 */

const j0di3Get = vi.fn();
vi.mock("@/lib/j0di3-client", () => ({ default: { get: (...a: unknown[]) => j0di3Get(...a) } }));

let user: Record<string, unknown> = {
    id: "u1",
    troopId: "troop-abc",
    troopToken: "TROOP-TOKEN-1",
};
vi.mock("@/lib/rbac", () => ({
    requireAuth:
        (handler: (req: unknown, res: unknown) => Promise<void>) =>
        (req: { user?: unknown }, res: unknown) => {
            req.user = { ...user };
            return handler(req, res);
        },
}));

function makeRes() {
    const res: Record<string, unknown> = { statusCode: 200, body: undefined };
    res.status = vi.fn((c: number) => {
        res.statusCode = c;
        return res;
    });
    res.json = vi.fn((b: unknown) => {
        res.body = b;
        return res;
    });
    res.setHeader = vi.fn();
    res.send = vi.fn((b: unknown) => {
        res.body = b;
        return res;
    });
    return res as Record<string, unknown> & {
        status: ReturnType<typeof vi.fn>;
        send: ReturnType<typeof vi.fn>;
    };
}

describe("GET /api/j0di3/jobs/resume/download/[sessionId]", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        user = { id: "u1", troopId: "troop-abc", troopToken: "TROOP-TOKEN-1" };
        j0di3Get.mockResolvedValue({ headers: {}, data: Buffer.from("PDF") });
    });

    it("scopes the download to the caller's troop (troop_id + X-Troop-Token)", async () => {
        const { default: handler } = await import(
            "@/pages/api/j0di3/jobs/resume/download/[sessionId]"
        );
        const res = makeRes();

        await handler({ method: "GET", query: { sessionId: "sess-xyz" } } as never, res as never);

        expect(j0di3Get).toHaveBeenCalledWith(
            "/api/v1/jobs/resume/download/sess-xyz",
            expect.objectContaining({
                params: { troop_id: "troop-abc" },
                headers: { "X-Troop-Token": "TROOP-TOKEN-1" },
            })
        );
    });

    it("rejects a caller with no linked troop before hitting J0dI3", async () => {
        user = { id: "u2", troopId: null, troopToken: null };
        const { default: handler } = await import(
            "@/pages/api/j0di3/jobs/resume/download/[sessionId]"
        );
        const res = makeRes();

        await handler({ method: "GET", query: { sessionId: "sess-xyz" } } as never, res as never);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(j0di3Get).not.toHaveBeenCalled();
    });

    it("propagates J0dI3's 403 for a session the troop does not own", async () => {
        j0di3Get.mockRejectedValue(
            Object.assign(new Error("forbidden"), {
                isAxiosError: true,
                response: { status: 403, data: {} },
            })
        );
        // isAxiosError is checked via axios.isAxiosError; emulate it.
        const axios = await import("axios");
        vi.spyOn(axios.default, "isAxiosError").mockReturnValue(true);

        const { default: handler } = await import(
            "@/pages/api/j0di3/jobs/resume/download/[sessionId]"
        );
        const res = makeRes();

        await handler({ method: "GET", query: { sessionId: "not-mine" } } as never, res as never);

        expect(res.status).toHaveBeenCalledWith(403);
    });
});
