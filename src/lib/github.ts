import { VWCContributor, GithubRepo, GithubContributor, GithubUser } from "@utils/types";
import { gitAPI } from "./git-api-client";

// Define getGithubRepoContributors first to fix the use-before-define error
export const getGithubRepoContributors = async (
    owner: string,
    repo: string,
    top = 4 // Removed explicit number type annotation
): Promise<GithubContributor[]> => {
    const response = await gitAPI.get(`/repos/${owner}/${repo}/contributors`);
    if (response.status === 200) { // Changed == to ===
        return (response.data as GithubContributor[]).slice(0, top);
    } 
    
    // Removed unnecessary else after return
    if ("error" in response) {
        throw new Error(
            `Error fetching contributor data for ${owner}/${repo}\nStatus code: ${response.status}\nError: ${response.error}`
        );
    }
    throw new Error(
        `Error fetching contributor data for ${owner}/${repo}\nStatus code: ${response.status}`
    );
};

export const getProjectContributors = async (
    owner: string,
    repo: string,
    top = 4 // Removed explicit number type annotation
): Promise<VWCContributor[]> => {
    const topContributors = await getGithubRepoContributors(owner, repo, top);
    const projectContributors = Promise.all(
        topContributors.map(async (contributor) => {
            const response = await gitAPI.get(`/users/${contributor.login}`);
            if (response.status === 200) { // Changed == to ===
                const user = response.data as GithubUser;
                return {
                    ...contributor,
                    ...user,
                };
            }
            
            // Removed unnecessary else after return
            if ("error" in response) {
                throw new Error(
                    `Error fetching user data for ${contributor.login}\nStatus code: ${response.status}\nError: ${response.error}`
                );
            }
            throw new Error(
                `Error fetching user data for ${contributor.login}\nStatus code: ${response.status}`
            );
        })
    );
    // Remove return await - just return the promise
    return projectContributors;
};

export const getGithubRepo = async (owner: string, repo: string): Promise<GithubRepo> => {
    const response = await gitAPI.get(`/repos/${owner}/${repo}`);
    if (response.status === 200) { // Changed == to ===
        return response.data as GithubRepo;
    }
    
    // Removed unnecessary else after return
    if ("error" in response) {
        throw new Error(
            `Error fetching repo data for ${owner}/${repo}\nStatus code: ${response.status}\nError: ${response.error}`
        );
    }
    throw new Error(
        `Error fetching repo data for ${owner}/${repo}\nStatus code: ${response.status}`
    );
};