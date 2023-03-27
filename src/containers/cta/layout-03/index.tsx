import { motion } from "framer-motion";
import Section from "@ui/section";
import Button from "@ui/button";
import { ButtonType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

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
                    <h3
                        className="tw-leading-none tw-mb-2.5 tw-text-secondary child:tw-text-primary child:tw-font-normal"
                        dangerouslySetInnerHTML={{
                            __html: section_title.subtitle,
                        }}
                    />
                )}
                {section_title?.title && (
                    <h2
                        className="tw-text-[34px] tw-mb-7.5 tw-text-secondary"
                        dangerouslySetInnerHTML={{
                            __html: section_title.title,
                        }}
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
