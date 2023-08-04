import { motion } from "framer-motion";
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
        <div className="hero-area tw-relative tw-py-[120px] md:tw-py-[150px] lg:tw-py-[170px] xl:tw-py-[240px]">
            <div className="tw-absolute tw-inset-0 -tw-z-10">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw-w-full tw-h-full tw-object-cover"
                    />
                )}
            </div>
            <motion.div
                className="tw-container tw-text-center tw-relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={scrollUpVariants}
            >
                {headings?.[0]?.content && (
                    <span className="tw-text-[26px] -tw-tracking-tightest sm:tw-tracking-[3px] lg:tw-tracking-normal lg:tw-text-[34px] tw-leading-none tw-font-bold tw-text-white tw-block tw-mb-2.5">
                        {headings[0].content}
                    </span>
                )}
                {headings?.[1]?.content && (
                    <h1
                        className="tw-text-[34px] sm:tw-text-[46px] lg:tw-text-[54px] xl:tw-text-[64px] tw-leading-none tw-font-normal tw-text-white"
                        dangerouslySetInnerHTML={{
                            __html: headings[1].content,
                        }}
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
