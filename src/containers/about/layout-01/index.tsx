import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import Anchor from "@ui/anchor";
import { motion } from "motion/react";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, TextType, AnchorType, ImageType, TSection } from "@utils/types";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        texts?: TextType[];
        anchors?: AnchorType[];
        images?: ImageType[];
    };
};

const QuoteArea = ({
    data: { section_title, texts, anchors, images },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section space={space} bg={bg} className="about-area">
            <div className="tw:container">
                <div className="tw:lg:pb-[50px] tw:lg:pl-[135px] tw:xl:pl-[200px]">
                    <motion.div
                        className="tw:flex tw:bg-gray-100"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <figure className="tw:relative tw:-ml-[135px] tw:hidden tw:w-[270px] tw:flex-auto0 tw:translate-y-[50px] tw:lg:block">
                            {images?.[0]?.src && (
                                <img
                                    src={images[0].src}
                                    alt={images[0]?.alt || "About"}
                                    width={270}
                                    height={362}
                                    loading="lazy"
                                />
                            )}
                        </figure>
                        <div className="tw:px-7.5 tw:pb-10 tw:lg:py-[70px] tw:lg:pl-[50px] tw:lg:pr-[30px]">
                            {section_title && (
                                <SectionTitle
                                    {...section_title}
                                    align="left"
                                    titleSize={titleSize}
                                    className="tw:mb-[25px]"
                                />
                            )}

                            <div className="tw:flex tw:flex-col tw:gap-[30px] tw:md:flex-row">
                                <div className="tw:md:w-[64.5%]">
                                    {texts?.[0]?.content && (
                                        <p className="tw:text-xl tw:font-medium tw:leading-normal tw:xl:text-2xl">
                                            {texts[0].content}
                                        </p>
                                    )}
                                </div>
                                <div className="tw:md:w-[35.406%]">
                                    {texts?.[1]?.content && (
                                        <p
                                            className="tw:mb-0 tw:text-5xl tw:font-extrabold tw:leading-tight tw:text-primary tw:child:bottom-0 tw:child:ml-1.3 tw:child:text-2xl"
                                            dangerouslySetInnerHTML={{
                                                __html: texts[1].content,
                                            }}
                                        />
                                    )}
                                    {texts?.[2]?.content && (
                                        <p className="tw:mb-2.5 tw:text-base tw:font-bold tw:uppercase tw:leading-loose tw:-tracking-tightest tw:text-secondary">
                                            {texts[2].content}
                                        </p>
                                    )}
                                    {anchors?.[0].content && (
                                        <Anchor
                                            path={anchors[0]?.path}
                                            className="tw:text-md tw:font-bold tw:text-secondary-light"
                                        >
                                            {anchors[0].content}{" "}
                                            <i className="far fa-long-arrow-right" />
                                        </Anchor>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

QuoteArea.defaultProps = {
    space: "top-bottom",
};

export default QuoteArea;
