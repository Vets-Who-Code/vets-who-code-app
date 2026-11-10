import techPathways from "@data/tech-pathways-map.json";
import taxonomy from "@data/tech-roles-taxonomy.json";
import { readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { buildMosToSocMap, type SocMap, serialize } from "../../scripts/generate-mos-to-soc";

const read = (p: string) => readFileSync(path.join(process.cwd(), p), "utf8");
const curated: SocMap = JSON.parse(read("scripts/lib/mos-to-soc-curated.json"));
const committed = read("src/data/mos-to-soc-map.json");
const built = buildMosToSocMap(curated, techPathways, taxonomy);

describe("generate-mos-to-soc", () => {
    it("matches the committed mos-to-soc-map.json byte for byte", () => {
        expect(serialize(built)).toBe(committed);
    });

    it("keeps the 15 hand-curated entries unchanged", () => {
        expect(Object.keys(curated)).toHaveLength(15);
        for (const [code, entries] of Object.entries(curated)) {
            expect(built[code], code).toEqual(entries);
        }
    });

    it("lets curated entries win over derived ones", () => {
        expect(techPathways).toHaveProperty("11B");
        expect(built["11B"]).toEqual(curated["11B"]);
    });

    it("uses only well-formed SOC codes", () => {
        for (const [code, entries] of Object.entries(built)) {
            expect(entries.length, code).toBeGreaterThan(0);
            for (const { soc } of entries) expect(soc, code).toMatch(/^\d{2}-\d{4}(\.\d{2})?$/);
        }
    });

    it("derives a non-curated MOS from the taxonomy join", () => {
        expect(curated).not.toHaveProperty("25U");
        expect(built["25U"]).toEqual([
            { soc: "15-1232", role: "IT Support Specialist (Help Desk)" },
            { soc: "15-1241", role: "Network Engineer" },
            { soc: "15-1212", role: "Security Engineer" },
            { soc: "15-1244", role: "Systems Administrator" },
        ]);
    });

    it("fails loudly on a roleKey the taxonomy does not know", () => {
        expect(() =>
            buildMosToSocMap({}, { X1: { techRoles: [{ roleKey: "nope" }] } }, taxonomy)
        ).toThrow(/nope/);
    });
});
