import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/newsletter";

function createMockReqRes(ip: string): { req: NextApiRequest; res: NextApiResponse } {
    const req = {
        method: "POST",
        body: "not json",
        headers: { "x-forwarded-for": ip },
        socket: {},
    } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("rate limiting /api/newsletter", () => {
    it("returns 429 with Retry-After after 5 requests per minute from one IP", async () => {
        const ip = "203.0.113.20";

        for (let i = 0; i < 5; i++) {
            const { req, res } = createMockReqRes(ip);
            await handler(req, res);
            // Under the limit: requests reach JSON parsing, not the limiter.
            expect(res.status).toHaveBeenCalledWith(400);
        }

        const { req, res } = createMockReqRes(ip);
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
    });
});
