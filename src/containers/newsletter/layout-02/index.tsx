import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Image from "next/image";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};

const NewsletterArea = ({ data: { section_title }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="tw-relative" space={space} bg={bg} id="newsletter">
            <div className="tw-absolute tw-inset-0 -tw-z-1 child:tw-h-full child:tw-w-full child:tw-object-cover">
                <Image
                    src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto:good,dpr_auto,c_fill,w_1920,h_1080/v1678670156/website-images/vetswhocode-newsletter-bg.jpg"
                    alt=""
                    fill={true}
                    sizes="100vw"
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
                <div className="tw-mx-auto tw-mt-[50px] tw-max-w-[480px] tw-border-t-4 tw-border-gold tw-bg-white tw-shadow-2xl">
                    {/* ponytail: Substack's iframe is cross-origin, so only this frame is ours to style */}
                    <iframe
                        src="https://vetswhocode.substack.com/embed"
                        title="Subscribe to the Vets Who Code newsletter"
                        className="tw-block tw-h-[320px] tw-w-full tw-border-0"
                        scrolling="no"
                    />
                </div>
            </motion.div>
        </Section>
    );
};

export default NewsletterArea;
