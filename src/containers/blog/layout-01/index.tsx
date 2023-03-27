import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard01 from "@components/blog-card/blog-01";
import BlogCard02 from "@components/blog-card/blog-02";
import MottoText from "@components/ui/motto-text";
import SectionTitle from "@components/section-title";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";
import { MottoType, SectionTitleType, IBlog, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        blogs: IBlog[];
    };
};

const BlogArea = ({
    data: { section_title, motto, blogs },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <Section
            className="blog-area tw-relative tw-overflow-hidden"
            space={space}
            bg={bg}
        >
            <div className="tw-absolute tw-inset-0 tw-flex jtw-ustify-center tw-items-center">
                <img
                    src="/images/bg/maxcoach-shape-03.png"
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

                <div className="tw-grid tw-grid-cols-1 tw-grid-flow-row md:tw-grid-cols-2 lg:tw-grid-cols-[275px_minmax(275px,_500px)_275px] tw-gap-x-[30px] xl:tw-gap-x-[50px] tw-gap-y-[30px] xl:tw-grid-flow-col xl:tw-justify-between tw-relative tw-z-10">
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
                            views={blogs[0].views}
                        />
                    </motion.div>
                    <motion.div
                        className="maxLg:tw-order-3 md:tw-col-span-full lg:tw-col-auto"
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
                            views={blogs[1].views}
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
                            views={blogs[2].views}
                        />
                    </motion.div>
                </div>
                {motto && (
                    <MottoText
                        {...motto}
                        className="tw-text-center tw-mt-[100px] tw-relative tw-z-10"
                    />
                )}

                <motion.div
                    className="tw-absolute tw-z-1 tw-top-[80px] tw-left-[60px] lg:tw-top-[140px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block -tw-indent-[99999px] tw-border-desert tw-rounded-full tw-border-[7px] tw-w-[60px] tw-h-[60px] md:tw-border-[12px] md:tw-w-[90px] md:tw-h-[90px]">
                        shape 3
                    </span>
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-top-[220px] tw-left-[260px]"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/shape-3.png"
                        alt="shape"
                        loading="lazy"
                        width={178}
                        height={178}
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-bottom-[50px] tw-left-[60%] tw-w-[120px] tw-h-[120px] md:tw-w-[226px] md:tw-h-[226px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <Shape2 className="tw-fill-primary-light tw-w-full tw-h-full" />
                </motion.div>
            </div>
        </Section>
    );
};

BlogArea.defaultProps = {
    space: "top-bottom",
    bg: "tw-bg-gray-200",
};

export default BlogArea;
