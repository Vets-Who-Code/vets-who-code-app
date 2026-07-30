import { describe, expect, it } from "vitest";
import type { LessonFile, LessonTest } from "@/lib/interactive-lessons/types";
import { buildSrcdoc } from "../build-srcdoc";

const files: LessonFile[] = [
    { name: "index.html", contents: "<h1>Hi</h1>" },
    { name: "index.css", contents: "h1 { color: red; }" },
    { name: "index.js", contents: "console.log('hello');" },
];
const tests: LessonTest[] = [
    { name: "has heading", body: "assert(document.querySelector('h1'));" },
];

describe("buildSrcdoc", () => {
    it("emits exactly one doctype", () => {
        const doc = buildSrcdoc(files, tests, 1);
        expect(doc.match(/<!doctype/gi)?.length).toBe(1);
    });

    it("runs the console shim before the learner's code", () => {
        const doc = buildSrcdoc(files, tests, 1);
        expect(doc.indexOf('type: "console"')).toBeLessThan(doc.indexOf("console.log('hello')"));
    });

    it("runs the test runner after the learner's code", () => {
        const doc = buildSrcdoc(files, tests, 1);
        expect(doc.indexOf("console.log('hello')")).toBeLessThan(doc.indexOf('type: "tests"'));
    });

    it("strips a leading doctype from the learner's HTML (no duplicate)", () => {
        const doc = buildSrcdoc(
            [{ name: "index.html", contents: "<!DOCTYPE html><h1>Hi</h1>" }],
            tests,
            1
        );
        expect(doc.match(/<!doctype/gi)?.length).toBe(1);
    });

    it("embeds the runId in both harness scripts", () => {
        const doc = buildSrcdoc(files, tests, 42);
        expect(doc.match(/RUN_ID = 42;/g)?.length).toBe(2);
    });

    it("includes the learner's css and the test body", () => {
        const doc = buildSrcdoc(files, tests, 1);
        expect(doc).toContain("color: red;");
        expect(doc).toContain("document.querySelector('h1')");
    });

    it("produces a valid doc for a JS-only lesson with no html file", () => {
        const doc = buildSrcdoc([{ name: "index.js", contents: "console.log(1);" }], tests, 7);
        expect(doc.match(/<!doctype/gi)?.length).toBe(1);
        expect(doc).toContain('type: "tests"');
        expect(doc).toContain("console.log(1);");
    });

    it("neutralizes a </script> break-out in learner js", () => {
        const doc = buildSrcdoc(
            [{ name: "index.js", contents: "var x = '</script><script>alert(1)</script>';" }],
            tests,
            1
        );
        expect(doc).not.toContain("</script><script>alert(1)");
        expect(doc).toContain("<\\/script>");
    });

    it("neutralizes a </script> break-out inside a test body", () => {
        const doc = buildSrcdoc(
            files,
            [{ name: "evil", body: "var s = '</script><img src=x>';" }],
            1
        );
        expect(doc).not.toContain("</script><img src=x>");
    });
});
