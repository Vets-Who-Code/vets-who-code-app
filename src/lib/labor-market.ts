/**
 * Labor market data orchestrator
 * Three-tier fallback: Lightcast → Census ACS → static curated data
 */

import { isLightcastConfigured, fetchSalaryBySOC } from "./lightcast-client";
import { isCensusConfigured, fetchCensusSalary } from "./census-client";

export interface EnrichedSalaryData {
    avgSalary: number;
    salaryRange?: { p25: number; p75: number };
    demand: string;
    topSkillsInDemand?: string[];
    dataSource: "lightcast" | "census_acs" | "curated";
    dataAge?: string;
}

export async function fetchLaborMarketData(
    socCode: string,
    fallbackSalary: number,
    fallbackDemand: string
): Promise<EnrichedSalaryData> {
    // Tier 1: Lightcast
    if (isLightcastConfigured()) {
        try {
            const lightcast = await fetchSalaryBySOC(socCode);
            if (lightcast && lightcast.medianSalary > 0) {
                return {
                    avgSalary: lightcast.medianSalary,
                    salaryRange: { p25: lightcast.pct25Salary, p75: lightcast.pct75Salary },
                    demand: lightcast.demandLevel,
                    topSkillsInDemand: lightcast.topSkills.length > 0 ? lightcast.topSkills : undefined,
                    dataSource: "lightcast",
                    dataAge: "Updated monthly",
                };
            }
        } catch {
            // Fall through to next tier
        }
    }

    // Tier 2: Census ACS
    if (isCensusConfigured()) {
        try {
            const census = await fetchCensusSalary(socCode);
            if (census && census.medianEarnings > 0) {
                return {
                    avgSalary: census.medianEarnings,
                    demand: fallbackDemand, // Census has no demand data
                    dataSource: "census_acs",
                    dataAge: "ACS 2023 estimates",
                };
            }
        } catch {
            // Fall through to static
        }
    }

    // Tier 3: Static curated data
    return {
        avgSalary: fallbackSalary,
        demand: fallbackDemand,
        dataSource: "curated",
    };
}
