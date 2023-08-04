import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-03";
import SectionTitle from "@components/section-title";
import { scrollUpVariants } from "@utils/variants";
import { MottoType, SectionTitleType, IBlog, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        blogs: IBlog[];
    };
};

const BlogArea = ({
    data: { section_title, blogs },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="blog-area" space={space} bg={bg}>
            <div className="tw-container tw-relative">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                    {blogs?.map((blog) => (
                        <AnimatedBlogCard
                            key={blog.path}
                            title={blog.title}
                            path={blog.path}
                            category={blog.category}
                            postedAt={blog.postedAt}
                            image={blog.image}
                            views={blog.views}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

BlogArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default BlogArea;
