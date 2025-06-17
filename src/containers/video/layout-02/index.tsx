import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import MottoText from "@ui/motto-text";
import Video from "@ui/video-with-poster/video-02";
import BottomShape from "@ui/bottom-shape/shape-03";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";
import { ImageType, MottoType, SectionTitleType, TSection, VideoType } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedMottoText = motion(MottoText);
const AnimatedVideo = motion(Video);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        images?: ImageType[];
        video?: VideoType;
        motto?: MottoType;
    };
};

const VideoArea = ({
    data: { images, video, section_title, motto },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <Section className="video-area tw-relative" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-items-center tw-gap-7.5 lg:tw-grid-cols-12">
                <div className="tw-relative lg:tw-col-span-7">
                    {video && images?.[0] && (
                        <AnimatedVideo
                            poster={{ ...images[0], width: 970, height: 569 }}
                            video={video}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    <motion.div
                        className="tw-absolute tw-left-[-99px] tw-top-[-99px] tw-z-1 tw-h-[130px] tw-w-[120px] sm:tw-top-[-90px] md:tw-top-[-46px] md:tw-h-[166px] md:tw-w-[166px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-h-full tw-w-full tw-fill-gray-750" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-left-[-65px] tw-top-2 tw-z-1 tw-h-[90px] tw-w-[90px] md:tw-h-auto md:tw-w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/medal.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-right-2.5 tw-top-0 tw-z-20 md:tw-right-7.5"
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
                        className="tw-absolute -tw-bottom-15 tw-right-0 tw-z-1 tw-w-[85px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                </div>
                <div className="lg:tw-col-span-4 lg:tw-pl-5 xl:tw-pl-15">
                    {section_title && (
                        <AnimatedSectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    {motto && (
                        <AnimatedMottoText
                            path={motto.path}
                            pathText={motto.pathText}
                            size="md"
                            className="tw-mt-5"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                </div>
            </div>
            <BottomShape />
        </Section>
    );
};

export default VideoArea;
