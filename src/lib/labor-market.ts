/**
 * Labor market data orchestrator
 * Three-tier fallback: Lightcast → Census ACS → static curated data
 */

import { isLightcastConfigured, fetchSalaryBySOC, validateLightcastConfig } from "./lightcast-client";
import { isCensusConfigured, fetchCensusSalary, validateCensusConfig } from "./census-client";

export interface EnrichedSalaryData {
    avgSalary: number;
    salaryRange?: { p25: number; p75: number };
    demand: string;
    topSkillsInDemand?: string[];
    dataSource: "lightcast" | "census_acs" | "curated";
    dataAge?: string;
}

// Log configuration status once on first import
let configValidated = false;
function validateOnce(): void {
    if (configValidated) return;
    configValidated = true;

    validateLightcastConfig();
    validateCensusConfig();

    if (!isLightcastConfigured() && !isCensusConfigured()) {
        console.info(
            "Labor market: no external APIs configured. " +
            "Career pathways will use curated salary data. " +
            "Set LIGHTCAST_CLIENT_ID + LIGHTCAST_CLIENT_SECRET and/or CENSUS_API_KEY for live data."
        );
    }
}

export async function fetchLaborMarketData(
    socCode: string,
    fallbackSalary: number,
    fallbackDemand: string
): Promise<EnrichedSalaryData> {
    validateOnce();

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
        } catch (err) {
            console.warn(`Labor market: Lightcast failed for SOC ${socCode}, trying Census:`, err);
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
        } catch (err) {
            console.warn(`Labor market: Census failed for SOC ${socCode}, using curated:`, err);
        }
    }

    // Tier 3: Static curated data
    return {
        avgSalary: fallbackSalary,
        demand: fallbackDemand,
        dataSource: "curated",
    };
}
