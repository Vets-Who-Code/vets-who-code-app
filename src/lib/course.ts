import fs from "fs";
import path from "path";
import { ICourse } from "@utils/types";
import { getSlugs } from "./util";

const courseDirectory = path.join(process.cwd(), "src/data/courses");

export function getCourseBySlug(
    slug: string,
    fields: Array<keyof ICourse> | "all"
): ICourse {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(courseDirectory, `${realSlug}.json`);
    const fileContents = JSON.parse(
        fs.readFileSync(fullPath, "utf8")
    ) as ICourse;
    let course: ICourse;
    if (fields === "all") {
        course = { ...fileContents, slug: realSlug };
    } else {
        course = fields.reduce((acc: ICourse, field: keyof ICourse) => {
            if (field === "slug") {
                return { ...acc, [field]: realSlug };
            }
            if (typeof fileContents[field] !== "undefined") {
                return {
                    ...acc,
                    [field]: fileContents[field],
                };
            }
            return acc;
        }, <ICourse>{});
    }
    return {
        ...course,
        published_at: fileContents.published_at,
        path: `/courses/${realSlug}`,
    };
}

export function getallCourses(
    fields: Array<keyof ICourse> | "all",
    skip = 0,
    limit?: number
) {
    const slugs = getSlugs(courseDirectory);
    let courses = slugs
        .map((slug) => getCourseBySlug(slug, fields))
        .sort((a, b) =>
            new Date(a.published_at).getTime() >
            new Date(b.published_at).getTime()
                ? -1
                : 1
        );
    if (limit) courses = courses.slice(skip, skip + limit);

    return courses;
}

export function getFilteredCourse(
    fields: Array<keyof ICourse>,
    filterKey: keyof ICourse,
    filterValue: string | boolean
) {
    const courses = getallCourses(fields);
    const course = courses.find((item) => item[filterKey] === filterValue);
    return course || ({} as ICourse);
}

export function getFilteredCourses(
    fields: Array<keyof ICourse>,
    filterKey: keyof ICourse,
    filterValue: string | boolean
) {
    const courses = getallCourses(fields);
    const filteredCourses = courses.filter(
        (item) => item[filterKey] === filterValue
    );
    return filteredCourses;
}
