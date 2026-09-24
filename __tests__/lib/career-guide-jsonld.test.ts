import { buildCareerGuideJsonLd } from "@/lib/career-guide-jsonld";
import { getCareerGuideDetail } from "@/lib/career-guides";

const graphFor = (slug: string) => {
    const detail = getCareerGuideDetail(slug);
    if (!detail) throw new Error(`no guide for ${slug}`);
    const jsonLd = buildCareerGuideJsonLd(detail, slug);
    const node = (type: string) => {
        const matches = jsonLd["@graph"].filter((n) => n["@type"] === type);
        expect(matches, type).toHaveLength(1);
        return matches[0];
    };
    return { detail, jsonLd, node };
};

// One guide per branch. BM_CG has no civilian pathways, so its listing and salary band
// fall back to a placeholder range; it is also absent from mos-to-soc-map.json.
const CASES = [
    {
        slug: "11b",
        branch: "Army",
        weeks: "P22W",
        median: 81500,
        soc: ["11-1021", "33-9032", "13-1061", "33-3051"],
    },
    {
        slug: "hm",
        branch: "Navy",
        weeks: "P19W",
        median: 62000,
        soc: ["31-9092", "29-2042", "29-1141", "29-1071"],
    },
    {
        slug: "3p0x1",
        branch: "Air Force",
        weeks: "P10W",
        median: 75000,
        soc: ["11-9199", "33-3051", "33-9099", "13-1061"],
    },
    {
        slug: "0311",
        branch: "Marine Corps",
        weeks: "P8W",
        median: 81500,
        soc: ["11-1021", "13-1199", "13-1061", "13-1151"],
    },
    { slug: "bm_cg", branch: "Coast Guard", weeks: "P13W", median: undefined, soc: undefined },
];

const BRANCH_PATHS: Record<string, string> = {
    Army: "army",
    Navy: "navy",
    "Air Force": "air-force",
    "Marine Corps": "marine-corps",
    "Coast Guard": "coast-guard",
};

describe("buildCareerGuideJsonLd", () => {
    describe.each(CASES)("$slug ($branch)", ({ slug, branch, weeks, median, soc }) => {
        const { detail, jsonLd, node } = graphFor(slug);
        const url = `https://vetswhocode.io/career-guides/${slug}`;

        it("replaces the nested WebSite with a WebPage and a BreadcrumbList", () => {
            expect(jsonLd["@context"]).toBe("https://schema.org");
            expect(JSON.stringify(jsonLd)).not.toContain('"WebSite"');
            expect(node("WebPage")).toMatchObject({
                "@id": url,
                url,
                breadcrumb: { "@id": `${url}#breadcrumb` },
                mainEntity: { "@id": `${url}#occupation` },
            });
        });

        it("walks Home, Career Guides, the branch facet, then the guide", () => {
            expect(node("BreadcrumbList").itemListElement).toEqual([
                { "@type": "ListItem", position: 1, name: "Home", item: "https://vetswhocode.io" },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Career Guides",
                    item: "https://vetswhocode.io/career-guides",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: branch,
                    item: `https://vetswhocode.io/career-guides/branch/${BRANCH_PATHS[branch]}`,
                },
                { "@type": "ListItem", position: 4, name: detail.code, item: url },
            ]);
        });

        it("describes the specialty as an Occupation in the United States", () => {
            const occupation = node("Occupation");
            expect(occupation.name).toBe(detail.training.title);
            expect(occupation.description).toEqual(expect.any(String));
            expect(occupation.occupationLocation).toEqual({
                "@type": "Country",
                name: "United States",
            });
            expect(occupation.skills).toEqual(detail.training.topics);
        });

        it("publishes a salary only as the median of real matched pathways", () => {
            const occupation = node("Occupation");
            if (median === undefined) {
                expect(detail.pathways).toHaveLength(0);
                expect(occupation).not.toHaveProperty("estimatedSalary");
                expect(JSON.stringify(jsonLd)).not.toContain("estimatedSalary");
                expect(JSON.stringify(jsonLd)).not.toContain("MonetaryAmount");
            } else {
                expect(occupation.estimatedSalary).toEqual({
                    "@type": "MonetaryAmountDistribution",
                    currency: "USD",
                    duration: "P1Y",
                    median,
                });
            }
        });

        it("carries SOC codes only when mos-to-soc-map.json has the code", () => {
            const occupation = node("Occupation");
            if (soc === undefined) {
                expect(occupation).not.toHaveProperty("occupationalCategory");
            } else {
                expect(occupation.occupationalCategory).toEqual(soc);
            }
        });

        it("expresses the training pipeline as a program with an ISO 8601 duration", () => {
            const program = node("EducationalOccupationalProgram");
            expect(program.name).toBe(detail.training.program);
            expect(program.provider).toEqual({
                "@type": "Organization",
                name: `United States ${branch}`,
            });
            expect(program.timeToComplete).toBe(weeks);
            expect(program.timeToComplete).toMatch(/^P\d+W$/);
        });
    });

    it("lists each SOC code once when the map repeats one", () => {
        // 42A maps two civilian roles to 13-1071.
        const { node } = graphFor("42a");
        expect(node("Occupation").occupationalCategory).toEqual(["13-1071", "11-3121", "43-3051"]);
    });

    it("builds the url from the page's own slug, not the bare code", () => {
        const { jsonLd, node } = graphFor("marine_corps:6333");
        const url = "https://vetswhocode.io/career-guides/marine_corps:6333";
        expect(node("WebPage").url).toBe(url);
        expect(JSON.stringify(jsonLd)).not.toContain('/career-guides/6333"');
        expect(node("BreadcrumbList").itemListElement).toContainEqual({
            "@type": "ListItem",
            position: 3,
            name: "Marine Corps",
            item: "https://vetswhocode.io/career-guides/branch/marine-corps",
        });
    });
});
