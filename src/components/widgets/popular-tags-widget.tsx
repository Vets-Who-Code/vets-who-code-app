import Anchor from "@ui/anchor";
import { BlogMetaType } from "@utils/types";

type TProps = {
    tags: BlogMetaType[];
};

const PopularTagsWidget = ({ tags }: TProps) => {
    return (
        <div className="tw-mt-[45px]">
            <h3 className="tw-mb-7.5">Popular Tags</h3>
            <div className="-tw-m-[5px]">
                {tags.map((tag) => (
                    <Anchor
                        key={tag.slug}
                        path={`/blogs/tag/${tag.slug}`}
                        className="tw-inline-block tw-text-[13px] tw-font-medium tw-leading-normal tw-pt-[7px] tw-pb-1.5 tw-px-3.8 tw-rounded-[3px] tw-bg-gray-200 tw-text-gray-400 tw-lowercase tw-m-[5px] hover:tw-bg-primary hover:tw-text-white"
                    >
                        {tag.title}
                    </Anchor>
                ))}
            </div>
        </div>
    );
};

export default PopularTagsWidget;
