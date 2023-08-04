import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "@ui/button";
import MottoText from "@ui/motto-text";
import { useUI } from "@contexts/ui-context";
import {
    HeadingType,
    TextType,
    ButtonType,
    ImageType,
    MottoType,
} from "@utils/types";
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

const HeroArea = ({
    data: { headings, texts, buttons, motto, images },
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <div className="hero-area tw-pt-[65px]">
            <div className="tw-container tw-grid lg:tw-grid-cols-2 tw-gap-7.5">
                <motion.div
                    className="md:tw-max-w-[460px] tw-text-center md:tw-text-left tw-self-center"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl tw-leading-[1.17] tw-text-secondary">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw-text-md sm:tw-text-[16px] lg:tw-text-lg tw-font-medium tw-leading-relaxed tw-text-secondary-light tw-mt-3"
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
                    {motto && (
                        <MottoText
                            {...motto}
                            size="md"
                            className="tw-mt-[25px]"
                        />
                    )}
                </motion.div>

                <div className="tw-relative tw-z-10">
                    {images?.[0]?.src && (
                        <motion.div
                            className="tw-rounded-full tw-overflow-hidden"
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
                                className="tw-object-cover tw-w-full tw-h-full tw-mx-auto"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-0 sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[124px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span data-depth="3">
                            <img
                                src="/images/shape-animation/about-shape-1.png"
                                alt=""
                            />
                        </span>
                    </motion.div>

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-[70px] sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[262px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/about-shape-1.png"
                            alt=""
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-top-[255px] tw-left-2 sm:tw-top-[355px] sm:-tw-left-2 tw-z-20"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-[6px] tw-border-desert tw-rounded-full tw-w-[42px] tw-h-[42px] md:tw-w-[62px] md:tw-h-[62px] md:tw-border-8">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-[100px] tw-bottom-3.8 tw-right-5 sm:tw-w-[100px] sm:tw-bottom-[55px] sm:tw-right-[45px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-w-15 tw-bottom-[140px] tw-right-2.5 sm:tw-bottom-[314px] sm:tw-right-7.5 md:tw-w-auto md:tw-right-[70px]"
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
                </div>
            </div>
        </div>
    );
};

export default HeroArea;
