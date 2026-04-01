import {
    isValidUrl,
    isValidLinkedIn,
    isValidGithub,
    validateProfileLink,
    validateGithubLink,
    validateLinkedInLink,
} from "../formValidations";

describe("formValidations", () => {
    describe("isValidUrl", () => {
        it("should accept valid URLs", () => {
            expect(isValidUrl("https://example.com")).toBe(true);
            expect(isValidUrl("http://example.com")).toBe(true);
            expect(isValidUrl("https://sub.example.com/path")).toBe(true);
        });

        it("should reject invalid URLs", () => {
            expect(isValidUrl("not-a-url")).toBe(false);
            expect(isValidUrl("")).toBe(false);
            expect(isValidUrl("ftp://")).toBe(false);
        });
    });

    describe("isValidLinkedIn", () => {
        it("should accept valid LinkedIn URLs", () => {
            expect(isValidLinkedIn("https://linkedin.com/in/john-doe")).toBe(true);
            expect(isValidLinkedIn("https://www.linkedin.com/in/john-doe")).toBe(true);
            expect(isValidLinkedIn("http://linkedin.com/in/jane_doe123/")).toBe(true);
        });

        it("should reject invalid LinkedIn URLs", () => {
            expect(isValidLinkedIn("https://linkedin.com/company/test")).toBe(false);
            expect(isValidLinkedIn("https://github.com/in/user")).toBe(false);
            expect(isValidLinkedIn("not-a-url")).toBe(false);
        });
    });

    describe("isValidGithub", () => {
        it("should accept valid GitHub URLs", () => {
            expect(isValidGithub("https://github.com/johndoe")).toBe(true);
            expect(isValidGithub("https://www.github.com/jane-doe")).toBe(true);
            expect(isValidGithub("http://github.com/user123/")).toBe(true);
        });

        it("should reject invalid GitHub URLs", () => {
            expect(isValidGithub("https://gitlab.com/user")).toBe(false);
            expect(isValidGithub("not-a-url")).toBe(false);
        });
    });

    describe("validateProfileLink", () => {
        it("should return true for empty values", () => {
            expect(validateProfileLink("")).toBe(true);
        });

        it("should return true for valid GitHub URLs", () => {
            expect(validateProfileLink("https://github.com/user")).toBe(true);
        });

        it("should return true for valid LinkedIn URLs", () => {
            expect(validateProfileLink("https://linkedin.com/in/user")).toBe(true);
        });

        it("should return error for invalid URL", () => {
            expect(validateProfileLink("not-a-url")).toBe("Please enter a valid URL");
        });

        it("should return error for non-GitHub/LinkedIn URLs", () => {
            expect(validateProfileLink("https://example.com")).toBe(
                "Please enter a valid GitHub or LinkedIn URL"
            );
        });
    });

    describe("validateGithubLink", () => {
        it("should return true for empty values", () => {
            expect(validateGithubLink("")).toBe(true);
        });

        it("should return true for valid GitHub URLs", () => {
            expect(validateGithubLink("https://github.com/user")).toBe(true);
        });

        it("should return error for invalid URL", () => {
            expect(validateGithubLink("not-a-url")).toBe("Please enter a valid URL");
        });

        it("should return error for non-GitHub URLs", () => {
            expect(validateGithubLink("https://linkedin.com/in/user")).toBe(
                "Please enter a valid GitHub profile URL"
            );
        });
    });

    describe("validateLinkedInLink", () => {
        it("should return true for empty values", () => {
            expect(validateLinkedInLink("")).toBe(true);
        });

        it("should return true for valid LinkedIn URLs", () => {
            expect(validateLinkedInLink("https://linkedin.com/in/user")).toBe(true);
        });

        it("should return error for non-LinkedIn URLs", () => {
            expect(validateLinkedInLink("https://github.com/user")).toBe(
                "Please enter a valid LinkedIn profile URL"
            );
        });
    });
});
