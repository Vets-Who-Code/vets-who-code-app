import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-04";
import BlogSidebar from "@containers/blog-details/blog-sidebar";
import Pagination from "@components/pagination/pagination-01";
import { BlogMetaType, IBlog } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedBlogCard = motion(BlogCard);

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
            rootPage: string;
        };
    };
};

const BlogArea = ({ data: { blogs, recentPosts, tags, pagiData } }: TProps) => {
    return (
        <Section className="blog-area" space="bottom">
            <h2 className="tw-sr-only">Blog Section</h2>
            <div className="tw-container tw-grid tw-grid-cols-3 tw-gap-10 xl:tw-gap-15">
                <div className="tw-col-span-full lg:tw-col-[1/3]">
                    {blogs.length > 0 && (
                        <div className="tw-grid md:tw-grid-cols-2 tw-gap-7.5">
                            {blogs.map((blog) => (
                                <AnimatedBlogCard
                                    key={blog.path}
                                    title={blog.title}
                                    path={blog.path}
                                    image={blog.image}
                                    postedAt={blog.postedAt}
                                    views={blog.views}
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={scrollUpVariants}
                                />
                            ))}
                        </div>
                    )}
                    {pagiData && pagiData.numberOfPages > 1 && (
                        <Pagination
                            className="tw-mt-[50px]"
                            numberOfPages={pagiData.numberOfPages}
                            currentPage={pagiData.currentPage}
                            rootPage={pagiData.rootPage}
                        />
                    )}
                </div>
                <aside className="tw-col-span-full lg:tw-col-[3/-1]">
                    <BlogSidebar recentPosts={recentPosts} tags={tags} />
                </aside>
            </div>
        </Section>
    );
};

export default BlogArea;
