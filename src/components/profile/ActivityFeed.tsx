import { motion } from "framer-motion";
import type { GitHubEvent } from "@/types/profile";

interface ActivityFeedProps {
    events: GitHubEvent[];
    isLoading: boolean;
}

function getEventIcon(type: string): string {
    switch (type) {
        case "PushEvent":
            return "fas fa-upload";
        case "CreateEvent":
            return "fas fa-plus-circle";
        case "PullRequestEvent":
            return "fas fa-code-branch";
        case "IssuesEvent":
            return "fas fa-exclamation-circle";
        case "WatchEvent":
            return "fas fa-star";
        case "ForkEvent":
            return "fas fa-code-fork";
        case "DeleteEvent":
            return "fas fa-trash";
        case "IssueCommentEvent":
            return "fas fa-comment";
        case "PullRequestReviewEvent":
            return "fas fa-eye";
        default:
            return "fas fa-circle";
    }
}

function getEventDescription(event: GitHubEvent): string {
    const repo = event.repo.name.split("/")[1] || event.repo.name;
    switch (event.type) {
        case "PushEvent": {
            const count = event.payload.size || event.payload.commits?.length || 0;
            return count > 0
                ? `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${repo}`
                : `Pushed to ${repo}`;
        }
        case "CreateEvent":
            return `Created ${event.payload.ref_type || "repository"} in ${repo}`;
        case "PullRequestEvent":
            return `${event.payload.action || "Opened"} PR in ${repo}`;
        case "IssuesEvent":
            return `${event.payload.action || "Opened"} issue in ${repo}`;
        case "WatchEvent":
            return `Starred ${repo}`;
        case "ForkEvent":
            return `Forked ${repo}`;
        case "IssueCommentEvent":
            return `Commented on issue in ${repo}`;
        case "PullRequestReviewEvent":
            return `Reviewed PR in ${repo}`;
        default:
            return `Activity in ${repo}`;
    }
}

function relativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

const ActivityFeed = ({ events, isLoading }: ActivityFeedProps) => {
    if (isLoading) {
        return (
            <div className="tw-space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="tw-flex tw-gap-3 tw-animate-pulse">
                        <div className="tw-h-8 tw-w-8 tw-rounded-full tw-bg-navy/10" />
                        <div className="tw-flex-1">
                            <div className="tw-h-3 tw-w-3/4 tw-rounded tw-bg-navy/10 tw-mb-2" />
                            <div className="tw-h-2 tw-w-16 tw-rounded tw-bg-navy/5" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-dashed tw-border-navy/20 tw-p-12 tw-text-center">
                <i className="fas fa-satellite-dish tw-text-4xl tw-text-navy/20 tw-mb-3" />
                <p className="tw-font-mono tw-text-sm tw-text-gray-300">
                    No recent ops detected
                </p>
            </div>
        );
    }

    return (
        <div className="tw-relative">
            {/* Timeline line */}
            <div className="tw-absolute tw-left-4 tw-top-0 tw-bottom-0 tw-w-px tw-bg-navy/10" />

            <div className="tw-space-y-1">
                {events.slice(0, 20).map((event, i) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className="tw-relative tw-flex tw-items-start tw-gap-4 tw-rounded-lg tw-py-2.5 tw-pl-10 tw-pr-4 hover:tw-bg-navy/3"
                    >
                        <div className="tw-absolute tw-left-1.5 tw-top-3 tw-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-bg-navy/10 tw-text-navy/50">
                            <i className={`${getEventIcon(event.type)} tw-text-[8px]`} />
                        </div>
                        <div className="tw-flex-1 tw-min-w-0">
                            <p className="tw-font-mono tw-text-xs tw-text-ink tw-truncate">
                                {getEventDescription(event)}
                            </p>
                        </div>
                        <span className="tw-flex-shrink-0 tw-font-mono tw-text-[10px] tw-text-gray-300">
                            {relativeTime(event.created_at)}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
