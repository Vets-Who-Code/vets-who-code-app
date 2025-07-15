import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import Shape2 from "@assets/svgs/shape-2.svg";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import { ButtonType, SectionTitleType, TSection } from "@utils/types";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
    };
};

const TeamArea = ({ data: { section_title, buttons }, space, bg, titleSize }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="team-area" space={space} bg={bg}>
            <div className="tw:container tw:grid tw:grid-cols-1 tw:items-center tw:gap-[50px] tw:lg:grid-cols-[58.33%_minmax(38%,1fr)] tw:lg:gap-7.5">
                <motion.div
                    className="image-wrap tw:relative"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <img
                        src="/images/team/home-3-team-image.png"
                        alt="team"
                        className="tw:mx-auto"
                    />
                    <motion.div
                        className="tw:absolute tw:left-0 tw:top-[100px] tw:-z-1 tw:h-[120px] tw:w-[120px] tw:lg:top-[100px] tw:lg:h-[166px] tw:lg:w-[166px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw:h-full tw:w-full tw:fill-primary-light" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:left-0 tw:top-[100px] tw:-z-1 tw:w-[120px] tw:lg:w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/medal.svg"
                            alt="shape"
                            loading="lazy"
                            width={178}
                            height={178}
                        />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:right-0 tw:top-0 tw:z-10"
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
                        className="tw:absolute tw:-bottom-5 tw:left-1/2 tw:-z-1 tw:w-[120px] tw:lg:-bottom-[70px] tw:lg:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/code.svg"
                            alt=""
                            loading="lazy"
                            width={136}
                            height={136}
                        />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:bottom-15 tw:left-0 tw:-z-1 tw:w-[120px] tw:lg:-left-[214px] tw:lg:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/cta-shape-01.png" alt="" />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="tw:lg:max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}
                    {buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} className="tw:mt-1" {...rest}>
                            {content}
                        </Button>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default TeamArea;
