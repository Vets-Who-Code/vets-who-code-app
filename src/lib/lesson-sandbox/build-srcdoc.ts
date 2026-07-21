/**
 * Assemble the `srcdoc` for a lesson's sandboxed preview iframe.
 *
 * Authoring convention: `index.html` holds BODY markup (what goes inside <body>),
 * not a full document — the skeleton (doctype/head) is supplied here so the
 * harness always runs first and the document is always standards-mode.
 * ponytail: body-fragment model; "author the whole <!doctype> skeleton" lessons
 * would need a second assembly mode — add when a Module 4.1 lesson needs it.
 */

import type { LessonFile, LessonTest } from "@/lib/interactive-lessons/types";
import { buildConsoleShim, buildTestRunner, escapeForInlineTag } from "./harness";

const LEADING_DOCTYPE = /^\s*<!doctype[^>]*>/i;

function fileContents(files: LessonFile[], name: LessonFile["name"]): string {
    return files.find((f) => f.name === name)?.contents ?? "";
}

export function buildSrcdoc(files: LessonFile[], tests: LessonTest[], runId: number): string {
    const html = fileContents(files, "index.html").replace(LEADING_DOCTYPE, "");
    const css = escapeForInlineTag(fileContents(files, "index.css"));
    const js = escapeForInlineTag(fileContents(files, "index.js"));

    return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        `<style>${css}</style>`,
        `<script>${buildConsoleShim(runId)}</script>`,
        "</head>",
        "<body>",
        html,
        `<script>${js}</script>`,
        `<script>${buildTestRunner(tests, runId)}</script>`,
        "</body>",
        "</html>",
    ].join("\n");
}
