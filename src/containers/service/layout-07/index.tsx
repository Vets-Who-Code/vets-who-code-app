import { motion } from "motion/react";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/image-box/image-box-02";
import { scrollUpVariants } from "@utils/variants";
import { ItemType, SectionTitleType } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedServiceCard = motion(ServiceCard);

type TProps = {
    data: {
        items?: ItemType[];
        section_title?: SectionTitleType;
    };
};

const ServiceArea = ({ data: { items, section_title } }: TProps) => {
    return (
        <section className="service-area tw:py-15 tw:md:py-20 tw:lg:py-[100px]">
            <div className="tw:container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        className="tw:mb-[60px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw:grid tw:grid-cols-1 tw:gap-7.5 tw:md:grid-cols-2 tw:lg:grid-cols-3">
                    {items?.map((item) => (
                        <AnimatedServiceCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            path={item.path}
                            pathText={item.pathText}
                            image={item.images?.[0]}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceArea;
