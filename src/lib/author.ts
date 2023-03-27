import { IDType, IInstructor, FieldType } from "@utils/types";
import fs from "fs";
import path from "path";
import { getSlugs } from "./util";

const instructorDirectory = path.join(process.cwd(), "src/data/authors");

export function getAuthorBySlug(
    slug: string,
    fields: FieldType<IInstructor>
): IInstructor {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(instructorDirectory, `${realSlug}.json`);
    const fileContents = JSON.parse(
        fs.readFileSync(fullPath, "utf8")
    ) as IInstructor;
    let author: IInstructor;
    if (fields === "all") {
        author = { ...fileContents, slug: realSlug };
    } else {
        author = fields.reduce((acc: IInstructor, field: keyof IInstructor) => {
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
        }, <IInstructor>{});
    }
    return { ...author, path: `/blogs/author/${realSlug}` };
}

export function getAllAuthors(fields: FieldType<IInstructor>, limit?: number) {
    const slugs = getSlugs(instructorDirectory);
    let authrors = slugs.map((slug) => getAuthorBySlug(slug, fields));
    if (limit) authrors = authrors.slice(0, limit);
    return authrors;
}

export function getAuthorByID(id: IDType, fields: FieldType<IInstructor>) {
    const authrors = getAllAuthors(fields);
    const author = authrors.find((item) => item.id === id);
    return author || ({} as IInstructor);
}
