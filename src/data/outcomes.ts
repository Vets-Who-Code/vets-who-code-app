/**
 * Single source of truth for every public outcome number.
 *
 * Every stat display on the site reads from here: the funfact tiles on /,
 * /apply, /mentor and /join-our-community, the /about-us receipts, /sponsors,
 * /press-kit, /programs, /donate, the Software Factory team bio and the
 * homepage meta description. Change a number here and nowhere else.
 *
 * Prose that has to carry a number where this module cannot render it
 * (src/data/team-members.json founder bio, src/data/innerpages/faq.json,
 * src/data/homepages/index.json service copy, public/llms.txt and
 * public/llms-full.txt) is pinned to these display strings by
 * __tests__/data/outcomes.test.ts, which also scans src for stray copies.
 *
 * The Diginomica media card (src/data/media/diginomica-vets-who-code-job-placement-2025.mdx)
 * is third-party text and is left alone; it will lag a future number change.
 */

export interface OutcomeStat {
    key: "placementRate" | "alumniEarnings" | "troopsTrained" | "validatedSkills";
    /** Numeric value the funfact count-up animates to. */
    value: number;
    /** The exact string every surface prints, e.g. "97%". */
    display: string;
    prefix?: string;
    suffix?: string;
    label: string;
    /** One-line basis printed under the number. */
    qualifier: string;
    /** Where the number comes from. Unset rather than guessed. */
    source?: string;
    /** ISO date (YYYY-MM-DD) the number was last confirmed. Unset rather than guessed. */
    asOf?: string;
    /** Measurement window for a rate, in months. Unset until confirmed (#1332). */
    windowMonths?: number;
    /** Alumni the rate is measured across. Unset until confirmed (#1332). */
    denominator?: number;
    /** How to refresh the number from our own data, so it is re-derived, not re-guessed (#1329). */
    derivation?: string;
}

// The only external citation in the repo. Internal tracking is what /about-us
// already calls it. The owner confirms both before either is treated as final.
const INTERNAL_SOURCE = "Internal cohort data · Reported by Diginomica";
const DIGINOMICA_DATE = "2025-12-18";

export const outcomes: {
    placementRate: OutcomeStat;
    alumniEarnings: OutcomeStat;
    troopsTrained: OutcomeStat;
    validatedSkills: OutcomeStat;
} = {
    placementRate: {
        key: "placementRate",
        value: 97,
        display: "97%",
        suffix: "%",
        label: "Job Placement Rate",
        qualifier: "Graduates employed in software engineering roles",
        source: INTERNAL_SOURCE,
        asOf: DIGINOMICA_DATE,
        derivation:
            "Placed graduates ÷ graduates in the window. Placements are the J0dI3 admin placements rows (troop, company, role, start_date, salary, status), exported at /api/j0di3/admin/placements/export.csv. Which status values count as placed is not yet defined.",
    },
    alumniEarnings: {
        key: "alumniEarnings",
        value: 20,
        display: "$20M+",
        prefix: "$",
        suffix: "M+",
        label: "Alumni Earnings",
        qualifier: "Collective alumni earnings to date",
        source: INTERNAL_SOURCE,
        asOf: DIGINOMICA_DATE,
    },
    troopsTrained: {
        key: "troopsTrained",
        value: 300,
        display: "300+",
        suffix: "+",
        label: "Troops Trained",
        qualifier: "Veterans and military spouses since 2014",
        source: INTERNAL_SOURCE,
        asOf: DIGINOMICA_DATE,
    },
    validatedSkills: {
        key: "validatedSkills",
        value: 128,
        display: "128",
        label: "Validated Skills",
        qualifier: "Lightcast-validated skills across 25 modules",
        source: "Hashflag Stack curriculum · Lightcast Open Skills taxonomy",
    },
};

/** Homepage tile order. */
export const OUTCOME_FUNFACTS: readonly OutcomeStat[] = [
    outcomes.alumniEarnings,
    outcomes.troopsTrained,
    outcomes.placementRate,
    outcomes.validatedSkills,
];

/** Meta description for the homepage: the numbers, in one sentence, under 160 characters. */
export const outcomesSummary = `Free software engineering accelerator for veterans and military spouses since 2014: ${outcomes.troopsTrained.display} troops trained, ${outcomes.placementRate.display} job placement, ${outcomes.alumniEarnings.display} in collective alumni earnings.`;

/**
 * The methodology sentence for the placement rate. Null until both the window
 * and the denominator are confirmed (#1332), so nothing prints a guess.
 */
export const placementMethodology = (stat: OutcomeStat = outcomes.placementRate) => {
    if (stat.windowMonths === undefined || stat.denominator === undefined) return null;
    return `${stat.display} of graduates employed in a software role within ${stat.windowMonths} months, tracked across ${stat.denominator.toLocaleString("en-US")} alumni since 2014.`;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-12-18" → "Dec 2025". Split by hand: Date parsing treats the ISO string as UTC and can roll the month back in US zones. */
export const formatAsOf = (iso: string) => {
    const [year, month] = iso.split("-");
    return `${MONTHS[Number(month) - 1]} ${year}`;
};
