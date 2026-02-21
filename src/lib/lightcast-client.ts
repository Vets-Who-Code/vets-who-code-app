/**
 * Lightcast (formerly Emsi) API client
 * OAuth2 client credentials flow with token caching and salary data lookups
 */

export interface LightcastSalaryData {
    soc: string;
    medianSalary: number;
    pct25Salary: number;
    pct75Salary: number;
    totalPostings: number;
    demandLevel: string;
    topSkills: string[];
}

// Token cache
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

// Salary data cache: SOC code → { data, fetchedAt }
const salaryCache = new Map<string, { data: LightcastSalaryData; fetchedAt: number }>();
const SALARY_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const TOKEN_URL = "https://auth.emsicloud.com/connect/token";
const API_BASE = "https://emsiservices.com";
const FETCH_TIMEOUT = 5000;

export function isLightcastConfigured(): boolean {
    return !!(process.env.LIGHTCAST_CLIENT_ID && process.env.LIGHTCAST_CLIENT_SECRET);
}

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
}

async function getAccessToken(): Promise<string | null> {
    // Return cached token if still valid (refresh 5 min before expiry)
    if (cachedToken && Date.now() < tokenExpiresAt - 5 * 60 * 1000) {
        return cachedToken;
    }

    try {
        const response = await fetchWithTimeout(TOKEN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.LIGHTCAST_CLIENT_ID || "",
                client_secret: process.env.LIGHTCAST_CLIENT_SECRET || "",
                grant_type: "client_credentials",
                scope: "emsi_open",
            }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        cachedToken = data.access_token;
        // Lightcast tokens last 1 hour
        tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
        return cachedToken;
    } catch {
        return null;
    }
}

function classifyDemand(totalPostings: number): string {
    if (totalPostings >= 50000) return "Very high demand";
    if (totalPostings >= 20000) return "High demand";
    if (totalPostings >= 5000) return "Growing demand";
    return "Stable demand";
}

export async function fetchSalaryBySOC(socCode: string): Promise<LightcastSalaryData | null> {
    if (!isLightcastConfigured()) return null;

    // Check cache
    const cached = salaryCache.get(socCode);
    if (cached && Date.now() - cached.fetchedAt < SALARY_CACHE_TTL) {
        return cached.data;
    }

    try {
        const token = await getAccessToken();
        if (!token) return null;

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        // Fetch salary percentiles from the occupation endpoint
        const salaryRes = await fetchWithTimeout(
            `${API_BASE}/titles/versions/latest/estimate/${socCode}`,
            { method: "GET", headers }
        );

        // Fetch job posting counts for demand
        const postingsRes = await fetchWithTimeout(
            `${API_BASE}/jpa/totals`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    filter: {
                        when: { start: "2024-01", end: "2025-01" },
                        soc5: [socCode],
                    },
                    metrics: ["unique_postings"],
                }),
            }
        );

        // Fetch in-demand skills for this SOC
        const skillsRes = await fetchWithTimeout(
            `${API_BASE}/jpa/rankings/skills`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    filter: {
                        when: { start: "2024-01", end: "2025-01" },
                        soc5: [socCode],
                    },
                    rank: { by: "unique_postings", limit: 5 },
                }),
            }
        );

        if (!salaryRes.ok) return null;

        const salaryData = await salaryRes.json();
        const medianSalary = salaryData?.median_salary ?? salaryData?.percentile_50 ?? 0;
        const pct25 = salaryData?.percentile_25 ?? Math.round(medianSalary * 0.8);
        const pct75 = salaryData?.percentile_75 ?? Math.round(medianSalary * 1.25);

        let totalPostings = 0;
        if (postingsRes.ok) {
            const postingsData = await postingsRes.json();
            totalPostings = postingsData?.data?.totals?.unique_postings ?? 0;
        }

        let topSkills: string[] = [];
        if (skillsRes.ok) {
            const skillsData = await skillsRes.json();
            topSkills = (skillsData?.data?.ranking?.buckets ?? [])
                .slice(0, 5)
                .map((b: { name?: string }) => b.name)
                .filter(Boolean);
        }

        const result: LightcastSalaryData = {
            soc: socCode,
            medianSalary,
            pct25Salary: pct25,
            pct75Salary: pct75,
            totalPostings,
            demandLevel: classifyDemand(totalPostings),
            topSkills,
        };

        salaryCache.set(socCode, { data: result, fetchedAt: Date.now() });
        return result;
    } catch {
        return null;
    }
}
