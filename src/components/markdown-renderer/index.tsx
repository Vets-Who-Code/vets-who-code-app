import { marked } from "marked";
import clsx from "clsx";

type TProps = {
    content: string;
    className?: string;
};

const MarkdownRenderer = ({ content, className }: TProps) => {
    const renderer = new marked.Renderer();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const linkRenderer = renderer.link;
    renderer.link = (href, linkTitle, text) => {
        const html = linkRenderer.call(renderer, href, linkTitle, text);
        return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
    return (
        <div
            className={clsx(
                "tw-prose tw-max-w-none tw-text-base prose-blockquote:tw-border-l-primary prose-blockquote:tw-text-lg prose-blockquote:tw-not-italic prose-blockquote:tw-leading-relaxed prose-strong:tw-font-bold first:prose-img:tw-mt-0 md:prose-h3:tw-text-3xl md:prose-blockquote:tw-mb-11 md:prose-blockquote:tw-ml-12 md:prose-blockquote:tw-mt-[50px]",
                className
            )}
            dangerouslySetInnerHTML={{
                __html: marked(content, { renderer }),
            }}
        />
    );
};

export default MarkdownRenderer;
