import { describe, expect, it } from "vitest";
import { safeCallbackUrl } from "@/pages/login";

/**
 * Issue #1199: login must honor callbackUrl so deep links survive login,
 * without opening a redirect hole.
 */
describe("safeCallbackUrl", () => {
    it("honors a same-origin absolute path", () => {
        expect(safeCallbackUrl("/learn/js-render-table-rows")).toBe("/learn/js-render-table-rows");
        expect(safeCallbackUrl("/jobs?role=eng")).toBe("/jobs?role=eng");
    });

    it("defaults to /profile when absent or empty", () => {
        expect(safeCallbackUrl(undefined)).toBe("/profile");
        expect(safeCallbackUrl("")).toBe("/profile");
    });

    it("rejects open-redirect payloads", () => {
        expect(safeCallbackUrl("//evil.com")).toBe("/profile");
        expect(safeCallbackUrl("/\\evil.com")).toBe("/profile");
        expect(safeCallbackUrl("https://evil.com")).toBe("/profile");
        expect(safeCallbackUrl("http://evil.com")).toBe("/profile");
        expect(safeCallbackUrl("javascript:alert(1)")).toBe("/profile");
    });

    it("uses the first value when the query param is repeated", () => {
        expect(safeCallbackUrl(["/jobs", "//evil.com"])).toBe("/jobs");
        expect(safeCallbackUrl(["//evil.com", "/jobs"])).toBe("/profile");
    });
});
