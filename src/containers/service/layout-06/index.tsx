import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/icon-box/icon-box-02";
import { scrollUpVariants } from "@utils/variants";
import { useUI } from "@contexts/ui-context";
import { SectionTitleType, ItemType, ImageType, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedServiceCard = motion(ServiceCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
        images?: ImageType[];
    };
};

const ServiceArea = ({
    data: { section_title, items, images },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="service-area" space={space} bg={bg}>
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid sm:tw-grid-cols-2 xl:tw-grid-cols-4 tw-gap-7.5">
                    {items?.map((item) => (
                        <AnimatedServiceCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            path={item.path}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
            <div className="tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px] tw-bg-transparent tw-bg-lightGradient tw-mb-8">
                <div className="tw-container tw-relative tw-z-1 -tw-bottom-8 -tw-mt-8">
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "Services"}
                            width={1118}
                            height={449}
                            loading="lazy"
                        />
                    )}
                    <motion.div
                        className="tw-absolute tw-z-1 tw-top-0 tw-left-0"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block tw-w-[52px] tw-h-[52px] tw-border-[6px] tw-border-primary/50 tw-rounded-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-left-2.5 tw-bottom-20"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block tw-w-[35px] tw-h-[35px] tw-bg-orange-300 tw-rounded-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 -tw-bottom-28 tw-left-0"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block tw-w-[54px] tw-h-[54px] tw-bg-porsche tw-rounded-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-top-15 tw-right-0"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block tw-w-[46px] tw-h-[46px] tw-bg-jagged tw-rounded-full" />
                    </motion.div>{" "}
                    <motion.div
                        className="tw-absolute tw-z-1 tw-bottom-16 tw-right-10"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw-block tw-w-[38px] tw-h-[38px] tw-bg-mandy/70 tw-rounded-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 -tw-bottom-24 tw-right-0"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block tw-w-9 tw-h-9 tw-bg-blue-100/60 tw-rounded-full" />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default ServiceArea;
