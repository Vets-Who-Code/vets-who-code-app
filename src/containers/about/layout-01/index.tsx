import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Anchor from "@ui/anchor";
import { motion } from "framer-motion";
import { scrollUpVariants } from "@utils/variants";
import {
    SectionTitleType,
    TextType,
    AnchorType,
    ImageType,
    TSection,
} from "@utils/types";

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
            <div className="tw-container">
                <div className="lg:tw-pb-[50px] lg:tw-pl-[135px] xl:tw-pl-[200px]">
                    <motion.div
                        className="tw-flex tw-bg-gray-100"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <figure className="tw-relative tw-flex-auto0 tw-w-[270px] -tw-ml-[135px] tw-translate-y-[50px] tw-hidden lg:tw-block">
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
                        <div className="tw-px-7.5 tw-pb-10  lg:tw-py-[70px] lg:tw-pl-[50px] lg:tw-pr-[30px]">
                            {section_title && (
                                <SectionTitle
                                    {...section_title}
                                    align="left"
                                    titleSize={titleSize}
                                    className="tw-mb-[25px]"
                                />
                            )}

                            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-[30px]">
                                <div className="md:tw-w-[64.5%]">
                                    {texts?.[0]?.content && (
                                        <p className="tw-text-xl xl:tw-text-2xl tw-font-medium tw-leading-normal">
                                            {texts[0].content}
                                        </p>
                                    )}
                                </div>
                                <div className="md:tw-w-[35.406%]">
                                    {texts?.[1]?.content && (
                                        <p
                                            className="tw-mb-0 tw-text-5xl tw-font-extrabold tw-leading-tight tw-text-primary child:tw-text-2xl child:tw-bottom-0 child:tw-ml-1.3"
                                            dangerouslySetInnerHTML={{
                                                __html: texts[1].content,
                                            }}
                                        />
                                    )}
                                    {texts?.[2]?.content && (
                                        <p className="tw-text-base tw-leading-loose tw-mb-2.5 -tw-tracking-tightest tw-uppercase tw-font-bold tw-text-secondary">
                                            {texts[2].content}
                                        </p>
                                    )}
                                    {anchors?.[0].content && (
                                        <Anchor
                                            path={anchors[0]?.path}
                                            className="tw-text-secondary-light tw-text-md tw-font-bold"
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
