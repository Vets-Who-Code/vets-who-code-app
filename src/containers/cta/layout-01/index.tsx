import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import { scrollUpVariants } from "@utils/variants";
import { ButtonType, SectionTitleType, TSection } from "@utils/types";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
    };
};

const CtaArea = ({
    data: { section_title, buttons },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="cta-area" space={space} bg={bg}>
            <motion.div
                className="tw-container tw-text-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                {section_title && (
                    <SectionTitle
                        {...section_title}
                        color="B"
                        titleSize={titleSize}
                        subtitleClass="tw-mb-8"
                    />
                )}
                {buttons?.map(({ id, content, ...rest }) => (
                    <Button key={id} className="tw-mt-7" {...rest}>
                        {content}
                    </Button>
                ))}
            </motion.div>
        </Section>
    );
};

export default CtaArea;
