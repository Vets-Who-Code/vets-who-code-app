import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import { IDType, IMedia } from "@utils/types";
import { getSlugs } from "./util";

interface MediaType extends Omit<IMedia, "category" | "tags" | "author"> {
    category: string;
    tags: string[];
    author: IDType;
}

const postsDirectory = join(process.cwd(), "src/data/media");

const makeExcerpt = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }
    let excerpt = str.substring(0, maxLength);
    excerpt = excerpt.substring(0, excerpt.lastIndexOf(" "));
    return `${excerpt} ...`;
};

export function getPostBySlug(
    slug: string,
    fields: Array<keyof IMedia> | "all" = []
): IMedia {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = JSON.parse(
        JSON.stringify(fs.readFileSync(fullPath, "utf8"))
    ) as MediaType;
    const { data, content } = matter(fileContents);

    const mediaData = data as MediaType;

    let media: IMedia;

    if (fields === "all") {
        media = {
            ...mediaData,
            content,
            slug: realSlug,
            excerpt: makeExcerpt(content, 150),
        };
    } else {
        media = fields.reduce((acc: IMedia, field: keyof IMedia) => {
            if (typeof data[field] !== "undefined") {
                return { ...acc, [field]: mediaData[field] };
            }
            return acc;
        }, <IMedia>{});
    }

    return {
        ...media,
        datePublished: dayjs(mediaData.datePublished).format("MMM DD, YYYY"),
        path: `${realSlug}`,
    };
}

export function getAllMedia(
    fields: Array<keyof IMedia> | "all" = [],
    skip = 0,
    limit?: number
) {
    const slugs = getSlugs(postsDirectory);
    let medias = slugs
        .map((slug) => getPostBySlug(slug, fields))
        .sort((post1, post2) =>
            new Date(post1.datePublished).getTime() >
            new Date(post2.datePublished).getTime()
                ? -1
                : 1
        );
    if (limit) medias = medias.slice(skip, skip + limit);
    return { medias, count: slugs.length };
}

export function getPrevNextPost(
    currentSlug: string,
    fields: Array<keyof IMedia> | "all" = []
) {
    const { medias } = getAllMedia(fields);
    const currentIndex = medias.findIndex((post) => post.slug === currentSlug);
    const prevPost = medias[currentIndex - 1] || null;
    const nextPost = medias[currentIndex + 1] || null;
    return { prevPost, nextPost };
}
