import { describe, expect, it } from "vitest";
import { stringifyForCatalog } from "@/lib/challenge-runner/stringify";

describe("stringifyForCatalog", () => {
    it("wraps strings in single quotes", () => {
        expect(stringifyForCatalog("hello")).toBe("'hello'");
        expect(stringifyForCatalog("")).toBe("''");
    });

    it("renders numbers as bare digits", () => {
        expect(stringifyForCatalog(6)).toBe("6");
        expect(stringifyForCatalog(-3.14)).toBe("-3.14");
        expect(stringifyForCatalog(0)).toBe("0");
    });

    it("renders booleans as bare true/false", () => {
        expect(stringifyForCatalog(true)).toBe("true");
        expect(stringifyForCatalog(false)).toBe("false");
    });

    it("renders arrays as JSON without spaces", () => {
        expect(stringifyForCatalog([1, 2, 3])).toBe("[1,2,3]");
        expect(stringifyForCatalog([])).toBe("[]");
        expect(stringifyForCatalog(["a", "b"])).toBe('["a","b"]');
    });

    it("renders objects as JSON", () => {
        expect(stringifyForCatalog({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
    });

    it("renders null and undefined as literals", () => {
        expect(stringifyForCatalog(null)).toBe("null");
        expect(stringifyForCatalog(undefined)).toBe("undefined");
    });
});
