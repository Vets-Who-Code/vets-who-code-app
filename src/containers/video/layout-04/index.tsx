import { motion } from "framer-motion";
import Section from "@ui/section";
import Video from "@ui/video-with-poster/video-02";
import Shape2 from "@assets/svgs/shape-2.svg";
import { scrollUpVariants } from "@utils/variants";
import { ImageType, TSection, VideoType } from "@utils/types";
import { useUI } from "@contexts/ui-context";

const AnimatedVideo = motion(Video);

type TProps = TSection & {
    data: {
        images?: ImageType[];
        video?: VideoType;
    };
};

const VideoArea = ({ data: { images, video }, space, bg }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section
            className="video-area tw-relative tw-z-10"
            space={space}
            bg={bg}
        >
            <h2 className="tw-sr-only">Video Section</h2>
            <div className="tw-container -tw-bottom-[140px] -tw-mt-[140px]">
                {video && images?.[0] && (
                    <AnimatedVideo
                        poster={{ ...images[0], width: 970, height: 569 }}
                        className="tw-max-w-[970px] tw-mx-auto"
                        video={video}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <motion.div
                    className="tw-absolute tw-z-1 -tw-left-10 tw-top-0 tw-w-[120px] tw-h-[130px] md:-tw-top-20 md:tw-left-16 md:tw-w-[226px] md:tw-h-[226px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <Shape2 className="tw-fill-putty tw-w-full tw-h-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-top-11 -tw-left-5 tw-w-[90px] tw-h-[90px] md:tw-w-auto md:tw-h-auto"
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
                    className="tw-absolute tw-z-10 tw-top-15 lg:tw-top-10 tw-right-0"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block -tw-indent-[99999px] tw-border-desert tw-rounded-full tw-border-[6px] tw-w-[45px] tw-h-[45px] md:tw-border-[12px] md:tw-w-[90px] md:tw-h-[90px]">
                        shape 3
                    </span>
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 -tw-bottom-[45px] tw-right-5 tw-w-[85px] md:tw-w-auto"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/shape-1.png"
                        alt=""
                        loading="lazy"
                        width={136}
                        height={136}
                    />
                </motion.div>
            </div>
        </Section>
    );
};

export default VideoArea;
