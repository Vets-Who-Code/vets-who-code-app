import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import TimelineItem from "./item";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: Pick<ItemType, "id" | "images" | "headings" | "texts">[];
    };
};

const TimelineArea = ({ data: { section_title, items }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="timeline-area" space={space} bg={bg}>
            <div className="tw-container">
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
                {items && items.length > 0 && (
                    <ul className="tw-relative tw-pb-[65px] tw-pt-8">
                        <li className="tw-absolute tw-left-3.8 tw-top-0 -tw-ml-px tw-h-full tw-border-l-2 tw-border-l-mishcka md:tw-left-1/2" />
                        {items.map(({ id, headings, images, texts }, idx) => (
                            <TimelineItem
                                key={id}
                                title={headings[0]}
                                image={images[0]}
                                texts={texts}
                                heading={headings[1]}
                                isEven={idx % 2 === 0}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </Section>
    );
};

export default TimelineArea;
