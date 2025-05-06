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
        <div className="about-area tw-relative tw-pb-15 md:tw-pb-15 lg:tw-pb-[100px]">
            <div className="tw-container tw-grid tw-items-center tw-gap-[50px] lg:tw-grid-cols-[62%_minmax(36%,_1fr)] lg:tw-gap-7.5">
                <div className="tw-relative">
                    {video && images?.[0] && (
                        <AnimatedVideo
                            poster={{ ...images[0], width: 970, height: 569 }}
                            className="lg:tw-mr-[55px]"
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
                            className="lg:tw-max-w-[420px]"
                        />
                    )}
                    {motto && <MottoText className="tw-mt-4" size="md" {...motto} />}
                </motion.div>
            </div>
        </div>
    );
};

export default VideoArea;
