import { motion } from "motion/react";
import clsx from "clsx";
import { HeadingType, ImageType, TextType } from "@utils/types";
import { scrollLeftVariants, scrollRightVariants } from "@utils/variants";

type TProps = {
    isEven: boolean;
    title: HeadingType;
    image: ImageType;
    texts: TextType[];
    heading: HeadingType;
};

const TimelineItem = ({ isEven, title, image, heading, texts }: TProps) => {
    return (
        <li className="tw-relative tw-mb-10 tw-grid tw-w-full tw-grid-cols-1 tw-pl-[45px] last:tw-mb-0 md:tw-grid-cols-2 md:tw-pl-0 lg:tw-mb-[68px]">
            <div className="tw-absolute tw-left-0 tw-top-0.5 tw-h-7.5 tw-w-7.5 tw-text-primary before:tw-absolute before:tw-inset-0 before:tw-rounded-full before:tw-border before:tw-border-current before:tw-opacity-20 before:tw-content-[''] md:tw-left-1/2 md:-tw-translate-x-1/2">
                <div className="tw-absolute tw-left-1/2 tw-right-1/2 tw-z-10 tw-h-[14px] tw-w-[14px] -tw-translate-x-1/2 tw-translate-y-1/2 tw-rounded-full tw-border-[3px] tw-border-current tw-bg-white" />
            </div>
            <motion.div
                className={clsx(
                    "md:tw-mx-7.5",
                    !isEven && "md:tw-order-last xl:tw-ml-auto",
                    isEven && "md:tw-text-right"
                )}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? scrollLeftVariants : scrollRightVariants}
            >
                <div className="lg:tw-max-w-[500px]">
                    {title?.content && (
                        <h3 className="tw-mb-7.5 tw-uppercase tw-tracking-[3px] tw-text-primary lg:tw-mb-14">
                            {title.content}
                        </h3>
                    )}
                    {image?.src && (
                        <figure>
                            <img
                                src={image.src}
                                alt={image?.alt || ""}
                                className="tw-h-full tw-w-full tw-rounded tw-object-cover"
                            />
                        </figure>
                    )}
                </div>
            </motion.div>
            <motion.div
                className={clsx(
                    "tw-mt-7.5 md:tw-mx-7.5 md:tw-mt-0 md:tw-pt-15 lg:tw-pt-[130px]",
                    !isEven && "md:tw-order-first md:tw-text-right"
                )}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? scrollRightVariants : scrollLeftVariants}
            >
                <div className={clsx("lg:tw-max-w-[500px]", isEven && "md:tw-ml-auto")}>
                    {heading?.content && <h3 className="tw-mb-[22px]">{heading.content}</h3>}
                    {texts?.map((text) => (
                        <p className="tw-leading-loose md:tw-text-lg" key={text.id}>
                            {text.content}
                        </p>
                    ))}
                </div>
            </motion.div>
        </li>
    );
};

export default TimelineItem;
