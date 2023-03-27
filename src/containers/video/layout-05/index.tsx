import { motion } from "framer-motion";
import SectionTitle from "@components/section-title";
import Video from "@ui/video-with-poster/video-02";
import BottomShape from "@components/ui/bottom-shape/shape-02";
import { scrollUpVariants } from "@utils/variants";
import { ImageType, SectionTitleType, VideoType } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = {
    data: {
        section_title?: SectionTitleType;
        images?: ImageType[];
        video?: VideoType;
    };
};

const VideoArea = ({ data: { images, video, section_title } }: TProps) => {
    return (
        <div className="tw-relative tw-z-10 tw-bg-gray-200 tw-mb-15 md:tw-mb-[140px]">
            <div className="tw-container">
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
                <motion.div
                    className="tw-relative tw-z-10 -tw-bottom-15 -tw-mt-15 md:-tw-bottom-[140px] md:-tw-mt-[140px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {video && images?.[0] && (
                        <Video
                            poster={{ ...images[0], width: 1170, height: 620 }}
                            video={video}
                        />
                    )}
                </motion.div>
            </div>
            <BottomShape className="tw-hidden md:tw-block" />
        </div>
    );
};

export default VideoArea;
