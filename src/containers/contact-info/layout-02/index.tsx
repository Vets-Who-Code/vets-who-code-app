import clsx from "clsx";
import { motion } from "framer-motion";
import Section from "@ui/section";
import GoogleMap from "@ui/google-map";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

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

const ContactInfo = ({ data: { section_title, items, location } }: TProps) => {
    return (
        <Section className="contact-info-area" space="none">
            <div className="tw-container">
                {section_title && (
                    <motion.h2
                        className="tw-max-w-[770px] tw-mx-auto tw-text-center tw-leading-none tw-mb-10 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title.title}
                    </motion.h2>
                )}
                <motion.div
                    className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-x-7.5 tw-gap-y-10 tw-mb-10 md:tw-mb-15"
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
                                    "tw-text-[32px] tw-text-primary tw-absolute tw-left-0 tw-top-0"
                                )}
                            />
                            <h3 className="tw-text-lg tw-mb-3.8">
                                {item.title}
                            </h3>
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
                {location && (
                    <motion.div
                        className="tw-h-[300px] lg:tw-h-[400px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <GoogleMap
                            center={{
                                lat: location.latitude,
                                lng: location.longitude,
                            }}
                            zoom={14}
                        />
                    </motion.div>
                )}
            </div>
        </Section>
    );
};

export default ContactInfo;
