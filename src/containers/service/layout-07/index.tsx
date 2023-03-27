import { motion } from "framer-motion";
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
        <section className="service-area tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        className="tw-mb-[60px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
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
