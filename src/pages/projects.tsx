import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, CircleDot, Eye, GitFork, XIcon } from "lucide-react";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
// Import components first, then local modules
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MarkdownRenderer from "@components/markdown-renderer";
import { VWCGrid } from "@components/vwc-grid";
import { VWCGridCard } from "@components/vwc-card";
// Then import local modules
import { getProjectData } from "../lib/project";
import { VWCContributor, VWCProject, VWCProjectRepo } from "@utils/types";

interface TechStackProps {
    techStack: string[];
}

export const TechStack = ({ techStack }: TechStackProps) => {
    return (
        <div className="tw-mb-2 tw-flex tw-flex-wrap tw-gap-1">
            {techStack.map((tech, index) => (
                <div 
                    key={`tech-${index}`} 
                    className="tw-m-0 tw-rounded-md tw-bg-secondary tw-bg-opacity-90 tw-p-0 tw-px-2 tw-py-1 tw-text-sm tw-text-white"
                >
                    {tech}
                </div>
            ))}
        </div>
    );
};

interface LinkButtonsProps {
    github_url: string;
    live_url?: string;
}

export const LinkButtons = ({ github_url, live_url }: LinkButtonsProps) => {
    return (
        <div className="tw-mb-3 tw-flex tw-items-start tw-gap-1 tw-text-black">
            <Link
                href={github_url}
                target="_blank"
                title="See the code on GitHub"
                className="tw-flex tw-w-fit tw-items-center tw-justify-center tw-space-x-1 tw-rounded-md tw-border-2 tw-border-secondary tw-px-2 tw-py-1 tw-text-center tw-text-secondary hover:tw-bg-secondary hover:tw-text-white"
            >
                <GitHubLogoIcon />
                <h6 className="tw-mb-0 tw-translate-y-[1.5px] tw-text-center tw-align-middle tw-text-inherit">
                    GitHub
                </h6>
            </Link>
            {live_url && (
                <Link
                    href={live_url}
                    target="_blank"
                    title="See it live"
                    className="tw-flex tw-w-fit tw-items-center tw-justify-center tw-space-x-1 tw-rounded-md tw-border-2 tw-border-secondary tw-px-2 tw-py-1 tw-text-center tw-text-secondary hover:tw-bg-secondary hover:tw-text-white"
                >
                    <GlobeIcon />
                    <h6 className="tw-m-0 tw-translate-y-[1.5px] tw-text-center tw-text-inherit">
                        Live
                    </h6>
                </Link>
            )}
        </div>
    );
};

interface RepoStatsProps {
    repo: VWCProjectRepo;
}

export const RepoStats = ({ repo }: RepoStatsProps) => {
    return (
        <>
            {/* Repo stats */}
            <h5>Repo Statistics</h5>
            <div className="tw-grid tw-min-w-72 tw-grid-cols-2">
                {/* Github Stars */}
                <div className="tw-flex tw-w-5/12 tw-items-center tw-gap-2 tw-px-1 tw-text-secondary">
                    <div className="tw-my-1 tw-flex tw-min-w-[32px] tw-items-center tw-justify-center tw-rounded-md tw-bg-secondary tw-px-2 tw-text-sm tw-text-white">
                        {repo.stargazers_count}
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-1">
                        <Star size={16} strokeWidth={3} />
                        <div className="tw-mt-1">Stars</div>
                    </div>
                </div>
                {/* Github Issues */}
                <div className="tw-flex tw-w-5/12 tw-items-center tw-gap-2 tw-px-1 tw-text-secondary">
                    <div className="tw-my-1 tw-flex tw-min-w-[32px] tw-items-center tw-justify-center tw-rounded-md tw-bg-secondary tw-px-2 tw-text-sm tw-text-white">
                        {repo.open_issues_count}
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-1">
                        <CircleDot size={16} strokeWidth={3} />
                        <div className="tw-mt-1">Issues</div>
                    </div>
                </div>
                {/* Github Watching */}
                <div className="tw-flex tw-w-5/12 tw-items-center tw-gap-2 tw-px-1 tw-text-secondary">
                    <div className="tw-my-1 tw-flex tw-min-w-[32px] tw-items-center tw-justify-center tw-rounded-md tw-bg-secondary tw-px-2 tw-text-sm tw-text-white">
                        {repo.subscribers_count}
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-1">
                        <Eye size={16} strokeWidth={3} />
                        <div className="tw-mt-1">Watching</div>
                    </div>
                </div>
                {/* Github Forks */}
                <div className="tw-flex tw-w-5/12 tw-items-center tw-gap-2 tw-px-1 tw-text-secondary">
                    <div className="tw-my-1 tw-flex tw-min-w-[32px] tw-items-center tw-justify-center tw-rounded-md tw-bg-secondary tw-px-2 tw-text-sm tw-text-white">
                        {repo.forks_count}
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-1">
                        <GitFork size={16} strokeWidth={3} />
                        <div className="tw-mt-1">Forks</div>
                    </div>
                </div>
            </div>
        </>
    );
};

