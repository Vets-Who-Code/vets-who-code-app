import { Octokit } from "@octokit/rest";
import { VWCContributor, GithubRepo, GithubContributor } from "@utils/types";

const token = process.env.GITHUB_TOKEN;
if (!token) {
    throw new Error("GITHUB_TOKEN is required");
}

const octokit = new Octokit({
    auth: token,
    retry: { enabled: true },
});

function isVWCContributor(c: any): c is VWCContributor {
    return (
        c !== null &&
        "login" in c &&
        "name" in c &&
        "id" in c &&
        "avatar_url" in c &&
        "html_url" in c &&
        "contributions" in c
    );
}

async function rateLimit() {
    const { data } = await octokit.rest.rateLimit.get();
    if (data.rate.remaining < 10) {
        throw new Error("GitHub API rate limit nearly exceeded");
    }
}

export async function getProjectContributors(
    owner: string,
    repo: string,
    top = 4
): Promise<VWCContributor[]> {
    await rateLimit();

    try {
        const contributors = await getGithubRepoContributors(owner, repo, top);

        const contributorsWithDetails = await Promise.all(
            contributors.map(async (contributor) => {
                try {
                    const { data: user } = await octokit.rest.users.getByUsername({
                        username: contributor.login,
                    });

                    if (!user.name) return null;

                    return {
                        ...contributor,
                        name: user.name,
                        bio: user.bio,
                        location: user.location,
                        blog: user.blog,
                        twitter_username: user.twitter_username,
                    };
                } catch (error) {
                    console.error(`Failed to fetch user ${contributor.login}:`, error);
                    return null;
                }
            })
        );

        return contributorsWithDetails.filter(isVWCContributor);
    } catch (error) {
        throw new Error(
            `Failed to fetch project contributors: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export async function getGithubRepo(owner: string, repo: string): Promise<GithubRepo> {
    await rateLimit();

    try {
        const { data } = await octokit.rest.repos.get({ owner, repo });
        return {
            id: data.id,
            name: data.name,
            full_name: data.full_name,
            description: data.description,
            html_url: data.html_url,
            stargazers_count: data.stargazers_count,
            watchers_count: data.watchers_count,
            forks_count: data.forks_count,
            open_issues_count: data.open_issues_count,
            language: data.language,
            topics: data.topics,
        };
    } catch (error) {
        throw new Error(
            `Failed to fetch repo: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}

export async function getGithubRepoContributors(
    owner: string,
    repo: string,
    top = 4
): Promise<GithubContributor[]> {
    await rateLimit();

    try {
        const { data } = await octokit.rest.repos.listContributors({
            owner,
            repo,
            per_page: top,
        });

        return data.map((contributor) => ({
            login: contributor.login,
            id: contributor.id,
            avatar_url: contributor.avatar_url,
            html_url: contributor.html_url,
            contributions: contributor.contributions,
        }));
    } catch (error) {
        throw new Error(
            `Failed to fetch contributors: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}
