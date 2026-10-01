import { outcomes } from "@data/outcomes";

/**
 * Content for /sponsors. Any value Jerome still has to supply starts with
 * "TODO(jerome)": `<Todo>` on the page flags it in dev and hides it in production.
 */
export const TODO_PREFIX = "TODO(jerome)";
export const isTodo = (value?: string) => !value || value.startsWith(TODO_PREFIX);

export type TechPartner = {
    name: string;
    logo: string;
    url: string;
    contribution: string;
    retailValue?: string;
    /** Render only if true. */
    logoApproved: boolean;
};

export type SponsorTier = {
    name: string;
    amount: string;
    /** What the money buys, e.g. "Trains N troops". */
    funds: string;
    benefits: string[];
};

export type Testimonial = {
    quote: string;
    name: string;
    title: string;
    org: string;
    photo?: string;
    sourceUrl?: string;
};

export type AlumniOutcome = {
    name: string;
    branch: string;
    role: string;
    org: string;
    photo: string;
    sourceUrl: string;
};

export type Stat = {
    value: string;
    label: string;
    source: string;
    /** Sample size and timeframe behind the number, where one applies. */
    sample?: string;
};

export type EngagementTrack = {
    id: string;
    title: string;
    description: string;
};

export const sponsorLinks = {
    booking: "TODO(jerome): booking URL",
    brief: "TODO(jerome): sponsor brief PDF path",
};

// Logos are the files the homepage brand wall already serves.
export const techPartners: TechPartner[] = [
    {
        name: "Cloudflare",
        logo: "/images/partners/cloudflare-logo.svg",
        url: "https://www.cloudflare.com/galileo/",
        contribution: "Project Galileo",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Vercel",
        logo: "/images/partners/vercel-logo.svg",
        url: "https://vercel.com",
        contribution: "Open-source program",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
    {
        name: "Cloudinary",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042945/partners/partners/cloudinary-logo.svg",
        url: "https://cloudinary.com",
        contribution: "Business plan + $2K grant",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
    {
        name: "New Relic",
        logo: "/images/partners/newrelic-logo.svg",
        url: "https://newrelic.com",
        contribution: "Premium",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
    {
        name: "Splunk",
        logo: "/images/partners/splunk-logo.svg",
        url: "https://www.splunk.com",
        contribution: "Business",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
    {
        name: "ElevenLabs",
        logo: "/images/partners/elevenlabs-logo.svg",
        url: "https://elevenlabs.io",
        contribution: "610,000 credits",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
    {
        name: "monday.com",
        logo: "/images/partners/monday-dev-logo.svg",
        url: "https://monday.com",
        contribution: "10 premium seats",
        retailValue: "TODO(jerome): retail value",
        logoApproved: false,
    },
];

// Tier names and the split of benefits are a starting draft for Jerome to confirm.
export const sponsorTiers: SponsorTier[] = [
    {
        name: "Squad",
        amount: "TODO(jerome): tier amount",
        funds: "TODO(jerome): what this tier funds",
        benefits: ["Impact reporting for CSR/ESG", "Logo on /sponsors"],
    },
    {
        name: "Platoon",
        amount: "TODO(jerome): tier amount",
        funds: "TODO(jerome): what this tier funds",
        benefits: [
            "Everything in Squad",
            "Employee mentor and volunteer slots",
            "First look at job-ready troops",
        ],
    },
    {
        name: "Company",
        amount: "TODO(jerome): tier amount",
        funds: "TODO(jerome): what this tier funds",
        benefits: [
            "Everything in Platoon",
            "Brand placement across the accelerator",
            "Guaranteed interview pipeline",
        ],
    },
];

export const sponsorBenefits = [
    {
        title: "First look at troops",
        description: "Meet job-ready software engineers before they hit the open market.",
    },
    {
        title: "Brand placement",
        description: "Your name in front of veterans, mentors, and the engineering community.",
    },
    {
        title: "Mentor and volunteer slots",
        description: "Put your engineers in the room as mentors, reviewers, and speakers.",
    },
    {
        title: "Impact reporting",
        description: "Numbers you can drop straight into CSR and ESG reports.",
    },
];

export const engagementTracks: EngagementTrack[] = [
    {
        id: "internships",
        title: "Internships",
        description:
            "Test-drive the talent. Increase productivity. Diversify perspective with veteran candidates ready for production code on day one.",
    },
    {
        id: "interviews",
        title: "Guaranteed interviews",
        description:
            "Veterans are at risk of unemployment and underemployment. Guarantee an interview for troops who complete the Hashflag Stack and you raise their odds of landing the role.",
    },
    {
        id: "sponsorship",
        title: "Direct sponsorship",
        description:
            "Fund the accelerator. Every dollar trains more veterans. EIN 86-2122804 — VWC is a 501(c)(3).",
    },
    {
        id: "tools",
        title: "Tools & Infrastructure",
        description:
            "Put your stack in the hands of future engineers. Our troops build on production, in real accounts, not sandboxes.",
    },
];

export const testimonials: Testimonial[] = [
    {
        quote: "Without a doubt, I would hire from Vets Who Code again.",
        name: "Darnell Settles III",
        title: "Director of Web and Digital Strategy",
        org: "Methodist Le Bonheur Healthcare",
        sourceUrl: "/blogs/beyond-the-resume",
    },
];

export const alumniOutcomes: AlumniOutcome[] = [
    {
        name: "Adrian Grimm",
        branch: "USMC",
        role: "Web Developer II",
        org: "Methodist Le Bonheur Healthcare",
        photo: "https://res.cloudinary.com/vetswhocode/image/upload/v1714768081/adrian_grimm_blog_image_rfyamx.png",
        sourceUrl: "/blogs/beyond-the-resume",
    },
];

const SAMPLE_TODO = "TODO(jerome): sample size + timeframe";

export const sponsorStats: Stat[] = [
    {
        value: outcomes.placementRate.display,
        label: outcomes.placementRate.label,
        source: `${outcomes.placementRate.qualifier}. ${outcomes.placementRate.source}.`,
        sample: SAMPLE_TODO,
    },
    {
        value: outcomes.alumniEarnings.display,
        label: outcomes.alumniEarnings.label,
        source: `${outcomes.alumniEarnings.qualifier}. ${outcomes.alumniEarnings.source}.`,
        sample: SAMPLE_TODO,
    },
    {
        value: "501(c)(3)",
        label: "Tax status",
        source: "Vets Who Code Inc. is a 501(c)(3) nonprofit, EIN 86-2122804.",
    },
    {
        value: "Eligible",
        label: "WOTC",
        source: "Work Opportunity Tax Credit, U.S. Department of Labor. No per-hire cap.",
    },
];
