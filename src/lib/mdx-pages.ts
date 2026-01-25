/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { getImageUrl } from "./cloudinary-helpers";
import { ImageType } from "@utils/types";

const mdxPagesDirectory = join(process.cwd(), "src/data/mdx-pages");

/**
 * Process image field to ensure it has a valid URL
 * Supports both Cloudinary public IDs and full URLs
 */
const processImageField = (image: ImageType | undefined): ImageType | undefined => {
    if (!image || !image.src) {
        return image;
    }

    // Use the helper to get the URL (works with both public IDs and full URLs)
    const processedSrc = getImageUrl(image.src);

    return {
        ...image,
        src: processedSrc,
    };
};

export function getPageBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(mdxPagesDirectory, `${realSlug}.md`);
    const fileContents = JSON.parse(JSON.stringify(fs.readFileSync(fullPath, "utf8")));
    const { content } = matter(fileContents);
    return content;
}

// Utility to get all media posts with selected fields
export function getAllMediaPosts<T extends { [key: string]: unknown } = Record<string, unknown>>(
    fields: string[] = [],
    dir = "media"
) {
    const directory = join(process.cwd(), `src/data/${dir}`);
    const files = fs
        .readdirSync(directory)
        .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
    return files.map((file) => {
        const slug = file.replace(/\.(mdx|md)$/, "");
        const fullPath = join(directory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        let item: Record<string, unknown> = { slug };
        if (fields.length === 0) {
            item = { ...item, ...data, content };
        } else {
            fields.forEach((field) => {
                if (field === "slug") item.slug = slug;
                else if (field === "content") item.content = content;
                else if (field === "image") {
                    // Process image field to ensure proper URL
                    item.image = processImageField(data[field] as ImageType);
                }
                else if (data[field] !== undefined) item[field] = data[field];
            });
        }
        return item as T;
    });
}
