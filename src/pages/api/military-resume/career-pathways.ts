import type { NextApiRequest, NextApiResponse } from "next";
import type { CareerPathway } from "@/lib/military-translator";
import { fetchLaborMarketData } from "@/lib/labor-market";

interface CareerPathwaysRequest {
    jobCode?: string;
    jobTitle?: string;
    targetJobTitle?: string;
}

interface SocEntry {
    soc: string;
    role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { jobCode, jobTitle, targetJobTitle } = req.body as CareerPathwaysRequest;

        // Resolve MOS key
        let mosKey: string | null = null;
        if (jobCode) {
            mosKey = jobCode.toUpperCase().trim();
        } else if (jobTitle) {
            const cleaned = jobTitle.trim();
            if (/^[A-Z0-9]{2,7}$/i.test(cleaned)) {
                mosKey = cleaned.toUpperCase();
            }
        }

        if (!mosKey) {
            return res.status(200).json({ pathways: [] });
        }

        // Look up career pathways
        let pathways: CareerPathway[] = [];
        try {
            const pathwaysMap = (await import("@data/career-pathways-map.json")).default as Record<string, CareerPathway[]>;
            pathways = pathwaysMap[mosKey] || [];
        } catch {
            // Non-critical
        }

        // If a target job title is provided, prioritize matching pathways
        if (targetJobTitle && pathways.length > 0) {
            const target = targetJobTitle.toLowerCase();
            pathways.sort((a, b) => {
                const aMatch = a.role.toLowerCase().includes(target) ? -1 : 0;
                const bMatch = b.role.toLowerCase().includes(target) ? -1 : 0;
                return aMatch - bMatch;
            });
        }

        // Enrich pathways with live labor market data
        if (pathways.length > 0) {
            try {
                const socMap = (await import("@data/mos-to-soc-map.json")).default as Record<string, SocEntry[]>;
                const socEntries = socMap[mosKey] || [];

                if (socEntries.length > 0) {
                    const enriched = await Promise.all(
                        pathways.map(async (pathway) => {
                            // Find matching SOC entry by role name
                            const socEntry = socEntries.find((e) => e.role === pathway.role);
                            if (!socEntry) {
                                return { ...pathway, dataSource: "curated" as const };
                            }

                            const marketData = await fetchLaborMarketData(
                                socEntry.soc,
                                pathway.avgSalary,
                                pathway.demand
                            );

                            return {
                                ...pathway,
                                avgSalary: marketData.avgSalary,
                                demand: marketData.demand as CareerPathway["demand"],
                                salaryRange: marketData.salaryRange,
                                topSkillsInDemand: marketData.topSkillsInDemand,
                                dataSource: marketData.dataSource,
                            };
                        })
                    );

                    return res.status(200).json({ pathways: enriched });
                }
            } catch {
                // Enrichment failed — return static data with curated source
            }
        }

        // Fallback: return static data as-is
        const withSource = pathways.map((p) => ({ ...p, dataSource: "curated" as const }));
        return res.status(200).json({ pathways: withSource });
    } catch (error) {
        console.error("Career pathways error:", error);
        return res.status(500).json({ error: "Failed to load career pathways" });
    }
}
