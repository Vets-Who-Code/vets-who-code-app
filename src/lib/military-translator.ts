/**
 * Military Resume Translator
 * Lightweight dictionary-based translation (no AI dependencies)
 * Fast, reliable, and bundle-size friendly
 *
 * Formatting follows Harvard Extension School resume standards:
 * - Action verb + task + result (STAR format)
 * - No personal pronouns
 * - Concise phrases, not sentences
 * - Quantified where possible
 */

/**
 * Military-to-civilian terminology mappings
 */
const MILITARY_TERMINOLOGY: Record<string, string> = {
    // Ranks & Leadership
    "squad leader": "team supervisor",
    "platoon sergeant": "operations manager",
    "first sergeant": "senior operations manager",
    "sergeant major": "executive operations manager",
    "commanding officer": "chief executive",
    "executive officer": "deputy director",
    NCO: "supervisor",
    NCOIC: "operations supervisor",
    OIC: "program manager",
    "noncommissioned officer": "supervisor",
    "non-commissioned officer": "supervisor",
    "commanding general": "executive director",

    // Skills & Activities
    conducted: "performed",
    executed: "completed",
    deployed: "mobilized",
    mission: "project",
    missions: "projects",
    "combat operations": "high-stakes operations",
    "tactical operations": "strategic operations",
    operations: "operations",
    tactical: "strategic",
    reconnaissance: "research and analysis",
    surveillance: "monitoring",
    logistics: "supply chain management",
    ordnance: "equipment",
    "military working dog": "K-9",
    "security force": "security",
    "air base defense": "facility security and defense",
    "combat arms": "weapons and equipment management",
    "pass and registration": "access control and credentialing",
    "information security": "information security",
    "law enforcement": "law enforcement",

    // Military Branches & Units
    battalion: "division (500+ personnel)",
    company: "department (100-200 personnel)",
    platoon: "team (30-50 personnel)",
    squad: "team (8-12 personnel)",
    unit: "department",
    brigade: "business unit (3,000+ personnel)",

    // Common Military Terms
    personnel: "staff",
    enlisted: "staff members",
    subordinates: "direct reports",
    superior: "senior leadership",
    briefed: "presented to",
    debriefed: "conducted after-action reviews with",
    orders: "directives",
    regulations: "compliance standards",
    "standard operating procedure": "standard operating procedures",
    SOP: "standard procedures",
    ROE: "operational guidelines",
    NCOER: "performance evaluations",
    NCODP: "professional development programs",
    NCOES: "leadership training programs",
    CMF: "career field",
    IFV: "armored vehicle",
    NBC: "hazardous materials",
};

/**
 * Common military job titles to civilian equivalents
 */
const JOB_TITLE_MAPPINGS: Record<string, string> = {
    // Infantry & Combat
    infantryman: "Operations Specialist",
    "infantry squad leader": "Operations Team Lead",
    "fire team leader": "Team Supervisor",

    // Medical
    "combat medic": "Emergency Medical Technician",
    "field medic": "Paramedic",
    "hospital corpsman": "Medical Assistant",

    // Intelligence
    "intelligence analyst": "Data Analyst",
    "signals intelligence analyst": "Communications Analyst",

    // Administration
    "personnel specialist": "Human Resources Specialist",
    "administrative specialist": "Administrative Coordinator",

    // Technical
    "information technology specialist": "IT Specialist",
    "network administrator": "Network Administrator",
    "communications specialist": "Telecommunications Specialist",

    // Logistics
    "supply specialist": "Inventory Manager",
    "logistics specialist": "Supply Chain Coordinator",
    quartermaster: "Logistics Manager",

    // Vehicle & Equipment
    "motor transport operator": "Fleet Driver / Transport Operator",
    "aircraft mechanic": "Aviation Maintenance Technician",
    "wheeled vehicle mechanic": "Automotive Technician",

    // Security & Law Enforcement
    "security forces": "Security Operations Specialist",
    "military police": "Law Enforcement Officer",
};

