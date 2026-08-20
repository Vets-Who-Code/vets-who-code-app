import {
    mapGitHubProfileToUser,
    type GitHubProfileData,
} from "@/lib/github-profile";

describe("mapGitHubProfileToUser", () => {
    it("maps GitHub profile fields to Prisma user fields", () => {
        const profile: GitHubProfileData = {
            name: "Test Veteran",
            email: "test@example.com",
            avatar_url: "https://avatars.githubusercontent.com/u/123",
            bio: "Software engineer",
            location: "Atlanta, GA",
            html_url: "https://github.com/testveteran",
        };

        expect(mapGitHubProfileToUser(profile)).toEqual({
            name: "Test Veteran",
            email: "test@example.com",
            image: "https://avatars.githubusercontent.com/u/123",
            bio: "Software engineer",
            location: "Atlanta, GA",
            githubUrl: "https://github.com/testveteran",
        });
    });

    it("preserves nullable GitHub profile fields", () => {
        const profile: GitHubProfileData = {
            name: null,
            email: null,
            avatar_url: null,
            bio: null,
            location: null,
            html_url: "https://github.com/testveteran",
        };

        expect(mapGitHubProfileToUser(profile)).toEqual({
            name: null,
            email: null,
            image: null,
            bio: null,
            location: null,
            githubUrl: "https://github.com/testveteran",
        });
    });
});
