import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
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

const ServiceArea = ({ data: { section_title, items, images }, space, bg, titleSize }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="service-area" space={space} bg={bg}>
            <div className="tw:container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw:mb-7.5 tw:md:mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw:grid tw:gap-7.5 tw:sm:grid-cols-2 tw:xl:grid-cols-4">
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
            <div className="tw:mb-8 tw:bg-transparent tw:bg-light-gradient tw:pt-15 tw:md:pt-20 tw:lg:pt-[100px]">
                <div className="tw:container tw:relative tw:-bottom-8 tw:z-1 tw:-mt-8">
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
                        className="tw:absolute tw:left-0 tw:top-0 tw:z-1"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw:block tw:h-[52px] tw:w-[52px] tw:rounded-full tw:border-[6px] tw:border-primary/50" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:bottom-20 tw:left-2.5 tw:z-1"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw:block tw:h-[35px] tw:w-[35px] tw:rounded-full tw:bg-orange-300" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:-bottom-28 tw:left-0 tw:z-1"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw:block tw:h-[54px] tw:w-[54px] tw:rounded-full tw:bg-porsche" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:right-0 tw:top-15 tw:z-1"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw:block tw:h-[46px] tw:w-[46px] tw:rounded-full tw:bg-jagged" />
                    </motion.div>{" "}
                    <motion.div
                        className="tw:absolute tw:bottom-16 tw:right-10 tw:z-1"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <span className="tw:block tw:h-[38px] tw:w-[38px] tw:rounded-full tw:bg-mandy/70" />
                    </motion.div>
                    <motion.div
                        className="tw:absolute tw:-bottom-24 tw:right-0 tw:z-1"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw:block tw:h-9 tw:w-9 tw:rounded-full tw:bg-blue-100/60" />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default ServiceArea;
