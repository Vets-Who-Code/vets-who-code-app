import { capitalize, truncate } from "../string";

describe("string utilities", () => {
    describe("truncate", () => {
        it("truncates long strings", () => {
            expect(truncate("", 5)).toBe("");
        });

        it("does not truncate short strings", () => {
            expect(truncate("Hi", 5)).toBe("Hi");
        });
    });

    describe("capitalize", () => {
        it("capitalizes each word", () => {
            expect(capitalize("")).toBe("");
            expect(capitalize("hello")).toBe("Hello");
            expect(capitalize("hello   world")).toBe("Hello   World");
        });
    });
});
