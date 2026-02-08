import MediaCard from "@components/media-card";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import MottoText from "@components/ui/motto-text";
import { IMedia, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedMediaCard = motion(MediaCard);
const AnimatedMottoText = motion(MottoText);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        media: IMedia[];
    };
};

const MediaArea = ({ data: { section_title, motto, media }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="media-area" space={space} bg={bg}>
            <div className="tw-container tw-relative">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid tw-grid-cols-1 tw-gap-7.5 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {media?.map((item) => (
                        <AnimatedMediaCard
                            key={item.slug}
                            {...item}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>

                {motto && (
                    <AnimatedMottoText
                        {...motto}
                        className="tw-mx-auto tw-mt-10 tw-text-center lg:tw-w-7/12"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
            </div>
        </Section>
    );
};

export default MediaArea;
