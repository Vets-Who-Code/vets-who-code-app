import path from "path";
import { Project } from "@utils/types";
import fs from "fs";
import { getSlugs } from "./util";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

export function getCourseBySlug(slug: string): Project {
    const fullPath = path.join(projectDirectory, slug);
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

export const getAllProjects = () => {
    const slugs = getSlugs(projectDirectory);
    return slugs.map((slug) => getCourseBySlug(slug));
};
