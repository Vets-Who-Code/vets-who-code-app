import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import { chromium } from "@playwright/test";
import { gemini } from "../gemini";

const { ONET_USER } = process.env;
const { ONET_PASSWORD } = process.env;

export interface ONETResponse {
    keyword: string;
    branch: string;
    start: number;
    end: number;
    total: number;
    military_matches: MilitaryMatches;
    career: Career[];
}

export interface MilitaryMatches {
    match: Match[];
}

export interface Match {
    branch?: string;
    active: boolean;
    code: string;
    title: string;
    external_info?: ExternalInfo[];
}

export interface ExternalInfo {
    href: string;
    title: string;
}

export interface Career {
    href: string;
    match_type: string;
    code: string;
    title: string;
    tags: Tags;
    military_jobs: MilitaryJobs;
}

export interface Tags {
    bright_outlook: boolean;
    green: boolean;
    apprenticeship: boolean;
}

export interface MilitaryJobs {
    air_force: boolean;
    army: boolean;
    coast_guard: boolean;
    marine_corps: boolean;
    navy: boolean;
}

const onetAPI = axios.create({
    baseURL: "https://services.onetcenter.org/v1.9/ws",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${ONET_USER}:${ONET_PASSWORD}`).toString("base64")}`,
    },
});

const fetchExternalData = async (urls: string[]) => {
    const browser = await chromium.launch({
        headless: true,
    });
    const context = await browser.newContext({
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    });

    const responses = await Promise.all(
        urls.map(async (url) => {
            const page = await context.newPage();
            await page.goto(url);
            return page.innerHTML("body");
        })
    );

    await browser.close();

    return responses;
};

export const mosLookup = tool({
    description:
        "Lookup a Military Occupational Specialty (MOS) or Air Force Specialty (AFSC) code to get its description and related information. This tools should be used if the user enters the /mos or /afsc command which will be followed by the MOS or AFSC code. The tool will return information about the MOS of AFSC code. The data should be transformed into a user friendly format which includes skills that are transferrable to a career in tech. If the tool returns an error, the AI should respond with a relevant message to the user.",
    parameters: z.object({
        code: z.string().describe("The MOS or AFSC code to look up, e.g., '11B' for Infantryman."),
    }),
    execute: async ({ code }) => {
        const response = await onetAPI.get(`/veterans/military?keyword=${code}`);
        if (response.status !== 200) {
            return { error: `Failed to fetch MOS data for code: ${code}` };
        }
        try {
            const data = response.data as ONETResponse;
            if (
                !data ||
                !data.military_matches ||
                !data.military_matches.match ||
                data.military_matches.match.length === 0
            ) {
                return { error: `No matches found for MOS code: ${code}` };
            }

            if (data.military_matches.match.length > 1) {
                return { error: `Multiple matches found for MOS code: ${code}` };
            }

            const match = data.military_matches.match[0];

            // Fetch additional external data if available
            const externalURLs = match.external_info?.map((info) => info.href) || [];
            const externalData = await fetchExternalData(externalURLs);
            console.log("External data fetched:", externalData);

            return {
                mos: match,
                similar_careers: data.career,
                mos_descriptions: externalData,
            };
        } catch (error) {
            return { error: `Failed to parse MOS data for code: ${code}` };
        }
    },
});

export default mosLookup;
