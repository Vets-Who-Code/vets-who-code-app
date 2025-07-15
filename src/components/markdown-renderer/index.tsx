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
                "tw:prose tw:max-w-none tw:text-base tw:prose-blockquote:border-l-primary tw:prose-blockquote:text-lg tw:prose-blockquote:not-italic tw:prose-blockquote:leading-relaxed tw:prose-strong:font-bold tw:prose-img:first:mt-0 tw:md:prose-h3:text-3xl tw:md:prose-blockquote:mb-11 tw:md:prose-blockquote:ml-12 tw:md:prose-blockquote:mt-[50px]",
                className
            )}
            dangerouslySetInnerHTML={{
                __html: marked(content, { renderer }),
            }}
        />
    );
};

export default MarkdownRenderer;
