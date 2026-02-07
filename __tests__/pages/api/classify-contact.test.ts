import type { Mock } from "vitest";
import { GoogleGenAI } from "@google/genai";
import { classifyContact, ContactClassification } from "../../../src/pages/api/api-helpers/classify-contact";

vi.mock("@google/genai", () => ({
    GoogleGenAI: vi.fn(),
    Type: {
        OBJECT: "OBJECT",
        STRING: "STRING",
        NUMBER: "NUMBER",
        BOOLEAN: "BOOLEAN",
    },
}));

const mockGenerateContent = vi.fn();

function setupGoogleGenAIMock(): void {
    (GoogleGenAI as unknown as Mock).mockImplementation(function () {
        return {
            models: {
                generateContent: mockGenerateContent,
            },
        };
    });
}

const validInput = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "I am a veteran interested in your coding bootcamp",
};

const spamClassification: ContactClassification = {
    sendToSlack: false,
    category: "spam",
    confidence: 0.95,
    reason: "SEO backlink pitch",
};

const relevantClassification: ContactClassification = {
    sendToSlack: true,
    category: "relevant",
    confidence: 0.92,
    reason: "Genuine inquiry about the program",
};

const unclearClassification: ContactClassification = {
    sendToSlack: true,
    category: "unclear",
    confidence: 0.55,
    reason: "Ambiguous message intent",
};

describe("classifyContact", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        process.env.GEMINI_API_KEY = "test-api-key";
        setupGoogleGenAIMock();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("should return null when no API key is set", async () => {
        delete process.env.GEMINI_API_KEY;
        delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        const result = await classifyContact(validInput);

        expect(result).toBeNull();
        expect(GoogleGenAI).not.toHaveBeenCalled();
    });

    it("should return classification for relevant messages", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        const result = await classifyContact(validInput);

        expect(result).toEqual(relevantClassification);
        expect(result?.sendToSlack).toBe(true);
        expect(result?.category).toBe("relevant");
    });

    it("should return classification for spam messages", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(spamClassification),
        });

        const result = await classifyContact({
            name: "SEO Expert",
            email: "seo@spammer.com",
            message: "Buy cheap backlinks for your website",
        });

        expect(result).toEqual(spamClassification);
        expect(result?.sendToSlack).toBe(false);
        expect(result?.category).toBe("spam");
    });

    it("should return classification for unclear messages", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(unclearClassification),
        });

        const result = await classifyContact(validInput);

        expect(result).toEqual(unclearClassification);
        expect(result?.sendToSlack).toBe(true);
        expect(result?.category).toBe("unclear");
    });

    it("should return null on API error (fail-open)", async () => {
        mockGenerateContent.mockRejectedValue(new Error("API rate limit exceeded"));

        const result = await classifyContact(validInput);

        expect(result).toBeNull();
    });

    it("should return null when Gemini returns empty response", async () => {
        mockGenerateContent.mockResolvedValue({ text: undefined });

        const result = await classifyContact(validInput);

        expect(result).toBeNull();
    });

    it("should return null on malformed JSON response (fail-open)", async () => {
        mockGenerateContent.mockResolvedValue({ text: "not valid json {{{" });

        const result = await classifyContact(validInput);

        expect(result).toBeNull();
    });

    it("should use GEMINI_MODEL env var when set", async () => {
        process.env.GEMINI_MODEL = "gemini-2.0-flash";
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        await classifyContact(validInput);

        expect(mockGenerateContent).toHaveBeenCalledWith(
            expect.objectContaining({
                model: "gemini-2.0-flash",
            })
        );
    });

    it("should default to gemini-2.5-flash when GEMINI_MODEL is not set", async () => {
        delete process.env.GEMINI_MODEL;
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        await classifyContact(validInput);

        expect(mockGenerateContent).toHaveBeenCalledWith(
            expect.objectContaining({
                model: "gemini-2.5-flash",
            })
        );
    });

    it("should pass temperature 0 and JSON response config", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        await classifyContact(validInput);

        expect(mockGenerateContent).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    responseMimeType: "application/json",
                    temperature: 0,
                }),
            })
        );
    });

    it("should include name, email, and message in the prompt", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        await classifyContact(validInput);

        const callArgs = mockGenerateContent.mock.calls[0][0];
        expect(callArgs.contents).toContain("Jane Doe");
        expect(callArgs.contents).toContain("jane@example.com");
        expect(callArgs.contents).toContain("I am a veteran interested in your coding bootcamp");
    });

    it("should log classification without PII", async () => {
        const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(relevantClassification),
        });

        await classifyContact(validInput);

        expect(consoleSpy).toHaveBeenCalledWith(
            "Contact classification:",
            expect.any(String)
        );

        const loggedJson = JSON.parse(consoleSpy.mock.calls[0][1] as string);
        expect(loggedJson).toEqual({
            category: "relevant",
            confidence: 0.92,
            sendToSlack: true,
        });
        // Ensure no PII is logged
        expect(consoleSpy.mock.calls[0][1]).not.toContain("jane@example.com");
        expect(consoleSpy.mock.calls[0][1]).not.toContain("Jane Doe");

        consoleSpy.mockRestore();
    });

    it("should return null on non-Error exceptions (fail-open)", async () => {
        mockGenerateContent.mockRejectedValue("string error");

        const result = await classifyContact(validInput);

        expect(result).toBeNull();
    });
});
