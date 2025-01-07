import path from "path";
import fs from "fs/promises";
import { VWCProject, VWCProjectDetails } from "@utils/types";
import { getSlugs } from "./util";
import { getGithubRepo, getProjectContributors } from "./github";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

export async function getProjectBySlug(slug: string): Promise<VWCProjectDetails> {
    try {
        const fullPath = path.join(projectDirectory, slug);
        const content = await fs.readFile(fullPath, "utf8");
        return JSON.parse(content);
    } catch (error) {
        throw new Error(
            `Failed to load project ${slug}: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export async function getAllProjects(): Promise<VWCProjectDetails[]> {
    try {
        const slugs = await getSlugs(projectDirectory);
        return await Promise.all(slugs.map(getProjectBySlug));
    } catch (error) {
        throw new Error(
            `Failed to load projects: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}

export async function getProjectData(): Promise<VWCProject[]> {
    try {
        const projects = await getAllProjects();

        const projectsWithData = await Promise.all(
            projects.map(async (project) => {
                const [repo, contributors] = await Promise.all([
                    getGithubRepo(project.owner, project.repo),
                    getProjectContributors(project.owner, project.repo),
                ]);

                return {
                    details: project,
                    repo: {
                        ...repo,
                        contributors,
                    },
                };
            })
        );

        return projectsWithData.sort((a, b) => a.details.index - b.details.index);
    } catch (error) {
        throw new Error(
            `Failed to fetch project data: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}
