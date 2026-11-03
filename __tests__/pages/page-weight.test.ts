import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import * as blogIndex from "@/pages/blogs/blog";
import { getStaticProps as curriculumProps } from "@/pages/curriculum";

const rewriteTarget = (query: string) =>
    middleware(new NextRequest(`https://vetswhocode.io/blogs/blog${query}`)).headers.get(
        "x-middleware-rewrite"
    );

describe("/blogs/blog", () => {
    it("is statically generated as page 1", async () => {
        expect("getServerSideProps" in blogIndex).toBe(false);
        const result = (await blogIndex.getStaticProps({})) as {
            props: { data: { blogs: unknown[]; currentPage: number; numberOfPages: number } };
        };
        expect(result.props.data.currentPage).toBe(1);
        expect(result.props.data.blogs.length).toBeGreaterThan(0);
        expect(result.props.data.blogs.length).toBeLessThanOrEqual(9);
    });

    it("rewrites ?page=N (N >= 2) onto the static page route", () => {
        for (const page of ["2", "9", "10", "38"]) {
            expect(rewriteTarget(`?page=${page}`)).toBe(
                `https://vetswhocode.io/blogs/blog/page/${page}`
            );
        }
    });

    it("leaves page 1, missing and non-numeric pages on the index", () => {
        for (const query of ["", "?page=1", "?page=0", "?page=01", "?page=abc", "?page="]) {
            expect(rewriteTarget(query)).toBeNull();
        }
    });
});

describe("/curriculum", () => {
    it("passes the sample record as a prop instead of bundling every topic", async () => {
        const result = (await curriculumProps({})) as { props: { sample: { id: string } } };
        expect(result.props.sample.id).toBe("ret-faithful");
    });
});
