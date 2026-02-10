import BlogCard from "@components/blog-card/blog-03";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import { IBlog, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        blogs: IBlog[];
    };
};

const BlogArea = ({ data: { section_title, blogs }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="blog-area" space={space} bg={bg}>
            <div className="tw-container tw-relative">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        color="C"
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid tw-grid-cols-1 tw-gap-7.5 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {blogs?.map((blog) => (
                        <AnimatedBlogCard
                            key={blog.path}
                            title={blog.title}
                            path={blog.path}
                            category={blog.category}
                            postedAt={blog.postedAt}
                            image={blog.image}
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
    bg: "tw-bg-navy",
};

export default BlogArea;
