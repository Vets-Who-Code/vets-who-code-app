import Anchor from "@ui/anchor";
import clsx from "clsx";

type TProps = {
    className?: string;
    text: string;
    icon: string;
    path?: string;
};

const BlogMetaItem = ({ className, text, icon, path }: TProps) => {
    return (
        <div className={clsx("blog-meta-itemn tw-mb-[5px]", className)}>
            {path ? (
                <Anchor path={path}>
                    <i className={clsx("tw-pr-1.5", icon)} />
                    {text}
                </Anchor>
            ) : (
                <>
                    <i className={clsx("tw-pr-1.5", icon)} />
                    {text}
                </>
            )}
        </div>
    );
};

export default BlogMetaItem;
