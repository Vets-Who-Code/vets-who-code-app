import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/icon-box/icon-box-01";
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

const ServiceArea = ({
    data: { section_title, items },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section space={space} bg={bg} className="service-area">
            <div className="tw-container tw-relative tw-z-1">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 xl:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid sm:tw-grid-cols-2 xl:tw-grid-cols-4">
                    {items?.map((item) => (
                        <AnimatedServiceCard
                            key={item.id}
                            icon={item.icon}
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
