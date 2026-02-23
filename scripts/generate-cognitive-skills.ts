import "dotenv/config";
import fs from "fs";
import path from "path";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const SKILLS_TAXONOMY = [
    "Pattern Recognition",
    "Rapid Prioritization",
    "System Modeling",
    "Adversarial Thinking",
    "Resource Optimization",
    "Procedural Compliance",
    "Team Synchronization",
    "Degraded-Mode Operations",
    "Situational Awareness",
    "After-Action Analysis",
] as const;

const CognitiveProfileSchema = z.object({
    cognitiveSkills: z
        .array(
            z.object({
                skill: z.enum(SKILLS_TAXONOMY),
                militaryContext: z.string(),
                civilianTranslation: z.string(),
            })
        )
        .min(3)
        .max(5),
    nonObviousCareers: z
        .array(
            z.object({
                role: z.string(),
                whyItFits: z.string(),
                socCode: z.string(),
            })
        )
        .min(2)
        .max(4),
});

type CognitiveProfile = z.infer<typeof CognitiveProfileSchema>;

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripBranchPrefix(key: string): string {
    const colonIdx = key.indexOf(":");
    return colonIdx === -1 ? key : key.slice(colonIdx + 1);
}

async function generateProfileForCode(
    code: string,
    description: string
): Promise<CognitiveProfile | null> {
    try {
        const model = google("gemini-2.0-flash");

        const { object } = await generateObject({
            model,
            schema: CognitiveProfileSchema,
            prompt: `You are an expert military-to-civilian career translator. Given a military job code and its official description, identify the cognitive skills this role develops and suggest non-obvious civilian careers.

Military Job Code: ${code}
Official Description: ${description}

Instructions:
- Select 3-5 cognitive skills from this exact taxonomy: ${SKILLS_TAXONOMY.join(", ")}
- For each skill, write a militaryContext (how this specific role uses it) and civilianTranslation (how it maps to civilian work)
- Suggest 2-4 non-obvious civilian careers (NOT the obvious ones) with a role name, whyItFits explanation addressed directly to the veteran ("You've been..."), and a SOC code
- Be specific to this role — don't give generic answers
- Write in a warm, empowering tone that helps veterans see their hidden value`,
        });

        return object;
    } catch (error) {
        console.warn(`  Failed to generate profile for ${code}: ${error}`);
        return null;
    }
}

async function main() {
    const apiKey =
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_PRIVATE_KEY;

    if (!apiKey) {
        console.error(
            "No Google AI API key found. Set GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_PRIVATE_KEY in .env"
        );
        process.exit(1);
    }

    // Ensure the env var that @ai-sdk/google reads is set
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
    }

    const descriptionsPath = path.join(
        process.cwd(),
        "src/data/job-codes-descriptions.json"
    );
    const cognitiveMapPath = path.join(
        process.cwd(),
        "src/data/cognitive-skills-map.json"
    );

    const descriptions: Record<string, string> = JSON.parse(
        fs.readFileSync(descriptionsPath, "utf-8")
    );
    const existingMap: Record<string, CognitiveProfile> = JSON.parse(
        fs.readFileSync(cognitiveMapPath, "utf-8")
    );

    // Build lookup: raw code -> description
    // If multiple branches share a code, concatenate descriptions
    const codeDescriptions = new Map<string, string>();
    for (const [branchCode, desc] of Object.entries(descriptions)) {
        const code = stripBranchPrefix(branchCode);
        if (codeDescriptions.has(code)) {
            codeDescriptions.set(
                code,
                `${codeDescriptions.get(code)}\n\n${desc}`
            );
        } else {
            codeDescriptions.set(code, desc);
        }
    }

    // Filter out codes already in the hand-crafted map
    const existingCodes = new Set(Object.keys(existingMap));
    const codesToGenerate = [...codeDescriptions.entries()].filter(
        ([code]) => !existingCodes.has(code)
    );

    console.log(`Total unique codes from descriptions: ${codeDescriptions.size}`);
    console.log(`Already covered (hand-crafted): ${existingCodes.size}`);
    console.log(`Codes to generate: ${codesToGenerate.length}`);

    if (codesToGenerate.length === 0) {
        console.log("All codes are already covered. Nothing to generate.");
        return;
    }

    const generated: Record<string, CognitiveProfile> = {};
    let failedCount = 0;

    for (let i = 0; i < codesToGenerate.length; i += BATCH_SIZE) {
        const batch = codesToGenerate.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(codesToGenerate.length / BATCH_SIZE);

        console.log(
            `\nBatch ${batchNum}/${totalBatches} (codes ${i + 1}-${Math.min(i + BATCH_SIZE, codesToGenerate.length)})`
        );

        const results = await Promise.allSettled(
            batch.map(async ([code, description]) => {
                const profile = await generateProfileForCode(code, description);
                return { code, profile };
            })
        );

        for (const result of results) {
            if (result.status === "fulfilled" && result.value.profile) {
                generated[result.value.code] = result.value.profile;
                process.stdout.write(".");
            } else {
                failedCount++;
                process.stdout.write("x");
            }
        }

        // Rate limit delay between batches
        if (i + BATCH_SIZE < codesToGenerate.length) {
            // biome-ignore lint/performance/noAwaitInLoops: Intentional delay for API rate limiting
            await sleep(BATCH_DELAY_MS);
        }
    }

    // Merge: hand-crafted entries win on conflict
    const merged: Record<string, CognitiveProfile> = {
        ...generated,
        ...existingMap,
    };

    fs.writeFileSync(cognitiveMapPath, JSON.stringify(merged, null, 4));

    console.log(`\n\n--- Results ---`);
    console.log(`Generated: ${Object.keys(generated).length}`);
    console.log(`Skipped (hand-crafted): ${existingCodes.size}`);
    console.log(`Failed: ${failedCount}`);
    console.log(`Total in map: ${Object.keys(merged).length}`);
    console.log(`\nWrote to ${cognitiveMapPath}`);
}

main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});
