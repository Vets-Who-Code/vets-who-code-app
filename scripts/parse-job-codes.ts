import * as fs from "node:fs";
import * as path from "node:path";

const JOB_CODES_ROOT = path.resolve(__dirname, "../../job_codes_scripts");
const OUTPUT_DIR = path.resolve(__dirname, "../src/data");

type BranchKey = "army" | "navy" | "air_force" | "marine_corps" | "coast_guard";

const BRANCH_DIRS: Record<string, BranchKey> = {
	Army: "army",
	Navy: "navy",
	"Air Force": "air_force",
	"Marine Corps": "marine_corps",
	"Coast Guard": "coast_guard",
};

interface IndexEntry {
	code: string;
	branch: BranchKey;
}

function parseJobCodeFile(filePath: string): { code: string; description: string } | null {
	const content = fs.readFileSync(filePath, "utf-8").trim();

	const codeMatch = content.match(/^Job Code:\s*(.+)/m);
	if (!codeMatch) return null;

	const code = codeMatch[1].trim();

	const descMatch = content.match(/Description:\s*\n([\s\S]+)/);
	const description = descMatch ? descMatch[1].trim() : "";

	if (!description) return null;

	return { code, description };
}

function main() {
	if (!fs.existsSync(JOB_CODES_ROOT)) {
		console.error(`Job codes directory not found: ${JOB_CODES_ROOT}`);
		process.exit(1);
	}

	const index: IndexEntry[] = [];
	const descriptions: Record<string, string> = {};
	let total = 0;

	for (const [dirName, branchKey] of Object.entries(BRANCH_DIRS)) {
		const branchDir = path.join(JOB_CODES_ROOT, dirName);
		if (!fs.existsSync(branchDir)) {
			console.warn(`Skipping missing branch dir: ${branchDir}`);
			continue;
		}

		const files = fs.readdirSync(branchDir).filter((f) => f.endsWith(".txt"));
		let branchCount = 0;

		for (const file of files) {
			const parsed = parseJobCodeFile(path.join(branchDir, file));
			if (!parsed) continue;

			const key = `${branchKey}:${parsed.code}`;
			index.push({ code: parsed.code, branch: branchKey });
			descriptions[key] = parsed.description;
			branchCount++;
		}

		console.log(`${dirName}: ${branchCount} job codes`);
		total += branchCount;
	}

	// Sort index by branch then code
	index.sort((a, b) => a.branch.localeCompare(b.branch) || a.code.localeCompare(b.code));

	fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	const indexPath = path.join(OUTPUT_DIR, "job-codes-index.json");
	fs.writeFileSync(indexPath, JSON.stringify(index));
	console.log(`\nWrote ${indexPath} (${index.length} entries, ${(fs.statSync(indexPath).size / 1024).toFixed(1)} KB)`);

	const descPath = path.join(OUTPUT_DIR, "job-codes-descriptions.json");
	fs.writeFileSync(descPath, JSON.stringify(descriptions));
	console.log(`Wrote ${descPath} (${Object.keys(descriptions).length} entries, ${(fs.statSync(descPath).size / 1024).toFixed(1)} KB)`);

	console.log(`\nTotal: ${total} job codes parsed`);
}

main();
