import { motion } from "framer-motion";
import Section from "@ui/section";
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
        <Section className="contact-form-area tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-white tw-p-4 sm:tw-p-6 lg:tw-p-8">
            <div className="tw-container">
                {section_title && (
                    <motion.h2
                        className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-[#091f40] tw-mb-6 sm:tw-mb-8 tw-text-center"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <AnimatedContactForm
                    className="tw-w-full tw-max-w-4xl tw-mx-auto tw-bg-white tw-p-8 sm:tw-p-10"
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
