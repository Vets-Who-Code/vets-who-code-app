import { motion } from "framer-motion";
import type { GitHubData } from "@/types/profile";

interface GitHubStatsGridProps {
    github: GitHubData | null;
    isLoading: boolean;
}

const STAT_CARDS = [
    { key: "repos", label: "REPOSITORIES", icon: "fas fa-code-branch" },
    { key: "stars", label: "TOTAL STARS", icon: "fas fa-star" },
    { key: "forks", label: "TOTAL FORKS", icon: "fas fa-code-fork" },
    { key: "languages", label: "LANGUAGES", icon: "fas fa-language" },
] as const;

function getStatValue(key: string, github: GitHubData): string {
    switch (key) {
        case "repos":
            return github.profile.public_repos.toString();
        case "stars":
            return github.stats.totalStars.toString();
        case "forks":
            return github.stats.totalForks.toString();
        case "languages":
            return github.languages.length.toString();
        default:
            return "0";
    }
}

const SkeletonCard = () => (
    <div className="tw-rounded-lg tw-bg-navy/95 tw-p-6 tw-text-center tw-animate-pulse">
        <div className="tw-mx-auto tw-mb-3 tw-h-8 tw-w-8 tw-rounded tw-bg-white/10" />
        <div className="tw-mx-auto tw-mb-2 tw-h-8 tw-w-16 tw-rounded tw-bg-white/10" />
        <div className="tw-mx-auto tw-h-3 tw-w-20 tw-rounded tw-bg-white/10" />
    </div>
);

const GitHubStatsGrid = ({ github, isLoading }: GitHubStatsGridProps) => {
    if (isLoading) {
        return (
            <div className="tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-4">
                {STAT_CARDS.map((c) => (
                    <SkeletonCard key={c.key} />
                ))}
            </div>
        );
    }

    if (!github) return null;

    return (
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-4">
            {STAT_CARDS.map((card, i) => (
                <motion.div
                    key={card.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="tw-rounded-lg tw-bg-gradient-to-br tw-from-navy tw-to-navy-deep tw-p-6 tw-text-center tw-border tw-border-gold/10 tw-shadow-lg"
                >
                    <i className={`${card.icon} tw-text-gold/60 tw-text-lg tw-mb-2`} />
                    <div className="tw-font-mono tw-text-3xl tw-font-bold tw-text-gold">
                        {getStatValue(card.key, github)}
                    </div>
                    <div className="tw-mt-1 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-white/40">
                        {card.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default GitHubStatsGrid;
