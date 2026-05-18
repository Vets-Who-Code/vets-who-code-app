import type { Branch, BranchShort } from "./types";

// Distinct branch colors (handoff §Branch colors), tuned for use on our navy ground.
export const BRANCH_META: Record<Branch, { short: BranchShort; color: string }> = {
    Army: { short: "ARMY", color: "#6b8050" },
    Navy: { short: "NAVY", color: "#5b87c4" },
    "Air Force": { short: "USAF", color: "#8eb4d8" },
    "Marine Corps": { short: "USMC", color: "#d9514a" },
    "Coast Guard": { short: "USCG", color: "#e89149" },
};

export const BRANCH_ORDER: Branch[] = ["Army", "Navy", "Air Force", "Marine Corps", "Coast Guard"];
