import { checkLength, checkParams, contactErrors } from "@/lib/api-helpers";

describe("api-helpers", () => {
    describe("checkParams", () => {
        it("returns true when a required key is absent from the body", () => {
            const body: { email: string; message?: string } = { email: "vet@example.com" };

            expect(checkParams(body, ["email", "message"])).toBe(true);
        });

        it.each([
            ["undefined", undefined],
            ["null", null],
            ["an empty string", ""],
            ["a whitespace-only string", "   "],
        ])("returns true when a required key holds %s", (_label, value) => {
            const body: Record<string, unknown> = { email: "vet@example.com", message: value };

            expect(checkParams(body, ["email", "message"])).toBe(true);
        });

        it("returns false when every required key holds a non-empty string", () => {
            const body = { email: "vet@example.com", message: "Need help with prework" };

            expect(checkParams(body, ["email", "message"])).toBe(false);
        });

        it("treats legitimate falsy non-string values (0, false) as present", () => {
            const body = { zipCode: 0, hasAttendedPreviousCourse: false };

            expect(checkParams(body, ["zipCode", "hasAttendedPreviousCourse"])).toBe(false);
        });

        it("treats empty arrays, empty objects, and nested objects as present", () => {
            const body = { tags: [], meta: {}, address: { city: "Nashville" } };

            expect(checkParams(body, ["tags", "meta", "address"])).toBe(false);
        });

        it("ignores blank values on keys that are not listed in params", () => {
            const body = { email: "vet@example.com", message: "Need help", phone: "" };

            expect(checkParams(body, ["email", "message"])).toBe(false);
        });

        it("accepts a typed body with a (keyof T)[] params list", () => {
            interface Application {
                firstName: string;
                zipCode: number;
                hasAttendedPreviousCourse: boolean;
            }
            const required: (keyof Application)[] = [
                "firstName",
                "zipCode",
                "hasAttendedPreviousCourse",
            ];
            const complete: Application = {
                firstName: "Ada",
                zipCode: 0,
                hasAttendedPreviousCourse: false,
            };

            expect(checkParams<Application>(complete, required)).toBe(false);
            expect(checkParams<Application>({ ...complete, firstName: "" }, required)).toBe(true);
            // @ts-expect-error keys outside Application are rejected at compile time
            checkParams<Application>(complete, ["lastName"]);
        });
    });

    describe("checkLength", () => {
        it("returns true for a single word", () => {
            expect(checkLength("hello")).toBe(true);
        });

        it("returns false for two or more words", () => {
            expect(checkLength("hello world")).toBe(false);
            expect(checkLength("I need help with prework")).toBe(false);
        });

        it("ignores leading, trailing, and repeated internal whitespace when counting words", () => {
            expect(checkLength("  hello   world  ")).toBe(false);
            expect(checkLength("   hello   ")).toBe(true);
        });

        it('returns true for an empty string because [""] still has length 1', () => {
            expect(checkLength("")).toBe(true);
        });

        it('returns true for a whitespace-only string because it trims to [""]', () => {
            expect(checkLength("   \t  ")).toBe(true);
        });

        it("counts newline-separated words as multiple words", () => {
            expect(checkLength("hello\nworld")).toBe(false);
        });
    });

    describe("contactErrors", () => {
        it("exposes the exact missing-or-required and too-short messages", () => {
            expect(contactErrors.missingOrRequired).toBe("Missing or incorrect required property");
            expect(contactErrors.tooShort).toBe("Message is too short for submission");
        });

        it("has exactly the missingOrRequired and tooShort keys", () => {
            expect(Object.keys(contactErrors).sort()).toEqual(["missingOrRequired", "tooShort"]);
        });
    });
});
