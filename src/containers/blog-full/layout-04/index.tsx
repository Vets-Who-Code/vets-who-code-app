import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-06";
import Pagination from "@components/pagination/pagination-01";
import { IBlog } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedBlogCard = motion(BlogCard);

type TProps = {
    data: {
        blogs: IBlog[];
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
            rootPage: string;
        };
    };
};

const BlogArea = ({ data: { blogs, pagiData } }: TProps) => {
    return (
        <Section className="blog-area" space="bottom">
            <h2 className="tw-sr-only">Blog Section</h2>
            <div className="tw-px-3.8 lg:tw-container">
                {blogs?.map((blog) => (
                    <AnimatedBlogCard
                        className="tw-mb-[50px]"
                        key={blog.path}
                        title={blog.title}
                        path={blog.path}
                        image={blog.image}
                        postedAt={blog.postedAt}
                        views={blog.views}
                        author={blog.author}
                        excerpt={blog.excerpt}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={scrollUpVariants}
                    />
                ))}
                {pagiData && pagiData.numberOfPages > 1 && (
                    <Pagination
                        className="tw-mt-[50px]"
                        numberOfPages={pagiData.numberOfPages}
                        currentPage={pagiData.currentPage}
                        rootPage={pagiData.rootPage}
                    />
                )}
            </div>
        </Section>
    );
};

export default BlogArea;
