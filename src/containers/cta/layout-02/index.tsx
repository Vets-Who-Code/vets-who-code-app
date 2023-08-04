import { motion } from "framer-motion";
import Section from "@ui/section";
import Button from "@ui/button";
import { useUI } from "@contexts/ui-context";
import { ButtonType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
    };
};

const CtaArea = ({ data: { section_title, buttons }, space, bg }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="cta-area" space={space} bg={bg}>
            <motion.div
                className="tw-container tw-text-center tw-relative"
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
                    <Button key={id} {...rest} className="tw-w-[300px]">
                        {content}
                    </Button>
                ))}
                <motion.div
                    className="tw-absolute tw-top-[-50px] tw-left-[50px] tw-z-20"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block -tw-indent-[99999px] tw-border-[7px] tw-border-desert-100 tw-rounded-full tw-w-[52px] tw-h-[52px]">
                        shape 1
                    </span>
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-bottom-0 -tw-left-2.5 tw-w-15 md:tw-w-auto md:-tw-left-5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/cta-shape-01.png"
                        alt=""
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-w-15 tw-top-5 -tw-right-5 md:tw-w-auto md:tw-top-2.5 md:tw-right-0"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/nwesletter-shape-2.png"
                        alt=""
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
};

CtaArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default CtaArea;
