import { motion } from "framer-motion";
import Section from "@ui/section";
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

const FaqArea = ({
    data: { section_title, images, items },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1 } = useUI();

    return (
        <Section className="faq-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-[50px] lg:tw-gap-7.5">
                <motion.div
                    className="tw-relative tw-pl-10 tw-z-10"
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
                        className="tw-absolute -tw-z-1 tw-top-[50px] -tw-left-15 tw-w-[200px] tw-h-[200px] sm:tw-left-0 sm:tw-w-[392px] sm:tw-h-[392px] md:tw-w-[392px] md:tw-h-[392px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-gray-800 tw-w-full tw-h-full" />
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
                            className="tw-mb-[50px]"
                        />
                    )}
                    {items && items.length > 0 && (
                        <Accordion
                            items={items}
                            defaultActiveKey={items[0].id}
                        />
                    )}
                </motion.div>
            </div>
        </Section>
    );
};

export default FaqArea;
