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
    sub: string;
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
        logoApproved: true,
    },
    {
        name: "Cloudinary",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042945/partners/partners/cloudinary-logo.svg",
        url: "https://cloudinary.com",
        contribution: "Business plan + $2K grant",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "New Relic",
        logo: "/images/partners/newrelic-logo.svg",
        url: "https://newrelic.com",
        contribution: "Premium",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Splunk",
        logo: "/images/partners/splunk-logo.svg",
        url: "https://www.splunk.com",
        contribution: "Business",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "ElevenLabs",
        logo: "/images/partners/elevenlabs-logo.svg",
        url: "https://elevenlabs.io",
        contribution: "610,000 credits",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "monday.com",
        logo: "/images/partners/monday-dev-logo.svg",
        url: "https://monday.com",
        contribution: "10 premium seats",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Slack",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042938/partners/partners/slack-logo.svg",
        url: "https://slack.com",
        contribution: "Our command base",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Google",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042940/partners/partners/google-logo.svg",
        url: "https://www.google.com",
        contribution: "Google for Nonprofits resources for every troop",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Google DeepMind",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042941/partners/partners/deepmind-logo.svg",
        url: "https://deepmind.google",
        contribution: "Google Cloud and Gemini in our LMS tooling",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "GitHub",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042943/partners/partners/github-logo.svg",
        url: "https://github.com",
        contribution: "Where we build all our open-source work",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Microsoft",
        logo: "https://res.cloudinary.com/vetswhocode/image/upload/v1772042947/partners/partners/microsoft-logo.svg",
        url: "https://www.microsoft.com",
        contribution: "Azure for AI",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
    },
    {
        name: "Atlassian",
        logo: "/images/partners/atlassian-logo.svg",
        url: "https://www.atlassian.com",
        contribution: "Async task tracking for open-source troops",
        retailValue: "TODO(jerome): retail value",
        logoApproved: true,
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

export const sponsorStats: Stat[] = [
    {
        value: outcomes.placementRate.display,
        label: outcomes.placementRate.label,
        sub: outcomes.placementRate.qualifier,
    },
    {
        value: outcomes.alumniEarnings.display,
        label: outcomes.alumniEarnings.label,
        sub: outcomes.alumniEarnings.qualifier,
    },
    { value: "501(c)(3)", label: "Tax status", sub: "EIN 86-2122804" },
    { value: "Eligible", label: "WOTC", sub: "no per-hire cap" },
];
