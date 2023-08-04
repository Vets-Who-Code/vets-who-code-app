import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Anchor from "@ui/anchor";
import BlogCard from "@components/blog-card/blog-04";
import { IBlog, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        recentPosts: IBlog[];
        recentPostsWithImage: IBlog[];
    };
};

const BlogArea = ({
    data: { section_title, recentPosts, recentPostsWithImage },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="blog-area" space={space} bg={bg}>
            <div className="tw-container tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                            className="tw-my-[25px]"
                        />
                    )}
                    {recentPosts.map(({ title, path }) => (
                        <Anchor
                            key={path}
                            path={path}
                            className="tw-block tw-relative tw-font-bold tw-leading-[1.78] tw-pl-7.5 tw-text-secondary tw-mt-5 first:tw-mt-0 tw-group"
                        >
                            <i className="fa fa-long-arrow-alt-right tw-text-base tw-absolute tw-left-0 tw-top-[5px] tw-transition-all tw-duration-300 group-hover:tw-opacity-0 group-hover:tw-invisible group-hover:tw-translate-x-full" />
                            <i className="fa fa-long-arrow-alt-right tw-text-base tw-text-primary tw-absolute tw-left-0 tw-top-[5px] tw-transition-all tw-duration-300 tw-opacity-0 tw-invisible -tw-translate-x-full group-hover:tw-opacity-100 group-hover:tw-visible group-hover:tw-translate-x-0" />
                            <span>{title}</span>
                        </Anchor>
                    ))}
                </motion.div>
                {recentPostsWithImage.map((blog) => (
                    <AnimatedBlogCard
                        key={blog.path}
                        title={blog.title}
                        image={blog.image}
                        path={blog.path}
                        postedAt={blog.postedAt}
                        views={blog.views}
                        category={blog.category}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                ))}
            </div>
        </Section>
    );
};

BlogArea.defaultProps = {
    bg: "tw-bg-spring",
};

export default BlogArea;
