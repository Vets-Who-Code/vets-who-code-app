import { HeadingType, ImageType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = {
    data: {
        images?: ImageType[];
        headings?: HeadingType[];
    };
};

const HeroArea = ({ data: { images, headings } }: TProps) => {
    return (
        <section className="hero-area tw-relative tw-py-15 md:tw-py-20 lg:tw-py-[100px] xl:tw-py-[200px]">
            {images?.[0]?.src && (
                <div className="tw-absolute tw-inset-0 -tw-z-1">
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "Hero BG"}
                        width={1903}
                        height={496}
                        className="tw-h-full tw-w-full tw-object-cover"
                    />
                </div>
            )}
            <motion.div
                className="tw-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={scrollUpVariants}
            >
                {headings?.[0]?.content && (
                    <h1 className="tw-mx-auto tw-mb-0 tw-max-w-[700px] tw-text-center tw-text-h3 tw-leading-normal tw-text-white md:tw-text-[32px] lg:tw-max-w-[770px] lg:tw-text-[34px] lg:tw-leading-[1.4]">
                        {headings?.[0]?.content}
                    </h1>
                )}
            </motion.div>
        </section>
    );
};

export default HeroArea;
