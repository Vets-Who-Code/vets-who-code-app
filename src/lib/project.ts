import path from "path";
import fs from "fs";
import { VWCProject, VWCProjectDetails } from "@utils/types";
import { getSlugs } from "./util";
import { getGithubRepo, getProjectContributors } from "./github";

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
    const projectsData = Promise.all(
        projects.map(async (project) => {
            const repo = await getGithubRepo(project.owner, project.repo);
            const contributors = await getProjectContributors(project.owner, project.repo);
            // Using object property shorthand
            return {
                details: project,
                repo: {
                    ...repo,
                    contributors
                }
            };
        })
    );
    // Sort projects by index
    return (await projectsData).sort((a, b) => a.details.index - b.details.index);
};