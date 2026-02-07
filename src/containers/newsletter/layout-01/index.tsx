import NewsletterForm from "@components/forms/newsletter-form";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import { useUI } from "@contexts/ui-context";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};

const NewsletterArea = ({ data: { section_title }, space, bg }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="newsletter-area" space={space} bg={bg}>
            <motion.div
                className="tw-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                {section_title && <SectionTitle {...section_title} />}
                <NewsletterForm className="tw-mx-auto tw-mt-[50px]" />

                <motion.div
                    className="tw-absolute tw-bottom-[50px] tw-left-[-3px] tw-z-20 md:tw-left-0"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-[45px] tw-w-[45px] tw-rounded-full tw-border-[6px] tw-border-primary-light -tw-indent-[99999px] md:tw-h-14 md:tw-w-14 md:tw-border-[7px]">
                        shape 1
                    </span>
                </motion.div>

                <motion.div
                    className="tw-absolute -tw-bottom-[45px] tw-right-0 tw-top-7.5 -tw-z-1 tw-w-[100px] md:tw-right-2.5 md:tw-w-auto"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/dog-tag.svg"
                        alt="shape"
                        loading="lazy"
                        width={178}
                        height={178}
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute -tw-bottom-[-25px] tw-right-[5px] tw-top-[25px] -tw-z-1 tw-w-15 md:tw-right-[-35px] md:tw-w-auto"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/dog-tag.svg"
                        alt="shape"
                        loading="lazy"
                        width={178}
                        height={178}
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default NewsletterArea;
