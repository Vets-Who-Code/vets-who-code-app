import { getAllBlogs, getStoriesByJobCode } from "@/lib/blog";
import { getCareerGuideData } from "@/lib/career-guides";

describe("getStoriesByJobCode", () => {
    it("joins a career-guide slug to the story keyed with that code", () => {
        const stories = getStoriesByJobCode("yn_cg");
        expect(stories.map((s) => s.slug)).toEqual(["cameron-porter-testimonial"]);
        expect(getStoriesByJobCode("YN_CG")).toEqual(stories);
    });

    it("returns only the card fields", () => {
        const [story] = getStoriesByJobCode("yn_cg");
        expect(Object.keys(story).sort()).toEqual(["excerpt", "image", "slug", "title"]);
        expect(story.title).toMatch(/Coast Guard Yeoman/);
        expect(story.image.src).toMatch(/^https:\/\//);
    });

    it("returns nothing for a code no story names", () => {
        expect(getStoriesByJobCode("yn_navy")).toEqual([]);
        expect(getStoriesByJobCode("11b")).toEqual([]);
    });

    it("only uses codes that exist as career-guide keys", () => {
        const { training } = getCareerGuideData();
        const codes = getAllBlogs(["jobCodes"]).blogs.flatMap((b) => b.jobCodes ?? []);
        expect(codes.length).toBeGreaterThan(0);
        for (const code of codes) expect(Object.hasOwn(training, code)).toBe(true);
    });
});
