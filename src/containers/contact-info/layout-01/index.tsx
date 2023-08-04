import clsx from "clsx";
import Section from "@ui/section";
import { motion } from "framer-motion";
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
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-[33%,_minmax(63%,_1fr)] tw-gap-7.5">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <>
                            <span className="tw-text-lg tw-text-heading tw-leading-none tw-font-medium tw-mb-2.5">
                                {section_title?.subtitle}
                            </span>
                            <h2 className="tw-leading-none tw-mb-10">
                                {section_title.title}
                            </h2>
                        </>
                    )}
                    {items?.map((item) => (
                        <div
                            key={item.id}
                            className="tw-relative tw-pl-12 tw-mb-[50px] last:tw-mb-0"
                        >
                            <i
                                className={clsx(
                                    item.icon,
                                    "tw-text-[32px] tw-text-primary tw-absolute tw-left-0 tw-top-0"
                                )}
                            />
                            <h3 className="tw-text-lg tw-mb-3.8">
                                {item.title}
                            </h3>
                            {item.texts?.map((text) => (
                                <p
                                    key={text.id}
                                    className="tw-mb-2.5 child:tw-text-heading"
                                    dangerouslySetInnerHTML={{
                                        __html: text.content,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="tw-relative tw-z-10 tw-mt-[50px] lg:tw-mt-0"
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
                            className="tw-rounded-full tw-mx-auto"
                        />
                    )}

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-0 sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[124px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span data-depth="3">
                            <img
                                src="/images/shape-animation/about-shape-1.png"
                                alt=""
                            />
                        </span>
                    </motion.div>

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-[70px] sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[262px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/about-shape-1.png"
                            alt=""
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-top-[255px] tw-left-2 sm:tw-top-[355px] sm:-tw-left-2 tw-z-20"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-[6px] tw-border-desert tw-rounded-full tw-w-[42px] tw-h-[42px] md:tw-w-[62px] md:tw-h-[62px] md:tw-border-8">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-[100px] tw-bottom-3.8 tw-right-5 sm:tw-w-[100px] sm:tw-bottom-[55px] sm:tw-right-[45px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-w-15 tw-bottom-[140px] tw-right-2.5 sm:tw-bottom-[314px] sm:tw-right-7.5 md:tw-w-auto md:tw-right-[70px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/nwesletter-shape-2.png"
                            alt=""
                        />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};

export default ContactInfo;
