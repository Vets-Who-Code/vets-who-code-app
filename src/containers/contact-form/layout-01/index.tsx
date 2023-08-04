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
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-[33%,_minmax(63%,_1fr)] tw-gap-x-7.5">
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
