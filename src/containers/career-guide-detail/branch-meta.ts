import type { Branch } from "./types";

export const BRANCH_META: Record<Branch, { short: string; color: string }> = {
    Army: { short: "ARMY", color: "#6b8050" },
    Navy: { short: "NAVY", color: "#5b87c4" },
    "Air Force": { short: "USAF", color: "#8eb4d8" },
    "Marine Corps": { short: "USMC", color: "#d9514a" },
    "Coast Guard": { short: "USCG", color: "#e89149" },
};

export const normaliseBranch = (raw: string): Branch => {
    const k = raw.toLowerCase().trim();
    if (k === "air force" || k === "air_force" || k === "usaf") return "Air Force";
    if (k === "marine corps" || k === "marine_corps" || k === "usmc" || k === "marines") {
        return "Marine Corps";
    }
    if (k === "coast guard" || k === "coast_guard" || k === "uscg") return "Coast Guard";
    if (k === "navy") return "Navy";
    return "Army";
};
