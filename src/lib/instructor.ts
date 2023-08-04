import { IDType, IInstructor, FieldType } from "@utils/types";
import fs from "fs";
import path from "path";
import { getSlugs } from "./util";

const instructorDirectory = path.join(process.cwd(), "src/data/instructors");

export function getInstructorBySlug(
    slug: string,
    fields: FieldType<IInstructor>
): IInstructor {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(instructorDirectory, `${realSlug}.json`);
    const fileContents = JSON.parse(
        fs.readFileSync(fullPath, "utf8")
    ) as IInstructor;
    let course: IInstructor;
    if (fields === "all") {
        course = fileContents;
    } else {
        course = fields.reduce((acc: IInstructor, field: keyof IInstructor) => {
            if (typeof fileContents[field] !== "undefined") {
                return {
                    ...acc,
                    [field]: fileContents[field],
                };
            }
            return acc;
        }, <IInstructor>{});
    }
    return course;
}

export function getAllInstructors(
    fields: FieldType<IInstructor>,
    limit?: number
) {
    const slugs = getSlugs(instructorDirectory);
    let instructors = slugs.map((slug) => getInstructorBySlug(slug, fields));
    if (limit) instructors = instructors.slice(0, limit);
    return instructors;
}

export function getInstructorByID(id: IDType, fields: FieldType<IInstructor>) {
    const instructors = getAllInstructors(fields);
    const instructor = instructors.find((item) => item.id === id);
    return instructor || ({} as IInstructor);
}
