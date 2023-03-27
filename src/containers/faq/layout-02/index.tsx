import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Accordion from "@ui/accordion";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const FaqArea = ({
    data: { section_title, items = [] },
    space,
    bg,
    titleSize,
}: TProps) => {
    const mid = Math.floor(items.length / 2);
    const left = items.slice(0, mid);
    const right = items.slice(mid);
    return (
        <Section className="faq-area" space={space} bg={bg}>
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
                <motion.div
                    className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-gap-7.5"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {left && left.length > 0 && (
                        <Accordion items={left} defaultActiveKey={left[0].id} />
                    )}
                    {right && right.length > 0 && <Accordion items={right} />}
                </motion.div>
            </div>
        </Section>
    );
};

export default FaqArea;
