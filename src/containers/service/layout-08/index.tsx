import clsx from "clsx";
import SectionTitle from "@components/section-title";
import ServiceCard from "@components/icon-box/icon-box-02";
import { motion } from "framer-motion";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, ItemType, ImageType } from "@utils/types";

const AnimatedSerctionTitle = motion(SectionTitle);
const AnimatedServiceCard = motion(ServiceCard);

type TProps = {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
        images?: ImageType[];
    };
    space?: "default" | "top" | "bottom" | "no-space";
    bg?: string;
    titleSize?: "default" | "large";
};

const ServiceArea = ({
    data: { section_title, items, images },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <div
            className={clsx(
                "service-area",
                space === "default" && "tw-py-15 md:tw-py-20 lg:tw-py-[100px]",
                space === "top" && "tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]",
                space === "bottom" && "tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]",
                bg
            )}
        >
            <div className="tw-container tw-relative tw-z-1">
                {section_title && (
                    <AnimatedSerctionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-7.5 tw-items-center">
                    <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-7.5 tw-gap-y-14">
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
                    <motion.div
                        className="image"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {images?.[0]?.src && (
                            <img
                                src={images[0].src}
                                alt={images[0]?.alt || "Service"}
                                width={602}
                                height={498}
                                loading="lazy"
                            />
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

ServiceArea.defaultProps = {
    space: "default",
};

export default ServiceArea;
