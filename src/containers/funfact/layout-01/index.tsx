import Section from "@ui/section";
import FunFact from "@components/funfact/funfact-01";
import SectionTitle from "@components/section-title";
import { motion } from "framer-motion";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, ItemType, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const FunfactArea = ({
    data: { section_title, items },
    space,
    bg,
    titleSize,
}: TProps) => (
    <Section space={space} bg={bg} className="funfact-area">
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

            <div className="tw-grid md:tw-grid-cols-3 lg:tw-w-3/4 tw-mx-auto tw-gap-[30px]">
                {items?.map((item) => (
                    <AnimatedFunFact
                        key={item.id}
                        counter={item.counter}
                        suffix={item.suffix}
                        title={item.title}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                ))}
            </div>
        </div>
    </Section>
);

FunfactArea.defaultProps = {
    space: "top-bottom",
};

export default FunfactArea;
