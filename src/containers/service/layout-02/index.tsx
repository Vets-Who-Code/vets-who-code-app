import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/image-box/image-box-01";
import { motion } from "framer-motion";
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

                <div className="tw-grid sm:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-7.5">
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
