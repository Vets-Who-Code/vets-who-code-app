import NewsletterForm from "@components/forms/newsletter-form";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};

const NewsletterArea = ({ data: { section_title }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="tw-relative" space={space} bg={bg} id="newsletter">
            <div className="tw-absolute tw-inset-0 -tw-z-1 child:tw-h-full child:tw-w-full child:tw-object-cover">
                <img
                    src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1678670156/website-images/vetswhocode-newsletter-bg.jpg"
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
                <p
                    className="tw-mx-auto tw-mt-8 tw-mb-0 tw-text-center"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#DEE2E6",
                        maxWidth: "720px",
                    }}
                >
                    Vets Who Code is a registered 501(c)(3) nonprofit — EIN 86-2122804. Donations are tax-deductible to the fullest extent allowable under the law.
                </p>
            </motion.div>
        </Section>
    );
};

export default NewsletterArea;
