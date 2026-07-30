export type Branch = "Army" | "Navy" | "Air Force" | "Marine Corps" | "Coast Guard";

export type BranchShort = "ARMY" | "NAVY" | "USAF" | "USMC" | "USCG";

export type Rank = "Enlisted" | "Warrant" | "Officer";

export type Demand = "Steady" | "High" | "Very High";

export type Family =
    | "Cyber"
    | "IT / Comms"
    | "Aviation"
    | "Intelligence"
    | "Logistics"
    | "Medical"
    | "Engineering"
    | "Operations"
    | "Maintenance"
    | "Administration"
    | "Other";

export interface GuideEntry {
    code: string;
    /** Full training-pipeline key (lowercased); unique even when codes collide across branches */
    slug: string;
    title: string;
    branch: Branch;
    rank: Rank;
    family: Family;
    civilian: string;
    salaryLow: number;
    salaryHigh: number;
    certs: string[];
    demand: Demand;
    featured?: boolean;
}

export interface BranchMeta {
    name: Branch;
    short: BranchShort;
    color: string;
    count: number;
}

export type SortKey = "code" | "title" | "salaryHigh" | "salaryLow" | "demand";
