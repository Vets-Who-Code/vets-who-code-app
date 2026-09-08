import fs from "fs";
import path from "path";
import { getStaticPaths } from "@/pages/programs/[slug]";

// A program with its own page file shadows the [slug] route at runtime, but
// getStaticPaths would still emit the same path and fail `next build` with
// "conflicting-ssg-paths". This guards that filter.
describe("programs/[slug] getStaticPaths", () => {
    const dedicated = fs
        .readdirSync(path.join(process.cwd(), "src/pages/programs"))
        .filter((file) => file.endsWith(".tsx") && !file.startsWith("["))
        .map((file) => file.replace(/\.tsx$/, ""));

    it("emits no path that a dedicated page file already owns", async () => {
        const result = await getStaticPaths({});
        const slugs = result.paths.map((entry) =>
            typeof entry === "string" ? entry : String(entry.params.slug)
        );
        for (const owned of dedicated) {
            expect(slugs).not.toContain(owned);
        }
    });

    it("still has dedicated pages to guard against", () => {
        // If this fails the filter above is vacuous and proves nothing.
        expect(dedicated).toContain("mentorship");
    });
});
