import { loadCareerGuides } from "@/lib/career-guides";

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

        it("includes AFSC 1D7X1K Knowledge Operations Management", () => {
            const guide = guides.find((g) => g.code === "1D7X1K");

            expect(guide).toBeDefined();
            expect(guide?.title).toBe("Knowledge Operations Management");
            expect(guide?.branch).toBe("Air Force");
            expect(guide?.rank).toBe("Enlisted");
            expect(guide?.civilian).toBe("Knowledge Manager");
            expect(guide?.salaryLow).toBeGreaterThan(0);
            expect(guide?.salaryHigh).toBeGreaterThanOrEqual(guide?.salaryLow ?? 0);
        });
    });
});
