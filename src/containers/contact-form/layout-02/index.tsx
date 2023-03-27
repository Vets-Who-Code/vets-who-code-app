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
        <Section className="contact-form-area">
            <div className="tw-container">
                {section_title && (
                    <motion.h2
                        className="tw-max-w-[600px] tw-mx-auto tw-text-center tw-leading-none tw-mb-10 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <AnimatedContactForm
                    className="tw-max-w-[770px] tw-mx-auto"
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
