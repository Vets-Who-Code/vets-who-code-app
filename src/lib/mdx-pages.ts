/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const directory = join(process.cwd(), "src/data/mdx-pages");

export function getPageBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(directory, `${realSlug}.md`);
    const fileContents = JSON.parse(
        JSON.stringify(fs.readFileSync(fullPath, "utf8"))
    );
    const { content } = matter(fileContents);

    return content;
}
