import Anchor from "@ui/anchor";
import { BlogMetaType } from "@utils/types";
import clsx from "clsx";

type TProps = {
    className?: string;
    tags: BlogMetaType[];
};

const TagMeta = ({ className, tags }: TProps) => {
    return (
        <div className={clsx("tags tw-inline-flex", className)}>
            <span className="far fa-tags tw-mr-1 tw-text-lg" />
            {tags.map((tag, i, arr) => (
                <Anchor
                    key={tag.slug}
                    path={tag.path}
                    className="tw-ml-1 tw-inline-block tw-font-medium tw-text-gray-400"
                >
                    {tag.title}
                    {i !== arr.length - 1 && ", "}
                </Anchor>
            ))}
        </div>
    );
};

export default TagMeta;
