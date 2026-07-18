import crypto from "crypto";
import { describe, expect, it } from "vitest";
import { normalizeEmail, verifyShopifyHmac } from "@/lib/shopify-webhook";

/**
 * Issue #1202: timing-safe HMAC verification + email normalization.
 */
const SECRET = "shopify-secret";

function sign(body: string, secret = SECRET) {
    return crypto.createHmac("sha256", secret).update(body, "utf8").digest("base64");
}

describe("verifyShopifyHmac", () => {
    it("accepts a valid signature", () => {
        const body = '{"id":123}';
        expect(verifyShopifyHmac(body, sign(body), SECRET)).toBe(true);
    });

    it("rejects a tampered body", () => {
        const body = '{"id":123}';
        expect(verifyShopifyHmac('{"id":124}', sign(body), SECRET)).toBe(false);
    });

    it("rejects a wrong secret", () => {
        const body = '{"id":123}';
        expect(verifyShopifyHmac(body, sign(body, "other-secret"), SECRET)).toBe(false);
    });

    it("rejects a malformed/short header without throwing", () => {
        expect(verifyShopifyHmac('{"id":1}', "not-base64-of-right-length", SECRET)).toBe(false);
        expect(verifyShopifyHmac('{"id":1}', "", SECRET)).toBe(false);
    });

    it("returns false with no secret", () => {
        expect(verifyShopifyHmac('{"id":1}', sign('{"id":1}'), "")).toBe(false);
    });
});

describe("normalizeEmail", () => {
    it("trims and lowercases", () => {
        expect(normalizeEmail("  John@Example.COM ")).toBe("john@example.com");
    });

    it("handles null/undefined", () => {
        expect(normalizeEmail(null)).toBe("");
        expect(normalizeEmail(undefined)).toBe("");
    });

    it("matches mixed-case order and session emails to the same key", () => {
        expect(normalizeEmail("Vet@VetsWhoCode.io")).toBe(normalizeEmail("vet@vetswhocode.io"));
    });
});
