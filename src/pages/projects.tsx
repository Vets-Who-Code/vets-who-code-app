import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import { Project } from "@utils/types";
import { VWCGrid } from "@components/vwc-grid";
import { VWCGridCard } from "@components/vwc-card";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getAllProjects } from "../lib/project";

interface ProjectCardProps {
    project: Project;
}

interface ProjectModalProps {
    project: Project;
}

const ProjectDetailModal = ({ project }: ProjectModalProps) => {
    const duration = 0.35;
    const xOffset = 25;
    const delay = 0.1;

    return (
        <div className="tw-h-full tw-space-x-2 tw-px-4 tw-py-2 md:tw-flex">
            <motion.div
                className="tw-w-full tw-max-w-fit tw-py-3 md:tw-w-2/5"
                initial={{ opacity: 0, x: xOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration }}
            >
                <img src={project.thumbnail.src} alt={project.thumbnail.alt} />
            </motion.div>
            <div className="tw-hidden tw-items-center tw-justify-center md:tw-grid">
                <motion.div
                    className="tw-col-start-1 tw-row-start-1 tw-m-0 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center"
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{ delay, duration }}
                >
                    <div className="tw-h-full tw-w-[1.5px] tw-rounded-md tw-bg-secondary" />
                </motion.div>
                <div className="tw-col-start-1 tw-row-start-1 tw-w-10 tw-rounded-full tw-bg-white tw-p-0">
                    <img
                        src="https://res.cloudinary.com/vetswhocode/image/upload/e_bgremoval/f_auto,q_auto/v1609084190/hashflag-white-vscode_n5k5db.jpg"
                        alt=""
                        className="tw-w-10"
                    />
                </div>
            </div>
            <motion.div
                className="tw-w-full tw-py-3"
                initial={{ opacity: 0, x: -xOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration }}
            >
                <h1 className="tw-mb-0 tw-text-secondary">{project.name}</h1>
                <h3 className="tw-text-primary">{project.headline}</h3>
                {project.long_description.map((pg) => {
                    return <p>{pg}</p>;
                })}
            </motion.div>
        </div>
    );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger>
                <VWCGridCard title={project.name} thumbnail={project.thumbnail} />
            </Dialog.Trigger>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="tw-fixed tw-inset-0 tw-z-[55] tw-bg-black"
                                key={`${project.name}-overlay`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                key={project.name}
                                className="tw-fixed tw-left-1/2 tw-top-1/2 tw-z-[60] tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-white tw-p-8 tw-shadow-xl md:tw-w-11/12 lg:tw-w-10/12"
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
    projects: Project[];
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
                    <ProjectCard key={project.name} project={project} />
                ))}
            </VWCGrid>
        </>
    );
};

Projects.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const projects = getAllProjects();
    return {
        props: {
            projects,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
        revalidate: 1,
    };
};

export default Projects;
