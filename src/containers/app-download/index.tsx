import { motion } from "motion/react";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { ButtonType, ImageType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
        images?: ImageType[];
    };
};

const AppDownloadArea = ({
    data: { section_title, buttons, images },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="app-download-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 tw-items-center tw-gap-[50px] lg:tw-grid-cols-12 lg:tw-gap-7.5">
                <motion.div
                    className="tw-relative tw-z-10 lg:tw-col-span-7"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "App Download"}
                            width={380}
                            height={514}
                            loading="lazy"
                            className="tw-mx-auto"
                        />
                    )}
                    <motion.div
                        className="tw-absolute tw-bottom-2.5 tw-left-5 -tw-z-1 tw-h-[200px] tw-w-[200px] md:tw-bottom-0 md:tw-h-[476px] md:tw-w-[476px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-h-full tw-w-full tw-fill-pampas" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-bottom-[40%] tw-left-0 -tw-z-1 md:tw-left-[-150px]"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/cta-shape-01.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-right-5 tw-top-0 tw-z-20"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block tw-h-[62px] tw-w-[62px] tw-rounded-full tw-border-8 tw-border-desert -tw-indent-[99999px]">
                            shape 1
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-bottom-5 tw-right-7.5 -tw-z-1 tw-w-20 md:tw-bottom-0 md:tw-right-[15%] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="lg:tw-col-span-5"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}
                    {buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} className="tw-mt-10" {...rest}>
                            {content}
                        </Button>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default AppDownloadArea;
