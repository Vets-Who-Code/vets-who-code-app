import type { InteractiveLesson } from "@/lib/interactive-lessons/types";
import { cssFlexboxNav } from "./module-04/css-flexbox-nav";
import { htmlTables } from "./module-04/html-tables";
import { jsRenderTableRows } from "./module-05/js-render-table-rows";

/**
 * Every interactive lesson, in no particular order — the loader in
 * `@/lib/interactive-lessons` handles sorting (module asc, then order asc).
 * Add a lesson by importing its file and dropping it into this array.
 */
export const INTERACTIVE_LESSONS: InteractiveLesson[] = [
    htmlTables,
    cssFlexboxNav,
    jsRenderTableRows,
];
