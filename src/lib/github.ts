import { VWCContributor, GithubRepo, GithubContributor, GithubUser } from "@utils/types";
import { gitAPI } from "./git-api-client";

export const getProjectContributors = async (
    owner: string,
    repo: string,
    top: number = 4
): Promise<VWCContributor[]> => {
    const topContributors = await getGithubRepoContributors(owner, repo, top);
    const projectContributors = Promise.all(
        topContributors.map(async (contributor) => {
            const response = await gitAPI.get(`/users/${contributor.login}`);
            if (response.status == 200) {
                const user = response.data as GithubUser;
                return {
                    ...contributor,
                    ...user,
                };
            } else {
                if ("error" in response) {
                    throw new Error(
                        `Error fetching user data for ${contributor.login}\nStatus code: ${response.status}\nError: ${response.error}`
                    );
                }
                throw new Error(
                    `Error fetching user data for ${contributor.login}\nStatus code: ${response.status}`
                );
            }
        })
    );
    return await projectContributors;
};

export const getGithubRepo = async (owner: string, repo: string): Promise<GithubRepo> => {
    const response = await gitAPI.get(`/repos/${owner}/${repo}`);
    if (response.status == 200) {
        return response.data as GithubRepo;
    } else {
        if ("error" in response) {
            throw new Error(
                `Error fetching repo data for ${owner}/${repo}\nStatus code: ${response.status}\nError: ${response.error}`
            );
        }
        throw new Error(
            `Error fetching repo data for ${owner}/${repo}\nStatus code: ${response.status}`
        );
    }
};

export const getGithubRepoContributors = async (
    owner: string,
    repo: string,
    top: number = 4
): Promise<GithubContributor[]> => {
    const response = await gitAPI.get(`/repos/${owner}/${repo}/contributors`);
    if (response.status == 200) {
        return (response.data as GithubContributor[]).slice(0, top);
    } else {
        if ("error" in response) {
            throw new Error(
                `Error fetching contributor data for ${owner}/${repo}\nStatus code: ${response.status}\nError: ${response.error}`
            );
        }
        throw new Error(
            `Error fetching contributor data for ${owner}/${repo}\nStatus code: ${response.status}`
        );
    }
};
