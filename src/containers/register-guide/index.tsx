import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import ListWithCheck from "@ui/list-with-check";
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

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedListWithCheck = motion(ListWithCheck);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        list?: string[];
        buttons?: ButtonType[];
        images?: ImageType[];
    };
};

const RegisterGuideArea = ({
    data: { section_title, list, buttons, images },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="register-guide-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-items-center tw-gap-[50px] lg:tw-gap-7.5">
                <div className="tw-order-2 lg:tw-order-1 lg:tw-col-span-4">
                    {section_title && (
                        <AnimatedSectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                            className="tw-mb-7.5"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    {list && (
                        <AnimatedListWithCheck
                            className="tw-mb-[35px]"
                            list={list}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    )}
                    {buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} {...rest}>
                            {content}
                        </Button>
                    ))}
                </div>
                <motion.div
                    className="tw-order-1 lg:tw-order-2 lg:tw-col-span-8 tw-relative tw-z-10"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "register guide"}
                            width={459}
                            height={512}
                            className="tw-mx-auto"
                        />
                    )}
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-left-[14%] tw-top-20 tw-w-[200px] tw-h-[200px] md:tw-w-[446px] md:tw-h-[446px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-pampas tw-w-full tw-h-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-right-[15%] tw-w-20 tw-bottom-5 md:tw-w-auto md:tw-bottom-0"
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
                </motion.div>
            </div>
        </Section>
    );
};

export default RegisterGuideArea;
