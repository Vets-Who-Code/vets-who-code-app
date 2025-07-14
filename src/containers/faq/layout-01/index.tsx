import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import Shape2 from "@assets/svgs/shape-2.svg";
import SectionTitle from "@components/section-title";
import Accordion from "@ui/accordion";
import { ImageType, ItemType, SectionTitleType, TSection } from "@utils/types";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
        images?: ImageType[];
    };
};

const FaqArea = ({ data: { section_title, images, items }, space, bg, titleSize }: TProps) => {
    const { trans1 } = useUI();

    return (
        <Section className="faq-area" space={space} bg={bg}>
            <div className="tw:container tw:grid tw:grid-cols-1 tw:gap-[50px] tw:lg:grid-cols-2 tw:lg:gap-7.5">
                <motion.div
                    className="tw:relative tw:z-10 tw:pl-10"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "About"}
                            width={393}
                            height={549}
                            loading="lazy"
                        />
                    )}

                    <motion.div
                        className="tw:absolute tw:-left-15 tw:top-[50px] tw:-z-1 tw:h-[200px] tw:w-[200px] tw:sm:left-0 tw:sm:h-[392px] tw:sm:w-[392px] tw:md:h-[392px] tw:md:w-[392px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw:h-full tw:w-full tw:fill-gray-800" />
                    </motion.div>
                </motion.div>
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                            className="tw:mb-[50px]"
                        />
                    )}
                    {items && items.length > 0 && (
                        <Accordion items={items} defaultActiveKey={items[0].id} />
                    )}
                </motion.div>
            </div>
        </Section>
    );
};

export default FaqArea;
