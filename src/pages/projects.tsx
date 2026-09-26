import Breadcrumb from "@components/breadcrumb";
import { ProjectCard } from "@components/projects";
import SEO from "@components/seo/page-seo";
import { VWCGrid } from "@components/vwc-grid";
import Layout01 from "@layout/layout-01";
import { VWCProject } from "@utils/types";
import type { GetStaticProps, NextPage } from "next";
import { getProjectData } from "../lib/project";

type TProps = {
    projects: VWCProject[];
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const description = [
    "Vets Who Code troops ship software to production, with real users, as part of the accelerator. This catalog is the evidence: the repositories, the commit history, and the engineers who wrote it.",
    "Each project links to its source on GitHub and, where one exists, to the running software. Open a project to see what it does, who it serves, and who built it.",
];

export const Projects: PageProps = ({ projects }: TProps) => {
    return (
        <>
            <SEO
                title="Projects"
                description="Production software shipped by Vets Who Code troops: source, commit history, live URLs, and the engineers who built each project."
            />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Projects" />
            <VWCGrid title="Projects">
                <div className="tw-col-span-full tw-items-center tw-justify-center tw-text-pretty tw-text-secondary">
                    {description.map((text) => {
                        return <p key={text}>{text}</p>;
                    })}
                </div>
                {projects.map((project) => (
                    <ProjectCard key={project.details.slug} project={project} />
                ))}
            </VWCGrid>
        </>
    );
};

Projects.Layout = Layout01;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const projects = await getProjectData();
        return {
            props: {
                projects,
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
            revalidate: 10 * 60, // Regenerate every 10 minutes
        };
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error while fetching project data: ${err.message}`);
        }

        // Return empty projects array as fallback during build
        // This allows the build to succeed even if GitHub API is unavailable
        console.warn("Falling back to empty projects list due to API error");
        return {
            props: {
                projects: [],
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
            revalidate: 60, // Try again in 1 minute
        };
    }
};

export default Projects;
