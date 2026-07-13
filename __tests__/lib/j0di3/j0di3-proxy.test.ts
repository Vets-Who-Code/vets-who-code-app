import type { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";

vi.mock("@/lib/j0di3-client", () => ({
    default: vi.fn(),
}));

vi.mock("@/lib/rbac", () => ({
    requireAuth: vi.fn((handler) => handler),
}));

vi.mock("axios", () => ({
    default: {
        isAxiosError: vi.fn(),
    },
}));

import axios from "axios";
import j0di3 from "@/lib/j0di3-client";
import { j0di3Proxy } from "@/lib/j0di3-proxy";

const mockJ0di3 = j0di3 as unknown as Mock;
const mockIsAxiosError = axios.isAxiosError as unknown as Mock;

function createMockReqRes(overrides: Partial<NextApiRequest> = {}): {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    const req = {
        method: "POST",
        body: { question: "What is React?" },
        query: {},
        user: {
            id: "user-123",
            name: "Test",
            email: "test@test.com",
            role: "STUDENT",
            troopId: "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
            troopToken: "troop-token-abc",
        },
        ...overrides,
    } as unknown as NextApiRequest;

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    return { req, res };
}

describe("j0di3Proxy", () => {
    it("proxies POST requests with troop_id injected into body", async () => {
        mockJ0di3.mockResolvedValue({ data: { response: "React is a library" } });

        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(mockJ0di3).toHaveBeenCalledWith({
            method: "POST",
            url: "/api/v1/learning/explain",
            data: { question: "What is React?", troop_id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301" },
            params: undefined,
            headers: { "X-Troop-Token": "troop-token-abc" },
        });
        expect(res.json).toHaveBeenCalledWith({ response: "React is a library" });
    });

    it("proxies GET requests with troop_id in query params", async () => {
        mockJ0di3.mockResolvedValue({ data: { challenges: [] } });

        const handler = j0di3Proxy("GET", "/api/v1/challenges/recommended");
        const { req, res } = createMockReqRes({ method: "GET", body: undefined });

        await handler(req, res);

        expect(mockJ0di3).toHaveBeenCalledWith({
            method: "GET",
            url: "/api/v1/challenges/recommended",
            data: undefined,
            params: expect.objectContaining({ troop_id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301" }),
            headers: { "X-Troop-Token": "troop-token-abc" },
        });
    });

    it("supports dynamic path function", async () => {
        mockJ0di3.mockResolvedValue({ data: { hint: "Try using map()" } });

        const handler = j0di3Proxy("GET", (req) => `/api/v1/challenges/${req.query.id}/hint`);
        const { req, res } = createMockReqRes({
            method: "GET",
            query: { id: "challenge-42" },
        });

        await handler(req, res);

        expect(mockJ0di3).toHaveBeenCalledWith(
            expect.objectContaining({ url: "/api/v1/challenges/challenge-42/hint" })
        );
    });

    it("forwards Idempotency-Key and X-Request-ID headers when supplied", async () => {
        mockJ0di3.mockResolvedValue({ data: { ok: true } });

        const handler = j0di3Proxy("POST", "/api/v1/challenges/c-1/submit");
        const { req, res } = createMockReqRes({
            headers: {
                "idempotency-key": "idem-key-789",
                "x-request-id": "req-id-456",
            } as unknown as NextApiRequest["headers"],
        });

        await handler(req, res);

        expect(mockJ0di3).toHaveBeenCalledWith(
            expect.objectContaining({
                headers: {
                    "X-Troop-Token": "troop-token-abc",
                    "Idempotency-Key": "idem-key-789",
                    "X-Request-ID": "req-id-456",
                },
            })
        );
    });

    it("echoes the J0dI3 X-Request-ID back on the response", async () => {
        mockJ0di3.mockResolvedValue({
            data: { ok: true },
            headers: { "x-request-id": "echoed-req-id" },
        });

        const handler = j0di3Proxy("POST", "/api/v1/challenges/c-1/submit");
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.setHeader).toHaveBeenCalledWith("X-Request-ID", "echoed-req-id");
    });

    it("returns 400 when user has no troopId", async () => {
        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();
        (req as any).user.troopId = null;

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ error: expect.stringContaining("No J0dI3 troop profile") })
        );
    });

    it("returns 400 without calling upstream when troopId is malformed", async () => {
        const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();
        (req as any).user.troopId = "not-a-uuid";

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid troop profile. Please sign out and sign back in.",
        });
        expect(mockJ0di3).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    it("logs the rejected troopId redacted, never the full value", async () => {
        const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();
        (req as any).user.troopId = "bogus-troop-id-value";

        await handler(req, res);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const logged = String(consoleSpy.mock.calls[0][0]);
        expect(logged).toContain("bogu");
        expect(logged).toContain("length 20");
        expect(logged).not.toContain("bogus-troop-id-value");
        consoleSpy.mockRestore();
    });

    it("returns 400 when user has troopId but no troopToken", async () => {
        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();
        (req as any).user.troopToken = null;

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ error: expect.stringContaining("troop access token") })
        );
    });

    it("forwards J0dI3 error status and message on axios error", async () => {
        const axiosError = {
            response: {
                status: 422,
                data: { detail: "Invalid troop_id" },
            },
        };
        mockJ0di3.mockRejectedValue(axiosError);
        mockIsAxiosError.mockReturnValue(true);

        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid troop_id" });
    });

    it("returns 500 on unexpected non-axios errors", async () => {
        mockJ0di3.mockRejectedValue(new Error("Something broke"));
        mockIsAxiosError.mockReturnValue(false);

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
        consoleSpy.mockRestore();
    });

    it("returns 429 with Retry-After after 30 requests per minute for one troop", async () => {
        mockJ0di3.mockResolvedValue({ data: { ok: true } });

        const handler = j0di3Proxy("POST", "/api/v1/learning/explain");
        const user = {
            id: "user-rl",
            name: "Rate Limited",
            email: "rl@test.com",
            role: "STUDENT",
            troopId: "99999999-9999-4999-8999-999999999999",
            troopToken: "troop-token-rl",
        };

        for (let i = 0; i < 30; i++) {
            const { req, res } = createMockReqRes({ user } as Partial<NextApiRequest>);
            await handler(req, res);
            expect(res.status).not.toHaveBeenCalledWith(429);
        }
        expect(mockJ0di3).toHaveBeenCalledTimes(30);

        const { req, res } = createMockReqRes({ user } as Partial<NextApiRequest>);
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
        expect(mockJ0di3).toHaveBeenCalledTimes(30);
    });
});