/**
 * Map MOS code patterns to civilian job titles for codes the dictionary can't match
 */
const MOS_CODE_PATTERNS: Array<{ pattern: RegExp; title: string }> = [
    // Air Force Security Forces
    { pattern: /^3P0/i, title: "Security Operations Specialist" },
    // Army Infantry
    { pattern: /^11[A-Z]/i, title: "Operations Manager" },
    // Army Medical
    { pattern: /^68[A-Z]/i, title: "Healthcare Specialist" },
    // Army Signal/IT
    { pattern: /^25[A-Z]/i, title: "IT / Communications Specialist" },
    // Army Intelligence
    { pattern: /^35[A-Z]/i, title: "Intelligence Analyst" },
    // Army Admin
    { pattern: /^42[A-Z]/i, title: "Human Resources Specialist" },
    // Army Logistics
    { pattern: /^92[A-Z]/i, title: "Logistics Coordinator" },
    // Navy Engineering
    { pattern: /^(EN|MM|EM|ET)/i, title: "Engineering Technician" },
    // Navy Medical
    { pattern: /^HM/i, title: "Medical Specialist" },
    // Navy IT
    { pattern: /^IT/i, title: "Information Technology Specialist" },
    // Marine Corps Infantry
    { pattern: /^03/i, title: "Operations Specialist" },
    // Marine Corps Admin
    { pattern: /^01/i, title: "Administrative Specialist" },
    // Coast Guard
    { pattern: /^(BM|OS|MK)/i, title: "Maritime Operations Specialist" },
];

export interface TranslationResult {
    original: string;
    translated: string;
    suggestions: string[];
    confidence: number;
}

export interface MilitaryProfile {
    jobTitle?: string;
    rank?: string;
    branch?: string;
    duties?: string;
    achievements?: string;
    jobCode?: string;
    jobCodeBranch?: string;
    targetJobTitle?: string;
    yearsOfService?: number;
    securityClearance?: string;
    skillLevel?: string;
    deploymentHistory?: string;
    leadershipCourses?: string[];
    collateralDuties?: string[];
    certificationsEarned?: string;
}

export interface TrainingEntry {
    program: string;
    hours: number;
    weeks?: number;
    topics: string[];
    civilianCerts: string[];
    aceCredits?: string;
}

export interface CertEquivalency {
    directQualifies: string[];
    partialCoverage: Array<{ cert: string; coverage: number; gaps: string }>;
    recommendedNext: string[];
}

export interface CareerPathway {
    role: string;
    matchLevel: "High match" | "Good match" | "Moderate match";
    avgSalary: number;
    demand: "Very high demand" | "High demand" | "Growing demand" | "Stable demand";
    skillsToClose?: string[];
    salaryRange?: { p25: number; p75: number };
    topSkillsInDemand?: string[];
    dataSource?: "lightcast" | "census_acs" | "curated";
}

export interface CognitiveSkill {
    skill: string;
    militaryContext: string;
    civilianTranslation: string;
}

export interface NonObviousCareer {
    role: string;
    whyItFits: string;
    socCode: string;
}

export interface CognitiveProfile {
    cognitiveSkills: CognitiveSkill[];
    nonObviousCareers: NonObviousCareer[];
}

export interface TranslatedProfile {
    jobTitle: string;
    summary: string;
    keyResponsibilities: string[];
    achievements: string[];
    suggestions?: string[];
    targetJobTitle?: string;
    training?: TrainingEntry;
    technicalSystems?: Array<{ military: string; civilian: string }>;
    certPathways?: CertEquivalency;
    careerPathways?: CareerPathway[];
    cognitiveProfile?: CognitiveProfile;
}

/**
 * Replace military terminology with civilian equivalents
 */
