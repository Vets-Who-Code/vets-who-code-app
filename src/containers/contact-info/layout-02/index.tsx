import Section from "@components/ui/engagement-modal";
import GoogleMap from "@ui/google-map";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
        location?: {
            latitude: number;
            longitude: number;
        };
    };
};

const ContactInfo = ({ data: { section_title, items } }: TProps) => {
    // Hardcoded Atlanta coordinates
    const atlantaLocation = {
        latitude: 33.7488,
        longitude: -84.3877,
    };

    return (
        <Section className="contact-info-area" space="none">
            <div className="tw-container">
                {section_title && (
                    <motion.h2
                        className="tw-mx-auto tw-mb-10 tw-max-w-[770px] tw-text-center tw-leading-none md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <motion.div
                    className="tw-mb-10 tw-grid tw-grid-cols-1 tw-gap-x-7.5 tw-gap-y-10 md:tw-mb-15 md:tw-grid-cols-3"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {items?.map((item) => (
                        <div key={item.id} className="tw-relative tw-pl-12">
                            <i
                                className={clsx(
                                    item.icon,
                                    "tw-absolute tw-left-0 tw-top-0 tw-text-[32px] tw-text-primary"
                                )}
                            />
                            <h3 className="tw-mb-3.8 tw-text-lg">{item.title}</h3>
                            {item.texts?.map((text) => (
                                <p
                                    key={text.id}
                                    className="tw-mb-2.5 child:tw-text-heading"
                                    dangerouslySetInnerHTML={{
                                        __html: text.content,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="tw-h-[300px] lg:tw-h-[400px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <GoogleMap
                        center={{
                            lat: atlantaLocation.latitude,
                            lng: atlantaLocation.longitude,
                        }}
                        zoom={14}
                    />
                </motion.div>
            </div>
        </Section>
    );
};

export default ContactInfo;
