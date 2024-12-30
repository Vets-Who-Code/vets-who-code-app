import path from "path";
import {
    GithubContributor,
    GithubRepo,
    GithubUser,
    VWCContributor,
    VWCProject,
    VWCProjectDetails,
} from "@utils/types";
import fs from "fs";
import { getSlugs } from "./util";
import axios from "axios";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

export function getProjectBySlug(slug: string): VWCProjectDetails {
    const fullPath = path.join(projectDirectory, slug);
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

export const getAllProjects = (): VWCProjectDetails[] => {
    const slugs = getSlugs(projectDirectory);
    return slugs.map((slug) => getProjectBySlug(slug));
};

export const getProjectData = async (): Promise<VWCProject[]> => {
    const projects = getAllProjects();
    const data = Promise.all(
        projects.map(async (project) => {
            const repo = await getGithubRepo(project.owner, project.repo);
            const contributors = await getProjectContributors(project.owner, project.repo);
            const data = {
                details: project,
                repo: {
                    ...repo,
                    contributors: contributors,
                },
            };
            return data;
        })
    );
    return data;
};

export const getProjectContributors = async (
    owner: string,
    repo: string
): Promise<VWCContributor[]> => {
    const gitContributors = await getGithubRepoContributors(owner, repo);
    const topContributors = gitContributors.slice(0, 4);
    const projectContributors = Promise.all(
        topContributors.map(async (contributor) => {
            const user = await getGithubUser(contributor.login);
            return {
                ...user,
                ...contributor
            };
        })
    );
    return projectContributors;
};

export const getGithubRepo = async (owner: string, repo: string): Promise<GithubRepo> => {
    const apiURL = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await axios.get(apiURL);
    return response.data;
};

export const getGithubRepoContributors = async (
    owner: string,
    repo: string
): Promise<GithubContributor[]> => {
    const apiURL = `https://api.github.com/repos/${owner}/${repo}/contributors`;
    const response = await axios.get(apiURL);
    return response.data;
};

export const getGithubUser = async (username: string): Promise<GithubUser> => {
    const apiURL = `https://api.github.com/users/${username}`;
    const response = await axios.get(apiURL);
    return response.data;
};
