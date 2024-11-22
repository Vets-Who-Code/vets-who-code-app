// @utils/formValidations.ts

export const linkedinRegex =
    /^https?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/;
export const githubRegex = /^https?:\/\/([\w]+\.)?github\.com\/[A-z0-9_-]+\/?$/;

// Generic URL validation
export const isValidUrl = (url: string): boolean => {
    try {
        const urlObject = new URL(url);
        return !!urlObject.protocol && !!urlObject.host;
    } catch {
        return false;
    }
};

// Individual platform validations
export const isValidLinkedIn = (url: string): boolean =>
    linkedinRegex.test(url);
export const isValidGithub = (url: string): boolean => githubRegex.test(url);

// Updated validation function for React Hook Form
export const validateProfileLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";

    // Check if it's either a valid GitHub or LinkedIn URL
    if (githubRegex.test(value) || linkedinRegex.test(value)) {
        return true;
    }

    return "Please enter a valid GitHub or LinkedIn URL";
};

// If you need platform-specific validation
export const validateGithubLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";
    if (!githubRegex.test(value))
        return "Please enter a valid GitHub profile URL";
    return true;
};

export const validateLinkedInLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";
    if (!linkedinRegex.test(value))
        return "Please enter a valid LinkedIn profile URL";
    return true;
};
