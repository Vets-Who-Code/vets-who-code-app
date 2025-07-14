import { motion } from "motion/react";
import clsx from "clsx";
import Button from "@ui/button";
import MottoText from "@ui/motto-text";
import { useUI } from "@contexts/ui-context";
import { HeadingType, TextType, ButtonType, ImageType, MottoType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

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
        <div className="hero-area tw:pt-[65px]">
            <div className="tw:container tw:grid tw:gap-7.5 tw:lg:grid-cols-2">
                <motion.div
                    className="tw:self-center tw:text-center tw:md:max-w-[460px] tw:md:text-left"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw:text-3xl tw:leading-[1.17] tw:text-secondary tw:sm:text-4xl tw:lg:text-5xl">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw:mt-3 tw:text-md tw:font-medium tw:leading-relaxed tw:text-secondary-light tw:sm:text-[16px] tw:lg:text-lg"
                        >
                            {text.content}
                        </p>
                    ))}

                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} className="tw:mt-5" {...rest}>
                            <i className={clsx(icon, "tw:mr-4")} />
                            {content}
                        </Button>
                    ))}
                    {motto && <MottoText {...motto} size="md" className="tw:mt-[25px]" />}
                </motion.div>

                <div className="tw:relative tw:z-10">
                    {images?.[0]?.src && (
                        <motion.div
                            className="tw:overflow-hidden tw:rounded-full"
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
                                className="tw:mx-auto tw:h-full tw:w-full tw:object-cover"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="tw:absolute tw:left-px tw:top-0 tw:-z-1 tw:h-20 tw:w-20 tw:sm:top-[124px] tw:sm:h-[100px] tw:sm:w-[100px] tw:md:left-px tw:md:h-auto tw:md:w-auto"
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
                        className="tw:absolute tw:left-px tw:top-[70px] tw:-z-1 tw:h-20 tw:w-20 tw:sm:top-[262px] tw:sm:h-[100px] tw:sm:w-[100px] tw:md:left-px tw:md:h-auto tw:md:w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/about-shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:left-2 tw:top-[255px] tw:z-20 tw:sm:-left-2 tw:sm:top-[355px]"
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
                        className="tw:absolute tw:bottom-3.8 tw:right-5 tw:-z-1 tw:w-[100px] tw:sm:bottom-[55px] tw:sm:right-[45px] tw:sm:w-[100px] tw:md:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:bottom-[140px] tw:right-2.5 tw:z-1 tw:w-15 tw:sm:bottom-[314px] tw:sm:right-7.5 tw:md:right-[70px] tw:md:w-auto"
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