function replaceTerminology(text: string): string {
    let result = text;

    // Sort by length (longest first) to avoid partial replacements
    const sortedTerms = Object.entries(MILITARY_TERMINOLOGY).sort(
        ([a], [b]) => b.length - a.length
    );

    for (const [military, civilian] of sortedTerms) {
        // Case-insensitive replacement
        const regex = new RegExp(`\\b${military}\\b`, "gi");
        result = result.replace(regex, civilian);
    }

    return result;
}

/**
 * Translate military job title / MOS code to civilian equivalent
 */
export function translateJobTitle(militaryTitle: string): string {
    const normalized = militaryTitle.toLowerCase().trim();

    // Check for exact match in job title dictionary
    if (JOB_TITLE_MAPPINGS[normalized]) {
        return JOB_TITLE_MAPPINGS[normalized];
    }

    // Check for partial match
    for (const [military, civilian] of Object.entries(JOB_TITLE_MAPPINGS)) {
        if (normalized.includes(military)) {
            return civilian;
        }
    }

    // Check MOS code patterns (handles alphanumeric codes like 3P0X1, 11B, 68W)
    for (const { pattern, title } of MOS_CODE_PATTERNS) {
        if (pattern.test(militaryTitle.trim())) {
            return title;
        }
    }

    // Fallback: apply terminology replacement
    const translated = replaceTerminology(militaryTitle);
    // If it still looks like a raw code (mostly alphanumeric), give a generic title
    if (/^[A-Z0-9]{2,6}$/i.test(translated.trim())) {
        return "Operations Professional";
    }
    return translated;
}

/**
 * Translate a single military duty/responsibility to civilian language
 * Uses dictionary-based translation for instant, reliable results
 */
export async function translateDuty(duty: string): Promise<TranslationResult> {
    const translated = replaceTerminology(duty);
    const suggestions = getSuggestions(translated);

    return {
        original: duty,
        translated,
        suggestions,
        confidence: 0.95,
    };
}

/**
 * Translate entire military profile to civilian resume format using AI
 */
export async function translateMilitaryProfile(
    profile: MilitaryProfile
): Promise<TranslatedProfile> {
    try {
        const response = await fetch("/api/military-resume/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jobTitle: profile.jobTitle || "",
                rank: profile.rank || "",
                branch: profile.branch || "",
                duties: profile.duties || "",
                achievements: profile.achievements || "",
                jobCode: profile.jobCode,
                jobCodeBranch: profile.jobCodeBranch,
            }),
        });

        if (!response.ok) {
            console.warn("AI translation failed, using fallback");
            return fallbackTranslation(profile);
        }

        const translated = await response.json();
        return translated;
    } catch (error) {
        console.error("Profile translation error:", error);
        return fallbackTranslation(profile);
    }
}

// ─── Fallback translator helpers ────────────────────────────────────────────

/**
 * Phrases that are noise / metadata — not real resume bullets
 */
const JUNK_PATTERNS = [
    /^shredouts?:/i,
    /^note:/i,
    /^see /i,
    /^and\s/i,
    /^or\s/i,
    /^the\s+(soldier|marine|sailor|airman|coast guardsman)/i,
    /^[A-Z]-\s/,            // "A- Military Working Dog handler" shredout codes
    /^[A-Z0-9]{1,4}\s*-\s/, // "B- Combat Arms" shredout codes
];

/**
 * Action verbs to prepend when a bullet doesn't start with one
 */
const VERB_MAP: Array<{ keywords: RegExp; verb: string }> = [
    { keywords: /supervis|lead|manag|direct|command/i, verb: "Supervised" },
    { keywords: /train|instruct|mentor|coach|develop.*program/i, verb: "Trained" },
    { keywords: /inspect|evaluat|assess|review|audit/i, verb: "Evaluated" },
    { keywords: /plan|coordinat|schedul|organiz/i, verb: "Coordinated" },
    { keywords: /maintain|repair|servic|overhaul/i, verb: "Maintained" },
    { keywords: /enforce|ensur|compliance|regulat|polic/i, verb: "Enforced" },
    { keywords: /operat|employ|utiliz|execut/i, verb: "Operated" },
    { keywords: /secur|protect|defend|guard|patrol/i, verb: "Secured" },
    { keywords: /communicat|brief|present|report|inform/i, verb: "Communicated" },
    { keywords: /analyz|research|investigat|monitor/i, verb: "Analyzed" },
    { keywords: /implement|establish|develop|creat|design/i, verb: "Implemented" },
    { keywords: /process|administer|document|record/i, verb: "Processed" },
];

