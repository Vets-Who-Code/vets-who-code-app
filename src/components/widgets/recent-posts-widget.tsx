import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = {
    recentPosts: Pick<IBlog, "title" | "path">[];
};

const RecentPostsWidget = ({ recentPosts }: TProps) => {
    return (
        <div className="tw:mt-[45px]">
            <h3 className="tw:mb-[9px]">Recent Posts</h3>

            {recentPosts.map(({ title, path }) => (
                <Anchor
                    key={path}
                    path={path}
                    className="tw:group tw:relative tw:block tw:border-b tw:border-b-gray-500 tw:pb-3.8 tw:pl-7.5 tw:pt-4 tw:text-lg tw:font-bold tw:leading-[1.78] tw:text-body tw:last:border-0"
                >
                    <i className="fa fa-long-arrow-alt-right tw:absolute tw:left-0 tw:top-6 tw:text-base tw:transition-all tw:duration-300 tw:group-hover:invisible tw:group-hover:translate-x-full tw:group-hover:opacity-0" />
                    <i className="fa fa-long-arrow-alt-right tw:invisible tw:absolute tw:left-0 tw:top-6 tw:-translate-x-full tw:text-base tw:text-primary tw:opacity-0 tw:transition-all tw:duration-300 tw:group-hover:visible tw:group-hover:translate-x-0 tw:group-hover:opacity-100" />
                    <span>{title}</span>
                </Anchor>
            ))}
        </div>
    );
};

export default RecentPostsWidget;
