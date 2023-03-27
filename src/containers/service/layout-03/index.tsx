import { motion } from "framer-motion";
import Section from "@ui/section";
import ServiceCard from "@components/image-box/image-box-02";
import MottoText from "@ui/motto-text";
import { ItemType, MottoType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedServiceCard = motion(ServiceCard);
const AnimatedMottoText = motion(MottoText);

type TProps = TSection & {
    data: {
        items?: ItemType[];
        motto?: MottoType;
    };
};

const ServiceArea = ({ data: { items, motto }, space, bg }: TProps) => {
    return (
        <Section className="service-area" space={space} bg={bg}>
            <div className="tw-container">
                <h2 className="tw-sr-only">Service Section</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 tw-relative tw-z-10 tw-top-[-90px] tw-mb-[-90px] xl:tw-top-[-125px] xl:tw-mb-[-125px]">
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

                {motto && (
                    <AnimatedMottoText
                        {...motto}
                        className="lg:tw-w-7/12 tw-mx-auto tw-text-center tw-mt-10"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
            </div>
        </Section>
    );
};

export default ServiceArea;