/**
 * Split a long block of text into individual duty phrases.
 */
function splitIntoDuties(text: string): string[] {
    const lines = text.split("\n").filter((l) => l.trim());
    const duties: string[] = [];

    for (const line of lines) {
        // Split on semicolons (common in MOS descriptions)
        const segments = line.split(";").map((s) => s.trim()).filter(Boolean);
        for (const seg of segments) {
            // If still very long, split on sentence boundaries
            if (seg.length > 200) {
                const sentences = seg
                    .split(/(?<=[.!?])\s+/)
                    .map((s) => s.trim())
                    .filter((s) => s.length > 20);
                duties.push(...sentences);
            } else if (seg.length > 20) {
                duties.push(seg);
            }
        }
    }

    return duties;
}

/**
 * Check if a duty fragment is junk/metadata that shouldn't be a bullet
 */
function isJunk(text: string): boolean {
    const trimmed = text.trim();
    if (trimmed.length < 25) return true; // too short to be meaningful
    if (JUNK_PATTERNS.some((p) => p.test(trimmed))) return true;
    return false;
}

/**
 * Convert a raw duty phrase into a proper STAR-format resume bullet:
 * Action Verb + What + Context/Result
 */
function toBullet(text: string): string {
    let result = text.trim();

    // Strip trailing period
    result = result.replace(/\.\s*$/, "");

    // Strip leading filler phrases
    result = result.replace(
        /^(responsible for |duties include[d]?\s*|assists?\s+(in |with )?|performs?\s+(duties\s+)?(as\s+)?(a\s+)?|serves?\s+(as\s+)?(a\s+|the\s+)?|provides?\s+)/i,
        ""
    );

    // Capitalize first letter
    result = result.charAt(0).toUpperCase() + result.slice(1);

    // Replace military terms with civilian equivalents
    result = replaceTerminology(result);

    // Check if it already starts with an action verb
    const lower = result.toLowerCase();
    const KNOWN_ACTION_VERBS = [
        "accomplished", "achieved", "administered", "analyzed", "assigned",
        "built", "calculated", "chaired", "coached", "collaborated",
        "communicated", "compiled", "completed", "coordinated", "created",
        "delivered", "designed", "developed", "directed", "documented",
        "enforced", "engineered", "ensured", "established", "evaluated",
        "executed", "facilitated", "generated", "guided", "identified",
        "implemented", "improved", "inspected", "installed", "instructed",
        "investigated", "launched", "led", "maintained", "managed",
        "mentored", "monitored", "negotiated", "operated", "optimized",
        "organized", "oversaw", "performed", "planned", "prepared",
        "presented", "processed", "produced", "programmed", "provided",
        "recommended", "reduced", "reorganized", "reported", "reviewed",
        "scheduled", "secured", "spearheaded", "standardized", "streamlined",
        "strengthened", "supervised", "supported", "trained", "translated",
        "upgraded", "validated", "verified",
    ];
    const alreadyHasVerb = KNOWN_ACTION_VERBS.some((v) => lower.startsWith(v));

    if (!alreadyHasVerb) {
        // Try to infer a good action verb from the content
        let prepended = false;
        for (const { keywords, verb } of VERB_MAP) {
            if (keywords.test(result)) {
                result = `${verb} ${result.charAt(0).toLowerCase()}${result.slice(1)}`;
                prepended = true;
                break;
            }
        }
        if (!prepended) {
            result = `Managed ${result.charAt(0).toLowerCase()}${result.slice(1)}`;
        }
    }

    // Truncate to ~150 chars at a word boundary
    if (result.length > 150) {
        result = result.slice(0, 147).replace(/\s+\S*$/, "");
    }

    // Strip trailing period again (in case terminology replacement added one)
    result = result.replace(/\.\s*$/, "");

    return result;
}

