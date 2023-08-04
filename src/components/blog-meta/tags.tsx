import clsx from "clsx";
import Anchor from "@ui/anchor";
import { BlogMetaType } from "@utils/types";

type TProps = {
    className?: string;
    tags: BlogMetaType[];
};

const TagMeta = ({ className, tags }: TProps) => {
    return (
        <div className={clsx("tags tw-inline-flex", className)}>
            <span className="tw-text-lg tw-mr-1 far fa-tags" />
            {tags.map((tag, i, arr) => (
                <Anchor
                    key={tag.slug}
                    path={tag.path}
                    className="tw-text-gray-400 tw-font-medium tw-inline-block tw-ml-1"
                >
                    {tag.title}
                    {i !== arr.length - 1 && ", "}
                </Anchor>
            ))}
        </div>
    );
};

export default TagMeta;
