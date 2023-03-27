import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-03";
import Button from "@ui/button";
import { IBlog } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { useLoadMore } from "@hooks";

const AnimatedBlogCard = motion(BlogCard);

type TProps = {
    data: {
        blogs: IBlog[];
    };
};

const BlogArea = ({ data: { blogs } }: TProps) => {
    const { hasMore, itemsToShow, handlerLoadMore } = useLoadMore<IBlog>(
        blogs,
        6,
        3
    );
    return (
        <Section className="blog-area" space="bottom">
            <h2 className="tw-sr-only">Blog Section</h2>
            <div className="tw-container">
                {blogs.length > 0 ? (
                    <>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                            {itemsToShow?.map((blog) => (
                                <AnimatedBlogCard
                                    key={blog.path}
                                    image={blog.image}
                                    title={blog.title}
                                    path={blog.path}
                                    category={blog.category}
                                    postedAt={blog.postedAt}
                                    views={blog.views}
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={scrollUpVariants}
                                />
                            ))}
                        </div>
                        <div className="tw-text-center tw-mt-[50px]">
                            {hasMore ? (
                                <Button
                                    variant="outlined"
                                    className="tw-min-w-[250px] tw-border-gray-500"
                                    onClick={handlerLoadMore}
                                >
                                    Load More{" "}
                                    <i className="fal fa-redo tw-ml-4" />
                                </Button>
                            ) : (
                                <p>No course to show</p>
                            )}
                        </div>
                    </>
                ) : (
                    <h6>No Blog found</h6>
                )}
            </div>
        </Section>
    );
};

export default BlogArea;
