import { useUI } from "@contexts/ui-context";
import Button from "@ui/button";
import MottoText from "@ui/motto-text";
import { ButtonType, HeadingType, ImageType, MottoType, TextType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        images?: ImageType[];
        motto?: MottoType;
    };
};

const HeroArea = ({ data: { headings, texts, buttons, motto, images } }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <div className="hero-area tw-pt-[65px]">
            <div className="tw-container tw-grid tw-gap-7.5 lg:tw-grid-cols-2">
                <motion.div
                    className="tw-self-center tw-text-center md:tw-max-w-[460px] md:tw-text-left"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw-text-3xl tw-leading-[1.17] tw-text-secondary sm:tw-text-4xl lg:tw-text-5xl">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw-mt-3 tw-text-md tw-font-medium tw-leading-relaxed tw-text-secondary-light sm:tw-text-[16px] lg:tw-text-lg"
                        >
                            {text.content}
                        </p>
                    ))}

                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} className="tw-mt-5" {...rest}>
                            <i className={clsx(icon, "tw-mr-4")} />
                            {content}
                        </Button>
                    ))}
                    {motto && <MottoText {...motto} size="md" className="tw-mt-[25px]" />}
                </motion.div>

                <div className="tw-relative tw-z-10">
                    {images?.[0]?.src && (
                        <motion.div
                            className="tw-overflow-hidden tw-rounded-full"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={scrollUpVariants}
                        >
                            <img
                                src={images[0].src}
                                alt={images[0]?.alt || "Hero"}
                                width={570}
                                height={570}
                                className="tw-mx-auto tw-h-full tw-w-full tw-object-cover"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="tw-absolute tw-left-px tw-top-0 -tw-z-1 tw-h-20 tw-w-20 sm:tw-top-[124px] sm:tw-h-[100px] sm:tw-w-[100px] md:tw-left-px md:tw-h-auto md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span data-depth="3">
                            <img src="/images/shape-animation/about-shape-1.png" alt="" />
                        </span>
                    </motion.div>

                    <motion.div
                        className="tw-absolute tw-left-px tw-top-[70px] -tw-z-1 tw-h-20 tw-w-20 sm:tw-top-[262px] sm:tw-h-[100px] sm:tw-w-[100px] md:tw-left-px md:tw-h-auto md:tw-w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/about-shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-left-2 tw-top-[255px] tw-z-20 sm:-tw-left-2 sm:tw-top-[355px]"
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
                        className="tw-absolute tw-bottom-3.8 tw-right-5 -tw-z-1 tw-w-[100px] sm:tw-bottom-[55px] sm:tw-right-[45px] sm:tw-w-[100px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-bottom-[140px] tw-right-2.5 tw-z-1 tw-w-15 sm:tw-bottom-[314px] sm:tw-right-7.5 md:tw-right-[70px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/-shape-2.png" alt="" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroArea;
