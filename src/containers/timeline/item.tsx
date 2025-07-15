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
        <li className="tw:relative tw:mb-10 tw:grid tw:w-full tw:grid-cols-1 tw:pl-[45px] tw:last:mb-0 tw:md:grid-cols-2 tw:md:pl-0 tw:lg:mb-[68px]">
            <div className="tw:absolute tw:left-0 tw:top-0.5 tw:h-7.5 tw:w-7.5 tw:text-primary tw:before:absolute tw:before:inset-0 tw:before:rounded-full tw:before:border tw:before:border-current tw:before:opacity-20 tw:before:content-[''] tw:md:left-1/2 tw:md:-translate-x-1/2">
                <div className="tw:absolute tw:left-1/2 tw:right-1/2 tw:z-10 tw:h-[14px] tw:w-[14px] tw:-translate-x-1/2 tw:translate-y-1/2 tw:rounded-full tw:border-[3px] tw:border-current tw:bg-white" />
            </div>
            <motion.div
                className={clsx(
                    "tw:md:mx-7.5",
                    !isEven && "tw:md:order-last tw:xl:ml-auto",
                    isEven && "tw:md:text-right"
                )}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? scrollLeftVariants : scrollRightVariants}
            >
                <div className="tw:lg:max-w-[500px]">
                    {title?.content && (
                        <h3 className="tw:mb-7.5 tw:uppercase tw:tracking-[3px] tw:text-primary tw:lg:mb-14">
                            {title.content}
                        </h3>
                    )}
                    {image?.src && (
                        <figure>
                            <img
                                src={image.src}
                                alt={image?.alt || ""}
                                className="tw:h-full tw:w-full tw:rounded-sm tw:object-cover"
                            />
                        </figure>
                    )}
                </div>
            </motion.div>
            <motion.div
                className={clsx(
                    "tw:mt-7.5 tw:md:mx-7.5 tw:md:mt-0 tw:md:pt-15 tw:lg:pt-[130px]",
                    !isEven && "tw:md:order-first tw:md:text-right"
                )}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={isEven ? scrollRightVariants : scrollLeftVariants}
            >
                <div className={clsx("tw:lg:max-w-[500px]", isEven && "tw:md:ml-auto")}>
                    {heading?.content && <h3 className="tw:mb-[22px]">{heading.content}</h3>}
                    {texts?.map((text) => (
                        <p className="tw:leading-loose tw:md:text-lg" key={text.id}>
                            {text.content}
                        </p>
                    ))}
                </div>
            </motion.div>
        </li>
    );
};

export default TimelineItem;
