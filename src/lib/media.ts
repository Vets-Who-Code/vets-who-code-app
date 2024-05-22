import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { IMedia } from "@utils/types";
import { slugify, flatDeep } from "@utils/methods";
import { getSlugs } from "./util";

const mediaDirectory = join(process.cwd(), "src/data/media");

const makeExcerpt = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }
    let excerpt = str.substring(0, maxLength);
    excerpt = excerpt.substring(0, excerpt.lastIndexOf(" "));
    return `${excerpt} ...`;
};

export function getMediaBySlug(
    slug: string,
    fields: Array<keyof IMedia> | "all" = []
): IMedia {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(mediaDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mediaData = data as IMedia;

    let media: IMedia;

    if (fields === "all") {
        media = {
            ...mediaData,
            content,
            tags: mediaData.tags.map((tag) => ({
                title: tag,
                slug: slugify(tag),
                path: `/media/tag/${slugify(tag)}`,
            })),
            slug: realSlug,
            excerpt: makeExcerpt(content, 150),
        };
    } else {
        media = fields.reduce((acc: IMedia, field: keyof IMedia) => {
            if (field === "slug") {
                return { ...acc, slug: realSlug };
            }
            if (field === "content") {
                return { ...acc, [field]: content };
            }
            if (field === "excerpt") {
                return { ...acc, excerpt: makeExcerpt(content, 150) };
            }
            if (field === "tags") {
                return {
                    ...acc,
                    tags: mediaData.tags.map((tag) => ({
                        title: tag,
                        slug: slugify(tag),
                        path: `/media/tag/${slugify(tag)}`,
                    })),
                };
            }
            if (typeof data[field] !== "undefined") {
                return { ...acc, [field]: mediaData[field] };
            }
            return acc;
        }, <IMedia>{});
    }

    return {
        ...media,
        path: `/media/${realSlug}`,
    };
}

export function getAllMedia(
    fields: Array<keyof IMedia> | "all" = [],
    skip = 0,
    limit?: number
) {
    const slugs = getSlugs(mediaDirectory);
    let media = slugs
        .map((slug) => getMediaBySlug(slug, fields))
        .sort((item1, item2) =>
            new Date(item1.date).getTime() > new Date(item2.date).getTime()
                ? -1
                : 1
        );
    if (limit) media = media.slice(skip, skip + limit);
    return { media, count: slugs.length };
}

export function getTags() {
    const { media } = getAllMedia(["tags"]);
    const tags = flatDeep(media.map((item) => item.tags));
    const result: { title: string; slug: string; path: string }[] = [];

    tags.forEach((tag) => {
        if (!result.find((t) => t.title === tag.title)) {
            result.push(tag);
        }
    });

    return result;
}

export function getMediaByTag(
    tag: string,
    fields: Array<keyof IMedia> | "all" = [],
    skip = 0,
    limit?: number
) {
    const postFields =
        fields === "all" ? "all" : ([...fields, "tags"] as Array<keyof IMedia>);
    const { media } = getAllMedia(postFields);
    let result = media.filter((item) => item.tags.some((t) => t.slug === tag));
    const totalItems = result.length;
    if (limit) result = result.slice(skip, skip + limit);
    return { items: result, count: totalItems };
}
