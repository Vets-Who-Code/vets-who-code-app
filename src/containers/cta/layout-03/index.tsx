import SafeHTML from "@components/safe-html";
import Section from "@components/ui/engagement-modal";
import Button from "@ui/button";
import { ButtonType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
    };
};

const CtaArea = ({ data: { section_title, buttons }, bg, space }: TProps) => {
    return (
        <Section className="cta-area tw-relative tw-z-10" space={space} bg={bg}>
            <motion.div
                className="tw-container tw-text-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                {section_title?.subtitle && (
                    <SafeHTML
                        as="h3"
                        className="tw-mb-2.5 tw-leading-none tw-text-secondary child:tw-font-normal child:tw-text-primary"
                        content={section_title.subtitle}
                    />
                )}
                {section_title?.title && (
                    <SafeHTML
                        as="h2"
                        className="tw-mb-7.5 tw-text-[34px] tw-text-secondary"
                        content={section_title.title}
                    />
                )}

                {buttons?.map(({ id, content, ...rest }) => (
                    <Button key={id} {...rest} className="tw-w-[260px]">
                        {content}
                    </Button>
                ))}
            </motion.div>
        </Section>
    );
};

export default CtaArea;
