import SafeHTML from "@components/safe-html";
import Button from "@ui/button";
import { ButtonType, HeadingType, ImageType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";

type TProps = {
    data: {
        headings?: HeadingType[];
        buttons?: ButtonType[];
        images?: ImageType[];
    };
};

const HeroArea = ({ data: { headings, buttons, images } }: TProps) => {
    return (
        <div className="hero-area tw-relative tw-py-[120px] md:tw-py-[150px] lg:tw-py-[170px] xl:tw-py-[240px]">
            <div className="tw-absolute tw-inset-0 -tw-z-10">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw-h-full tw-w-full tw-object-cover"
                    />
                )}
            </div>
            <motion.div
                className="tw-container tw-relative tw-text-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={scrollUpVariants}
            >
                {headings?.[0]?.content && (
                    <span className="tw-mb-2.5 tw-block tw-text-[26px] tw-font-bold tw-leading-none -tw-tracking-tightest tw-text-white sm:tw-tracking-[3px] lg:tw-text-[34px] lg:tw-tracking-normal">
                        {headings[0].content}
                    </span>
                )}
                {headings?.[1]?.content && (
                    <SafeHTML
                        as="h1"
                        className="tw-text-[34px] tw-font-normal tw-leading-none tw-text-white sm:tw-text-[46px] lg:tw-text-[54px] xl:tw-text-[64px]"
                        content={headings[1].content}
                    />
                )}
                {buttons?.map(({ id, content, icon, ...rest }) => (
                    <Button key={id} className="tw-mt-7" {...rest}>
                        {content}
                        <i className={clsx(icon, "tw-ml-4")} />
                    </Button>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroArea;
