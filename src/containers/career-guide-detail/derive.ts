import { normaliseBranch } from "./branch-meta";
import type {
    CareerGuideDetail,
    CertData,
    CognitiveProfile,
    GuideStats,
    GuideSummary,
    PathwayEntry,
    SystemsData,
    TechPathway,
    TrainingData,
} from "./types";

const SALARY_BAND = (pathways: PathwayEntry[]): string => {
    if (pathways.length === 0) return "$45K–$120K";
    const salaries = pathways.map((p) => p.avgSalary).filter((s) => typeof s === "number");
    if (salaries.length === 0) return "$45K–$120K";
    const lo = Math.min(...salaries);
    const hi = Math.max(...salaries);
    return `$${Math.round(lo / 1000)}K–$${Math.round(hi / 1000)}K`;
};

const DEMAND_LABEL = (pathways: PathwayEntry[]): string => {
    if (pathways.length === 0) return "Steady";
    const counts: Record<string, number> = {};
    for (const p of pathways) counts[p.demand] = (counts[p.demand] ?? 0) + 1;
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Steady";
    if (/very high/i.test(top)) return "Very High";
    if (/high|growing/i.test(top)) return "High · Stable";
    return "Steady";
};

const TECH_MATCH_SCORE = (techPathway: TechPathway | null): string => {
    if (!techPathway || techPathway.roles.length === 0) return "—";
    const w = { high: 1, good: 0.7, moderate: 0.45 } as const;
    const total = techPathway.roles.reduce((s, r) => s + w[r.matchLevel], 0);
    const avg = total / techPathway.roles.length;
    return `${(avg * 10).toFixed(1)} / 10`;
};

const CERT_COVERAGE = (certs: CertData): string => {
    const direct = certs.direct_qualifies.length;
    const partial = certs.partial_coverage.length;
    const next = certs.recommended_next.length;
    const total = direct + partial + next;
    if (total === 0) return "0";
    return `${direct + partial}/${total}`;
};

// Map "Operations · Security" style — short, hand-tuned per branch when possible
const FAMILY_FROM = (training: TrainingData): string => {
    const t = training.title.toLowerCase();
    if (/cyber|crypto|sigint|signal warfare/.test(t)) return "Cyber · Security";
    if (/security forces|military police|infantry|combat/.test(t)) return "Operations · Security";
    if (/network|comm|signal|telecom/.test(t)) return "IT · Comms";
    if (/intel|analyst/.test(t)) return "Intelligence";
    if (/pilot|aviation|aircrew/.test(t)) return "Aviation";
    if (/medic|corpsman|nurse|health/.test(t)) return "Medical";
    if (/logist|supply|transport/.test(t)) return "Logistics";
    if (/mechanic|maintenance|repair/.test(t)) return "Maintenance";
    if (/engineer|construction|seabee/.test(t)) return "Engineering";
    if (/admin|personnel|finance|legal|chaplain/.test(t)) return "Administration";
    return "Operations";
};

const RANK_FROM = (
    code: string,
    branch: ReturnType<typeof normaliseBranch>
): "Enlisted" | "Warrant" | "Officer" => {
    const c = code.toUpperCase();
    if (branch === "Army") {
        if (/^\d{3}A$/.test(c)) return "Warrant";
        if (/^\d{2}[A-HJ-Z]$/.test(c) && c.endsWith("A")) return "Officer";
        return "Enlisted";
    }
    if (branch === "Navy") {
        if (/^\d{4}$/.test(c) && /^[12346]/.test(c)) return "Officer";
        if (/^7\d{3}$/.test(c)) return "Warrant";
        return "Enlisted";
    }
    if (branch === "Air Force") {
        if (/^\d{2}[A-Z]\d?[A-Z]?$/.test(c) && c.length >= 4 && /[A-Z]$/.test(c)) {
            const stem = parseInt(c.slice(0, 2), 10);
            if (!Number.isNaN(stem) && stem >= 10) return "Officer";
        }
        return "Enlisted";
    }
    if (branch === "Marine Corps") {
        if (/^\d{4}$/.test(c) && c.startsWith("02")) return "Officer";
        return "Enlisted";
    }
    return "Enlisted";
};

export const buildSummary = (
    pathways: PathwayEntry[],
    techPathway: TechPathway | null,
    code: string
): GuideSummary => ({
    topMatch: pathways[0]?.role ?? techPathway?.roles[0]?.title ?? "—",
    salaryBand: SALARY_BAND(pathways),
    demand: DEMAND_LABEL(pathways),
    techMatchScore: TECH_MATCH_SCORE(techPathway),
    docId: `VWC.CG.${code.toUpperCase()}.R.04`,
});

export const buildStats = (
    training: TrainingData,
    certs: CertData,
    pathways: PathwayEntry[],
    techPathway: TechPathway | null
): GuideStats => ({
    trainingHours: training.hours,
    aceCredit: training.ace_credits ?? "—",
    techRolesMapped: techPathway?.roles.length ?? 0,
    civilianPathways: pathways.length,
    certCoverage: CERT_COVERAGE(certs),
});

export const buildDetail = (input: {
    code: string;
    training: TrainingData;
    certs: CertData;
    systems: SystemsData;
    pathways: PathwayEntry[];
    cognitiveProfile: CognitiveProfile | null;
    techPathway: TechPathway | null;
}): CareerGuideDetail => {
    const branch = normaliseBranch(input.training.branch);
    return {
        code: input.code.toUpperCase(),
        branch,
        rank: RANK_FROM(input.code, branch),
        family: FAMILY_FROM(input.training),
        training: input.training,
        certs: input.certs,
        systems: input.systems,
        pathways: input.pathways,
        cognitiveProfile: input.cognitiveProfile,
        techPathway: input.techPathway,
        summary: buildSummary(input.pathways, input.techPathway, input.code),
        stats: buildStats(input.training, input.certs, input.pathways, input.techPathway),
    };
};
