/**
 * Generate the curriculum gap report.
 *
 * Reads tech-pathways-map.json (output of generate-tech-pathways.ts) and
 * produces a frequency analysis: which tech roles show up most often as
 * natural fits across all MOS codes? The output is a strategic input for
 * the program team — concrete data on which tech tracks would have the
 * most veteran demand if VWC built curriculum for them.
 *
 * Output: docs/curriculum-gap-report.md
 *
 * Run: npm run generate:curriculum-gap-report
 */

import "node:fs";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PATHWAYS_PATH = path.join(ROOT, "src/data/tech-pathways-map.json");
const TAXONOMY_PATH = path.join(ROOT, "src/data/tech-roles-taxonomy.json");
const TRAINING_PATH = path.join(ROOT, "src/data/training-pipeline.json");
const REPORT_PATH = path.join(ROOT, "docs/curriculum-gap-report.md");

interface PathwayBundle {
    techRoles: Array<{ roleKey: string; matchLevel: "high" | "good" | "moderate" }>;
    skillsToLearn: Array<{ skill: string; forRole: string }>;
}

interface RoleSeed {
    key: string;
    title: string;
    track: string;
    socCode: string;
}

function loadJson<T>(p: string): T {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
}

function main() {
    if (!fs.existsSync(PATHWAYS_PATH)) {
        console.error(`No pathways file at ${PATHWAYS_PATH}.`);
        console.error("Run 'npm run generate:tech-pathways' first.");
        process.exit(1);
    }

    const pathways = loadJson<Record<string, PathwayBundle>>(PATHWAYS_PATH);
    const taxonomy = loadJson<{ roles: RoleSeed[] }>(TAXONOMY_PATH);
    const training = loadJson<Record<string, { branch: string; title: string }>>(TRAINING_PATH);

    const roleByKey = new Map(taxonomy.roles.map((r) => [r.key, r]));

    // Score each role by frequency of recommendation, weighted by match level.
    const matchWeight = { high: 3, good: 2, moderate: 1 } as const;

    const roleStats = new Map<
        string,
        { highMatch: number; goodMatch: number; moderateMatch: number; weightedScore: number; byBranch: Map<string, number> }
    >();
    const skillFrequency = new Map<string, number>();

    let totalCodes = 0;
    for (const [code, bundle] of Object.entries(pathways)) {
        totalCodes++;
        const branch = training[code]?.branch || "Unknown";

        for (const role of bundle.techRoles) {
            if (!roleStats.has(role.roleKey)) {
                roleStats.set(role.roleKey, {
                    highMatch: 0,
                    goodMatch: 0,
                    moderateMatch: 0,
                    weightedScore: 0,
                    byBranch: new Map(),
                });
            }
            const s = roleStats.get(role.roleKey)!;
            if (role.matchLevel === "high") s.highMatch++;
            else if (role.matchLevel === "good") s.goodMatch++;
            else s.moderateMatch++;
            s.weightedScore += matchWeight[role.matchLevel];
            s.byBranch.set(branch, (s.byBranch.get(branch) || 0) + 1);
        }

        for (const sk of bundle.skillsToLearn || []) {
            skillFrequency.set(sk.skill, (skillFrequency.get(sk.skill) || 0) + 1);
        }
    }

    // Sort by weighted score
    const ranked = [...roleStats.entries()]
        .map(([key, stats]) => ({
            key,
            title: roleByKey.get(key)?.title || key,
            track: roleByKey.get(key)?.track || "Unknown",
            socCode: roleByKey.get(key)?.socCode || "",
            ...stats,
            totalRecs: stats.highMatch + stats.goodMatch + stats.moderateMatch,
        }))
        .sort((a, b) => b.weightedScore - a.weightedScore);

    // Top skills by demand
    const topSkills = [...skillFrequency.entries()]
        .sort(([, a], [, b]) => b - a)
        .slice(0, 30);

    // Build markdown
    const generatedAt = new Date().toISOString();
    const lines: string[] = [];
    lines.push("# Curriculum Gap Report");
    lines.push("");
    lines.push(`Generated ${generatedAt} from \`tech-pathways-map.json\`.`);
    lines.push("");
    lines.push(`Analyzed **${totalCodes}** MOS codes across all branches. Roles below are ranked by weighted recommendation score: each "high match" counts 3, "good" 2, "moderate" 1.`);
    lines.push("");
    lines.push("## Top tech roles by veteran fit demand");
    lines.push("");
    lines.push("| Rank | Role | Track | SOC | High | Good | Moderate | Total | Score |");
    lines.push("|---:|---|---|---|---:|---:|---:|---:|---:|");
    ranked.forEach((r, idx) => {
        lines.push(
            `| ${idx + 1} | ${r.title} | ${r.track} | ${r.socCode} | ${r.highMatch} | ${r.goodMatch} | ${r.moderateMatch} | ${r.totalRecs} | ${r.weightedScore} |`
        );
    });
    lines.push("");
    lines.push("## Top recommended skills (curriculum signal)");
    lines.push("");
    lines.push("Skills that show up most often in `skillsToLearn` — concrete signals about what curriculum content would serve the most veterans.");
    lines.push("");
    lines.push("| Skill | Frequency |");
    lines.push("|---|---:|");
    for (const [skill, freq] of topSkills) {
        lines.push(`| ${skill} | ${freq} |`);
    }
    lines.push("");
    lines.push("## How to read this");
    lines.push("");
    lines.push("- A role with high **weighted score** but few **high matches** means it's broadly applicable but not a deep fit for any single MOS — useful as a back-pocket option, not a flagship.");
    lines.push("- A role with concentrated **high matches** in one branch is a niche — possibly worth a branch-specific path.");
    lines.push("- The **skill frequency** list is the curriculum demand signal: skills appearing 1000+ times across MOSes are universal pre-reqs; rare skills are specialty paths.");
    lines.push("");

    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, lines.join("\n"));

    console.log(`Wrote ${REPORT_PATH}`);
    console.log(`Roles ranked: ${ranked.length}`);
    console.log(`Skills tracked: ${skillFrequency.size}`);
}

main();
