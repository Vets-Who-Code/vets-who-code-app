import { buildGuideMeta } from "@containers/career-guide-detail/derive";
import type { CareerGuideDetail } from "@containers/career-guide-detail/types";
import prerender from "@data/career-guides-prerender.json";
import { getCareerGuideData, getCareerGuideDetail, loadCareerGuides } from "@/lib/career-guides";

const detailFor = (slug: string): CareerGuideDetail => {
    const detail = getCareerGuideDetail(slug);
    if (!detail) throw new Error(`no guide for ${slug}`);
    return detail;
};

describe("career-guides", () => {
    describe("loadCareerGuides", () => {
        const guides = loadCareerGuides();

        it("yields two distinct 6333 entries, one per branch", () => {
            const entries = guides.filter((g) => g.code === "6333");
            expect(entries).toHaveLength(2);

            const navy = entries.find((g) => g.branch === "Navy");
            expect(navy?.title).toBe("Aviation Maintenance Officer");
            expect(navy?.slug).toBe("6333");
            expect(navy?.rank).toBe("Officer");

            const marine = entries.find((g) => g.branch === "Marine Corps");
            expect(marine?.title).toBe("Aviation Electronics Technician");
            expect(marine?.slug).toBe("marine_corps:6333");
            expect(marine?.rank).toBe("Enlisted");
        });

        it("resolves branch-prefixed pathway data before the bare code", () => {
            const navy = guides.find((g) => g.code === "6333" && g.branch === "Navy");
            const marine = guides.find((g) => g.code === "6333" && g.branch === "Marine Corps");

            // Navy officer entry keeps the management-flavored bare "6333" pathways
            expect(navy?.civilian).toBe("Aircraft Maintenance Manager");
            // Marine technician entry resolves its own "marine_corps:6333" pathways
            expect(marine?.civilian).toBe("Avionics Technician");
        });

        it("gives every guide a unique slug", () => {
            const slugs = guides.map((g) => g.slug);
            expect(new Set(slugs).size).toBe(slugs.length);
        });
    });

    describe("getCareerGuideData", () => {
        it("parses the data files once and hands back the same bundle", () => {
            expect(getCareerGuideData()).toBe(getCareerGuideData());
        });
    });

    describe("getCareerGuideDetail", () => {
        it("resolves a branch-prefixed slug to its own branch, showing the bare code", () => {
            const marine = getCareerGuideDetail("marine_corps:6333");
            expect(marine?.code).toBe("6333");
            expect(marine?.branch).toBe("Marine Corps");
            expect(marine?.training.title).toBe("Aviation Electronics Technician");

            expect(getCareerGuideDetail("6333")?.branch).toBe("Navy");
        });

        it("matches slugs case-insensitively", () => {
            expect(getCareerGuideDetail("1B1S4")?.code).toBe("1B1S4");
            expect(getCareerGuideDetail("1b1s4")?.code).toBe("1B1S4");
        });

        it("returns null for an unknown slug", () => {
            expect(getCareerGuideDetail("does-not-exist")).toBeNull();
        });

        // /career-guides/01g (Army chemical engineer) drew 15k impressions for
        // "software testing strategies" from a generated QA pathway. Issue #1328.
        it("keeps software-testing pathways off the 01G chemical engineer guide", () => {
            const detail = detailFor("01G");
            const roleKeys = detail.techPathway?.roles.map((r) => r.roleKey) ?? [];
            expect(roleKeys).not.toContain("qa_test_automation_engineer");
            expect(JSON.stringify(detail)).not.toMatch(
                /software testing|test automation|testing protocols/i
            );
        });
    });

    describe("career-guides-prerender.json", () => {
        it("lists unique, lowercase slugs in the training-pipeline key space", () => {
            const slugs = prerender.guides.map((g) => g.slug);
            expect(new Set(slugs).size).toBe(slugs.length);
            for (const slug of slugs) {
                expect(slug).toBe(slug.toLowerCase());
                expect(getCareerGuideData().keyBySlug.has(slug), slug).toBe(true);
            }
        });
    });

    // Walks the LIVE training-pipeline.json, so a regenerated data file is what gets
    // checked; a fixture list would pass vacuously after regeneration.
    describe("buildGuideMeta", () => {
        const keys = Object.keys(getCareerGuideData().training);
        const metas = keys.map((key) => {
            const detail = detailFor(key);
            return { key, detail, ...buildGuideMeta(detail) };
        });
        // The code is unique by construction, so uniqueness of the raw strings proves
        // nothing; the distinctiveness checks compare text with the code removed.
        const withoutCode = (text: string, code: string) => text.split(code).join("");

        it("emits a distinct title and description for every guide", () => {
            expect(keys.length).toBeGreaterThan(4000);
            expect(new Set(metas.map((m) => m.title)).size).toBe(metas.length);
            expect(new Set(metas.map((m) => m.description)).size).toBe(metas.length);
        });

        it("leads with the code and job title, then names the branch", () => {
            for (const { detail, title } of metas) {
                expect(title.startsWith(`${detail.code} ${detail.training.title}`)).toBe(true);
                expect(withoutCode(title, detail.code)).toContain(detail.branch);
            }
        });

        it("differentiates the most-shared titles beyond the code", () => {
            const byTitle = new Map<string, typeof metas>();
            for (const m of metas) {
                const siblings = byTitle.get(m.detail.training.title) ?? [];
                siblings.push(m);
                byTitle.set(m.detail.training.title, siblings);
            }
            const clusters = [...byTitle.values()].filter((s) => s.length >= 30);
            // If this fails the loop below is vacuous and proves nothing.
            expect(clusters.length).toBeGreaterThan(0);
            for (const siblings of clusters) {
                const stripped = siblings.map((m) => withoutCode(m.description, m.detail.code));
                expect(new Set(stripped).size).toBeGreaterThan(1);
            }
        });

        it("tells Client Systems Technician siblings apart by pipeline and outcome", () => {
            const a = buildGuideMeta(detailFor("2E7X1"));
            const b = buildGuideMeta(detailFor("2E7X2"));
            expect(withoutCode(a.description, "2E7X1")).not.toBe(
                withoutCode(b.description, "2E7X2")
            );
            expect(a.description).toContain("16 weeks");
            expect(b.description).toContain("14 weeks");
        });
    });
});
