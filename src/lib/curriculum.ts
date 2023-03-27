import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
    IDType,
    FieldType,
    ILesson,
    IChapter,
    ICurriculum,
} from "@utils/types";
import { flatDeep } from "@utils/methods";
import { getSlugs } from "./util";

const file = path.join(process.cwd(), "src/data/curriculum/chapters.json");
const lessonDirectory = path.join(process.cwd(), "src/data/curriculum/lessons");

export function getLessonBySlug(
    slug: string,
    fields: FieldType<ILesson>,
    coursePath: string
): ILesson {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(lessonDirectory, `${realSlug}.md`);
    const fileContents = JSON.parse(
        JSON.stringify(fs.readFileSync(fullPath, "utf8"))
    ) as ILesson;
    const { data, content } = matter(fileContents);

    const lessonData = data as ILesson;
    let lesson: ILesson;

    if (fields === "all") {
        lesson = { ...lessonData, content };
    } else {
        lesson = fields.reduce((acc: ILesson, field: keyof ILesson) => {
            if (field === "content") {
                return { ...acc, [field]: content };
            }
            if (typeof data[field] !== "undefined") {
                return { ...acc, [field]: lessonData[field] };
            }
            return acc;
        }, <ILesson>{});
    }
    return {
        ...lesson,
        slug: realSlug,
        path: `/courses/lessons/${coursePath}/${realSlug}`,
    };
}

export function getAllLessons(
    fields: FieldType<ILesson>,
    coursePath: string,
    ids?: IDType[]
) {
    const slugs = getSlugs(lessonDirectory);
    let lessons = slugs.map((slug) =>
        getLessonBySlug(slug, fields, coursePath)
    );
    if (ids) lessons = lessons.filter((lesson) => ids.includes(lesson.slug));
    return lessons;
}

function getChapter(ids: IDType[]): IChapter[] {
    const rawData = JSON.parse(fs.readFileSync(file, "utf8")) as IChapter[];
    return rawData.filter((chapter: { id: IDType }) =>
        ids.includes(chapter.id)
    );
}

export function getCurriculum(
    ids: IDType[],
    fields: FieldType<ILesson>,
    coursePath: string
): ICurriculum[] {
    const chapters = getChapter(ids);
    return chapters.map((chapter) => {
        const { lessons, ...rest } = chapter;
        return {
            ...rest,
            lessons: getAllLessons(fields, coursePath, lessons),
        };
    });
}

export function getLessonSlugByChapter(ids: IDType[]): ILesson[] {
    const chapters = getChapter(ids);
    return flatDeep(
        chapters.map((chapter) => {
            const { lessons } = chapter;
            return getAllLessons(["slug"], "", lessons);
        })
    );
}

export function getPrevNextLesson(
    ids: IDType[],
    course: string,
    slug: string
): { prev: ILesson; next: ILesson } {
    const chapters = getChapter(ids);
    const lsns = flatDeep<ILesson>(
        chapters.map((chapter) => {
            const { lessons } = chapter;
            return getAllLessons(["title"], course, lessons);
        })
    );

    const index = lsns.findIndex((lesson) => lesson.slug === slug);
    const prev = lsns[index - 1] || null;
    const next = lsns[index + 1] || null;
    return { prev, next };
}
