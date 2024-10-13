// ^(https?:\/\/)? : Matches an optional "http" or "https" at the start, followed by "://". The "?" makes it optional.
// (www\.)? : Matches the optional "www." subdomain.
// github\.com\/ : Matches "github.com/" exactly. The backslash escapes the dot.
// [A-Za-z0-9_-]+ : Matches one or more alphanumeric characters, underscores, or hyphens (used for GitHub usernames).
// \/? : Matches an optional trailing forward slash.
// $ : End of the string, ensuring there are no extra characters after the valid GitHub username.

export const githubRegex: RegExp =
    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;

// ^(https?:\/\/)? : Matches an optional "http" or "https" at the start, followed by "://". The "?" makes it optional.
// (www\.)? : Matches the optional "www." subdomain.
// linkedin\.com\/in\/ : Matches "linkedin.com/in/" exactly. The backslash escapes the dots.
// [A-Za-z0-9_-]+ : Matches one or more alphanumeric characters, underscores, or hyphens (used for LinkedIn profile URLs).
// \/? : Matches an optional trailing forward slash.
// $ : End of the string, ensuring there are no extra characters after the valid LinkedIn profile URL.
export const linkedinRegex: RegExp =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

export function validateProfileLink(url: string): string | boolean {
    if (githubRegex.test(url)) {
        return true;
    } else if (linkedinRegex.test(url)) {
        return true;
    } else {
        return "The value entered is not a valid Linkedin or Github profile link";
    }
}
