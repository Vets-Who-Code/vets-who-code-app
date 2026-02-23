import { generateText } from "ai";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getAIModelWithFallback } from "@/lib/ai-provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type {
    TrainingEntry,
    CertEquivalency,
    CareerPathway,
    CognitiveProfile,
} from "@/lib/military-translator";

export interface TranslateRequest {
    jobTitle: string;
    rank: string;
    branch: string;
    duties: string;
    achievements: string;
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

export interface TranslateResponse {
    jobTitle: string;
    summary: string;
    keyResponsibilities: string[];
    achievements: string[];
    suggestions: string[];
    training?: TrainingEntry;
    technicalSystems?: Array<{ military: string; civilian: string }>;
    certPathways?: CertEquivalency;
    careerPathways?: CareerPathway[];
    cognitiveProfile?: CognitiveProfile;
}

// Match real MOS/rating formats from the jobTitle field (only used when
// jobCode is not provided). Two branches:
//   1) 3-4 uppercase letters — Navy/CG ratings like CTN, AMCS, ABH
//      (2-letter ratings like HM, IT are excluded since they collide with
//      common abbreviations; they're always submitted via the jobCode field)
//   2) Digit-leading alphanumeric — Army 11B, USMC 0311, AF 3P0X1
const MOS_CODE_FORMAT = /^([A-Z]{3,4}|\d[A-Za-z0-9]{1,6})$/;

// Resolve the MOS lookup key — normalize job code for data file lookup
function getMosKey(jobCode?: string, jobTitle?: string): string | null {
    if (jobCode) return jobCode.toUpperCase().trim();
    if (jobTitle) {
        const cleaned = jobTitle.trim();
        if (MOS_CODE_FORMAT.test(cleaned)) return cleaned.toUpperCase();
    }
    return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Rate limit: 10 AI translations per 15 minutes per IP
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip, 10, 15 * 60 * 1000);
    res.setHeader("X-RateLimit-Remaining", limit.remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(limit.resetAt / 1000));
    if (!limit.allowed) {
        return res.status(429).json({
            error: "Too many translation requests. Please try again in a few minutes.",
        });
    }

