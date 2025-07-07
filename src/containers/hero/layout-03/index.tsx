import { motion } from "motion/react";
import clsx from "clsx";
import Button from "@ui/button";
import { ButtonType, HeadingType, ImageType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        headings?: HeadingType[];
        buttons?: ButtonType[];
        images?: ImageType[];
    };
};

const HeroArea = ({ data: { headings, buttons, images } }: TProps) => {
    return (
        <div className="hero-area tw:relative tw:py-[120px] tw:md:py-[150px] tw:lg:py-[170px] tw:xl:py-[240px]">
            <div className="tw:absolute tw:inset-0 tw:-z-10">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw:h-full tw:w-full tw:object-cover"
                    />
                )}
            </div>
            <motion.div
                className="tw:container tw:relative tw:text-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={scrollUpVariants}
            >
                {headings?.[0]?.content && (
                    <span className="tw:mb-2.5 tw:block tw:text-[26px] tw:font-bold tw:leading-none tw:-tracking-tightest tw:text-white tw:sm:tracking-[3px] tw:lg:text-[34px] tw:lg:tracking-normal">
                        {headings[0].content}
                    </span>
                )}
                {headings?.[1]?.content && (
                    <h1
                        className="tw:text-[34px] tw:font-normal tw:leading-none tw:text-white tw:sm:text-[46px] tw:lg:text-[54px] tw:xl:text-[64px]"
                        dangerouslySetInnerHTML={{
                            __html: headings[1].content,
                        }}
                    />
                )}
                {buttons?.map(({ id, content, icon, ...rest }) => (
                    <Button key={id} className="tw:mt-7" {...rest}>
                        {content}
                        <i className={clsx(icon, "tw:ml-4")} />
                    </Button>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroArea;
