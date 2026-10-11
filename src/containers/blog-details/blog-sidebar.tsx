import { BlogMetaType, IBlog } from "@utils/types";
import PopularTagsWidget from "@widgets/popular-tags-widget";
import RecentPostsWidget from "@widgets/recent-posts-widget";
import SearchWidget from "@widgets/search-widget";

type TProps = {
    recentPosts: Pick<IBlog, "title" | "path">[];
    tags: BlogMetaType[];
};

const BlogSidebar = ({ recentPosts, tags }: TProps) => {
    return (
        <>
            <SearchWidget />
            <RecentPostsWidget recentPosts={recentPosts} />
            <PopularTagsWidget tags={tags} />
        </>
    );
};

export default BlogSidebar;
