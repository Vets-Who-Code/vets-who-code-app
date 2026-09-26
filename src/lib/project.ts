import { GithubRepo, VWCProject, VWCProjectDetails } from "@utils/types";
import fs from "fs";
import path from "path";
import { getGithubRepo } from "./github";
import { getSlugs } from "./util";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

export const getProjectSlugs = (): string[] =>
    getSlugs(projectDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => file.replace(/\.json$/, ""));

export function getProjectBySlug(slug: string): VWCProjectDetails {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(projectDirectory, `${realSlug}.json`);
    const record = JSON.parse(fs.readFileSync(fullPath, "utf8")) as Omit<VWCProjectDetails, "slug">;
    return { ...record, slug: realSlug };
}

export const getAllProjects = (): VWCProjectDetails[] => {
    return getProjectSlugs().map((slug) => getProjectBySlug(slug));
};

// Stats are decorative. A missing token, a rate limit or a 404 on one repo must
// not reject the whole catalog, so each project degrades to repo: null alone.
const getRepoOrNull = async (details: VWCProjectDetails): Promise<GithubRepo | null> => {
    try {
        return await getGithubRepo(details.owner, details.repo);
    } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        console.warn(`Skipping GitHub stats for ${details.owner}/${details.repo}: ${reason}`);
        return null;
    }
};

export const getProjectPageData = async (slug: string): Promise<VWCProject> => {
    const details = getProjectBySlug(slug);
    return { details, repo: await getRepoOrNull(details) };
};

export const getProjectData = async (): Promise<VWCProject[]> => {
    const projects = await Promise.all(
        getAllProjects().map(async (details) => ({ details, repo: await getRepoOrNull(details) }))
    );
    // Sort projects by index
    return projects.sort((a, b) => a.details.index - b.details.index);
};
