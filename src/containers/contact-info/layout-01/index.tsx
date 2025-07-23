import clsx from "clsx";
import Section from "@components/ui/engagement-modal";
import { motion } from "motion/react";
import { useUI } from "@contexts/ui-context";
import { ImageType, ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
        images?: ImageType[];
    };
};

const ContactInfo = ({ data: { section_title, items, images } }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="contact-info-area" space="none">
            <div className="tw:container tw:grid tw:grid-cols-1 tw:gap-7.5 tw:lg:grid-cols-[33%_minmax(63%,1fr)]">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <>
                            <span className="tw:mb-2.5 tw:text-lg tw:font-medium tw:leading-none tw:text-heading">
                                {section_title?.subtitle}
                            </span>
                            <h2 className="tw:mb-10 tw:leading-none">{section_title.title}</h2>
                        </>
                    )}
                    {items?.map((item) => (
                        <div
                            key={item.id}
                            className="tw:relative tw:mb-[50px] tw:pl-12 tw:last:mb-0"
                        >
                            <i
                                className={clsx(
                                    item.icon,
                                    "tw:absolute tw:left-0 tw:top-0 tw:text-[32px] tw:text-primary"
                                )}
                            />
                            <h3 className="tw:mb-3.8 tw:text-lg">{item.title}</h3>
                            {item.texts?.map((text) => (
                                <p
                                    key={text.id}
                                    className="tw:mb-2.5 tw:child:text-heading"
                                    dangerouslySetInnerHTML={{
                                        __html: text.content,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="tw:relative tw:z-10 tw:mt-[50px] tw:lg:mt-0"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "Hero"}
                            width={570}
                            height={570}
                            className="tw:mx-auto tw:rounded-full"
                        />
                    )}

                    <motion.div
                        className="tw:absolute tw:left-px tw:top-0 tw:-z-1 tw:h-20 tw:w-20 tw:sm:top-[124px] tw:sm:h-[100px] tw:sm:w-[100px] tw:md:left-px tw:md:h-auto tw:md:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span data-depth="3">
                            <img src="/images/shape-animation/about-shape-1.png" alt="" />
                        </span>
                    </motion.div>

                    <motion.div
                        className="tw:absolute tw:left-px tw:top-[70px] tw:-z-1 tw:h-20 tw:w-20 tw:sm:top-[262px] tw:sm:h-[100px] tw:sm:w-[100px] tw:md:left-px tw:md:h-auto tw:md:w-auto"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img src="/images/shape-animation/about-shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:left-2 tw:top-[255px] tw:z-20 tw:sm:-left-2 tw:sm:top-[355px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/dog-tag.svg"
                            alt="shape"
                            loading="lazy"
                            width={178}
                            height={178}
                        />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:bottom-3.8 tw:right-5 tw:-z-1 tw:w-[100px] tw:sm:bottom-[55px] tw:sm:right-[45px] tw:sm:w-[100px] tw:md:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/code.svg" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:bottom-[140px] tw:right-2.5 tw:z-1 tw:w-15 tw:sm:bottom-[314px] tw:sm:right-7.5 tw:md:right-[70px] tw:md:w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/dog-tag.svg"
                            alt="shape"
                            loading="lazy"
                            width={178}
                            height={178}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};

export default ContactInfo;
