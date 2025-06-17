import clsx from "clsx";
import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
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
                <div className="tw-mb-[50px] md:tw-flex md:tw-justify-between">
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
                            "tw-relative tw-z-1 tw-mb-0 tw-mt-7.5 tw-inline-block tw-py-[45px] tw-pl-[42px] tw-pr-20 tw-text-[13px] tw-uppercase -tw-tracking-tightest lg:tw-mt-0",
                            "before:tw-absolute before:tw-left-0 before:tw-top-[52px] before:tw-h-px before:tw-w-[34px] before:tw-bg-primary before:tw-content-['']"
                        )}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <mark className="tw-absolute tw-right-0 tw-top-1/2 -tw-z-1 -tw-translate-y-1/2 tw-bg-transparent tw-p-5 tw-text-[120px] tw-font-black tw-leading-[0.8] tw-text-gray-550">
                            {items?.length.toString() || "0"}
                        </mark>
                        Steps
                    </motion.h3>
                </div>
                <div className="-tw-mx-3.8 tw-grid lg:tw-grid-cols-4">
                    {items?.map((item, i) => (
                        <AnimatedGradation
                            className="tw-px-3.8"
                            number={i + 1} // Pass the value as a number
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
