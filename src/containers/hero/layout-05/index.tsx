import { motion } from "motion/react";
import Button from "@ui/button";
import BottomShape from "@ui/bottom-shape/shape-04";
import { ButtonType, HeadingType, ImageType, TextType } from "@utils/types";
import clsx from "clsx";
import { scrollUpVariants } from "@utils/variants";

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
        <div className="hero-area tw:relative tw:flex tw:items-center tw:bg-ebb">
            <div className="tw:container tw:relative tw:z-10 tw:grid tw:grid-cols-1 tw:gap-7.5 tw:lg:grid-cols-2">
                <motion.div
                    className="tw:self-center tw:px-3.8 tw:pb-10 tw:pt-[140px] tw:text-center tw:md:max-w-[460px] tw:md:text-left md:p-0"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw:text-3xl tw:text-secondary tw:sm:text-4xl tw:lg:text-5xl tw:lg:leading-[1.17]">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw:text-md tw:font-medium tw:leading-relaxed tw:text-secondary-light tw:sm:text-[16px] tw:md:text-lg"
                        >
                            {text.content}
                        </p>
                    ))}
                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} className="tw:mt-5" {...rest}>
                            {icon && <i className={clsx(icon, "tw:mr-3")} />}
                            {content}
                        </Button>
                    ))}
                </motion.div>
                <motion.div
                    className="tw:px-3.8 tw:pb-[50px] tw:lg:pb-[55px] tw:lg:pt-[137px]"
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
