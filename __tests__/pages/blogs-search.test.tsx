import { render, screen } from "@testing-library/react";
import type { IBlog } from "@utils/types";
import BlogSearch, { getStaticProps } from "@/pages/blogs/search";

const { router } = vi.hoisted(() => ({
    router: { query: {} as { s?: string }, pathname: "/blogs/search", push: vi.fn() },
}));

vi.mock("next/router", () => ({ useRouter: () => router }));

vi.mock("@components/seo/page-seo", () => ({
    default: () => null,
}));

const meta = (title: string, kind: "category" | "tag") => ({
    title,
    slug: title.toLowerCase(),
    path: `/blogs/${kind}/${title.toLowerCase()}`,
});

const post = (title: string, category: string, tags: string[], excerpt: string) =>
    ({
        title,
        path: `/blogs/${title.toLowerCase().replace(/\s+/g, "-")}`,
        postedAt: "Jan 1, 2026",
        image: { src: "" },
        category: meta(category, "category"),
        tags: tags.map((t) => meta(t, "tag")),
        excerpt,
    }) as IBlog;

const blogs = [
    post("Shipping Audio", "Technology", ["Cloudinary", "Accessibility"], "Audio overviews."),
    post("Veterans Day Update", "Community", ["Veterans"], "What we built this year."),
];

const results = (s: string) => {
    router.query = { s };
    render(<BlogSearch data={{ blogs }} />);
    return screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);
};

describe("/blogs/search", () => {
    it("ships no post bodies in its page data", async () => {
        const result = await getStaticProps({});
        const { data } = (result as { props: { data: { blogs: IBlog[] } } }).props;

        expect(data.blogs.length).toBeGreaterThan(0);
        for (const blog of data.blogs) {
            expect(blog).not.toHaveProperty("content");
            expect(typeof blog.excerpt).toBe("string");
            expect(Array.isArray(blog.tags)).toBe(true);
        }
    });

    it("matches a tag", () => {
        expect(results("cloudinary")).toEqual(["Shipping Audio"]);
    });

    it("matches a category regardless of case", () => {
        expect(results("COMMUNITY")).toEqual(["Veterans Day Update"]);
    });

    it("matches the excerpt", () => {
        expect(results("built this")).toEqual(["Veterans Day Update"]);
    });

    it("matches the title", () => {
        expect(results("shipping")).toEqual(["Shipping Audio"]);
    });
});
