/**
 * Census Bureau / ACS API client
 * Fetches occupation earnings from ACS Subject Tables (S2401 series)
 */

export interface CensusSalaryData {
    soc: string;
    medianEarnings: number;
    source: "census_acs";
}

// Cache: SOC code → { data, fetchedAt }
const censusCache = new Map<string, { data: CensusSalaryData; fetchedAt: number }>();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days (ACS data updates annually)

const ACS_BASE = "https://api.census.gov/data";
const FETCH_TIMEOUT = 5000;

// Map SOC major groups to ACS S2401 variable codes for median earnings
// These cover the major occupation groups in the S2401 subject table
const SOC_TO_ACS_VARIABLE: Record<string, string> = {
    "11": "S2401_C01_002E", // Management occupations
    "13": "S2401_C01_003E", // Business and financial operations
    "15": "S2401_C01_004E", // Computer and mathematical
    "17": "S2401_C01_005E", // Architecture and engineering
    "19": "S2401_C01_006E", // Life, physical, and social science
    "21": "S2401_C01_008E", // Community and social service
    "23": "S2401_C01_009E", // Legal
    "25": "S2401_C01_010E", // Educational instruction and library
    "27": "S2401_C01_011E", // Arts, design, entertainment, sports
    "29": "S2401_C01_012E", // Healthcare practitioners and technical
    "31": "S2401_C01_014E", // Healthcare support
    "33": "S2401_C01_015E", // Protective service
    "35": "S2401_C01_016E", // Food preparation and serving
    "37": "S2401_C01_017E", // Building and grounds cleaning
    "39": "S2401_C01_018E", // Personal care and service
    "41": "S2401_C01_019E", // Sales and related
    "43": "S2401_C01_020E", // Office and administrative support
    "45": "S2401_C01_022E", // Farming, fishing, and forestry
    "47": "S2401_C01_023E", // Construction and extraction
    "49": "S2401_C01_024E", // Installation, maintenance, and repair
    "51": "S2401_C01_025E", // Production
    "53": "S2401_C01_026E", // Transportation and material moving
};

export function isCensusConfigured(): boolean {
    return !!process.env.CENSUS_API_KEY;
}

async function fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
        return await fetch(url, { signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
}

export async function fetchCensusSalary(socCode: string): Promise<CensusSalaryData | null> {
    if (!isCensusConfigured()) return null;

    // Check cache
    const cached = censusCache.get(socCode);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
        return cached.data;
    }

    try {
        // Extract major group (first 2 digits) from SOC code like "15-1244"
        const majorGroup = socCode.split("-")[0];
        const variable = SOC_TO_ACS_VARIABLE[majorGroup];
        if (!variable) return null;

        const apiKey = process.env.CENSUS_API_KEY;
        // Use most recent ACS 1-year estimates
        const url = `${ACS_BASE}/2023/acs/acs1/subject?get=${variable}&for=us:*&key=${apiKey}`;

        const response = await fetchWithTimeout(url);
        if (!response.ok) return null;

        const data = await response.json();
        // ACS API returns [["header"], ["value", "us", "1"]]
        if (!Array.isArray(data) || data.length < 2) return null;

        const rawValue = data[1]?.[0];
        const medianEarnings = parseInt(rawValue, 10);
        if (isNaN(medianEarnings) || medianEarnings <= 0) return null;

        const result: CensusSalaryData = {
            soc: socCode,
            medianEarnings,
            source: "census_acs",
        };

        censusCache.set(socCode, { data: result, fetchedAt: Date.now() });
        return result;
    } catch {
        return null;
    }
}
