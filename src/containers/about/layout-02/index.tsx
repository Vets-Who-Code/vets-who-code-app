import { motion } from "motion/react";
import Section from "@ui/section";
import MottoText from "@ui/motto-text";
import SectionTitle from "@components/section-title";
import { useUI } from "@contexts/ui-context";
import { ImageType, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        images?: ImageType[];
    };
};

const AboutArea = ({ data: { section_title, motto, images }, space, bg, titleSize }: TProps) => {
    const { trans1 } = useUI();
    return (
        <Section className="about-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-items-center tw-gap-[50px] lg:tw-grid-cols-2 lg:tw-gap-7.5">
                <motion.div
                    className="tw-order-2 lg:tw-order-1 lg:tw-max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}
                    {motto && <MottoText className="tw-mt-4" size="md" {...motto} />}
                </motion.div>
                <div className="tw-relative tw-order-1 lg:tw-order-2">
                    {images?.[0]?.src && (
                        <motion.div
                            className="tw-relative tw-z-10"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={scrollUpVariants}
                        >
                            <img
                                src={images[0].src}
                                alt={images[0]?.alt || "About One"}
                                width={570}
                                height={360}
                                loading="lazy"
                                className="tw-rounded"
                            />
                        </motion.div>
                    )}
                    {images?.[1]?.src && (
                        <div className="tw-absolute tw-right-0 tw-top-[-90px] tw-z-20 3xl:tw-right-[-73px]">
                            <img
                                src={images[1].src}
                                alt={images[1]?.alt || "About Two"}
                                width={190}
                                height={190}
                                loading="lazy"
                                className="tw-rounded"
                            />
                        </div>
                    )}

                    <motion.div
                        className="tw-absolute tw-left-0 tw-top-[-51px] tw-z-1 lg:tw-left-[-107px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block tw-h-[45px] tw-w-[45px] tw-rounded-full tw-border-[7px] tw-border-desert -tw-indent-[99999px] lg:tw-h-15 lg:tw-w-15">
                            shape 1
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-bottom-[-26px] tw-left-0 tw-z-1 tw-w-20 lg:-tw-left-10 lg:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/about-shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-bottom-10 tw-right-2.5 tw-z-1 tw-w-20 lg:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/hashflag.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-left-[360px] tw-top-[-27px] tw-z-1 tw-w-20 lg:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

AboutArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default AboutArea;
