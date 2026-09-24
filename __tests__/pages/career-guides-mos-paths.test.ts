import prerender from "@data/career-guides-prerender.json";
import { getCareerGuideDetail } from "@/lib/career-guides";
import { getStaticPaths } from "@/pages/career-guides/[mos]";

// The prerender set and the sitemap tranche both read career-guides-prerender.json.
// A stale slug there would ship a 404 into both; this guards the file.
describe("career-guides/[mos] getStaticPaths", () => {
    it("prerenders exactly the prerender-file slugs and blocks on the rest", async () => {
        const result = await getStaticPaths({});
        expect(result.fallback).toBe("blocking");
        const slugs = result.paths.map((entry) =>
            typeof entry === "string" ? entry : String(entry.params.mos)
        );
        expect(slugs).toEqual(prerender.guides.map((g) => g.slug));
    });

    it("emits only slugs that resolve to a guide", async () => {
        const result = await getStaticPaths({});
        for (const entry of result.paths) {
            const slug = typeof entry === "string" ? entry : String(entry.params.mos);
            expect(getCareerGuideDetail(slug), slug).not.toBeNull();
        }
    });
});
