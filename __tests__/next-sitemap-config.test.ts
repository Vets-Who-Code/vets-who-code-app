import training from "@data/training-pipeline.json";
import { getCareerGuideDetail } from "@/lib/career-guides";
import sitemapConfig from "../next-sitemap.config.js";

// The sitemap lists every career guide, not only the prerendered ones (#1277).
describe("next-sitemap additionalPaths", () => {
    it("emits one resolvable /career-guides URL per guide", async () => {
        const entries = await sitemapConfig.additionalPaths(sitemapConfig);
        const locs = entries.map((e: { loc: string }) => e.loc);

        expect(locs).toHaveLength(Object.keys(training).length);
        expect(new Set(locs).size).toBe(locs.length);
        for (const loc of locs) {
            expect(loc.startsWith("/career-guides/")).toBe(true);
            expect(getCareerGuideDetail(loc.slice("/career-guides/".length)), loc).not.toBeNull();
        }
    });
});
