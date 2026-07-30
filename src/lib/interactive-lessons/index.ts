import { INTERACTIVE_LESSONS } from "@data/interactive-lessons";
import type { InteractiveLesson, LessonNavRef } from "./types";

export type { InteractiveLesson, LessonFile, LessonNavRef, LessonTest } from "./types";

/** Canonical ordering: module ascending, then `order` ascending within a module. */
function sorted(): InteractiveLesson[] {
    return [...INTERACTIVE_LESSONS].sort((a, b) => a.module - b.module || a.order - b.order);
}

const toNavRef = (lesson: InteractiveLesson): LessonNavRef => ({
    slug: lesson.slug,
    title: lesson.title,
});

export function getAllLessonSlugs(): string[] {
    return sorted().map((lesson) => lesson.slug);
}

export function getLessonBySlug(slug: string): InteractiveLesson | null {
    return INTERACTIVE_LESSONS.find((lesson) => lesson.slug === slug) ?? null;
}

/** Previous/next lesson in canonical order, or null at the boundaries. */
export function getAdjacentLessons(slug: string): {
    prev: LessonNavRef | null;
    next: LessonNavRef | null;
} {
    const lessons = sorted();
    const index = lessons.findIndex((lesson) => lesson.slug === slug);
    if (index === -1) return { prev: null, next: null };
    return {
        prev: index > 0 ? toNavRef(lessons[index - 1]) : null,
        next: index < lessons.length - 1 ? toNavRef(lessons[index + 1]) : null,
    };
}

export interface LessonModuleGroup {
    module: number;
    moduleTitle: string;
    lessons: LessonNavRef[];
}

/** Lessons grouped by module (ordered), for the `/learn` catalog page. */
export function getLessonsGroupedByModule(): LessonModuleGroup[] {
    const groups: LessonModuleGroup[] = [];
    for (const lesson of sorted()) {
        let group = groups.find((g) => g.module === lesson.module);
        if (!group) {
            group = { module: lesson.module, moduleTitle: lesson.moduleTitle, lessons: [] };
            groups.push(group);
        }
        group.lessons.push(toNavRef(lesson));
    }
    return groups;
}
