/**
 * Build src/data/mos-to-soc-map.json without calling any model.
 *
 * Every derived SOC code comes from a join of data already in the repo:
 * tech-pathways-map.json (MOS -> techRoles[].roleKey) and
 * tech-roles-taxonomy.json (roleKey -> socCode). The hand-curated entries in
 * scripts/lib/mos-to-soc-curated.json win over derived ones.
 */
import fs from "fs";
import path from "path";

export type SocEntry = { soc: string; role: string };
export type SocMap = Record<string, SocEntry[]>;

type TechPathways = Record<string, { techRoles?: Array<{ roleKey: string }> }>;
type Taxonomy = { roles: Array<{ key: string; title: string; socCode: string }> };

export function buildMosToSocMap(
    curated: SocMap,
    techPathways: TechPathways,
    taxonomy: Taxonomy
): SocMap {
    const roles = new Map(taxonomy.roles.map((r) => [r.key, r]));
    const map: SocMap = { ...curated };
    for (const [code, entry] of Object.entries(techPathways)) {
        if (code in curated) continue;
        const socs = (entry.techRoles ?? []).map(({ roleKey }) => {
            const role = roles.get(roleKey);
            if (!role) throw new Error(`${code}: roleKey "${roleKey}" is not in the taxonomy`);
            return { soc: role.socCode, role: role.title };
        });
        if (socs.length > 0) map[code] = socs;
    }
    return map;
}

// Matches the hand-written layout of the original file: one SOC entry per line.
export function serialize(map: SocMap): string {
    const blocks = Object.entries(map).map(([code, entries]) => {
        const lines = entries.map(
            (e) => `    { "soc": ${JSON.stringify(e.soc)}, "role": ${JSON.stringify(e.role)} }`
        );
        return `  ${JSON.stringify(code)}: [\n${lines.join(",\n")}\n  ]`;
    });
    return `{\n${blocks.join(",\n")}\n}\n`;
}

function main() {
    const read = (p: string) => JSON.parse(fs.readFileSync(path.join(process.cwd(), p), "utf8"));
    const map = buildMosToSocMap(
        read("scripts/lib/mos-to-soc-curated.json"),
        read("src/data/tech-pathways-map.json"),
        read("src/data/tech-roles-taxonomy.json")
    );
    const out = path.join(process.cwd(), "src/data/mos-to-soc-map.json");
    fs.writeFileSync(out, serialize(map));
    console.log(`Wrote ${Object.keys(map).length} MOS codes to ${out}`);
}

if (require.main === module) main();
