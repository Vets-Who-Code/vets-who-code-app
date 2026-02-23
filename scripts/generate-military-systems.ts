import "dotenv/config";
import fs from "fs";
import path from "path";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const BRANCH_DISPLAY: Record<string, string> = {
    army: "Army",
    navy: "Navy",
    air_force: "Air Force",
    marine_corps: "Marine Corps",
    coast_guard: "Coast Guard",
};

const SystemsSchema = z.object({
    title: z.string(),
    systems: z
        .array(
            z.object({
                military: z.string(),
                civilian: z.string(),
            })
        )
        .min(3)
        .max(8),
});

type SystemsEntry = { branch: string; title: string; systems: Array<{ military: string; civilian: string }> };

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseBranchAndCode(key: string): { branch: string; code: string } {
    const colonIdx = key.indexOf(":");
    if (colonIdx === -1) return { branch: "Unknown", code: key };
    const rawBranch = key.slice(0, colonIdx);
    return {
        branch: BRANCH_DISPLAY[rawBranch] || rawBranch,
        code: key.slice(colonIdx + 1),
    };
}

async function generateForCode(
    code: string,
    branch: string,
    description: string
): Promise<z.infer<typeof SystemsSchema> | null> {
    try {
        const model = google("gemini-2.0-flash");

        const { object } = await generateObject({
            model,
            schema: SystemsSchema,
            prompt: `You are a military technology and systems expert. Given a military job code, branch, and official description, identify the military-specific systems, tools, and technologies used in this role and map them to civilian equivalents.

Military Job Code: ${code}
Branch: ${branch}
Official Description: ${description}

Instructions:
- title: The official job title for this MOS/rating/AFSC
- systems: 3-8 military systems/tools/technologies used in this role, each with:
  - military: The military system name and acronym (e.g., "Blue Force Tracker (BFT)", "GCSS-Army")
  - civilian: The civilian equivalent system or technology category (e.g., "Real-time GPS fleet management systems", "SAP ERP logistics modules")
- Use real military systems specific to this role — not generic ones
- Map to specific civilian tools/platforms when possible
- This helps veterans translate their technical experience for civilian resumes`,
        });

        return object;
    } catch (error) {
        console.warn(`  Failed for ${code}: ${error}`);
        return null;
    }
}

async function main() {
    const apiKey =
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_PRIVATE_KEY;

    if (!apiKey) {
        console.error("No Google AI API key found.");
        process.exit(1);
    }
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
    }

    const descriptionsPath = path.join(process.cwd(), "src/data/job-codes-descriptions.json");
    const outputPath = path.join(process.cwd(), "src/data/military-systems-map.json");

    const descriptions: Record<string, string> = JSON.parse(fs.readFileSync(descriptionsPath, "utf-8"));
    const existingMap: Record<string, SystemsEntry> = JSON.parse(fs.readFileSync(outputPath, "utf-8"));

    const codeData = new Map<string, { branch: string; description: string }>();
    for (const [branchCode, desc] of Object.entries(descriptions)) {
        const { branch, code } = parseBranchAndCode(branchCode);
        if (codeData.has(code)) {
            const existing = codeData.get(code)!;
            codeData.set(code, { branch: existing.branch, description: `${existing.description}\n\n${desc}` });
        } else {
            codeData.set(code, { branch, description: desc });
        }
    }

    const existingCodes = new Set(Object.keys(existingMap));
    const codesToGenerate = [...codeData.entries()].filter(([code]) => !existingCodes.has(code));

    console.log(`Total unique codes: ${codeData.size}`);
    console.log(`Already covered: ${existingCodes.size}`);
    console.log(`To generate: ${codesToGenerate.length}`);

    if (codesToGenerate.length === 0) {
        console.log("Nothing to generate.");
        return;
    }

    const generated: Record<string, SystemsEntry> = {};
    let failedCount = 0;

    for (let i = 0; i < codesToGenerate.length; i += BATCH_SIZE) {
        const batch = codesToGenerate.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(codesToGenerate.length / BATCH_SIZE);

        console.log(`\nBatch ${batchNum}/${totalBatches} (codes ${i + 1}-${Math.min(i + BATCH_SIZE, codesToGenerate.length)})`);

        const results = await Promise.allSettled(
            batch.map(async ([code, data]) => {
                const result = await generateForCode(code, data.branch, data.description);
                return { code, branch: data.branch, result };
            })
        );

        for (const r of results) {
            if (r.status === "fulfilled" && r.value.result) {
                generated[r.value.code] = { branch: r.value.branch, ...r.value.result };
                process.stdout.write(".");
            } else {
                failedCount++;
                process.stdout.write("x");
            }
        }

        if (i + BATCH_SIZE < codesToGenerate.length) {
            // biome-ignore lint/performance/noAwaitInLoops: Intentional delay for API rate limiting
            await sleep(BATCH_DELAY_MS);
        }
    }

    const merged = { ...generated, ...existingMap };
    fs.writeFileSync(outputPath, JSON.stringify(merged, null, 4));

    console.log(`\n\n--- Results ---`);
    console.log(`Generated: ${Object.keys(generated).length}`);
    console.log(`Skipped: ${existingCodes.size}`);
    console.log(`Failed: ${failedCount}`);
    console.log(`Total: ${Object.keys(merged).length}`);
    console.log(`Wrote to ${outputPath}`);
}

main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});
