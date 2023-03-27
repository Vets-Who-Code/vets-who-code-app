import { motion } from "framer-motion";
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
        <li className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-relative tw-mb-10 lg:tw-mb-[68px] tw-pl-[45px] tw-w-full md:tw-pl-0 last:tw-mb-0">
            <div className="tw-absolute tw-top-0.5 tw-left-0 md:tw-left-1/2 md:-tw-translate-x-1/2 tw-w-7.5 tw-h-7.5 tw-text-primary before:tw-absolute before:tw-content-[''] before:tw-border before:tw-border-current before:tw-inset-0 before:tw-rounded-full before:tw-opacity-20">
                <div className="tw-absolute tw-left-1/2 tw-right-1/2 -tw-translate-x-1/2 tw-translate-y-1/2 tw-w-[14px] tw-h-[14px] tw-border-[3px] tw-border-current tw-rounded-full tw-z-10 tw-bg-white" />
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
                        <h3 className="tw-uppercase tw-tracking-[3px] tw-text-primary tw-mb-7.5 lg:tw-mb-14">
                            {title.content}
                        </h3>
                    )}
                    {image?.src && (
                        <figure>
                            <img
                                src={image.src}
                                alt={image?.alt || ""}
                                className="tw-rounded tw-object-cover tw-h-full tw-w-full"
                            />
                        </figure>
                    )}
                </div>
            </motion.div>
            <motion.div
                className={clsx(
                    "tw-mt-7.5 md:tw-mt-0 md:tw-pt-15 lg:tw-pt-[130px] md:tw-mx-7.5",
                    !isEven && "md:tw-order-first md:tw-text-right"
                )}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? scrollRightVariants : scrollLeftVariants}
            >
                <div
                    className={clsx(
                        "lg:tw-max-w-[500px]",
                        isEven && "md:tw-ml-auto"
                    )}
                >
                    {heading?.content && (
                        <h3 className="tw-mb-[22px]">{heading.content}</h3>
                    )}
                    {texts?.map((text) => (
                        <p
                            className="md:tw-text-lg tw-leading-loose"
                            key={text.id}
                        >
                            {text.content}
                        </p>
                    ))}
                </div>
            </motion.div>
        </li>
    );
};

export default TimelineItem;
