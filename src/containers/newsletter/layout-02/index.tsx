import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import NewsletterForm from "@components/forms/newsletter-form";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};

const NewsletterArea = ({
    data: { section_title },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="tw-relative" space={space} bg={bg}>
            <div className="tw-absolute tw-inset-0 -tw-z-1 child:tw-w-full child:tw-h-full child:tw-object-cover">
                <img
                    src="https://res.cloudinary.com/vetswhocode/image/upload/v1678670156/website-images/vetswhocode-newsletter-bg.jpg"
                    alt="newsletter BG"
                />
            </div>
            <motion.div
                className="tw-container tw-relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                {section_title && (
                    <SectionTitle
                        {...section_title}
                        color="C"
                        titleSize={titleSize}
                        descClass="tw-text-lg tw-font-medium"
                    />
                )}
                <NewsletterForm className="tw-mx-auto tw-mt-[50px]" />
            </motion.div>
        </Section>
    );
};

export default NewsletterArea;
