import { motion } from "framer-motion";
import Section from "@ui/section";
import DonateForm from "@components/forms/donate-form";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedDonateForm = motion(DonateForm);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};
const DonateFormArea = ({ data: { section_title } }: TProps) => {
    return (
        <Section className="donate-form-area">
            <div className="tw-container">
                {section_title && (
                    <motion.h2
                        className="tw-leading-none tw-mb-10"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <AnimatedDonateForm
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            </div>
        </Section>
    );
};

export default DonateFormArea;
