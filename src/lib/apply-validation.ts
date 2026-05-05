import type { ApplyFormData } from "@data/apply-form";

export type ApplyErrors = Partial<Record<keyof ApplyFormData, string>>;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: linear per-step validation reads cleaner inline than split into 6 helpers
export const validateStep = (step: number, data: ApplyFormData): ApplyErrors => {
    const e: ApplyErrors = {};
    if (step === 1) {
        if (!data.firstName) e.firstName = "First name required";
        if (!data.lastName) e.lastName = "Last name required";
        if (!data.email) e.email = "Email required";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
            e.email = "Looks like that email is missing the @ — try again?";
    }
    if (step === 2) {
        if (!data.city) e.city = "City required";
        if (!data.state) e.state = "State required";
        if (!data.zip) e.zip = "Zip required";
        if (!data.country) e.country = "Country required";
    }
    if (step === 3) {
        if (!data.branch) e.branch = "Pick a branch";
        if (!data.yearJoined || data.yearJoined.length !== 4) e.yearJoined = "Year required";
    }
    if (step === 4) {
        if (!data.hours) e.hours = "Pick a commitment level";
    }
    if (step === 5) {
        if (!data.github) e.github = "GitHub required — even an empty profile is fine";
        if (!data.prework) e.prework = "Pick your prework status";
    }
    if (step === 6) {
        if (!data.journey) e.journey = "Pick where you are";
        if (!data.goal) e.goal = "Pick the one that fits best";
        if (!data.why || data.why.trim().length < 10) e.why = "Tell us why — even a rough sentence";
    }
    return e;
};
