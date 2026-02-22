import "dotenv/config";
import fs from "fs";
import path from "path";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const CertSchema = z.object({
    direct_qualifies: z.array(z.string()),
    partial_coverage: z
        .array(
            z.object({
                cert: z.string(),
                coverage: z.number().int().min(0).max(100),
                gaps: z.string(),
            })
        )
        .min(1)
        .max(5),
    recommended_next: z.array(z.string()).min(1).max(5),
});

type CertEntry = z.infer<typeof CertSchema>;

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripBranchPrefix(key: string): string {
    const colonIdx = key.indexOf(":");
    return colonIdx === -1 ? key : key.slice(colonIdx + 1);
}

async function generateForCode(
    code: string,
    description: string
): Promise<CertEntry | null> {
    try {
        const model = google("gemini-2.0-flash");

        const { object } = await generateObject({
            model,
            schema: CertSchema,
            prompt: `You are a military credentialing and certification expert. Given a military job code and its official description, identify civilian certification equivalencies.

Military Job Code: ${code}
Official Description: ${description}

Instructions:
- direct_qualifies: Certifications the veteran can sit for immediately based on military training (e.g., "CompTIA A+", "EMT-B"). Empty array if none.
- partial_coverage: 1-5 certifications where military training covers some material. For each, give the cert name, coverage percentage (realistic 20-80%), and a brief description of gaps to study.
- recommended_next: 1-5 certifications the veteran should pursue next for career advancement. Be specific to this role.
- Use real, recognized civilian certifications (CompTIA, PMI, AWS, OSHA, SHRM, etc.)
- Be realistic — don't inflate coverage percentages`,
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
    const outputPath = path.join(process.cwd(), "src/data/cert-equivalencies.json");

    const descriptions: Record<string, string> = JSON.parse(fs.readFileSync(descriptionsPath, "utf-8"));
    const existingMap: Record<string, CertEntry> = JSON.parse(fs.readFileSync(outputPath, "utf-8"));

    const codeDescriptions = new Map<string, string>();
    for (const [branchCode, desc] of Object.entries(descriptions)) {
        const code = stripBranchPrefix(branchCode);
        if (codeDescriptions.has(code)) {
            codeDescriptions.set(code, `${codeDescriptions.get(code)}\n\n${desc}`);
        } else {
            codeDescriptions.set(code, desc);
        }
    }

    const existingCodes = new Set(Object.keys(existingMap));
    const codesToGenerate = [...codeDescriptions.entries()].filter(([code]) => !existingCodes.has(code));

    console.log(`Total unique codes: ${codeDescriptions.size}`);
    console.log(`Already covered: ${existingCodes.size}`);
    console.log(`To generate: ${codesToGenerate.length}`);

    if (codesToGenerate.length === 0) {
        console.log("Nothing to generate.");
        return;
    }

    const generated: Record<string, CertEntry> = {};
    let failedCount = 0;

    for (let i = 0; i < codesToGenerate.length; i += BATCH_SIZE) {
        const batch = codesToGenerate.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(codesToGenerate.length / BATCH_SIZE);

        console.log(`\nBatch ${batchNum}/${totalBatches} (codes ${i + 1}-${Math.min(i + BATCH_SIZE, codesToGenerate.length)})`);

        const results = await Promise.allSettled(
            batch.map(async ([code, description]) => {
                const result = await generateForCode(code, description);
                return { code, result };
            })
        );

        for (const r of results) {
            if (r.status === "fulfilled" && r.value.result) {
                generated[r.value.code] = r.value.result;
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
