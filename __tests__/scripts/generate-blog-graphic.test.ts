import { describe, expect, it } from "vitest";
import { stripFences } from "../../scripts/generate-blog-graphic";

describe("stripFences", () => {
    it("strips a fenced html block", () => {
        expect(stripFences('```html\n<div class="artboard"></div>\n```')).toBe(
            '<div class="artboard"></div>'
        );
    });

    it("strips an unlabelled fence", () => {
        expect(stripFences("```\n<div></div>\n```")).toBe("<div></div>");
    });

    it("leaves unfenced html alone", () => {
        expect(stripFences('  <div class="artboard"></div>\n')).toBe(
            '<div class="artboard"></div>'
        );
    });

    it("keeps a fenced code sample inside the markup", () => {
        const html = '<div class="artboard"><pre>```js</pre></div>';
        expect(stripFences(html)).toBe(html);
    });
});