interface TopContributorsProps {
    contributors: VWCContributor[];
}

export const TopContributors = ({ contributors }: TopContributorsProps) => {
    return (
        <>
            <h5>Top Contributors</h5>
            <div className="tw-grid-cols-2 tw-space-y-1 tw-text-secondary md:tw-grid-cols-1">
                {contributors.map((contributor) => (
                    <Link
                        key={contributor.login}
                        href={contributor.html_url}
                        target="_blank"
                        className="tw-flex tw-min-w-56 tw-gap-2 tw-rounded-md tw-border-2 tw-border-secondary tw-border-opacity-35 tw-bg-secondary tw-bg-opacity-20 tw-px-2 tw-pt-1 hover:tw-cursor-pointer hover:tw-bg-opacity-100 hover:tw-text-white"
                    >
                        <div className="tw-flex-col tw-items-center tw-justify-center">
                            <img
                                className="tw-aspect-square tw-w-8 tw-min-w-8 tw-rounded-full tw-border-2 tw-border-secondary tw-bg-white"
                                src={contributor.avatar_url}
                                alt={contributor.name}
                                draggable="false"
                                loading="eager"
                            />
                        </div>
                        <div className="tw-h-fit tw-w-fit tw-flex-col -tw-space-y-2">
                            <div className="tw-text-md tw-font-medium">{contributor.name}</div>
                            <div className="tw-text-sm tw-font-light">@{contributor.login}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

interface ProjectModalProps {
    project: VWCProject;
    className?: string;
}

export const ProjectDetailModal = ({ project, className }: ProjectModalProps) => {
    const duration = 0.35;
    const xOffset = 25;
    const delay = 0.1;

    return (
        <div className="tw-m-0 tw-max-w-fit tw-py-2 md:tw-flex md:tw-space-x-2 md:tw-px-4">
            {/* Left Column */}
            <motion.div
                className={clsx(
                    "tw-w-full tw-flex-col tw-items-center tw-justify-center tw-space-y-2 tw-py-3 md:tw-w-2/5 md:tw-min-w-80 md:tw-max-w-fit md:tw-items-start md:tw-justify-normal",
                    className
                )}
                initial={{ opacity: 0, x: xOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration }}
            >
                <img
                    src={project.details.thumbnail.src}
                    alt={project.details.thumbnail.alt}
                    draggable="false"
                    className="tw-w-full tw-rounded-md tw-drop-shadow-lg"
                />
                <RepoStats repo={project.repo} />
                <TopContributors contributors={project.repo.contributors} />
            </motion.div>
            {/* Center divider */}
            <div className="tw-m-0 tw-grid tw-w-full tw-grid-cols-1 tw-grid-rows-1 tw-items-center tw-justify-center tw-p-0 md:tw-w-fit">
                <motion.div
                    className="tw-col-start-1 tw-row-start-1 tw-m-0 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center"
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{ delay, duration }}
                >
                    <div className="tw-h-[1.5px] tw-w-full tw-rounded-md tw-bg-secondary md:tw-h-full md:tw-w-[1.5px]" />
                </motion.div>
                <div className="tw-col-start-1 tw-row-start-1 tw-m-0 tw-flex tw-items-center tw-justify-center tw-p-0">
                    <img
                        src="https://res.cloudinary.com/vetswhocode/image/upload/e_bgremoval/f_auto,q_auto/v1609084190/hashflag-white-vscode_n5k5db.jpg"
                        alt={`${project.details.name} screenshot`}
                        className="tw-w-14 tw-rounded-full tw-bg-white"
                    />
                </div>
            </div>
            {/* Right column */}
            <motion.div
                className="tw-w-full tw-py-3"
                initial={{ opacity: 0, x: -xOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration }}
            >
                <h1 className="tw-mb-0 tw-text-secondary">{project.details.name}</h1>
                <h3 className="tw-text-primary">{project.details.headline}</h3>
                <TechStack techStack={project.details.technologies} />
                <LinkButtons
                    github_url={`https://github.com/${project.details.owner}/${project.details.repo}`}
                    live_url={project.details.live_url}
                />
                {project.details.long_description.map((pg, index) => (
                    <p key={`desc-${index}`} className="tw-text-secondary">
                        <MarkdownRenderer content={pg} />
                    </p>
                ))}
            </motion.div>
        </div>
    );
};

interface ProjectCardProps {
    project: VWCProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger>
                <VWCGridCard
                    title={project.details.name}
                    headline={project.details.headline}
                    thumbnail={project.details.thumbnail}
                />
            </Dialog.Trigger>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="tw-fixed tw-inset-0 tw-z-[55] tw-bg-black"
                                key={`${project.details.name}-overlay`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                key={`${project.details.name}-content`}
                                className="tw-fixed tw-left-1/2 tw-top-1/2 tw-z-[60] tw-grid tw-max-h-[90vh] tw-w-full tw-items-center tw-justify-center tw-overflow-scroll tw-bg-white tw-p-8 tw-shadow-xl md:tw-w-11/12 md:tw-rounded-2xl lg:tw-max-w-6xl"
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                                transition={{ bounce: false, duration: 0.3 }}
                            >
                                <Dialog.Close className="tw-fixed tw-right-0 tw-top-0 tw-m-4 tw-cursor-pointer tw-rounded-full tw-bg-white tw-p-1 tw-text-secondary tw-shadow-inner tw-drop-shadow-md hover:tw-bg-secondary hover:tw-text-white md:tw-right-5 md:tw-top-5">
                                    <XIcon className="tw-p-1" data-testid="close-button" />
                                </Dialog.Close>
                                <ProjectDetailModal project={project} />
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};

type TProps = {
    projects: VWCProject[];
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

export const Projects: PageProps = ({ projects }: TProps) => {
    const description = [
        "Welcome to the Vets Who Code project showcase—a space dedicated to highlighting the exceptional work of our veteran developers.",
        "Here, you'll find innovative applications, tools, and solutions created by our talented community, demonstrating their technical expertise and commitment to excellence. Each project reflects the dedication, creativity, and skills that veterans bring to the tech industry.",
        "Explore their work and discover how they are making a meaningful impact through code.",
    ];

    return (
        <>
            <SEO title="Projects" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Projects" />
            <VWCGrid title="Projects">
                <div className="tw-col-span-full tw-items-center tw-justify-center tw-text-pretty tw-text-secondary">
                    {description.map((text, index) => (
                        <p key={`desc-${index}`}>{text}</p>
                    ))}
                </div>
                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard key={project.details.name} project={project} />
                    ))
                )}
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
            console.error(`Error while regenerating projects page: ${err.message}`);
        }
        throw new Error(`Failed to update github project data`);
    }
};

export default Projects;