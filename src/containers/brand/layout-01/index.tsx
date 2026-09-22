import Section from "@components/ui/engagement-modal";
import { ItemType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

// A static grid, not a carousel: every partner stays visible without swiping or autoplay.
const BrandArea = ({ data: { items }, space, bg }: TProps) => {
    return (
        <Section className="brand-area" space={space} bg={bg}>
            <h2 className="tw-m-20 tw-flex tw-justify-center tw-text-white">Technology Partners</h2>
            <div className="tw-container">
                {items && (
                    <motion.ul
                        className="tw-grid tw-grid-cols-5 tw-items-center tw-gap-x-6 tw-gap-y-10 lg:tw-grid-cols-10"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item, i) => {
                            const logoSrc = item.images?.[0]?.src;
                            const name = item.images?.[0]?.alt || item.title;
                            return (
                                <li
                                    key={item.id}
                                    className="tw-flex tw-items-center tw-justify-center"
                                >
                                    {logoSrc ? (
                                        <img
                                            className="tw-w-full tw-max-w-[96px] tw-opacity-50 tw-transition-opacity hover:tw-opacity-100 tw-filter-brand-primary"
                                            src={logoSrc}
                                            alt={name || "logo"}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span
                                            className="partner-text"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.12em",
                                                color: "rgba(248, 249, 250, 0.85)",
                                                whiteSpace: "nowrap",
                                                display: "inline-flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {i > 0 && (
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        width: "16px",
                                                        height: "2px",
                                                        background: "rgba(185, 214, 242, 0.4)",
                                                        margin: "0 20px",
                                                        flexShrink: 0,
                                                    }}
                                                />
                                            )}
                                            {name}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </div>
        </Section>
    );
};

BrandArea.defaultProps = {
    space: "top-bottom",
};

export default BrandArea;
