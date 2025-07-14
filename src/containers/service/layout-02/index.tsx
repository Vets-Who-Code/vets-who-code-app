import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/image-box/image-box-01";
import { motion } from "motion/react";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, ItemType, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedServiceCard = motion(ServiceCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const ServiceArea = ({ data: { section_title, items }, space, bg, titleSize }: TProps) => {
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

                <div className="tw:grid tw:gap-7.5 tw:sm:grid-cols-2 tw:xl:grid-cols-3">
                    {items?.map((item) => (
                        <AnimatedServiceCard
                            key={item.id}
                            image={item.images?.[0]}
                            title={item.title}
                            description={item.description}
                            path={item.path}
                            pathText={item.pathText}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};
ServiceArea.defaultProps = {
    space: "top-bottom",
};
export default ServiceArea;