    try {
        const {
            jobTitle, rank, branch, duties, achievements,
            jobCode, jobCodeBranch, targetJobTitle,
            yearsOfService, securityClearance,
            skillLevel, deploymentHistory,
            leadershipCourses, collateralDuties, certificationsEarned,
        } = req.body as TranslateRequest;

        // Validate required fields
        if (!jobTitle || !rank || !branch || !duties) {
            return res.status(400).json({
                error: "Missing required fields: jobTitle, rank, branch, and duties are required.",
            });
        }

        if (yearsOfService == null || yearsOfService < 1 || yearsOfService > 40) {
            return res.status(400).json({
                error: "Years of service is required and must be between 1 and 40.",
            });
        }

        // Get AI model with fallback
        const aiModel = await getAIModelWithFallback();

        if (!aiModel) {
            return res.status(503).json({
                error: "AI service unavailable. Please configure AI provider API keys.",
            });
        }

        const mosKey = getMosKey(jobCode, jobTitle);

        const layerWarnings: string[] = [];

        // ─── Layer 1: Official MOS Description ──────────────────────────────
        let officialDescription = "";
        if (jobCode && jobCodeBranch) {
            try {
                const descriptions = (await import("@data/job-codes-descriptions.json")).default as Record<string, string>;
                const key = `${jobCodeBranch}:${jobCode}`;
                officialDescription = descriptions[key] ?? "";
            } catch (err) {
                console.warn("Layer 1 (MOS description) failed:", err);
                layerWarnings.push("job-codes-descriptions");
            }
        }

        const officialContext = officialDescription
            ? `\nOfficial MOS/Rating Description (${jobCode}):\n${officialDescription}\n`
            : "";

        const targetJobContext = targetJobTitle
            ? `\nTARGET ROLE: Tailor the resume specifically for a "${targetJobTitle}" position. Use keywords and framing that align with this target role. The civilian job title in your output should reflect this target.\n`
            : "";

        // ─── Layer 2: Skill Level Progression ───────────────────────────────
        let skillLevelContext = "";
        if (skillLevel) {
            const SKILL_LEVEL_FRAMING: Record<string, string> = {
                "10": "SKILL LEVEL 10 (Apprentice): Frame as entry-level associate. Use verbs like 'Executed', 'Supported', 'Assisted'. Emphasize training completed and foundational skills.",
                "20": "SKILL LEVEL 20 (Journeyman): Frame as mid-level specialist. Use verbs like 'Performed', 'Operated', 'Maintained'. Emphasize independent work and technical proficiency.",
                "30": "SKILL LEVEL 30 (Advanced): Frame as senior specialist / team lead. Use verbs like 'Led', 'Supervised', 'Trained'. Emphasize team leadership and mentoring.",
                "40": "SKILL LEVEL 40 (Senior): Frame as manager / director. Use verbs like 'Managed', 'Directed', 'Oversaw'. Emphasize organizational leadership and program management.",
            };
            if (SKILL_LEVEL_FRAMING[skillLevel]) {
                skillLevelContext = `\n${SKILL_LEVEL_FRAMING[skillLevel]}\n`;
            }
        }

        // ─── Layer 3: Technical Systems ─────────────────────────────────────
        let technicalSystemsContext = "";
        let technicalSystemsData: Array<{ military: string; civilian: string }> = [];
        if (mosKey) {
            try {
                const systemsMap = JSON.parse(
                    fs.readFileSync(path.join(process.cwd(), "src/data/military-systems-map.json"), "utf-8")
                ) as Record<string, { systems: Array<{ military: string; civilian: string }> }>;
                const entry = systemsMap[mosKey];
                if (entry?.systems) {
                    technicalSystemsData = entry.systems;
                    const systemsList = entry.systems
                        .map((s) => `  - ${s.military} → ${s.civilian}`)
                        .join("\n");
                    technicalSystemsContext = `\nTECHNICAL SYSTEMS (translate these to civilian equivalents in bullets where relevant):\n${systemsList}\n`;
                }
            } catch (err) {
                console.warn("Layer 3 (technical systems) failed:", err);
                layerWarnings.push("military-systems-map");
            }
        }

        // ─── Layer 4: Training Pipeline ─────────────────────────────────────
        let trainingContext = "";
        let trainingData: TrainingEntry | undefined;
        if (mosKey) {
            try {
                const pipeline = JSON.parse(
                    fs.readFileSync(path.join(process.cwd(), "src/data/training-pipeline.json"), "utf-8")
                ) as Record<string, {
                    program: string; hours: number; weeks?: number;
                    topics: string[]; civilian_certs: string[]; ace_credits?: string;
                }>;
                const entry = pipeline[mosKey];
                if (entry) {
                    trainingData = {
                        program: entry.program,
                        hours: entry.hours,
                        weeks: entry.weeks,
                        topics: entry.topics,
                        civilianCerts: entry.civilian_certs,
                        aceCredits: entry.ace_credits,
                    };
                    trainingContext = `\nFORMAL TRAINING: Completed ${entry.hours.toLocaleString()} hours of formal training in ${entry.program}. Topics: ${entry.topics.join(", ")}. Civilian cert equivalencies: ${entry.civilian_certs.join(", ")}. Mention training hours in summary when relevant.\n`;
                }
            } catch (err) {
                console.warn("Layer 4 (training pipeline) failed:", err);
                layerWarnings.push("training-pipeline");
            }
        }

        // ─── Layer 5: Rank-Scope Matrix ─────────────────────────────────────
        let rankScopeContext = "";
        if (rank) {
            try {
                const rankToPaygrade = (await import("@data/rank-to-paygrade.json")).default as Record<string, string>;
                const rankScopeMatrix = (await import("@data/rank-scope-matrix.json")).default as Record<string, { direct_reports: string; equipment_value: string; decision_scope: string; civilian_equivalent: string }>;
                const paygrade = rankToPaygrade[rank.toLowerCase().trim()];
                if (paygrade && rankScopeMatrix[paygrade]) {
                    const scope = rankScopeMatrix[paygrade];
                    rankScopeContext = `\nRANK-SCOPE CONTEXT (${paygrade}):
- Supervised ${scope.direct_reports} direct reports
- Accountable for ${scope.equipment_value} in equipment/resources
- Decision scope: ${scope.decision_scope}
- Civilian equivalent: ${scope.civilian_equivalent}
Use these metrics to quantify leadership in summary and bullets.\n`;
                }
            } catch (err) {
                console.warn("Layer 5 (rank-scope matrix) failed:", err);
                layerWarnings.push("rank-scope-matrix");
            }
        }

        // ─── Layer 6: Collateral Duties ─────────────────────────────────────
        let collateralContext = "";
        if (collateralDuties && collateralDuties.length > 0) {
            try {
                const dutiesMap = (await import("@data/collateral-duties-map.json")).default as Record<string, { label: string; bullet: string; skills: string[] }>;
                const bullets: string[] = [];
                for (const dutyKey of collateralDuties) {
                    const entry = dutiesMap[dutyKey];
                    if (entry) {
                        bullets.push(`  - ${entry.label}: ${entry.bullet}`);
                    }
                }
                if (bullets.length > 0) {
                    collateralContext = `\nCOLLATERAL DUTIES (incorporate these as additional resume bullets — they represent real additional responsibilities held):\n${bullets.join("\n")}\n`;
                }
            } catch (err) {
                console.warn("Layer 6 (collateral duties) failed:", err);
                layerWarnings.push("collateral-duties-map");
            }
        }

        // ─── Layer 7: Deployment Context ────────────────────────────────────
        let deploymentContext = "";
        if (deploymentHistory && deploymentHistory !== "none") {
            try {
                const contextMap = (await import("@data/deployment-context-map.json")).default as Record<string, { summary_addition: string; bullets: string[] }>;
                const entry = contextMap[deploymentHistory];
                if (entry) {
                    deploymentContext = `\nDEPLOYMENT EXPERIENCE: ${entry.summary_addition}. Add to professional summary.`;
                    if (entry.bullets.length > 0) {
                        deploymentContext += `\nDeployment bullets to weave in:\n${entry.bullets.map((b) => `  - ${b}`).join("\n")}`;
                    }
                    deploymentContext += "\n";
                }
            } catch (err) {
                console.warn("Layer 7 (deployment context) failed:", err);
                layerWarnings.push("deployment-context-map");
            }
        }

        // ─── Layer 8: Adjacent MOS Awareness ────────────────────────────────
        let adjacentContext = "";
        if (mosKey) {
            try {
                const adjacentMap = (await import("@data/adjacent-mos-map.json")).default as Record<string, { works_with: string[]; civilian_statement: string }>;
                const entry = adjacentMap[mosKey];
                if (entry) {
                    adjacentContext = `\nCROSS-FUNCTIONAL EXPERIENCE: ${entry.civilian_statement}. Weave this into the summary or add as a bullet.\n`;
                }
            } catch (err) {
                console.warn("Layer 8 (adjacent MOS) failed:", err);
                layerWarnings.push("adjacent-mos-map");
            }
        }

        // ─── Layer 9: Certification Equivalencies ───────────────────────────
        let certContext = "";
        let certData: CertEquivalency | undefined;
        if (mosKey) {
            try {
                const certMap = JSON.parse(
                    fs.readFileSync(path.join(process.cwd(), "src/data/cert-equivalencies.json"), "utf-8")
                ) as Record<string, {
                    direct_qualifies: string[];
                    partial_coverage: Array<{ cert: string; coverage: number; gaps: string }>;
                    recommended_next: string[];
                }>;
                const entry = certMap[mosKey];
                if (entry) {
                    certData = {
                        directQualifies: entry.direct_qualifies,
                        partialCoverage: entry.partial_coverage,
                        recommendedNext: entry.recommended_next,
                    };
                    const parts: string[] = [];
                    if (entry.direct_qualifies.length > 0) {
                        parts.push(`Ready to certify: ${entry.direct_qualifies.join(", ")}`);
                    }
                    if (entry.partial_coverage.length > 0) {
                        const partial = entry.partial_coverage
                            .map((p) => `${p.cert} (${p.coverage}% covered — gaps: ${p.gaps})`)
                            .join("; ");
                        parts.push(`Partial coverage: ${partial}`);
                    }
                    if (entry.recommended_next.length > 0) {
                        parts.push(`Recommended next: ${entry.recommended_next.join(", ")}`);
                    }
                    if (parts.length > 0) {
                        certContext = `\nCERTIFICATION EQUIVALENCIES:\n${parts.map((p) => `  - ${p}`).join("\n")}\nMention certifications the veteran is ready to earn in the summary or bullets where relevant.\n`;
                    }
                }
            } catch (err) {
                console.warn("Layer 9 (cert equivalencies) failed:", err);
                layerWarnings.push("cert-equivalencies");
            }
        }

        // ─── Layer 10: Cognitive Skills ─────────────────────────────────────
        let cognitiveData: CognitiveProfile | undefined;
        if (mosKey) {
            try {
                const cognitiveMap = JSON.parse(
                    fs.readFileSync(path.join(process.cwd(), "src/data/cognitive-skills-map.json"), "utf-8")
                ) as Record<string, CognitiveProfile>;
                const entry = cognitiveMap[mosKey];
                if (entry) {
                    cognitiveData = entry;
                }
            } catch (err) {
                console.warn("Layer 10 (cognitive skills) failed:", err);
                layerWarnings.push("cognitive-skills-map");
            }
        }

        // ─── Years, Clearance, Certifications ───────────────────────────────
        const yearsContext = yearsOfService
            ? `\nYEARS: ${yearsOfService} years of military service. Quantify in summary.\n`
            : "";

        const clearanceContext = securityClearance && securityClearance !== "None"
            ? `\nSECURITY CLEARANCE: ${securityClearance}. Mention in summary — high-value differentiator.\n`
            : "";

        const certsEarnedContext = certificationsEarned
            ? `\nCERTIFICATIONS EARNED: ${certificationsEarned}. Include in resume output.\n`
            : "";

        const leadershipContext = leadershipCourses && leadershipCourses.length > 0
            ? `\nLEADERSHIP COURSES COMPLETED: ${leadershipCourses.join(", ")}. These represent formal leadership development — mention in summary or bullets.\n`
            : "";

        // ─── 4-6 Year Veteran Value Framework ──────────────────────────────
        let valueFrameworkContext = "";
        if (yearsOfService && yearsOfService >= 4 && yearsOfService <= 6) {
            const trainingHours = trainingData ? trainingData.hours : 1500;
            valueFrameworkContext = `
4-6 YEAR VETERAN VALUE FRAMEWORK:
This veteran has ${yearsOfService} years of progressive military service. This represents:
- ${trainingHours}+ hours of formal technical and leadership training
- ${yearsOfService} years of progressive responsibility in a structured environment
- Formal performance evaluations every 6-12 months
- Direct supervisory experience (use rank-scope data above for specifics)
- Multiple organizational transitions demonstrating adaptability
- This experience level equals or exceeds civilian peers with bachelor's degrees and 2-4 years of professional experience
Frame the summary to reflect this depth. Do NOT undersell this veteran.
`;
        }

        const veteranValueFramework = `
VETERAN VALUE FRAMEWORK:
Military veterans bring unique competencies most civilian candidates lack:
- Leadership under pressure — decision-making in high-stakes environments
- Mission-first accountability — results-driven ownership of outcomes
- Cross-functional collaboration — coordinating across diverse teams
- Adaptability — operating effectively in rapidly changing environments
- Training & development — building teams and running training programs
- Compliance & standards — regulatory frameworks, audits, quality assurance
- Resource management — accountable stewardship of personnel, equipment, budgets

Weave these naturally into summary and bullets. Do NOT list as a separate section.`;

        // ─── Build the comprehensive prompt ─────────────────────────────────
        const prompt = `You are an expert resume writer for Vets Who Code, a nonprofit that helps veterans transition into civilian careers. You translate military experience into polished, ATS-optimized civilian resumes. Follow Harvard Extension School resume standards and the STAR bullet format.

Your job is to decompress a veteran's military experience into its full civilian value. Military job codes are compressed archives of duties, skills, training, scope, and context. Go deep — don't just swap keywords.

Military Profile:
- Job Title/MOS: ${jobTitle}
- Rank: ${rank}
- Branch: ${branch}
- Duties: ${duties}
- Achievements: ${achievements}
${officialContext}${targetJobContext}${rankScopeContext}${skillLevelContext}${technicalSystemsContext}${trainingContext}${collateralContext}${deploymentContext}${adjacentContext}${certContext}${yearsContext}${clearanceContext}${certsEarnedContext}${leadershipContext}${valueFrameworkContext}
${veteranValueFramework}

TASK: Synthesize ALL the context above into a concise, powerful civilian resume. Decompose compound duty statements into atomic skills. Quantify everything using the rank-scope data. Do NOT just translate word-for-word — synthesize and consolidate.

OUTPUT FORMAT — respond with ONLY this JSON, no other text:
{
  "jobTitle": "civilian job title",
  "summary": "2-3 sentence professional summary, no pronouns",
  "keyResponsibilities": ["bullet 1", "bullet 2", ...],
  "achievements": ["bullet 1", "bullet 2", ...],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

STRICT BULLET RULES:
1. STAR FORMAT: each bullet = Action Verb + What You Did + Result/Impact
   GOOD: "Supervised cross-functional team of 12 across 3 departments, reducing project delivery time by 30%"
   BAD: "Responsible for supervising personnel and ensuring adherence to policies and procedures for the organization"
2. MAX 6-8 bullets for keyResponsibilities, MAX 4 bullets for achievements — pick the strongest, most transferable ones
3. Each bullet MUST be 1 line (under 120 characters when possible, never over 150)
4. Every bullet STARTS with a past-tense action verb: Led, Managed, Developed, Coordinated, Implemented, Streamlined, Supervised, Trained, Analyzed, Reduced, Designed, Executed, Optimized, Directed, Maintained
5. NO personal pronouns (I, me, my, we, our) — ever
6. NO periods at end of bullets
7. NO military jargon or acronyms — translate ALL terms to civilian equivalents
8. QUANTIFY everything possible: team sizes, dollar amounts, percentages, counts
9. Focus on TRANSFERABLE skills: leadership, project management, training, operations, logistics, communication, technical skills
10. ATS KEYWORDS: use industry-standard job title terms, not military-specific ones

PROFESSIONAL SUMMARY RULES:
- 2-3 concise sentences, no pronouns
- Lead with years of experience + core expertise area
- Mention 2-3 key transferable strengths
- End with value proposition
- If security clearance provided, mention it
- If deployment experience provided, weave it in naturally
- Example: "Results-driven operations manager with 8+ years of experience leading cross-functional teams of up to 40 personnel. Proven track record in strategic planning, resource allocation, and process optimization. Skilled in training program development, compliance management, and stakeholder communication."

DO NOT:
- Copy long descriptions verbatim
- Create more than 8 responsibility bullets
- Write bullets longer than 1 line
- Use vague language like "responsible for" or "duties included"
- Use military acronyms (MOS, NCO, NCOER, NCODP, SOP, ROE, IFV, NBC, CMF, etc.)`;


        // Generate translation using AI
        const { text } = await generateText({
            model: aiModel.model,
            prompt,
            temperature: 0.7,
        });

        // Parse AI response
        let translatedProfile: TranslateResponse;

        try {
            // Try to parse JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                translatedProfile = {
                    ...parsed,
                    // Attach enrichment data from data files
                    training: trainingData,
                    technicalSystems: technicalSystemsData.length > 0 ? technicalSystemsData : undefined,
                    certPathways: certData,
                    cognitiveProfile: cognitiveData,
                };
            } else {
                throw new Error("No JSON found in response");
            }
        } catch (parseError) {
            // Fallback: create structured response from text
            console.error("Failed to parse AI response:", parseError);

            translatedProfile = {
                jobTitle,
                summary:
                    "Experienced professional with proven leadership and operational experience",
                keyResponsibilities: duties.split("\n").filter((d) => d.trim()),
                achievements: achievements ? achievements.split("\n").filter((a) => a.trim()) : [],
                suggestions: [
                    "Add specific numbers and metrics to quantify your impact",
                    "Start each bullet point with a strong action verb",
                    "Include the results or outcomes of your work",
                ],
                training: trainingData,
                technicalSystems: technicalSystemsData.length > 0 ? technicalSystemsData : undefined,
                certPathways: certData,
                cognitiveProfile: cognitiveData,
            };
        }

        if (layerWarnings.length > 0) {
            console.warn(
                `Translation for ${mosKey || jobTitle} completed with ${layerWarnings.length} degraded layer(s): ${layerWarnings.join(", ")}`
            );
            res.setHeader("X-Enrichment-Warnings", layerWarnings.join(","));
        }

        return res.status(200).json(translatedProfile);
    } catch (error) {
        console.error("Translation error:", error);
        return res.status(500).json({
            error: "Failed to translate resume. Please try again.",
        });
    }
}