/**
 * Fallback translation using dictionary-based approach.
 * Produces concise, scannable bullets following Harvard/STAR format.
 */
export function fallbackTranslation(profile: MilitaryProfile): TranslatedProfile {
    // Translate job title — handle raw MOS codes
    const civilianTitle = profile.jobTitle
        ? translateJobTitle(profile.jobTitle)
        : "Operations Professional";

    // Build professional summary
    const rank = profile.rank || "";
    const branch = profile.branch ? profile.branch.replace(/^U\.S\.\s*/i, "") : "";
    const years = profile.yearsOfService;
    const clearance = profile.securityClearance && profile.securityClearance !== "None"
        ? profile.securityClearance
        : null;

    const yearsPrefix = years ? `${years}+ years of` : "";
    const clearanceSuffix = clearance ? `. Holds an active ${clearance} security clearance` : "";

    let summary: string;
    if (rank) {
        const expPhrase = yearsPrefix
            ? `with ${yearsPrefix} ${rank}-level leadership experience`
            : `with ${rank}-level leadership experience`;
        summary = `Results-driven ${civilianTitle.toLowerCase()} ${expPhrase}${branch ? ` in the ${branch}` : ""}. Proven expertise in team leadership, operations management, and organizational efficiency. Skilled in training, compliance, and cross-functional coordination${clearanceSuffix}`;
    } else {
        const expPhrase = yearsPrefix
            ? `with ${yearsPrefix} leadership and operational experience`
            : "with proven leadership and operational experience";
        summary = `Dedicated ${civilianTitle.toLowerCase()} ${expPhrase}. Skilled in team management, strategic planning, and process optimization${clearanceSuffix}`;
    }

    // Split duty text → filter junk → convert to STAR bullets → deduplicate → cap at 8
    const rawDuties = profile.duties ? splitIntoDuties(profile.duties) : [];
    const bullets = rawDuties
        .filter((d) => !isJunk(d))
        .map((d) => toBullet(d))
        .filter((d) => d.length > 30);

    const seen = new Set<string>();
    const uniqueDuties: string[] = [];
    for (const bullet of bullets) {
        // Deduplicate by first 50 chars lowercase
        const key = bullet.toLowerCase().slice(0, 50);
        if (!seen.has(key)) {
            seen.add(key);
            uniqueDuties.push(bullet);
        }
        if (uniqueDuties.length >= 8) break;
    }

    // Achievements
    const rawAchievements = profile.achievements
        ? splitIntoDuties(profile.achievements)
        : [];
    const translatedAchievements = rawAchievements
        .filter((a) => !isJunk(a))
        .map((a) => toBullet(a))
        .filter((a) => a.length > 30)
        .slice(0, 4);

    return {
        jobTitle: civilianTitle,
        summary,
        keyResponsibilities: uniqueDuties,
        achievements: translatedAchievements,
    };
}

/**
 * Batch translate multiple duties
 */
export async function translateDuties(duties: string[]): Promise<TranslationResult[]> {
    const results: TranslationResult[] = [];

    for (const duty of duties) {
        if (duty.trim()) {
            const result = await translateDuty(duty);
            results.push(result);
        }
    }

    return results;
}

/**
 * Harvard-recommended action verbs by category
 */
const ACTION_VERBS_CHECK = [
    "accomplished", "achieved", "administered", "analyzed", "assigned", "attained",
    "built", "chaired", "coached", "collaborated", "communicated", "compiled",
    "completed", "consolidated", "coordinated", "created", "delegated", "delivered",
    "designed", "developed", "directed", "documented", "drafted", "enforced",
    "engineered", "established", "evaluated", "executed", "facilitated", "generated",
    "guided", "headed", "identified", "implemented", "improved", "inspected",
    "installed", "instructed", "investigated", "launched", "led", "maintained",
    "managed", "mentored", "monitored", "operated", "optimized", "organized",
    "oversaw", "performed", "planned", "presented", "processed", "produced",
    "programmed", "recommended", "reduced", "reorganized", "reviewed", "scheduled",
    "secured", "spearheaded", "standardized", "streamlined", "strengthened",
    "supervised", "supported", "trained", "translated", "upgraded", "validated",
    "verified",
];

