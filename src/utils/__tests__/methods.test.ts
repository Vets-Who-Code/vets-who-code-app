import {
    slugify,
    unslugify,
    isObjectEmpty,
    toCapitalize,
    normalizePath,
    minutesToHours,
    flatDeep,
    hasKey,
    getFocusableElements,
    nextFocus,
    normalizedData,
} from "../methods";

describe("methods utilities", () => {
    describe("slugify", () => {
        it("should convert text to slug", () => {
            expect(slugify("Hello World")).toBe("hello-world");
            expect(slugify("This is a Test!")).toBe("this-is-a-test");
        });

        it("should handle multiple spaces and special chars", () => {
            expect(slugify("Hello   World!!!")).toBe("hello-world");
            expect(slugify("--hello--")).toBe("hello");
        });

        it("should return empty string for empty input", () => {
            expect(slugify("")).toBe("");
        });
    });

    describe("unslugify", () => {
        it("should convert slug back to text", () => {
            expect(unslugify("hello-world")).toBe("hello world");
        });

        it("should return empty string for empty input", () => {
            expect(unslugify("")).toBe("");
        });
    });

    describe("isObjectEmpty", () => {
        it("should return true for empty objects", () => {
            expect(isObjectEmpty({})).toBe(true);
        });

        it("should return false for non-empty objects", () => {
            expect(isObjectEmpty({ key: "value" })).toBe(false);
        });
    });

    describe("toCapitalize", () => {
        it("should capitalize first letter", () => {
            expect(toCapitalize("hello")).toBe("Hello");
            expect(toCapitalize("HELLO")).toBe("Hello");
        });
    });

    describe("normalizePath", () => {
        it("should remove leading slash", () => {
            expect(normalizePath("/about")).toBe("about");
        });

        it("should leave paths without leading slash unchanged", () => {
            expect(normalizePath("about")).toBe("about");
        });
    });

    describe("minutesToHours", () => {
        it("should convert minutes to hours and minutes", () => {
            expect(minutesToHours(90)).toBe("1h 30m");
            expect(minutesToHours(60)).toBe("1h ");
            expect(minutesToHours(45)).toBe("45m");
            expect(minutesToHours(0)).toBe("");
        });
    });

    describe("flatDeep", () => {
        it("should flatten nested arrays", () => {
            expect(flatDeep([1, [2, [3]]], 2)).toEqual([1, 2, 3]);
            expect(flatDeep([1, [2]], 1)).toEqual([1, 2]);
        });

        it("should not flatten beyond specified depth", () => {
            expect(flatDeep([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
        });
    });

    describe("hasKey", () => {
        it("should return true if object has key", () => {
            expect(hasKey({ name: "test" }, "name")).toBe(true);
        });

        it("should return false if object does not have key", () => {
            expect(hasKey({ name: "test" }, "age")).toBe(false);
        });

        it("should return false for non-objects", () => {
            expect(hasKey(null, "key")).toBe(false);
            expect(hasKey("string", "key")).toBe(false);
        });
    });

    describe("normalizedData", () => {
        it("should normalize array of objects by identifier", () => {
            const data = [
                { id: "1", name: "Item 1", extra: null },
                { id: "2", name: "Item 2", extra: "value" },
            ];
            const result = normalizedData(data, "id");

            expect(result["1"]).toEqual({ id: "1", name: "Item 1" });
            expect(result["2"]).toEqual({ id: "2", name: "Item 2", extra: "value" });
        });
    });

    describe("getFocusableElements", () => {
        it("should return empty array for null parent", () => {
            expect(getFocusableElements(null)).toEqual([]);
            expect(getFocusableElements(undefined)).toEqual([]);
        });

        it("should find focusable elements in parent", () => {
            const parent = document.createElement("div");
            const button = document.createElement("button");
            const input = document.createElement("input");
            const disabledButton = document.createElement("button");
            disabledButton.setAttribute("disabled", "");

            parent.appendChild(button);
            parent.appendChild(input);
            parent.appendChild(disabledButton);

            const result = getFocusableElements(parent);
            expect(result).toHaveLength(2);
            expect(result).toContain(button);
            expect(result).toContain(input);
        });
    });

    describe("nextFocus", () => {
        it("should focus the first element when none is focused", () => {
            const el1 = document.createElement("button");
            const el2 = document.createElement("button");
            el1.focus = vi.fn();
            el2.focus = vi.fn();

            nextFocus([el1, el2]);
            expect(el1.focus).toHaveBeenCalled();
        });
    });
});
