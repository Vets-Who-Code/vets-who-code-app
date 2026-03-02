interface GitHubReadmeProps {
    content: string | null;
    login: string;
    isLoading: boolean;
}

const GitHubReadme = ({ content, login, isLoading }: GitHubReadmeProps) => {
    if (isLoading) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <div className="tw-h-4 tw-w-40 tw-rounded tw-bg-navy/10 tw-animate-pulse tw-mb-4" />
                <div className="tw-space-y-2">
                    <div className="tw-h-3 tw-w-full tw-rounded tw-bg-navy/5 tw-animate-pulse" />
                    <div className="tw-h-3 tw-w-5/6 tw-rounded tw-bg-navy/5 tw-animate-pulse" />
                    <div className="tw-h-3 tw-w-4/6 tw-rounded tw-bg-navy/5 tw-animate-pulse" />
                </div>
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
            <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                <i className="fab fa-github tw-mr-2" />
                {login} / README.md
            </h3>
            <div
                className="tw-prose tw-prose-sm tw-max-w-none tw-text-ink prose-headings:tw-text-navy prose-a:tw-text-navy-ocean hover:prose-a:tw-text-gold prose-img:tw-rounded-lg prose-code:tw-bg-navy/5 prose-code:tw-px-1 prose-code:tw-py-0.5 prose-code:tw-rounded prose-code:tw-text-navy prose-pre:tw-bg-navy/5 prose-pre:tw-rounded-lg"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default GitHubReadme;
