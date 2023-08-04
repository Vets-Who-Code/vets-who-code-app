import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import TimelineItem from "./item";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: Pick<ItemType, "id" | "images" | "headings" | "texts">[];
    };
};

const TimelineArea = ({
    data: { section_title, items },
    space,
    bg,
    titleSize,
}: TProps) => {
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
                    <ul className="tw-relative tw-pt-8 tw-pb-[65px]">
                        <li className="tw-absolute tw-top-0 tw-left-3.8 md:tw-left-1/2 -tw-ml-px tw-h-full tw-border-l-2 tw-border-l-mishcka" />
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
