import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import MottoText from "@ui/motto-text";
import FunFact from "@components/funfact/funfact-01";
import { ItemType, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        items?: ItemType[];
    };
};

const FunfactArea = ({ data: { section_title, motto, items }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="funfact-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 tw-gap-[50px] lg:tw-grid-cols-2 lg:tw-gap-7.5">
                <motion.div
                    className="md:tw-max-w-[470px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}
                    {motto && <MottoText {...motto} size="md" className="tw-mt-5" />}
                </motion.div>
                <div className="tw-grid tw-h-min tw-grid-cols-1 tw-gap-10 tw-gap-x-3.8 sm:tw-grid-cols-2 md:tw-gap-y-15">
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
};

export default FunfactArea;
