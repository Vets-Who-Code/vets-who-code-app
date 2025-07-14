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
        <Section className="contact-form-area tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-white tw:p-4 tw:sm:p-6 tw:lg:p-8">
            <div className="tw:container">
                {section_title && (
                    <motion.h2
                        className="tw:mb-6 tw:text-center tw:text-3xl tw:font-bold tw:text-[#091f40] tw:sm:mb-8 tw:sm:text-4xl"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <AnimatedContactForm
                    className="tw:mx-auto tw:w-full tw:max-w-4xl tw:bg-white tw:p-8 tw:sm:p-10"
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
