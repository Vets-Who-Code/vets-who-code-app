import { motion } from "framer-motion";
import Video from "@ui/video-with-poster/video-02";
import MottoText from "@ui/motto-text";
import SectionTitle from "@components/section-title";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import {
    ImageType,
    MottoType,
    SectionTitleType,
    VideoType,
} from "@utils/types";
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

const VideoArea = ({
    data: { section_title, motto, images, video },
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();

    return (
        <div className="about-area tw-relative tw-pb-15 md:tw-pb-15 lg:tw-pb-[100px]">
            <div className="tw-container tw-grid lg:tw-grid-cols-[62%_minmax(36%,_1fr)] tw-gap-[50px] lg:tw-gap-7.5 tw-items-center">
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
                        className="tw-absolute tw-z-1 tw-w-[120px] tw-h-[130px] tw-top-[-99px] tw-left-[-99px] sm:tw-top-[-90px] md:tw-w-[166px] md:tw-h-[166px] md:tw-top-[-46px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-gray-750 tw-w-full tw-h-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-top-2 tw-left-[-65px] tw-w-[90px] tw-h-[90px] md:tw-w-auto md:tw-h-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-3.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-20 tw-top-0 -tw-right-2.5 md:tw-right-7.5"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-[6px] tw-border-desert tw-rounded-full tw-w-[45px] tw-h-[45px] md:tw-border-8 md:tw-w-15 md:tw-h-15">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-right-0 -tw-bottom-15 tw-w-[85px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-1.png" alt="" />
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
                    {motto && (
                        <MottoText className="tw-mt-4" size="md" {...motto} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default VideoArea;
