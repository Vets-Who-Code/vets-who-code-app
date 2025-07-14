import { motion } from "motion/react";
import { ImageType, ItemType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        images?: ImageType[];
        items?: ItemType[];
    };
};

const FaqArea = ({ data: { images, items } }: TProps) => {
    return (
        <div className="faq-area tw:pt-15 tw:md:pt-20 tw:lg:pt-[100px]">
            <div className="tw:container">
                <motion.div
                    className="tw:grid tw:gap-7.5 tw:md:grid-cols-[66%_minmax(34%,1fr)]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "Faq"}
                            className="tw:h-full tw:w-full tw:rounded-sm tw:object-cover"
                        />
                    )}
                    {images?.[1]?.src && (
                        <img
                            src={images[1].src}
                            alt={images[1]?.alt || "Faq"}
                            className="tw:h-full tw:w-full tw:rounded-sm tw:object-cover"
                        />
                    )}
                </motion.div>
                {items?.map((item) => (
                    <motion.div
                        key={item.id}
                        className="tw:grid tw:gap-7.5 tw:border-b tw:border-b-gray-500 tw:pb-[50px] tw:pt-[47px] tw:md:grid-cols-[40%_minmax(60%,1fr)]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <h4 className="tw:relative tw:pl-8 tw:text-lg tw:font-semibold tw:md:max-w-[310px]">
                            <i className="far fa-long-arrow-right tw:absolute tw:left-0 tw:top-2 tw:text-primary" />
                            {item.title}
                        </h4>
                        <div className="tw:relative tw:mt-5 tw:pl-8 tw:md:mt-0">
                            <i className="far fa-check tw:absolute tw:left-0 tw:top-2 tw:text-primary" />
                            {item.texts?.map((text) => <p key={text.id}>{text.content}</p>)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FaqArea;
