import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import Anchor from "@ui/anchor";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const WaysToGive = ({ data: { section_title, items }, space, bg }: TProps) => {
    if (!items?.length) return null;

    return (
        <Section className="ways-to-give-area" space={space} bg={bg}>
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}

                <motion.div
                    className="tw-grid tw-gap-7.5 sm:tw-grid-cols-2 xl:tw-grid-cols-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={scrollUpVariants}
                >
                    {items.map((item) => {
                        // Only platforms publishing a stable logo on their own CDN carry
                        // one; the rest fall back to a wordmark so the cards stay even.
                        const logo = item.images?.[0];
                        return (
                            <div
                                key={item.id}
                                className="tw-group tw-relative tw-flex tw-flex-col tw-rounded-lg tw-bg-white tw-p-6 tw-shadow tw-transition-shadow hover:tw-shadow-lg"
                            >
                                <div className="tw-mb-5 tw-flex tw-h-10 tw-items-center">
                                    {logo?.src ? (
                                        <img
                                            src={logo.src}
                                            alt={logo.alt || item.title}
                                            height={40}
                                            loading="lazy"
                                            className="tw-h-10 tw-w-auto tw-max-w-[160px] tw-object-contain tw-object-left"
                                        />
                                    ) : (
                                        <span className="tw-text-xl tw-font-bold tw-tracking-tight tw-text-secondary">
                                            {item.title}
                                        </span>
                                    )}
                                </div>

                                <h3 className="tw-m-0 tw-text-lg tw-leading-normal tw-text-secondary">
                                    {item.title}
                                </h3>
                                <p className="tw-mb-6 tw-mt-2.5 tw-flex-1 tw-text-sm tw-leading-relaxed">
                                    {item.description}
                                </p>

                                <span className="tw-inline-flex tw-items-center tw-text-md tw-font-bold tw-leading-none tw-text-secondary-light tw-transition-colors tw-duration-300 group-hover:tw-text-primary">
                                    {item.pathText}
                                    <i className="far fa-long-arrow-right tw-ml-3.5 tw-text-[16px]" />
                                </span>

                                {/* Anchor defaults to target=_blank rel=noopener for external paths */}
                                <Anchor className="link-overlay" path={item.path}>
                                    {item.pathText}
                                </Anchor>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </Section>
    );
};

WaysToGive.defaultProps = {
    space: "top-bottom",
};

export default WaysToGive;
