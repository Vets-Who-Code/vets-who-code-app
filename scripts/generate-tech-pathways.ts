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

const TechPathwaySchema = z.object({
    techRoles: z
        .array(
            z.object({
                roleKey: z.string().describe("The 'key' field from the taxonomy this entry corresponds to"),
                matchLevel: z.enum(["high", "good", "moderate"]),
                whyItFits: z
                    .string()
                    .describe(
                        "1-2 sentences pairing concrete elements of this MOS background to concrete elements of the role. Cite specific training, cognitive skills, or systems — never generic phrases like 'leadership' or 'attention to detail'."
                    ),
            })
        )
        .min(3)
        .max(5),
    skillsYouHave: z
        .array(
            z.object({
                from: z.string().describe("A concrete element of this MOS — a training topic, cognitive skill, or system worked with. Not a generic trait."),
                to: z.string().describe("The tech-equivalent skill or practice this maps to."),
            })
        )
        .min(3)
        .max(6),
    skillsToLearn: z
        .array(
            z.object({
                skill: z.string().describe("A specific, concrete skill (e.g., 'JavaScript fundamentals', 'Python pandas', 'Kubernetes basics' — never 'learn programming' or 'computer skills')."),
                forRole: z.string().describe("Which roleKey from techRoles this skill primarily serves."),
            })
        )
        .min(4)
        .max(8),
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

const SYSTEM_INSTRUCTION = `You are a career counselor for Vets Who Code, a software engineering accelerator for military veterans. Your mandate is to help veterans see realistic tech industry roles they can aim for, regardless of which civilian path they chose first.

Rules you must follow:
1. Recommend 3 to 5 tech roles drawn from the provided taxonomy. Pick the best fits for THIS specific military background — not the same defaults for every MOS.
2. Every "whyItFits" sentence must cite a specific training topic, cognitive skill, or system from the MOS data. Generic phrases like "leadership", "attention to detail", "discipline", or "teamwork" are forbidden — those are true for every MOS and tell the reader nothing.
3. Every "skillsYouHave.from" must reference a real, specific element of THIS MOS — not a trait that could apply to anyone. The "to" must name a real tech practice the veteran can claim.
4. Every "skillsToLearn.skill" must be concrete enough to put in a learning plan: a language, framework, tool, or named practice. Never "learn programming" or "computer skills".
5. Tone is direct and respectful — the audience is veterans who have already done hard things. Don't be patronizing. Don't be flowery.
6. If a MOS has obvious tech-adjacent specialties (cyber, intel, signals, comms, IT), lean into those. If a MOS is far from tech (infantry, logistics, medical), still find honest tech-aligned roles by mapping the cognitive skills, not by stretching the truth.`;

function buildPrompt(ctx: MosContext, taxonomy: EnrichedRole[]): string {
    const taxonomyJson = JSON.stringify(
        taxonomy.map((r) => ({
            key: r.key,
            title: r.title,
            track: r.track,
            description: r.description,
            stack: r.stack,
        })),
        null,
        2
    );

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
${taxonomyJson}

Generate the tech pathway bundle for this MOS following the rules in the system instruction.`;
}

async function generateForMos(
    ctx: MosContext,
    taxonomy: EnrichedRole[]
): Promise<TechPathwayBundle | null> {
    try {
        const model = google(process.env.GEMINI_MODEL || "gemini-2.5-flash");

        const { object } = await generateObject({
            model,
            schema: TechPathwaySchema,
            system: SYSTEM_INSTRUCTION,
            prompt: buildPrompt(ctx, taxonomy),
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
