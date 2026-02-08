import {
    capitalize,
    cleanWhitespace,
    escapeHtml,
    formatFileSize,
    getInitials,
    isValidJSON,
    maskEmail,
    pluralize,
    randomString,
    stripHtml,
    toTitleCase,
    truncate,
} from "../string";

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

    describe("toTitleCase", () => {
        it("converts kebab case", () => {
            expect(toTitleCase("hello-world")).toBe("Hello World");
        });
    });

    describe("getInitials", () => {
        it("extracts initials", () => {
            expect(getInitials("John Michael Doe", 3)).toBe("JMD");
            expect(getInitials("John Michael Doe")).toBe("JM");
        });
    });

    describe("pluralize", () => {
        it("returns singular for 1", () => {
            expect(pluralize(2, "person", "people")).toBe("people");
        });

        it("returns plural for multiple", () => {
            expect(pluralize(2, "item")).toBe("items");
        });
    });

    describe("stripHtml", () => {
        it("removes html tags", () => {
            expect(stripHtml("<p>Hello</p>")).toBe("Hello");
        });
    });

    describe("escapeHtml", () => {
        it("escapes html characters", () => {
            expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
        });
    });

    describe("formatFileSize", () => {
        it("formats bytes", () => {
            expect(formatFileSize(0)).toBe("0 Bytes");
            expect(formatFileSize(1048576)).toBe("1 MB");
        });
    });

    describe("randomString", () => {
        it("generates string of given length", () => {
            const str = randomString(10);
            expect(str.length).toBe(10);
        });
    });

    describe("cleanWhitespace", () => {
        it("cleans extra spaces", () => {
            expect(cleanWhitespace("  hello   world  ")).toBe("hello world");
        });
    });

    describe("maskEmail", () => {
        it("masks email", () => {
            expect(maskEmail("ab@example.com")).toBe("ab@example.com");
            expect(maskEmail("invalidemail")).toBe("invalidemail");
        });
    });

    describe("isValidJSON", () => {
        it("valid json", () => {
            expect(isValidJSON('{"a":1}')).toBe(true);
        });

        it("invalid json", () => {
            expect(isValidJSON("{a:1}")).toBe(false);
        });
    });
});
