import { BlogMetaType, IBlog } from "@utils/types";
import PopularTagsWidget from "@widgets/popular-tags-widget";
import RecentPostsWidget from "@widgets/recent-posts-widget";

type TProps = {
    recentPosts: Pick<IBlog, "title" | "path">[];
    tags: BlogMetaType[];
};

const BlogSidebar = ({ recentPosts, tags }: TProps) => {
    return (
        <>
            <RecentPostsWidget recentPosts={recentPosts} />
            <PopularTagsWidget tags={tags} />
        </>
    );
};

export default BlogSidebar;
