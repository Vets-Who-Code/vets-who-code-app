import clsx from "clsx";
import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Gradation from "@components/gradation";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedGradation = motion(Gradation);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const GradationArea = ({ data: { section_title, items } }: TProps) => {
    return (
        <Section className="gradation-area">
            <div className="tw-container">
                <div className="md:tw-flex md:tw-justify-between tw-mb-[50px]">
                    {section_title && (
                        <AnimatedSectionTitle
                            {...section_title}
                            align="left"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    <motion.h3
                        className={clsx(
                            "tw-relative tw-text-[13px] -tw-tracking-tightest tw-uppercase tw-inline-block tw-py-[45px] tw-pr-20 tw-pl-[42px] tw-z-1 tw-mb-0 tw-mt-7.5 lg:tw-mt-0",
                            "before:tw-absolute before:tw-content-[''] before:tw-top-[52px] before:tw-left-0 before:tw-w-[34px] before:tw-h-px before:tw-bg-primary"
                        )}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <mark className="tw-absolute tw-bg-transparent tw-top-1/2 tw-right-0 -tw-translate-y-1/2 tw-text-[120px] tw-leading-[0.8] tw-font-black tw-text-gray-550 -tw-z-1 tw-p-5">
                            {items?.length.toString().padStart(2, "0") || "00"}
                        </mark>
                        Steps
                    </motion.h3>
                </div>
                <div className="tw-grid lg:tw-grid-cols-4 -tw-mx-3.8">
                    {items?.map((item, i) => (
                        <AnimatedGradation
                            className="tw-px-3.8"
                            number={i + 1}
                            key={item.id}
                            title={item.title}
                            description={item.description}
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

export default GradationArea;
