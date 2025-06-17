import clsx from "clsx";
import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import BottomShape from "@ui/bottom-shape/shape-02";
import Video from "@ui/video-with-poster/video-02";
import Shape2 from "@assets/svgs/shape-2.svg";
import { motion } from "motion/react";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";
import { ImageType, SectionTitleType, TSection, VideoType } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedVideo = motion(Video);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        images?: ImageType[];
        video?: VideoType;
    };
};

const VideoArea = ({ data: { section_title, images, video }, space, bg }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className={clsx("video-area tw-relative tw-mb-[140px]")} space={space} bg={bg}>
            <div className="tw-container tw-relative tw-z-10">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                {!section_title && (
                    <div className="tw-indent-[-9999px]">
                        <h2 className="sr-only">Video Area</h2>
                    </div>
                )}

                {video && images?.[0] && (
                    <AnimatedVideo
                        poster={{ ...images[0], width: 970, height: 569 }}
                        video={video}
                        className={clsx(
                            "-tw-bottom-[140px] tw-mx-auto -tw-mt-[140px] tw-max-w-[970px]"
                        )}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={scrollUpVariants}
                    />
                )}
                <motion.div
                    className="tw-absolute -tw-top-[90px] tw-left-0 tw-z-1 tw-h-[130px] tw-w-[120px] md:tw-top-[120px] md:tw-h-[226px] md:tw-w-[226px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <Shape2 className="tw-h-full tw-w-full tw-fill-putty" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-left-5 tw-top-0 tw-z-1 tw-h-[90px] tw-w-[90px] md:tw-h-auto md:tw-w-auto"
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
                    className="tw-absolute tw-right-0 tw-top-10 tw-z-10"
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
                    className="tw-absolute -tw-bottom-[120px] tw-right-5 tw-z-1 tw-w-[85px] md:tw-w-auto"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/code.svg"
                        alt=""
                        loading="lazy"
                        width={136}
                        height={136}
                    />
                </motion.div>
            </div>
            <BottomShape />
        </Section>
    );
};

VideoArea.defaultProps = {
    bg: "tw-bg-spring",
    space: "top-bottom",
};

export default VideoArea;
