import { motion } from "motion/react";
import Video from "@ui/video-with-poster/video-02";
import MottoText from "@ui/motto-text";
import SectionTitle from "@components/section-title";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { ImageType, MottoType, SectionTitleType, VideoType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedVideo = motion(Video);

type TProps = {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        images?: ImageType[];
        video?: VideoType;
    };
    titleSize?: "default" | "large";
};

const VideoArea = ({ data: { section_title, motto, images, video }, titleSize }: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <div className="about-area tw:relative tw:pb-15 tw:md:pb-15 tw:lg:pb-[100px]">
            <div className="tw:container tw:grid tw:items-center tw:gap-[50px] tw:lg:grid-cols-[62%_minmax(36%,1fr)] tw:lg:gap-7.5">
                <div className="tw:relative">
                    {video && images?.[0] && (
                        <AnimatedVideo
                            poster={{ ...images[0], width: 970, height: 569 }}
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
                            className="tw:lg:max-w-[420px]"
                        />
                    )}
                    {motto && <MottoText className="tw:mt-4" size="md" {...motto} />}
                </motion.div>
            </div>
        </div>
    );
};

export default VideoArea;
