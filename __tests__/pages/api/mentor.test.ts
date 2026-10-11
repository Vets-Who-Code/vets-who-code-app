import { NextApiRequest, NextApiResponse } from "next";
import menteeHandler from "@/pages/api/mentee";
import mentorHandler from "@/pages/api/mentor";

vi.mock("axios");

function createMockReqRes(ip: string): { req: NextApiRequest; res: NextApiResponse } {
    const req = {
        method: "POST",
        body: {},
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

describe("rate limiting /api/mentor and /api/mentee", () => {
    it("returns 429 with Retry-After after 3 requests in 10 minutes from one IP", async () => {
        const ip = "203.0.113.10";

        for (let i = 0; i < 3; i++) {
            const { req, res } = createMockReqRes(ip);
            await mentorHandler(req, res);
            // Under the limit: requests reach validation, not the limiter.
            expect(res.status).toHaveBeenCalledWith(422);
        }

        const { req, res } = createMockReqRes(ip);
        await mentorHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
    });

    it("shares one bucket between mentor and mentee", async () => {
        const ip = "203.0.113.11";

        for (let i = 0; i < 3; i++) {
            const { req, res } = createMockReqRes(ip);
            await mentorHandler(req, res);
            expect(res.status).toHaveBeenCalledWith(422);
        }

        const { req, res } = createMockReqRes(ip);
        await menteeHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
    });
});
