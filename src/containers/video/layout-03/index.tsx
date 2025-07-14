import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import MottoText from "@ui/motto-text";
import SectionTitle from "@components/section-title";
import BottomShape from "@ui/bottom-shape/shape-03";
import Video from "@ui/video-with-poster/video-02";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { ImageType, MottoType, SectionTitleType, TSection, VideoType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedVideo = motion(Video);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        images?: ImageType[];
        video?: VideoType;
    };
};

const VideoArea = ({
    data: { section_title, motto, images, video },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <Section className="video-area tw:relative" space={space} bg={bg}>
            <div className="tw:container tw:grid tw:items-center tw:gap-[50px] tw:lg:grid-cols-[64%_minmax(36%,1fr)] tw:lg:gap-7.5">
                <div className="tw:relative">
                    {video && images?.[0] && (
                        <AnimatedVideo
                            poster={{ ...images[0], width: 716, height: 481 }}
                            className="tw:lg:mr-[55px]"
                            video={video}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    <motion.div
                        className="tw:absolute tw:left-[-99px] tw:top-[-99px] tw:z-1 tw:h-[130px] tw:w-[120px] tw:sm:top-[-90px] tw:md:top-[-46px] tw:md:h-[166px] tw:md:w-[166px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw:h-full tw:w-full tw:fill-gray-750" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:left-[-65px] tw:top-2 tw:z-1 tw:h-[90px] tw:w-[90px] tw:md:h-auto tw:md:w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/medal.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:-right-2.5 tw:top-0 tw:z-20 tw:md:right-7.5"
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
                        className="tw:absolute tw:-bottom-15 tw:right-0 tw:z-1 tw:w-[85px] tw:md:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                </div>
                <motion.div
                    className="tw:lg:max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}

                    {motto && <MottoText className="tw:mt-1" size="md" {...motto} />}
                </motion.div>
            </div>
            <BottomShape />
        </Section>
    );
};

VideoArea.defaultProps = {
    bg: "tw:bg-gray-200",
};

export default VideoArea;
