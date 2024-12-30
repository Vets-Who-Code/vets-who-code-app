import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import { VWCProject } from "@utils/types";
import { VWCGrid } from "@components/vwc-grid";
import { VWCGridCard } from "@components/vwc-card";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getProjectData } from "../lib/project";
import { CircleX, Star } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface ProjectModalProps {
    project: VWCProject;
    className?: string;
}

const ProjectDetailModal = ({ project, className }: ProjectModalProps) => {
    const duration = 0.35;
    const xOffset = 25;
    const delay = 0.1;
    return (
        <div className="tw-m-0 tw-py-2 md:tw-flex md:tw-space-x-2 md:tw-px-4">
            <motion.div
                className={clsx(
                    "tw-w-full tw-flex-col tw-items-center tw-justify-center tw-space-y-2 tw-py-3 md:tw-w-2/5 md:tw-min-w-56 md:tw-max-w-fit md:tw-items-start md:tw-justify-normal",
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
                    className="tw-w-full"
                />

                {/* Repo stats */}
                <h4>Statistics</h4>
                <div className="tw-ms-2 tw-flex tw-w-5/12 tw-items-center tw-gap-2 tw-px-1 tw-text-secondary">
                    {/* Github Stars */}
                    <div className="tw-flex tw-items-center tw-gap-1">
                        <Star size={16} strokeWidth={3} />
                        <div>Stars</div>
                    </div>
                    <div className="tw-my-1 tw-rounded-md tw-bg-secondary tw-px-2 tw-text-sm tw-text-white">
                        {project.repo.stargazers_count}
                    </div>
                </div>
                <h4>Top Contributors</h4>
                <div className="tw-ms-2 tw-flex-col tw-space-y-1 tw-text-secondary">
                    {project.repo.contributors.map((contributor) => {
                        return (
                            <Link
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
                                    />
                                </div>
                                <div className="tw-h-fit tw-w-fit tw-flex-col -tw-space-y-2">
                                    <div className="tw-text-md tw-font-medium">
                                        {contributor.name}
                                    </div>
                                    <div className="tw-text-sm tw-font-light">
                                        @{contributor.login}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </motion.div>
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
                        alt=""
                        className="tw-w-14 tw-rounded-full tw-bg-white"
                    />
                </div>
            </div>
            <motion.div
                className="tw-w-full tw-py-3"
                initial={{ opacity: 0, x: -xOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration }}
            >
                <h1 className="tw-mb-0 tw-text-secondary">{project.details.name}</h1>
                <h3 className="tw-text-primary">{project.details.headline}</h3>
                {project.details.long_description.map((pg) => {
                    return <p className="tw-text-secondary tw-opacity-80">{pg}</p>;
                })}
            </motion.div>
        </div>
    );
};

interface ProjectCardProps {
    project: VWCProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger>
                <VWCGridCard title={project.details.name} thumbnail={project.details.thumbnail} />
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
                                className="tw-fixed tw-left-1/2 tw-top-1/2 tw-z-[60] tw-grid tw-max-h-[90vh] tw-w-full tw-items-center tw-justify-center tw-overflow-scroll tw-bg-white tw-p-8 tw-shadow-xl md:tw-w-11/12 md:tw-rounded-3xl lg:tw-w-10/12"
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
                                <Dialog.Close className="tw-fixed tw-right-0 tw-top-0 tw-m-4 tw-cursor-pointer md:tw-right-5 md:tw-top-5">
                                    <CircleX className="tw-text-secondary" />
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

const Projects: PageProps = ({ projects }: TProps) => {
    return (
        <>
            <SEO title="Projects" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Projects" />
            <VWCGrid title="Projects">
                {projects.map((project) => (
                    <ProjectCard key={project.details.name} project={project} />
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
            console.error(`Error while regenerating projects page: ${err.message}`);
        }
        throw new Error(`Failed to update github project data`);
    }
};

export default Projects;
