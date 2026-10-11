import { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";
import { classifyContact } from "@/lib/api-helpers/classify-contact";
import handler from "@/pages/api/contact";

vi.mock("@/lib/api-helpers/classify-contact", () => ({
    classifyContact: vi.fn(),
}));

const mockFetch = vi.fn();

// Each call gets a unique IP by default so the per-IP rate limiter
// never interferes across tests. Pass `ip` to share a bucket on purpose.
let nextIp = 0;

function createMockReqRes(
    body: Record<string, unknown>,
    ip?: string
): {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    nextIp++;
    const req = {
        body,
        headers: { "x-forwarded-for": ip ?? `198.51.100.${nextIp}` },
        socket: {},
    } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("POST /api/contact", () => {
    beforeEach(() => {
        process.env.CONTACT_WEBHOOK_ID = "T00/B00/xxx";
        mockFetch.mockReset();
        mockFetch.mockResolvedValue({ ok: true, status: 200 });
        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe("honeypot", () => {
        it("drops a submission that fills the hidden website field", async () => {
            const { req, res } = createMockReqRes({
                website: "http://spam.example",
                name: "wYrHwDwEgDCxnKLwrBPfpyeH",
                email: "uc.i.toja.bave.21@gmail.com",
                message: "Organization: LsMgDElDUaYiqcPDr\nServices: Web App\nBudget: $10-25k",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ filtered: true }));
            // Never reaches Slack, and never spends a classifier call.
            expect(mockFetch).not.toHaveBeenCalled();
            expect(classifyContact).not.toHaveBeenCalled();
        });

        it("lets a submission through when the honeypot is untouched", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            const { req, res } = createMockReqRes({
                website: "",
                name: "Jane Engineer",
                email: "jane@example.com",
                message: "We need an internal dashboard built and would like to talk scope.",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(mockFetch).toHaveBeenCalled();
        });
    });

    describe("validation", () => {
        it("should return 422 when email is missing", async () => {
            const { req, res } = createMockReqRes({
                name: "Test",
                message: "Hello there from a veteran",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(422);
            expect(res.json).toHaveBeenCalledWith({
                error: "Missing or incorrect required property",
            });
        });

        it("should return 422 when message is missing", async () => {
            const { req, res } = createMockReqRes({
                name: "Test",
                email: "test@example.com",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(422);
        });

        it("should return 400 for single-word messages", async () => {
            const { req, res } = createMockReqRes({
                email: "test@example.com",
                message: "Hello",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Message is too short for submission",
            });
        });
    });

    describe("spam classification", () => {
        it("should filter spam when sendToSlack is false", async () => {
            (classifyContact as Mock).mockResolvedValue({
                sendToSlack: false,
                category: "spam",
                confidence: 0.95,
                reason: "SEO pitch detected",
            });

            const { req, res } = createMockReqRes({
                name: "Spammer",
                email: "spam@test.com",
                message: "Buy cheap SEO backlinks for your website today",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Message received",
                filtered: true,
                reason: "SEO pitch detected",
            });
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it("should post to Slack when sendToSlack is true", async () => {
            (classifyContact as Mock).mockResolvedValue({
                sendToSlack: true,
                category: "relevant",
                confidence: 0.98,
                reason: "Genuine inquiry",
            });
            mockFetch.mockResolvedValue({ ok: true, status: 200 });

            const { req, res } = createMockReqRes({
                name: "John Doe",
                email: "john@example.com",
                phone: "555-1234",
                message: "I want to learn more about the bootcamp",
            });

            await handler(req, res);

            expect(mockFetch).toHaveBeenCalledWith(
                "https://hooks.slack.com/services/T00/B00/xxx",
                expect.objectContaining({ method: "POST" })
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "SUCCESS" });
        });

        it("should fail-open and post to Slack when classification returns null", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            mockFetch.mockResolvedValue({ ok: true, status: 200 });

            const { req, res } = createMockReqRes({
                name: "Test User",
                email: "test@example.com",
                message: "This is a legitimate test message",
            });

            await handler(req, res);

            expect(mockFetch).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "SUCCESS" });
        });

        it("should call classifyContact with correct input", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            mockFetch.mockResolvedValue({ ok: true, status: 200 });

            const { req, res } = createMockReqRes({
                name: "Jane",
                email: "jane@test.com",
                message: "I heard about your program and would like to apply",
            });

            await handler(req, res);

            expect(classifyContact).toHaveBeenCalledWith({
                name: "Jane",
                email: "jane@test.com",
                subject: "",
                message: "I heard about your program and would like to apply",
            });
        });

        it("should pass defaults when optional fields are missing", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            mockFetch.mockResolvedValue({ ok: true, status: 200 });

            const { req, res } = createMockReqRes({
                email: "test@example.com",
                message: "Test message for the bootcamp",
            });

            await handler(req, res);

            expect(classifyContact).toHaveBeenCalledWith({
                name: "Unknown",
                email: "test@example.com",
                subject: "",
                message: "Test message for the bootcamp",
            });
        });
    });

    describe("Slack webhook", () => {
        beforeEach(() => {
            (classifyContact as Mock).mockResolvedValue({
                sendToSlack: true,
                category: "relevant",
                confidence: 0.9,
                reason: "Legitimate",
            });
        });

        it("should return 500 when Slack webhook fails with Error", async () => {
            mockFetch.mockRejectedValue(new Error("Slack API timeout"));

            const { req, res } = createMockReqRes({
                name: "Test",
                email: "test@example.com",
                message: "Testing the contact form submission",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed post to #contact channel: Slack API timeout",
            });
        });

        it("should return 500 with generic message for non-Error exceptions", async () => {
            mockFetch.mockRejectedValue("unknown failure");

            const { req, res } = createMockReqRes({
                name: "Test",
                email: "test@example.com",
                message: "Testing the contact form submission",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "An unexpected error occurred.",
            });
        });

        it("should return 500 when Slack responds with a non-2xx status", async () => {
            mockFetch.mockResolvedValue({ ok: false, status: 404 });

            const { req, res } = createMockReqRes({
                name: "Test",
                email: "test@example.com",
                message: "Testing the contact form submission",
            });

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed post to #contact channel: Request failed with status code 404",
            });
        });

        it("should include formatted message in Slack payload", async () => {
            mockFetch.mockResolvedValue({ ok: true, status: 200 });

            const { req, res } = createMockReqRes({
                name: "John Doe",
                email: "john@example.com",
                phone: "555-0000",
                message: "I want to join the bootcamp",
            });

            await handler(req, res);

            const [, init] = mockFetch.mock.calls[0];
            const payload = JSON.parse(init.body);
            expect(payload.text).toContain("John Doe");
            expect(payload.text).toContain("john@example.com");
            expect(payload.text).toContain("555-0000");
            expect(payload.text).toContain("I want to join the bootcamp");
        });
    });

    describe("rate limiting", () => {
        it("should return 429 with Retry-After after 5 requests per minute from one IP", async () => {
            const ip = "203.0.113.99";

            for (let i = 0; i < 5; i++) {
                const { req, res } = createMockReqRes({}, ip);
                await handler(req, res);
                // Under the limit: requests reach validation, not the limiter.
                expect(res.status).toHaveBeenCalledWith(422);
            }

            const { req, res } = createMockReqRes({}, ip);
            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(429);
            expect(res.json).toHaveBeenCalledWith({
                error: "Too many requests. Please try again later.",
            });
            expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
        });
    });
});
