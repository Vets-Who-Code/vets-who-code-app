import { Octokit } from "octokit";
import { VWCContributor, GithubRepo, GithubContributor } from "@utils/types";

const token = process.env.GITHUB_ACCESS_TOKEN || "";
const octokit = new Octokit({ auth: token });

export const getProjectContributors = async (
    owner: string,
    repo: string,
    top: number = 4
): Promise<VWCContributor[]> => {
    const topContributors = await getGithubRepoContributors(owner, repo, top);
    const projectContributors = Promise.all(
        topContributors.map(async (contributor) => {
            const user = await octokit.rest.users.getByUsername({
                username: contributor.login,
            });
            if (user.data.name) {
                return {
                    ...contributor,
                    ...user.data,
                    name: user.data.name!,
                };
            }
            return;
        })
    );
    return (await projectContributors).filter((contributor) => contributor !== undefined);
};

export const getGithubRepo = async (owner: string, repo: string): Promise<GithubRepo> => {
    const response = await octokit.rest.repos.get({
        owner: owner,
        repo: repo,
    });
    return response.data;
};

export const getGithubRepoContributors = async (
    owner: string,
    repo: string,
    top: number = 4
): Promise<GithubContributor[]> => {
    const response = await octokit.rest.repos.listContributors({
        owner: owner,
        repo: repo,
        per_page: top,
    });
    const contributors = response.data.map((contributor) => {
        if (contributor.login) {
            return {
                ...contributor,
                login: contributor.login!,
            };
        }
        return;
    });
    return contributors.filter((contributor) => contributor !== undefined);
};
