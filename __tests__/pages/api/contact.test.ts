import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";
import { classifyContact } from "@/pages/api/api-helpers/classify-contact";
import handler from "@/pages/api/contact";

vi.mock("@/pages/api/api-helpers/classify-contact", () => ({
    classifyContact: vi.fn(),
}));

vi.mock("axios");

function createMockReqRes(body: Record<string, unknown>): {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    const req = { body } as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("POST /api/contact", () => {
    beforeEach(() => {
        process.env.CONTACT_WEBHOOK_ID = "T00/B00/xxx";
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
            expect(axios).not.toHaveBeenCalled();
        });

        it("should post to Slack when sendToSlack is true", async () => {
            (classifyContact as Mock).mockResolvedValue({
                sendToSlack: true,
                category: "relevant",
                confidence: 0.98,
                reason: "Genuine inquiry",
            });
            (axios as unknown as Mock).mockResolvedValue({ status: 200 });

            const { req, res } = createMockReqRes({
                name: "John Doe",
                email: "john@example.com",
                phone: "555-1234",
                message: "I want to learn more about the bootcamp",
            });

            await handler(req, res);

            expect(axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    method: "POST",
                    baseURL: "https://hooks.slack.com",
                })
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "SUCCESS" });
        });

        it("should fail-open and post to Slack when classification returns null", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            (axios as unknown as Mock).mockResolvedValue({ status: 200 });

            const { req, res } = createMockReqRes({
                name: "Test User",
                email: "test@example.com",
                message: "This is a legitimate test message",
            });

            await handler(req, res);

            expect(axios).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "SUCCESS" });
        });

        it("should call classifyContact with correct input", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            (axios as unknown as Mock).mockResolvedValue({ status: 200 });

            const { req, res } = createMockReqRes({
                name: "Jane",
                email: "jane@test.com",
                message: "I heard about your program and would like to apply",
            });

            await handler(req, res);

            expect(classifyContact).toHaveBeenCalledWith({
                name: "Jane",
                email: "jane@test.com",
                message: "I heard about your program and would like to apply",
            });
        });

        it("should pass defaults when optional fields are missing", async () => {
            (classifyContact as Mock).mockResolvedValue(null);
            (axios as unknown as Mock).mockResolvedValue({ status: 200 });

            const { req, res } = createMockReqRes({
                email: "test@example.com",
                message: "Test message for the bootcamp",
            });

            await handler(req, res);

            expect(classifyContact).toHaveBeenCalledWith({
                name: "Unknown",
                email: "test@example.com",
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
            (axios as unknown as Mock).mockRejectedValue(new Error("Slack API timeout"));

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
            (axios as unknown as Mock).mockRejectedValue("unknown failure");

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

        it("should include formatted message in Slack payload", async () => {
            (axios as unknown as Mock).mockResolvedValue({ status: 200 });

            const { req, res } = createMockReqRes({
                name: "John Doe",
                email: "john@example.com",
                phone: "555-0000",
                message: "I want to join the bootcamp",
            });

            await handler(req, res);

            const axiosCall = (axios as unknown as Mock).mock.calls[0][0];
            const payload = JSON.parse(axiosCall.data);
            expect(payload.text).toContain("John Doe");
            expect(payload.text).toContain("john@example.com");
            expect(payload.text).toContain("555-0000");
            expect(payload.text).toContain("I want to join the bootcamp");
        });
    });
});
