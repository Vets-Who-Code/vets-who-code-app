import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import ListWithCheck from "@ui/list-with-check";
import ServiceCard from "@components/image-box/image-box-04";
import { ButtonType, ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedServiceCard = motion(ServiceCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        list?: string[];
        buttons?: ButtonType[];
        items?: ItemType[];
    };
};

const ServiceArea = ({
    data: { section_title, list, buttons, items },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="service-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-7.5 tw-items-center">
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-items-start tw-gap-7.5">
                    {items && items.length > 0 && (
                        <>
                            <AnimatedServiceCard
                                title={items?.[0]?.title}
                                description={items?.[0]?.description}
                                image={items?.[0]?.images?.[0]}
                                className="tw-pb-[202px] tw-bg-[5px_bottom]"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={scrollUpVariants}
                            />
                            <AnimatedServiceCard
                                title={items?.[1]?.title}
                                description={items?.[1]?.description}
                                image={items?.[1]?.images?.[0]}
                                className="tw-pb-[202px] tw-bg-[center_bottom] sm:tw-mt-[70px]"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={scrollUpVariants}
                            />
                            <AnimatedServiceCard
                                title={items?.[2]?.title}
                                description={items?.[2]?.description}
                                image={items?.[2]?.images?.[0]}
                                className="tw-pt-[215px] tw-pb-[22px] tw-bg-[left_15px] xl:-tw-mt-[70px] lg:-tw-mt-[95px] sm:-tw-mt-[70px]"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={scrollUpVariants}
                            />
                            <AnimatedServiceCard
                                title={items?.[3]?.title}
                                description={items?.[3]?.description}
                                image={items?.[3]?.images?.[0]}
                                className="tw-pt-[215px] tw-pb-[22px] tw-bg-[center_33px]"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={scrollUpVariants}
                            />
                        </>
                    )}
                </div>
                <motion.div
                    className="lg:tw-pl-[85px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                            className="tw-mb-7.5"
                        />
                    )}
                    {list && (
                        <ListWithCheck list={list} className="tw-mb-[35px]" />
                    )}
                    {buttons?.map(({ id, content, ...rest }) => (
                        <Button key={id} {...rest}>
                            {content}
                        </Button>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default ServiceArea;
