import fs from "fs";
import path from "path";
import type { Branch, Demand, Family, GuideEntry, Rank } from "@containers/career-guides/types";

type TrainingEntry = {
    branch: string;
    title: string;
    program?: string;
    hours?: number;
    weeks?: number;
    topics?: string[];
    civilian_certs?: string[];
    ace_credits?: string;
};

type PathwayEntry = {
    role: string;
    matchLevel: string;
    avgSalary: number;
    demand: string;
    skillsToClose?: string[];
    dataSource?: string;
};

const BRANCH_NORMAL: Record<string, Branch> = {
    army: "Army",
    navy: "Navy",
    "air force": "Air Force",
    air_force: "Air Force",
    usaf: "Air Force",
    "marine corps": "Marine Corps",
    marine_corps: "Marine Corps",
    usmc: "Marine Corps",
    marines: "Marine Corps",
    "coast guard": "Coast Guard",
    coast_guard: "Coast Guard",
    uscg: "Coast Guard",
};

const normaliseBranch = (raw: string): Branch => {
    const key = raw.toLowerCase().trim();
    return BRANCH_NORMAL[key] ?? "Army";
};

// Codes with a trailing W or starting W typically denote warrant officers in Army;
// codes ending with O / starting 0x in air force = officer; numeric Navy designators
// 1XXX = officer. Below 1000 / starts with letters that match known officer codes = officer.
const detectRank = (code: string, branch: Branch): Rank => {
    const c = code.toUpperCase();
    if (branch === "Army") {
        // Army warrant officers: numeric MOS in 1XXA range or ending W
        if (/^\d{3}A$/.test(c)) return "Warrant";
        // Officer branch codes are 2-letter: 11A, 13A, etc. — also use 2-char + A
        if (/^\d{2}[A-HJ-Z]$/.test(c) && c.endsWith("A")) return "Officer";
        return "Enlisted";
    }
    if (branch === "Navy") {
        // Navy officer designators are 4-digit starting with 1, 2, 3, 4, 6
        if (/^\d{4}$/.test(c) && /^[12346]/.test(c)) return "Officer";
        // Navy warrant: 7xxx designators
        if (/^7\d{3}$/.test(c)) return "Warrant";
        return "Enlisted";
    }
    if (branch === "Air Force") {
        // USAF officer AFSCs end in a letter and are 4 chars: 11FX, 14NX
        if (/^\d{2}[A-Z]\d?[A-Z]?$/.test(c) && c.length >= 4 && /[A-Z]$/.test(c)) {
            // Officer AFSCs usually start 11–63; enlisted 1–9. Heuristic.
            const stem = parseInt(c.slice(0, 2), 10);
            if (!Number.isNaN(stem) && stem >= 10) return "Officer";
        }
        return "Enlisted";
    }
    if (branch === "Marine Corps") {
        // USMC officer MOS are 4 digits starting 0–3 in low ranges
        if (/^\d{4}$/.test(c) && c.startsWith("0") && c[1] === "2") return "Officer";
        return "Enlisted";
    }
    // Coast Guard
    return "Enlisted";
};

// Map a free-text family/role string into our restricted Family taxonomy.
const FAMILY_KEYWORDS: Array<[Family, RegExp]> = [
    ["Cyber", /cyber|security|infosec|signal warfare|cryptolog|sigint|electronic warfare/i],
    ["IT / Comms", /network|comm(unication)?|signal|it specialist|radio|satellite|telecom/i],
    ["Aviation", /pilot|aviation|aircraft|aircrew|aerospace|flight|drone|uav/i],
    ["Intelligence", /intel|intelligence|analyst|hum(int|n)|counter[- ]?intel/i],
    ["Logistics", /logist|supply|transport|distribution|warehouse|materiel/i],
    ["Medical", /medic|health|dental|nurse|corpsman|hospital|pharma/i],
    ["Engineering", /engineer|construction|combat engineer|seabee|civil/i],
    ["Operations", /operations|infantry|combat|special force|recon|gunner/i],
    ["Maintenance", /mechanic|maintenance|repair|technician|electrician|machinist/i],
    ["Administration", /admin|personnel|human resources|finance|legal|chaplain|public affairs/i],
];

const detectFamily = (title: string): Family => {
    for (const [family, pattern] of FAMILY_KEYWORDS) {
        if (pattern.test(title)) return family;
    }
    return "Other";
};

const mapDemand = (raw?: string): Demand => {
    if (!raw) return "Steady";
    const r = raw.toLowerCase();
    if (r.includes("very high")) return "Very High";
    if (r.includes("high") || r.includes("growing")) return "High";
    return "Steady";
};

const stripBranchPrefix = (key: string): string => {
    const idx = key.indexOf(":");
    return idx === -1 ? key : key.slice(idx + 1);
};

export const loadCareerGuides = (): GuideEntry[] => {
    const root = process.cwd();
    const training = JSON.parse(
        fs.readFileSync(path.join(root, "src/data/training-pipeline.json"), "utf-8")
    ) as Record<string, TrainingEntry>;
    const pathways = JSON.parse(
        fs.readFileSync(path.join(root, "src/data/career-pathways-map.json"), "utf-8")
    ) as Record<string, PathwayEntry[]>;

    const guides: GuideEntry[] = [];

    for (const [key, entry] of Object.entries(training)) {
        const code = stripBranchPrefix(key).toUpperCase();
        const branch = normaliseBranch(entry.branch);
        const rank = detectRank(code, branch);
        const family = detectFamily(entry.title);
        const certs = entry.civilian_certs ?? [];

        // Pathway lookup: try raw code first, then full key
        const matches = pathways[code] ?? pathways[stripBranchPrefix(key)] ?? [];
        const top = matches[0];
        const civilian = top?.role ?? entry.title;
        const salaries = matches.map((m) => m.avgSalary).filter((s) => typeof s === "number");
        const salaryLow = salaries.length ? Math.min(...salaries) : 45000;
        const salaryHigh = salaries.length ? Math.max(...salaries) : salaryLow + 30000;
        const demand = mapDemand(top?.demand);

        guides.push({
            code,
            title: entry.title,
            branch,
            rank,
            family,
            civilian,
            salaryLow: Math.round(salaryLow / 1000),
            salaryHigh: Math.round(salaryHigh / 1000),
            certs,
            demand,
            featured: certs.length >= 3 && demand !== "Steady",
        });
    }

    return guides.sort((a, b) => a.code.localeCompare(b.code));
};

export const computeBranchCounts = (guides: GuideEntry[]) => {
    const counts: Record<Branch, number> = {
        Army: 0,
        Navy: 0,
        "Air Force": 0,
        "Marine Corps": 0,
        "Coast Guard": 0,
    };
    for (const g of guides) counts[g.branch] += 1;
    return counts;
};

export const FAMILIES: Family[] = [
    "Cyber",
    "IT / Comms",
    "Aviation",
    "Intelligence",
    "Logistics",
    "Medical",
    "Engineering",
    "Operations",
    "Maintenance",
    "Administration",
    "Other",
];
