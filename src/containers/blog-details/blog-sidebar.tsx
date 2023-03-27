import SearchWidget from "@widgets/search-widget";
import RecentPostsWidget from "@widgets/recent-posts-widget";
import BannerWidget from "@widgets/banner-widget";
import PopularTagsWidget from "@widgets/popular-tags-widget";
import { BlogMetaType, IBlog } from "@utils/types";

type TProps = {
    recentPosts: Pick<IBlog, "title" | "path">[];
    tags: BlogMetaType[];
};

const BlogSidebar = ({ recentPosts, tags }: TProps) => {
    return (
        <>
            <SearchWidget />
            <RecentPostsWidget recentPosts={recentPosts} />
            <BannerWidget />
            <PopularTagsWidget tags={tags} />
        </>
    );
};

export default BlogSidebar;
