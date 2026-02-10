import BottomShape from "@ui/bottom-shape/shape-04";
import Button from "@ui/button";
import { ButtonType, HeadingType, ImageType, TextType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        images?: ImageType[];
    };
};

const HeroArea = ({ data: { headings, texts, buttons, images } }: TProps) => {
    return (
        <div className="hero-area tw-relative tw-flex tw-items-center tw-bg-gray-50">
            <div className="tw-container tw-relative tw-z-10 tw-grid tw-grid-cols-1 tw-gap-7.5 lg:tw-grid-cols-2">
                <motion.div
                    className="tw-self-center tw-px-3.8 tw-pb-10 tw-pt-[140px] tw-text-center md:tw-max-w-[460px] md:tw-text-left md:p-0"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw-text-3xl tw-text-secondary sm:tw-text-4xl lg:tw-text-5xl lg:tw-leading-[1.17]">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw-text-md tw-font-medium tw-leading-relaxed tw-text-secondary-light sm:tw-text-[16px] md:tw-text-lg"
                        >
                            {text.content}
                        </p>
                    ))}
                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} className="tw-mt-5" {...rest}>
                            {icon && <i className={clsx(icon, "tw-mr-3")} />}
                            {content}
                        </Button>
                    ))}
                </motion.div>
                <motion.div
                    className="tw-px-3.8 tw-pb-[50px] lg:tw-pb-[55px] lg:tw-pt-[137px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && <img src={images[0].src} alt={images[0]?.alt || "hero"} />}
                </motion.div>
            </div>
            <BottomShape />
        </div>
    );
};

export default HeroArea;
