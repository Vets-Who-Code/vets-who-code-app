import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = {
    recentPosts: Pick<IBlog, "title" | "path">[];
};

const RecentPostsWidget = ({ recentPosts }: TProps) => {
    return (
        <div className="tw-mt-[45px]">
            <h3 className="tw-mb-[9px]">Recent Posts</h3>

            {recentPosts.map(({ title, path }) => (
                <Anchor
                    key={path}
                    path={path}
                    className="tw-block tw-relative tw-text-lg tw-font-bold tw-leading-[1.78] tw-pt-4 tw-pl-7.5 tw-pb-3.8 tw-text-body tw-border-b tw-border-b-gray-500 last:tw-border-0 tw-group"
                >
                    <i className="fa fa-long-arrow-alt-right tw-text-base tw-absolute tw-left-0 tw-top-6 tw-transition-all tw-duration-300 group-hover:tw-opacity-0 group-hover:tw-invisible group-hover:tw-translate-x-full" />
                    <i className="fa fa-long-arrow-alt-right tw-text-base tw-text-primary tw-absolute tw-left-0 tw-top-6 tw-transition-all tw-duration-300 tw-opacity-0 tw-invisible -tw-translate-x-full group-hover:tw-opacity-100 group-hover:tw-visible group-hover:tw-translate-x-0" />
                    <span>{title}</span>
                </Anchor>
            ))}
        </div>
    );
};

export default RecentPostsWidget;
