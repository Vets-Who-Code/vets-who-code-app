import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import ContactForm from "@components/forms/contact-form";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedContactForm = motion(ContactForm);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};
const ContactFormArea = ({ data: { section_title } }: TProps) => {
    return (
        <Section className="contact-form-area">
            <div className="tw-container tw-grid tw-grid-cols-1 tw-gap-x-7.5 lg:tw-grid-cols-[33%,_minmax(63%,_1fr)]">
                {section_title && (
                    <motion.h2
                        className="tw-mb-10 tw-leading-none"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <AnimatedContactForm
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            </div>
        </Section>
    );
};

export default ContactFormArea;