/**
 * Get suggestions for improving a translated duty (Harvard resume standards)
 */
export function getSuggestions(translatedDuty: string): string[] {
    const suggestions: string[] = [];
    const lower = translatedDuty.toLowerCase().trim();

    // Personal pronouns
    if (/\b(i|me|my|we|our)\b/i.test(translatedDuty)) {
        suggestions.push("Remove personal pronouns (I, me, my, we, our) — use phrases, not sentences");
    }

    // Action verb check
    const startsWithActionVerb = ACTION_VERBS_CHECK.some((verb) => lower.startsWith(verb));
    if (!startsWithActionVerb) {
        suggestions.push("Start with a strong action verb (e.g., Led, Managed, Developed, Coordinated)");
    }

    // Quantification
    if (!/\d+/.test(translatedDuty)) {
        suggestions.push("Quantify your impact — add numbers, percentages, dollar amounts, or team sizes");
    }

    // Impact/outcome
    if (!/result|improv|increas|reduc|sav|enhanc|optimi|achiev|boost|grew|eliminat/i.test(translatedDuty)) {
        suggestions.push("Convey impact: what you did, how you did it, and the measurable result");
    }

    return suggestions;
}

/**
 * Format translated profile for download/export
 * Follows Harvard Extension School resume template structure
 */
export function formatForResume(profile: TranslatedProfile): string {
    let resume = "";

    resume += `${profile.jobTitle.toUpperCase()}\n\n`;
    resume += `Professional Summary\n`;
    resume += `${profile.summary}\n\n`;

    if (profile.keyResponsibilities.length > 0) {
        resume += `Professional Experience\n`;
        for (const resp of profile.keyResponsibilities) {
            const clean = resp.replace(/\.\s*$/, "");
            resume += `  • ${clean}\n`;
        }
        resume += "\n";
    }

    if (profile.achievements.length > 0) {
        resume += `Key Achievements\n`;
        for (const achievement of profile.achievements) {
            const clean = achievement.replace(/\.\s*$/, "");
            resume += `  • ${clean}\n`;
        }
        resume += "\n";
    }

    if (profile.technicalSystems && profile.technicalSystems.length > 0) {
        resume += `Technical Skills\n`;
        for (const sys of profile.technicalSystems) {
            resume += `  • ${sys.civilian}\n`;
        }
        resume += "\n";
    }

    if (profile.training) {
        resume += `Training & Education\n`;
        resume += `  ${profile.training.program}\n`;
        resume += `  ${profile.training.hours.toLocaleString()} training hours`;
        if (profile.training.weeks) {
            resume += ` (${profile.training.weeks} weeks)`;
        }
        resume += "\n";
        if (profile.training.aceCredits) {
            resume += `  ${profile.training.aceCredits}\n`;
        }
        if (profile.training.civilianCerts.length > 0) {
            resume += `  Civilian Certifications: ${profile.training.civilianCerts.join(", ")}\n`;
        }
        resume += "\n";
    }

    if (profile.certPathways) {
        if (profile.certPathways.directQualifies.length > 0) {
            resume += `Certifications (Ready to Certify)\n`;
            for (const cert of profile.certPathways.directQualifies) {
                resume += `  • ${cert}\n`;
            }
            resume += "\n";
        }
    }

    if (profile.suggestions && profile.suggestions.length > 0) {
        resume += `Suggestions for Improvement\n`;
        for (const suggestion of profile.suggestions) {
            resume += `  - ${suggestion}\n`;
        }
    }

    return resume;
}
