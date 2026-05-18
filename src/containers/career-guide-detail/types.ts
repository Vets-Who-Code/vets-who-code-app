export type Branch = "Army" | "Navy" | "Air Force" | "Marine Corps" | "Coast Guard";

export type Rank = "Enlisted" | "Warrant" | "Officer";

export interface TrainingData {
    branch: string;
    title: string;
    program: string;
    hours: number;
    weeks?: number;
    topics: string[];
    civilian_certs: string[];
    ace_credits?: string;
}

export interface CertData {
    direct_qualifies: string[];
    partial_coverage: Array<{ cert: string; coverage: number; gaps: string }>;
    recommended_next: string[];
}

export interface SystemEntry {
    military: string;
    civilian: string;
}

export interface SystemsData {
    branch: string;
    title: string;
    systems: SystemEntry[];
}

export interface ResolvedTechRole {
    roleKey: string;
    matchLevel: "high" | "good" | "moderate";
    whyItFits: string;
    title: string;
    track: string;
    socCode: string;
    description: string;
    stack: string[];
}

export interface TechPathway {
    roles: ResolvedTechRole[];
    skillsYouHave: Array<{ from: string; to: string }>;
    skillsToLearn: Array<{ skill: string; forRole: string }>;
}

export interface PathwayEntry {
    role: string;
    matchLevel: string;
    avgSalary: number;
    demand: string;
    skillsToClose?: string[];
    dataSource?: string;
    salaryRange?: { p25: number; p75: number };
}

export interface CognitiveSkill {
    skill: string;
    militaryContext: string;
    civilianTranslation: string;
}

export interface NonObviousCareer {
    role: string;
    socCode: string;
    whyItFits: string;
}

export interface CognitiveProfile {
    cognitiveSkills: CognitiveSkill[];
    nonObviousCareers: NonObviousCareer[];
}

export interface GuideSummary {
    topMatch: string;
    salaryBand: string;
    demand: string;
    techMatchScore: string;
    docId: string;
}

export interface GuideStats {
    trainingHours: number;
    aceCredit: string;
    techRolesMapped: number;
    civilianPathways: number;
    certCoverage: string;
}

export interface CareerGuideDetail {
    code: string;
    branch: Branch;
    rank: Rank;
    family: string;
    training: TrainingData;
    certs: CertData;
    systems: SystemsData;
    pathways: PathwayEntry[];
    cognitiveProfile: CognitiveProfile | null;
    techPathway: TechPathway | null;
    summary: GuideSummary;
    stats: GuideStats;
}
