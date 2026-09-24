import { VWCGridCard } from "@components/vwc-card";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import Anchor from "@ui/anchor";
import { GithubRepo, VWCProject, VWCProjectContributor } from "@utils/types";
import { CircleDot, Eye, GitFork, Star } from "lucide-react";
import Link from "next/link";

interface TechStackProps {
    techStack: string[];
}

export const TechStack = ({ techStack }: TechStackProps) => {
    return (
        <div className="tw-mb-2 tw-flex tw-flex-wrap tw-gap-1">
            {techStack.map((tech) => (
                <div
                    key={tech}
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
    live_url?: string | null;
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
    repo: GithubRepo;
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

interface BuiltByProps {
    contributors: VWCProjectContributor[];
}

// Rendered from the curated record alone: the avatar host serves by login, so
// this needs no GitHub API call and survives a build without a token.
export const BuiltBy = ({ contributors }: BuiltByProps) => {
    return (
        <>
            <h5>Built by</h5>
            <ul className="tw-m-0 tw-list-none tw-space-y-2 tw-p-0">
                {contributors.map(({ login, profile, story }) => (
                    <li key={login} className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-3">
                        <Anchor
                            path={profile ?? `https://github.com/${login}`}
                            title={`View ${login}'s profile`}
                            className="tw-flex tw-items-center tw-gap-2 tw-text-secondary hover:tw-text-primary"
                        >
                            <img
                                className="tw-aspect-square tw-w-8 tw-min-w-8 tw-rounded-full tw-border-2 tw-border-secondary tw-bg-white"
                                src={`https://avatars.githubusercontent.com/${login}?s=64`}
                                alt=""
                                width={32}
                                height={32}
                                draggable="false"
                                loading="lazy"
                            />
                            <span className="tw-font-medium">@{login}</span>
                        </Anchor>
                        {story && (
                            <Anchor
                                path={story}
                                className="tw-text-sm tw-uppercase tw-tracking-wider tw-text-primary hover:tw-underline"
                            >
                                Read their story
                            </Anchor>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

interface ProjectCardProps {
    project: VWCProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const { slug, name, headline, thumbnail } = project.details;
    return (
        <Anchor path={`/projects/${slug}`} title={`View ${name}`} className="tw-block tw-h-full">
            <VWCGridCard title={name} headline={headline} thumbnail={thumbnail} />
        </Anchor>
    );
};
