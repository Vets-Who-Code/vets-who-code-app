import { INTERACTIVE_LESSONS } from "@data/interactive-lessons";
import { describe, expect, it } from "vitest";
import {
    getAdjacentLessons,
    getAllLessonSlugs,
    getLessonBySlug,
    getLessonsGroupedByModule,
} from "../index";

describe("interactive-lessons loader", () => {
    it("has unique slugs", () => {
        const slugs = getAllLessonSlugs();
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("orders by module then order", () => {
        const slugs = getAllLessonSlugs();
        expect(slugs).toEqual(["html-tables", "css-flexbox-nav", "js-render-table-rows"]);
    });

    it("returns null for an unknown slug", () => {
        expect(getLessonBySlug("nope")).toBeNull();
    });

    it("walks prev/next across the ordering with null at the boundaries", () => {
        expect(getAdjacentLessons("html-tables").prev).toBeNull();
        expect(getAdjacentLessons("html-tables").next?.slug).toBe("css-flexbox-nav");
        expect(getAdjacentLessons("css-flexbox-nav").prev?.slug).toBe("html-tables");
        expect(getAdjacentLessons("js-render-table-rows").next).toBeNull();
    });

    it("groups lessons by module", () => {
        const groups = getLessonsGroupedByModule();
        expect(groups.map((g) => g.module)).toEqual([4, 5]);
        expect(groups[0].lessons).toHaveLength(2);
    });

    // Cheap content lint so a malformed lesson fails CI, not a learner.
    it.each(
        INTERACTIVE_LESSONS.map((l) => [l.slug, l] as const)
    )("lesson %s is well-formed", (_slug, lesson) => {
        expect(lesson.instructions.trim().length).toBeGreaterThan(0);
        expect(lesson.files.length).toBeGreaterThan(0);
        expect(lesson.tests.length).toBeGreaterThanOrEqual(2);
        expect(lesson.tests.length).toBeLessThanOrEqual(6);
        expect(lesson.solutionFiles.length).toBeGreaterThan(0);
        // every editable file name is one of the known three
        for (const file of lesson.files) {
            expect(["index.html", "index.css", "index.js"]).toContain(file.name);
        }
    });
});
