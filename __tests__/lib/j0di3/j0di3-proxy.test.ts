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

import j0di3 from "@/lib/j0di3-client";
import axios from "axios";
import { j0di3Proxy } from "@/lib/j0di3-proxy";

const mockJ0di3 = j0di3 as unknown as Mock;
const mockIsAxiosError = axios.isAxiosError as Mock;

function createMockReqRes(
    overrides: Partial<NextApiRequest> = {}
): { req: NextApiRequest; res: NextApiResponse } {
    const req = {
        method: "POST",
        body: { question: "What is React?" },
        query: {},
        user: {
            id: "user-123",
            name: "Test",
            email: "test@test.com",
            role: "STUDENT",
            troopId: "troop-uuid-123",
        },
        ...overrides,
    } as unknown as NextApiRequest;

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
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
            data: { question: "What is React?", troop_id: "troop-uuid-123" },
            params: undefined,
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
            params: expect.objectContaining({ troop_id: "troop-uuid-123" }),
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
});
