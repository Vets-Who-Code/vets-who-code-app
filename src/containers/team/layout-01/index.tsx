import { motion } from "framer-motion";
import Section from "@ui/section";
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

const TeamArea = ({
    data: { section_title, buttons },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="team-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-[58.33%_minmax(38%,_1fr)] tw-gap-[50px] lg:tw-gap-7.5 tw-items-center">
                <motion.div
                    className="image-wrap tw-relative"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <img
                        src="/images/team/home-3-team-image.png"
                        alt="team"
                        className="tw-mx-auto"
                    />
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-left-0 tw-top-[100px] tw-w-[120px] tw-h-[120px] lg:tw-top-[100px] lg:tw-w-[166px] lg:tw-h-[166px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-primary-light tw-w-full tw-h-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-top-[100px] tw-left-0 tw-w-[120px] lg:tw-w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/shape-3.png"
                            alt="shape"
                            loading="lazy"
                            width={178}
                            height={178}
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-10 tw-top-0 tw-right-0"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-desert tw-rounded-full tw-border-[6px] tw-w-[45px] tw-h-[45px] md:tw-border-8 md:tw-w-15 md:tw-h-15">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-left-1/2 -tw-bottom-5 tw-w-[120px] lg:-tw-bottom-[70px] lg:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/shape-1.png"
                            alt=""
                            loading="lazy"
                            width={136}
                            height={136}
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-bottom-15 tw-left-0 tw-w-[120px] lg:-tw-left-[214px] lg:tw-w-auto"
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
                </motion.div>
                <motion.div
                    className="lg:tw-max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                        />
                    )}
                    {buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} className="tw-mt-1" {...rest}>
                            {content}
                        </Button>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default TeamArea;
