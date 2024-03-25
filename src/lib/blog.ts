import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import { IBlog, BlogMetaType, IDType } from "@utils/types";
import { slugify, flatDeep } from "@utils/methods";
import { getSlugs } from "./util";
import { getAuthorByID } from "./author";

// Function to get the view count for a blog post based on its slug
const viewsFilePath = join(process.cwd(), "src/data/views.json");

function getViewCount(slug: string): number {
    try {
        const viewsData = JSON.parse(fs.readFileSync(viewsFilePath, 'utf8'));
        return viewsData[slug] || 0; // Return the view count if exists, otherwise 0
    } catch (error) {
        console.error("Error reading views file:", error);
        return 0;  // Return 0 views in case of any error
    }
}


function updateViewCount(slug: string): number {
    const viewsData = JSON.parse(fs.readFileSync(viewsFilePath, 'utf8'));
    if (!viewsData[slug]) {
        viewsData[slug] = 0; // Initialize if not present
    }
    viewsData[slug] += 1; // Increment the view count
    fs.writeFileSync(viewsFilePath, JSON.stringify(viewsData, null, 2)); // Write back to the file
    return viewsData[slug];
}

interface BlogType extends Omit<IBlog, "category" | "tags" | "author"> {
    category: string;
    tags: string[];
    author: IDType;
}

const postsDirectory = join(process.cwd(), "src/data/blogs");

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
    fields: Array<keyof IBlog> | "all" = []
): IBlog {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = JSON.parse(
        JSON.stringify(fs.readFileSync(fullPath, "utf8"))
    ) as BlogType;
    const { data, content } = matter(fileContents);

    const blogData = data as BlogType;
    // Include the view count for the article
    const views = getViewCount(realSlug);


    // Update and get the latest view count for the article
    // Removed duplicate views definition to correct error.


    let blog: IBlog;

    if (fields === "all") {
        blog = {
            ...blogData,
            content,
            category: {
                title: blogData.category,
                slug: slugify(blogData.category),
                path: `/blogs/category/${slugify(blogData.category)}`,
            },
            tags: blogData.tags.map((tag) => ({
                title: tag,
                slug: slugify(tag),
                path: `/blogs/tag/${slugify(tag)}`,
            })),
            slug: realSlug,
            excerpt: makeExcerpt(content, 150),
            author: getAuthorByID(blogData.author, "all"),
        };
    } else {
        blog = fields.reduce((acc: IBlog, field: keyof IBlog) => {
            if (field === "slug") {
                return { ...acc, slug: realSlug };
            }
            if (field === "content") {
                return { ...acc, [field]: content };
            }
            if (field === "excerpt") {
                return { ...acc, excerpt: makeExcerpt(content, 150) };
            }
            if (field === "author") {
                const author = getAuthorByID(blogData.author, "all");
                return { ...acc, author };
            }
            if (field === "category") {
                return {
                    ...acc,
                    category: {
                        title: blogData.category,
                        slug: slugify(blogData.category),
                        path: `/blogs/category/${slugify(blogData.category)}`,
                    },
                };
            }
            if (field === "tags") {
                return {
                    ...acc,
                    tags: blogData.tags.map((tag) => ({
                        title: tag,
                        slug: slugify(tag),
                        path: `/blogs/tag/${slugify(tag)}`,
                    })),
                };
            }
            if (typeof data[field] !== "undefined") {
                return { ...acc, [field]: blogData[field] };
            }
            return acc;
        }, <IBlog>{});
    }

    return {
        ...blog,
        postedAt: dayjs(blogData.postedAt).format("MMM DD, YYYY"),
        path: `/blogs/${realSlug}`,
    };
}

export function getAllBlogs(
    fields: Array<keyof IBlog> | "all" = [],
    skip = 0,
    limit?: number
) {
    const slugs = getSlugs(postsDirectory);
    let blogs = slugs
        .map((slug) => getPostBySlug(slug, fields))
        .sort((post1, post2) =>
            new Date(post1.postedAt).getTime() >
            new Date(post2.postedAt).getTime()
                ? -1
                : 1
        );
    if (limit) blogs = blogs.slice(skip, skip + limit);
    return { blogs, count: slugs.length };
}

export function getPrevNextPost(
    currentSlug: string,
    fields: Array<keyof IBlog> | "all" = []
) {
    const { blogs } = getAllBlogs(fields);
    const currentIndex = blogs.findIndex((post) => post.slug === currentSlug);
    const prevPost = blogs[currentIndex - 1] || null;
    const nextPost = blogs[currentIndex + 1] || null;
    return { prevPost, nextPost };
}

export function getTags() {
    const { blogs } = getAllBlogs(["tags"]);
    const tags = flatDeep<BlogMetaType>(blogs.map((post) => post.tags));
    const result: BlogMetaType[] = [];

    tags.forEach((tag) => {
        if (!result.find((t) => t.title === tag.title)) {
            result.push(tag);
        }
    });

    return result;
}

export function getPostsByCategory(
    category: string,
    fields: Array<keyof IBlog> | "all" = [],
    skip = 0,
    limit?: number
) {
    const postFields =
        fields === "all"
            ? "all"
            : ([...fields, "category"] as Array<keyof IBlog>);
    const { blogs } = getAllBlogs(postFields);
    let result = blogs.filter((post) => post.category.slug === category);
    const totalPosts = result.length;
    if (limit) result = result.slice(skip, skip + limit);
    return { posts: result, count: totalPosts };
}

export function getPostsByTag(
    tag: string,
    fields: Array<keyof IBlog> | "all" = [],
    skip = 0,
    limit?: number
) {
    const postFields =
        fields === "all" ? "all" : ([...fields, "tags"] as Array<keyof IBlog>);
    const { blogs } = getAllBlogs(postFields);
    let result = blogs.filter((post) => post.tags.some((t) => t.slug === tag));
    const totalPosts = result.length;
    if (limit) result = result.slice(skip, skip + limit);
    return { posts: result, count: totalPosts };
}

export function getPostsByAuthor(
    authorID: IDType,
    fields: Array<keyof IBlog> | "all" = [],
    skip = 0,
    limit?: number
) {
    const postFields =
        fields === "all"
            ? "all"
            : ([...fields, "author"] as Array<keyof IBlog>);
    const { blogs } = getAllBlogs(postFields);
    let result = blogs.filter((post) => post.author.id === authorID);
    const totalPosts = result.length;
    if (limit) result = result.slice(skip, skip + limit);
    return { posts: result, count: totalPosts };
}
