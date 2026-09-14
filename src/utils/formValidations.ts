// @utils/formValidations.ts

/**
 * Matches a LinkedIn profile ROOT URL: `http(s)://[subdomain.]linkedin.com/in/<handle>` with an
 * optional trailing slash. Anything deeper than the profile root fails.
 *
 * Caveat: the handle class is `[A-z0-9_-]`, and `A-z` spans ASCII 65-122, so it also admits the
 * six characters that sit between `Z` and `a` (left bracket, backslash, right bracket, caret,
 * underscore, backtick) while rejecting dots.
 * @example
 * linkedinRegex.test("https://www.linkedin.com/in/john-doe") // true
 * linkedinRegex.test("https://linkedin.com/in/john^doe") // true (A-z range side effect)
 * linkedinRegex.test("https://linkedin.com/in/john.doe") // false (dots are not allowed)
 */
export const linkedinRegex = /^https?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/;

/**
 * Matches a GitHub profile ROOT URL: `http(s)://[subdomain.]github.com/<handle>` with an optional
 * trailing slash. Repository URLs fail because only one path segment is allowed.
 *
 * Shares the `[A-z0-9_-]` handle-class caveat described on {@link linkedinRegex}.
 * @example
 * githubRegex.test("https://github.com/octocat") // true
 * githubRegex.test("https://github.com/octocat/") // true
 * githubRegex.test("https://github.com/octocat/hello-world") // false (profile root only)
 */
export const githubRegex = /^https?:\/\/([\w]+\.)?github\.com\/[A-z0-9_-]+\/?$/;

/**
 * Generic URL validation. Parses the value with the `URL` constructor and requires a non-empty
 * host, so it is protocol-agnostic — it is NOT an http(s) check.
 * @param url - The string to parse.
 * @returns `true` when the value parses as a URL and has a host, `false` otherwise.
 * @example
 * isValidUrl("https://example.com") // true
 * isValidUrl("ftp://example.com") // true
 * isValidUrl("mailto:a@b.com") // false (no host)
 * isValidUrl("example.com") // false (no protocol)
 * isValidUrl("") // false
 */
export const isValidUrl = (url: string): boolean => {
    try {
        const urlObject = new URL(url);
        return !!urlObject.protocol && !!urlObject.host;
    } catch {
        return false;
    }
};

/**
 * Tests a value against {@link linkedinRegex} — see it for the exact accepted shape and caveats.
 * @param url - The candidate LinkedIn profile URL.
 * @returns `true` when the value is a LinkedIn profile root URL.
 * @example
 * isValidLinkedIn("https://www.linkedin.com/in/john-doe") // true
 * isValidLinkedIn("https://linkedin.com/in/john-doe/details") // false
 */
export const isValidLinkedIn = (url: string): boolean => linkedinRegex.test(url);

/**
 * Tests a value against {@link githubRegex} — see it for the exact accepted shape and caveats.
 * @param url - The candidate GitHub profile URL.
 * @returns `true` when the value is a GitHub profile root URL.
 * @example
 * isValidGithub("https://github.com/octocat") // true
 * isValidGithub("https://github.com/octocat/hello-world") // false
 */
export const isValidGithub = (url: string): boolean => githubRegex.test(url);

/**
 * react-hook-form `validate` rule accepting either a GitHub or a LinkedIn profile root URL.
 *
 * Follows the react-hook-form `true | string` contract: `true` passes, a string is shown as the
 * field error. An empty value returns `true` because required-ness belongs to the `register`
 * rule, not to this validator.
 *
 * The check runs in two stages — a generic {@link isValidUrl} parse first, then the profile-root
 * regexes. A parseable non-web URL such as `ftp://example.com` therefore clears stage one and
 * fails at stage two, producing the GitHub/LinkedIn message rather than the URL message.
 * @param value - The current field value.
 * @returns `true`, `"Please enter a valid URL"`, or
 * `"Please enter a valid GitHub or LinkedIn URL"`.
 * @example
 * validateProfileLink("") // true (required is handled by the register rule)
 * validateProfileLink("github.com/octocat") // "Please enter a valid URL"
 * validateProfileLink("https://github.com/octocat") // true
 * validateProfileLink("ftp://example.com") // "Please enter a valid GitHub or LinkedIn URL"
 * @see src/components/forms/mentor-form.tsx for the consuming form.
 */
export const validateProfileLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";

    // Check if it's either a valid GitHub or LinkedIn URL
    if (githubRegex.test(value) || linkedinRegex.test(value)) {
        return true;
    }

    return "Please enter a valid GitHub or LinkedIn URL";
};

/**
 * react-hook-form `validate` rule that accepts only a GitHub profile root URL.
 *
 * Same `true | string` contract and two-stage check as {@link validateProfileLink}: empty passes,
 * an unparseable value fails on the URL message, and a parseable value that is not a GitHub
 * profile root fails on the GitHub message.
 * @param value - The current field value.
 * @returns `true`, `"Please enter a valid URL"`, or `"Please enter a valid GitHub profile URL"`.
 * @example
 * validateGithubLink("") // true
 * validateGithubLink("not-a-url") // "Please enter a valid URL"
 * validateGithubLink("https://example.com") // "Please enter a valid GitHub profile URL"
 * validateGithubLink("https://github.com/octocat") // true
 */
export const validateGithubLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";
    if (!githubRegex.test(value)) return "Please enter a valid GitHub profile URL";
    return true;
};

/**
 * react-hook-form `validate` rule that accepts only a LinkedIn profile root URL.
 *
 * Same `true | string` contract and two-stage check as {@link validateProfileLink}: empty passes,
 * an unparseable value fails on the URL message, and a parseable value that is not a LinkedIn
 * profile root fails on the LinkedIn message.
 * @param value - The current field value.
 * @returns `true`, `"Please enter a valid URL"`, or `"Please enter a valid LinkedIn profile URL"`.
 * @example
 * validateLinkedInLink("") // true
 * validateLinkedInLink("not-a-url") // "Please enter a valid URL"
 * validateLinkedInLink("https://example.com") // "Please enter a valid LinkedIn profile URL"
 * validateLinkedInLink("https://www.linkedin.com/in/john-doe") // true
 */
export const validateLinkedInLink = (value: string): boolean | string => {
    if (!value) return true; // Let required handle empty fields
    if (!isValidUrl(value)) return "Please enter a valid URL";
    if (!linkedinRegex.test(value)) return "Please enter a valid LinkedIn profile URL";
    return true;
};
