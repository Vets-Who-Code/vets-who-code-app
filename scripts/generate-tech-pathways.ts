/**
 * Generate tech-aligned career pathways for every military job code.
 *
 * Inputs (per MOS):
 *  - src/data/training-pipeline.json     — branch, title, training topics
 *  - src/data/cognitive-skills-map.json  — cognitive transfer skills + non-obvious careers
 *  - src/data/military-systems-map.json  — military systems / civilian equivalents
 *  - src/data/job-codes-descriptions.json — official MOS description text
 *
 * Taxonomy:
 *  - src/data/tech-roles-taxonomy.json   — BLS SOC-anchored tech roles
 *  - Enriched at run time with Lightcast salary + demand when Lightcast is configured
 *
 * Output:
 *  - src/data/tech-pathways-map.json — { [mosCode]: TechPathwayBundle }
 *
 * Resumability: the script merges with any existing output, so a partial run
 * picks up where the previous one left off. To force re-generation of a code,
 * delete its key from the output file before running.
 *
 * Run: npm run generate:tech-pathways
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { fetchLaborMarketData } from "../src/lib/labor-market";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src/data");
const TAXONOMY_PATH = path.join(DATA_DIR, "tech-roles-taxonomy.json");
const OUTPUT_PATH = path.join(DATA_DIR, "tech-pathways-map.json");

// ----- Types -----

interface TaxonomyRoleSeed {
    key: string;
    title: string;
    track: string;
    socCode: string;
    description: string;
    stack: string[];
}

interface EnrichedRole extends TaxonomyRoleSeed {
    salaryRange: { min: number; max: number };
    demand: string;
    dataSource: string;
}

interface MosContext {
    code: string;
    branch: string;
    title: string;
    description: string;
    trainingTopics: string[];
    cognitiveSkills: Array<{ skill: string; civilianTranslation: string }>;
    civilianSystems: Array<{ military: string; civilian: string }>;
}

// ----- Output schema (Gemini structured output) -----

// Generous upper bounds — Gemini sometimes produces more legitimate items
// than a tight cap allows, and getting the data is more valuable than
// strict shape control. The render layer can truncate visually if needed.
const TechPathwaySchema = z.object({
    techRoles: z
        .array(
            z.object({
                roleKey: z.string(),
                matchLevel: z.enum(["high", "good", "moderate"]),
                whyItFits: z.string(),
            })
        )
        .min(1)
        .max(8),
    skillsYouHave: z
        .array(z.object({ from: z.string(), to: z.string() }))
        .min(1)
        .max(20),
    skillsToLearn: z
        .array(z.object({ skill: z.string(), forRole: z.string() }))
        .min(1)
        .max(20),
});

type TechPathwayBundle = z.infer<typeof TechPathwaySchema> & {
    generatedAt: string;
};

// ----- Helpers -----

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripBranchPrefix(key: string): string {
    const colonIdx = key.indexOf(":");
    return colonIdx === -1 ? key : key.slice(colonIdx + 1);
}

function loadJson<T>(p: string): T {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
}

function writeJson(p: string, data: unknown): void {
    fs.writeFileSync(p, JSON.stringify(data, null, 4));
}

async function loadEnrichedTaxonomy(): Promise<EnrichedRole[]> {
    const taxonomy = loadJson<{ roles: TaxonomyRoleSeed[] }>(TAXONOMY_PATH);
    const enriched: EnrichedRole[] = [];

    console.log(`Enriching ${taxonomy.roles.length} taxonomy roles with Lightcast salary data...`);

    for (const role of taxonomy.roles) {
        try {
            const labor = await fetchLaborMarketData(role.socCode, 100000, "Growing demand");
            enriched.push({
                ...role,
                salaryRange: labor.salaryRange
                    ? { min: labor.salaryRange.p25, max: labor.salaryRange.p75 }
                    : { min: Math.round(labor.avgSalary * 0.8), max: Math.round(labor.avgSalary * 1.2) },
                demand: labor.demand,
                dataSource: labor.dataSource,
            });
        } catch (err) {
            console.warn(`  Lightcast lookup failed for ${role.title} (${role.socCode}); using curated fallback.`);
            enriched.push({
                ...role,
                salaryRange: { min: 80000, max: 140000 },
                demand: "Growing demand",
                dataSource: "curated",
            });
        }
    }

    const lightcastCount = enriched.filter((r) => r.dataSource === "lightcast").length;
    console.log(`  ${lightcastCount}/${enriched.length} roles enriched with live Lightcast data.`);
    return enriched;
}

// ----- Per-MOS generation -----

const SYSTEM_INSTRUCTION = `You are a career counselor for Vets Who Code, a software engineering accelerator. Help veterans see realistic tech industry roles they can aim for given their military background.

Style guidance (prefer, do not strictly forbid):
- Cite specific training topics, cognitive skills, or systems from the MOS data when explaining a fit. Concrete is better than generic.
- Skills to learn should be specific — name the language, framework, or tool (e.g., "JavaScript fundamentals", "Python pandas", "Kubernetes basics") rather than "learn programming".
- Tone is direct and respectful — the audience is veterans. Not patronizing. Not flowery.
- For MOSes with obvious tech adjacency (cyber, intel, signals, comms, IT), lean into those. For MOSes farther from tech (infantry, logistics, medical), still find honest tech-aligned roles by mapping the cognitive transfer skills, not by stretching the truth.`;

function buildPrompt(ctx: MosContext, taxonomy: EnrichedRole[]): string {
    // Trim taxonomy to just what Gemini needs to pick a key — passing the
    // full descriptions and stack arrays bloats the prompt and seems to
    // confuse Gemini's structured-output mode.
    const taxonomyLines = taxonomy
        .map((r) => `- ${r.key} | ${r.title} (${r.track})`)
        .join("\n");

    return `Military Background:
- Code: ${ctx.code}
- Branch: ${ctx.branch}
- Title: ${ctx.title}
- Official description: ${ctx.description || "(none)"}

Training topics:
${ctx.trainingTopics.length ? ctx.trainingTopics.map((t) => `  - ${t}`).join("\n") : "  (none recorded)"}

Cognitive transfer skills:
${
    ctx.cognitiveSkills.length
        ? ctx.cognitiveSkills.map((s) => `  - ${s.skill}: ${s.civilianTranslation}`).join("\n")
        : "  (none recorded)"
}

Civilian system equivalents:
${
    ctx.civilianSystems.length
        ? ctx.civilianSystems.map((s) => `  - ${s.military} → ${s.civilian}`).join("\n")
        : "  (none recorded)"
}

Tech role taxonomy (pick 3-5 keys from this list — do NOT invent new keys):
${taxonomyLines}

Generate the tech pathway bundle for this MOS.`;
}

async function generateForMos(
    ctx: MosContext,
    taxonomy: EnrichedRole[]
): Promise<TechPathwayBundle | null> {
    try {
        // gemini-2.0-flash is the model used by the existing generate-career-pathways
        // script and has proven reliable for structured-output JSON of this shape.
        // Override via TECH_PATHWAYS_MODEL env if needed.
        const model = google(process.env.TECH_PATHWAYS_MODEL || "gemini-2.0-flash");

        const { object } = await generateObject({
            model,
            schema: TechPathwaySchema,
            system: SYSTEM_INSTRUCTION,
            prompt: buildPrompt(ctx, taxonomy),
            maxRetries: 4,
        });

        // Validate that all referenced roleKeys exist in the taxonomy.
        const validKeys = new Set(taxonomy.map((r) => r.key));
        for (const r of object.techRoles) {
            if (!validKeys.has(r.roleKey)) {
                console.warn(`  ${ctx.code}: invalid roleKey "${r.roleKey}", skipping entry.`);
                return null;
            }
        }

        return { ...object, generatedAt: new Date().toISOString() };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`  ${ctx.code}: generation failed — ${message}`);
        return null;
    }
}

// ----- Main -----

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

async function main() {
    const apiKey =
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error(
            "Missing Google AI API key. Set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in .env."
        );
        process.exit(1);
    }
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
    }

    // Load all input data
    const trainingMap = loadJson<Record<string, { branch: string; title: string; topics: string[] }>>(
        path.join(DATA_DIR, "training-pipeline.json")
    );
    const cognitiveMap = loadJson<
        Record<string, { cognitiveSkills: Array<{ skill: string; civilianTranslation: string }> }>
    >(path.join(DATA_DIR, "cognitive-skills-map.json"));
    const systemsMap = loadJson<
        Record<string, { systems: Array<{ military: string; civilian: string }> }>
    >(path.join(DATA_DIR, "military-systems-map.json"));
    const descriptionsMap = loadJson<Record<string, string>>(
        path.join(DATA_DIR, "job-codes-descriptions.json")
    );

    // Resolve descriptions per canonical (branch-stripped) code.
    const descriptionByCode = new Map<string, string>();
    for (const [branchKey, desc] of Object.entries(descriptionsMap)) {
        const code = stripBranchPrefix(branchKey);
        const existing = descriptionByCode.get(code);
        descriptionByCode.set(code, existing ? `${existing}\n\n${desc}` : desc);
    }

    // Existing output (resumability)
    const existing: Record<string, TechPathwayBundle> = fs.existsSync(OUTPUT_PATH)
        ? loadJson<Record<string, TechPathwayBundle>>(OUTPUT_PATH)
        : {};

    // Build the work list — every MOS we have training data for.
    const allCodes = Object.keys(trainingMap);
    const todo = allCodes.filter((code) => !existing[code]);

    console.log(`Total MOS codes: ${allCodes.length}`);
    console.log(`Already generated: ${Object.keys(existing).length}`);
    console.log(`Remaining to generate: ${todo.length}`);

    if (todo.length === 0) {
        console.log("Nothing to do. All codes covered.");
        return;
    }

    // Enrich taxonomy once
    const taxonomy = await loadEnrichedTaxonomy();

    let okCount = 0;
    let failCount = 0;

    for (let i = 0; i < todo.length; i += BATCH_SIZE) {
        const batch = todo.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(todo.length / BATCH_SIZE);

        console.log(
            `\nBatch ${batchNum}/${totalBatches} (codes ${i + 1}-${Math.min(i + BATCH_SIZE, todo.length)})`
        );

        const results = await Promise.allSettled(
            batch.map(async (code) => {
                const training = trainingMap[code];
                const ctx: MosContext = {
                    code,
                    branch: training.branch,
                    title: training.title,
                    description: descriptionByCode.get(code) || "",
                    trainingTopics: training.topics || [],
                    cognitiveSkills: cognitiveMap[code]?.cognitiveSkills || [],
                    civilianSystems: systemsMap[code]?.systems || [],
                };
                const bundle = await generateForMos(ctx, taxonomy);
                return { code, bundle };
            })
        );

        for (const r of results) {
            if (r.status === "fulfilled" && r.value.bundle) {
                existing[r.value.code] = r.value.bundle;
                okCount++;
                process.stdout.write(".");
            } else {
                failCount++;
                process.stdout.write("x");
            }
        }

        // Persist after every batch so a crash doesn't lose work.
        writeJson(OUTPUT_PATH, existing);

        if (i + BATCH_SIZE < todo.length) {
            await sleep(BATCH_DELAY_MS);
        }
    }

    console.log("\n\n--- Results ---");
    console.log(`Generated this run: ${okCount}`);
    console.log(`Failed this run: ${failCount}`);
    console.log(`Total in output: ${Object.keys(existing).length}`);
    console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});
