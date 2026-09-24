import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import homepage from "@data/homepages/index.json";
import faq from "@data/innerpages/faq.json";
import {
    formatAsOf,
    OUTCOME_FUNFACTS,
    outcomes,
    outcomesSummary,
    placementMethodology,
} from "@data/outcomes";
import teamMembers from "@data/team-members.json";

const { placementRate, alumniEarnings, troopsTrained, validatedSkills } = outcomes;

describe("outcomes module", () => {
    it("gives every stat a display string that carries its value", () => {
        for (const stat of Object.values(outcomes)) {
            expect(stat.display).toContain(String(stat.value));
            expect(stat.label).not.toBe("");
            expect(stat.qualifier).not.toBe("");
            if (stat.asOf) expect(stat.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
    });

    it("prints no methodology line until the window and denominator are confirmed", () => {
        expect(placementMethodology()).toBeNull();
        expect(placementMethodology({ ...placementRate, windowMonths: 6 })).toBeNull();
        expect(placementMethodology({ ...placementRate, windowMonths: 6, denominator: 1234 })).toBe(
            `${placementRate.display} of graduates employed in a software role within 6 months, tracked across 1,234 alumni since 2014.`
        );
    });

    it("formats an as-of date without rolling the month back", () => {
        expect(formatAsOf("2025-12-18")).toBe("Dec 2025");
        expect(formatAsOf("2026-01-01")).toBe("Jan 2026");
    });

    it("carries the three headline numbers in the homepage summary", () => {
        for (const stat of [placementRate, alumniEarnings, troopsTrained]) {
            expect(outcomesSummary).toContain(stat.display);
        }
        expect(outcomesSummary.length).toBeLessThanOrEqual(160);
    });
});

describe("prose that must stay in step with the module", () => {
    const founder = teamMembers.find((member) => member.slug === "jerome-hardaway");
    const faqArea = faq.content.find((section) => section.section === "faq-area") as unknown as {
        items: { id: number; texts: { content: string }[] }[];
    };
    const faqText = (id: number) =>
        faqArea.items
            .find((item) => item.id === id)
            ?.texts.map((text) => text.content)
            .join(" ") ?? "";

    it("homepage service copy", () => {
        const serviceArea = homepage.content.find((section) => section.section === "service-area");
        expect(JSON.stringify(serviceArea)).toContain(validatedSkills.display);
    });

    it("founder bio", () => {
        expect(founder?.bio).toContain(troopsTrained.display);
        expect(founder?.bio).toContain(alumniEarnings.display);
    });

    it("FAQ answers", () => {
        expect(faqText(12)).toContain(validatedSkills.display);
        expect(faqText(18)).toContain(placementRate.display);
    });

    it("llms.txt and llms-full.txt", () => {
        for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
            const content = readFileSync(join(process.cwd(), file), "utf8");
            for (const stat of OUTCOME_FUNFACTS) {
                expect(content, file).toContain(stat.display);
            }
        }
    });
});

describe("no stray outcome claims", () => {
    const ROOTS = ["src/pages", "src/containers", "src/components", "src/data"];
    // Admin/API code carries unrelated percentages; blogs and media are dated
    // editorial and third-party text left as written.
    const SKIP = [
        "src/pages/admin",
        "src/pages/api",
        "src/components/admin-dashboard-components.tsx",
        "src/data/outcomes.ts",
        "src/data/blogs",
        "src/data/media",
    ];
    // 2030 targets, stated as targets.
    const TARGETS: Record<string, string[]> = {
        "src/containers/about/story.tsx": ["500+", "$50M+"],
    };

    const files: string[] = [];
    const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
            const path = join(dir, name);
            if (SKIP.some((skip) => path === skip || path.startsWith(`${skip}/`))) continue;
            if (statSync(path).isDirectory()) walk(path);
            else if (/\.(tsx?|json|mdx?)$/.test(name)) files.push(path);
        }
    };
    for (const root of ROOTS) walk(root);

    const near = (source: string, index: number, words: RegExp) =>
        words.test(source.slice(Math.max(0, index - 40), index + 40));

    const claims = (source: string, pattern: RegExp, words: RegExp) => {
        const found: string[] = [];
        let match = pattern.exec(source);
        while (match) {
            if (near(source, match.index, words)) found.push(match[0]);
            match = pattern.exec(source);
        }
        return found;
    };

    it.each(files)("%s", (file) => {
        const source = readFileSync(file, "utf8");
        const allowed = TARGETS[file] ?? [];

        for (const claim of claims(source, /\b\d{2,3}%/g, /placement|success rate/i)) {
            expect(claim, file).toBe(placementRate.display);
        }
        for (const claim of claims(
            source,
            /\$\d+(?:\.\d+)?\s?(?:M\+?|million)/gi,
            /alumni|earning|graduate|economic impact/i
        )) {
            if (allowed.includes(claim)) continue;
            expect(claim, file).toBe(alumniEarnings.display);
        }
        for (const claim of claims(
            source,
            /\b\d{3}\+/g,
            /veteran|troop|graduate|alumni|trained/i
        )) {
            if (allowed.includes(claim)) continue;
            expect(claim, file).toBe(troopsTrained.display);
        }
        expect(
            claims(source, /\b(?:over|more than) \d{3}\b/gi, /veteran|troop|graduate|alumni/i),
            file
        ).toEqual([]);
        expect(source, file).not.toContain("4.9/5");
    });
});
