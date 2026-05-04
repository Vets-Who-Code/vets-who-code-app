import { ImageType, ItemType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type FaqItem = ItemType & { category?: string };

type TProps = {
    data: {
        images?: ImageType[];
        items?: FaqItem[];
    };
};

const FaqArea = ({ data: { images, items } }: TProps) => {
    const groups: { category: string | null; items: FaqItem[] }[] = [];
    items?.forEach((item) => {
        const category = item.category ?? null;
        const lastGroup = groups[groups.length - 1];
        if (lastGroup && lastGroup.category === category) {
            lastGroup.items.push(item);
        } else {
            groups.push({ category, items: [item] });
        }
    });

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
                {groups.map((group, groupIdx) => (
                    <div key={group.category ?? `group-${groupIdx}`}>
                        {group.category && (
                            <motion.h3
                                className="tw-mt-[60px] tw-mb-0 tw-text-2xl tw-font-bold tw-text-secondary md:tw-text-3xl"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={scrollUpVariants}
                            >
                                {group.category}
                            </motion.h3>
                        )}
                        {group.items.map((item) => (
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
                ))}
            </div>
        </div>
    );
};

export default FaqArea;
