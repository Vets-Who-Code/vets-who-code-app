import { ImageType, ItemType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = {
    data: {
        images?: ImageType[];
        items?: ItemType[];
    };
};

const FaqArea = ({ data: { images, items } }: TProps) => {
    return (
        <div className="faq-area tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]">
            <div className="tw-container">
                <motion.div
                    className="tw-grid tw-gap-7.5 md:tw-grid-cols-[66%_minmax(34%,_1fr)]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "Faq"}
                            className="tw-h-full tw-w-full tw-rounded tw-object-cover"
                        />
                    )}
                    {images?.[1]?.src && (
                        <img
                            src={images[1].src}
                            alt={images[1]?.alt || "Faq"}
                            className="tw-h-full tw-w-full tw-rounded tw-object-cover"
                        />
                    )}
                </motion.div>
                {items?.map((item) => (
                    <motion.div
                        key={item.id}
                        className="tw-grid tw-gap-7.5 tw-border-b tw-border-b-gray-500 tw-pb-[50px] tw-pt-[47px] md:tw-grid-cols-[40%_minmax(60%,_1fr)]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <h4 className="tw-relative tw-pl-8 tw-text-lg tw-font-semibold md:tw-max-w-[310px]">
                            <i className="far fa-long-arrow-right tw-absolute tw-left-0 tw-top-2 tw-text-primary" />
                            {item.title}
                        </h4>
                        <div className="tw-relative tw-mt-5 tw-pl-8 md:tw-mt-0">
                            <i className="far fa-check tw-absolute tw-left-0 tw-top-2 tw-text-primary" />
                            {item.texts?.map((text) => (
                                <p key={text.id}>{text.content}</p>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FaqArea;
