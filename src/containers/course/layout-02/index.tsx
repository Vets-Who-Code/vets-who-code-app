import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
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
                className="tw:container tw:relative tw:text-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                {section_title?.subtitle && (
                    <h3
                        className="tw:mb-2.5 tw:leading-none tw:text-secondary tw:child:font-normal tw:child:text-primary"
                        dangerouslySetInnerHTML={{
                            __html: section_title.subtitle,
                        }}
                    />
                )}
                {section_title?.title && (
                    <h2
                        className="tw:mb-7.5 tw:text-[34px] tw:text-secondary"
                        dangerouslySetInnerHTML={{
                            __html: section_title.title,
                        }}
                    />
                )}

                {buttons?.map(({ id, content, ...rest }) => (
                    <Button key={id} {...rest} className="tw:w-[300px]">
                        {content}
                    </Button>
                ))}
                <motion.div
                    className="tw:absolute tw:left-[50px] tw:top-[-50px] tw:z-20"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw:block tw:h-[52px] tw:w-[52px] tw:rounded-full tw:border-[7px] tw:border-desert-100 tw:-indent-[99999px]">
                        shape 1
                    </span>
                </motion.div>
                <motion.div
                    className="tw:absolute tw:-left-2.5 tw:bottom-0 tw:z-1 tw:w-15 tw:md:-left-5 tw:md:w-auto"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img src="/images/shape-animation/cta-shape-01.png" alt="" />
                </motion.div>
                <motion.div
                    className="tw:absolute tw:-right-5 tw:top-5 tw:z-1 tw:w-15 tw:md:right-0 tw:md:top-2.5 tw:md:w-auto"
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
            </motion.div>
        </Section>
    );
};

CtaArea.defaultProps = {
    bg: "tw:bg-gray-200",
};

export default CtaArea;
