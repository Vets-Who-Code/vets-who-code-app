import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import {
    ButtonType,
    ImageType,
    SectionTitleType,
    TSection,
} from "@utils/types";
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
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-items-center tw-gap-[50px] lg:tw-gap-7.5">
                <motion.div
                    className="lg:tw-col-span-7 tw-relative tw-z-10"
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
                        className="tw-absolute -tw-z-1 tw-left-5 tw-bottom-2.5 tw-w-[200px] tw-h-[200px] md:tw-bottom-0 md:tw-w-[476px] md:tw-h-[476px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-pampas tw-w-full tw-h-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-bottom-[40%] tw-left-0 md:tw-left-[-150px]"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/cta-shape-01.png"
                            alt=""
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-20 tw-top-0 tw-right-5"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-8 tw-border-desert tw-rounded-full tw-w-[62px] tw-h-[62px]">
                            shape 1
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-right-7.5 tw-bottom-5 md:tw-w-auto md:tw-bottom-0 md:tw-right-[15%]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-1.png" alt="" />
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
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                        />
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
