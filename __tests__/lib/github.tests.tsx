import { getProjectContributors, getGithubRepo, getGithubRepoContributors } from "lib/github";
import { GithubContributor, GithubUser, GithubRepo } from "@utils/types";
import { gitAPI } from "lib/git-api-client";

jest.mock("@/lib/git-api-client", () => ({
    gitAPI: {
        get: jest.fn(),
    },
}));

describe("GitHub API Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getProjectContributors", () => {
        const mockContributors: GithubContributor[] = [
            {
                login: "user1",
                contributions: 100,
            },
            {
                login: "user2",
                contributions: 50,
            },
        ];

        const mockUsers: GithubUser[] = [
            {
                login: "user1",
                name: "User One",
                html_url: "",
                avatar_url: "",
            },
            {
                login: "user2",
                name: "User Two",
                html_url: "",
                avatar_url: "",
            },
        ];

        it("should return formatted contributor data", async () => {
            // Mock contributors endpoint
            (gitAPI.get as jest.Mock)
                .mockResolvedValueOnce({ status: 200, data: mockContributors })
                // Mock individual user endpoints
                .mockResolvedValueOnce({ status: 200, data: mockUsers[0] })
                .mockResolvedValueOnce({ status: 200, data: mockUsers[1] });

            const result = await getProjectContributors("owner", "repo", 2);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(
                expect.objectContaining({
                    ...mockContributors[0],
                    ...mockUsers[0],
                })
            );
            expect(gitAPI.get).toHaveBeenCalledWith("/repos/owner/repo/contributors");
            expect(gitAPI.get).toHaveBeenCalledWith("/users/user1");
            expect(gitAPI.get).toHaveBeenCalledWith("/users/user2");
        });

        it("should handle contributor fetch error", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 404,
                error: "Not Found",
            });

            await expect(getProjectContributors("owner", "repo")).rejects.toThrow(
                "Error fetching contributor data for owner/repo"
            );
        });

        it("should handle user fetch error", async () => {
            (gitAPI.get as jest.Mock)
                .mockResolvedValueOnce({ status: 200, data: mockContributors })
                .mockResolvedValueOnce({ status: 404, error: "User not found" });

            await expect(getProjectContributors("owner", "repo")).rejects.toThrow(
                "Error fetching user data for user1"
            );
        });
    });

    describe("getGithubRepo", () => {
        const mockRepo: GithubRepo = {
            html_url: "",
            stargazers_count: 100,
            open_issues_count: 15,
            forks_count: 40,
            subscribers_count: 300,
        };

        it("should return repository data", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 200,
                data: mockRepo,
            });

            const result = await getGithubRepo("owner", "repo");

            expect(result).toEqual(mockRepo);
            expect(gitAPI.get).toHaveBeenCalledWith("/repos/owner/repo");
        });

        it("should handle error response", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 404,
                error: "Repository not found",
            });

            await expect(getGithubRepo("owner", "repo")).rejects.toThrow(
                "Error fetching repo data for owner/repo"
            );
        });

        it("should handle error response without error message", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({ status: 500 });

            await expect(getGithubRepo("owner", "repo")).rejects.toThrow(
                "Error fetching repo data for owner/repo\nStatus code: 500"
            );
        });
    });

    describe("getGithubRepoContributors", () => {
        const mockContributors: GithubContributor[] = [
            {
                login: "user1",
                contributions: 100,
            },
            {
                login: "user2",
                contributions: 50,
            },
            {
                login: "user3",
                contributions: 25,
            },
        ];

        it("should return contributor list with specified limit", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 200,
                data: mockContributors,
            });

            const result = await getGithubRepoContributors("owner", "repo", 2);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(
                expect.objectContaining({
                    login: "user1",
                    contributions: 100,
                })
            );
            expect(gitAPI.get).toHaveBeenCalledWith("/repos/owner/repo/contributors");
        });

        it("should use default limit of 4", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 200,
                data: mockContributors,
            });

            const result = await getGithubRepoContributors("owner", "repo");

            expect(result).toHaveLength(3); // Only 3 mock contributors available
            expect(gitAPI.get).toHaveBeenCalledWith("/repos/owner/repo/contributors");
        });

        it("should handle error response", async () => {
            (gitAPI.get as jest.Mock).mockResolvedValueOnce({
                status: 404,
                error: "Not Found",
            });

            await expect(getGithubRepoContributors("owner", "repo")).rejects.toThrow(
                "Error fetching contributor data for owner/repo"
            );
        });
    });
});
