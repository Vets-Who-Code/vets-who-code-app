import Shape2 from "@assets/svgs/shape-2.svg";
import BlogCard01 from "@components/blog-card/blog-01";
import BlogCard02 from "@components/blog-card/blog-02";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import MottoText from "@components/ui/motto-text";
import { useUI } from "@contexts/ui-context";
import { IBlog, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        blogs: IBlog[];
    };
};

const BlogArea = ({ data: { section_title, motto, blogs }, space, bg, titleSize }: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <Section className="blog-area tw-relative tw-overflow-hidden" space={space} bg={bg}>
            <div className="jtw-justify-center tw-absolute tw-inset-0 tw-flex tw-items-center">
                <img
                    src="/images/bg/shape-03.png"
                    alt="shape"
                    loading="lazy"
                    width={1211}
                    height={291}
                />
            </div>
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

                <div className="tw-relative tw-z-10 tw-grid tw-grid-flow-row tw-grid-cols-1 tw-gap-x-[30px] tw-gap-y-[30px] md:tw-grid-cols-2 lg:tw-grid-cols-[275px_minmax(275px,_500px)_275px] xl:tw-grid-flow-col xl:tw-justify-between xl:tw-gap-x-[50px]">
                    <motion.div
                        className="lg:tw-mt-[150px] maxLg:tw-order-1"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <BlogCard01
                            title={blogs[0].title}
                            path={blogs[0].path}
                            category={blogs[0].category}
                            postedAt={blogs[0].postedAt}
                            image={blogs[0].image}
                        />
                    </motion.div>
                    <motion.div
                        className="md:tw-col-span-full lg:tw-col-auto maxLg:tw-order-3"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <BlogCard02
                            title={blogs[1].title}
                            path={blogs[1].path}
                            category={blogs[1].category}
                            postedAt={blogs[1].postedAt}
                            image={blogs[1].image}
                        />
                    </motion.div>
                    <motion.div
                        className="lg:tw-mt-[50px] maxLg:tw-order-2"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <BlogCard01
                            title={blogs[2].title}
                            path={blogs[2].path}
                            category={blogs[2].category}
                            postedAt={blogs[2].postedAt}
                            image={blogs[2].image}
                        />
                    </motion.div>
                </div>
                {motto && (
                    <MottoText
                        {...motto}
                        className="tw-relative tw-z-10 tw-mt-[100px] tw-text-center"
                    />
                )}

                <motion.div
                    className="tw-absolute tw-left-[60px] tw-top-[80px] tw-z-1 lg:tw-top-[140px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/dog-tag.svg"
                        alt="shape"
                        loading="lazy"
                        width={178}
                        height={178}
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-left-[260px] tw-top-[220px] tw-z-1"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/medal.svg"
                        alt="shape"
                        loading="lazy"
                        width={178}
                        height={178}
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-bottom-[50px] tw-left-[60%] tw-z-1 tw-h-[120px] tw-w-[120px] md:tw-h-[226px] md:tw-w-[226px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <Shape2 className="tw-h-full tw-w-full tw-fill-primary-light" />
                </motion.div>
            </div>
        </Section>
    );
};

BlogArea.defaultProps = {
    space: "top-bottom",
    bg: "tw-bg-gray-50",
};

export default BlogArea;
