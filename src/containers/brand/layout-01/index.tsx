import Section from "@components/ui/engagement-modal";
import { ItemType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

// A static, centred wrap, not a carousel: every partner stays visible without swiping or
// autoplay. Rows of 6 from lg up, 4 at md, and 3 on phones.
const BrandArea = ({ data: { items }, space, bg }: TProps) => {
    return (
        <Section className="brand-area" space={space} bg={bg}>
            <h2 className="tw-m-20 tw-flex tw-justify-center tw-text-white">Technology Partners</h2>
            <div className="tw-container">
                {items && (
                    <motion.ul
                        className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-y-10"
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
                                    className="tw-flex tw-w-1/3 tw-items-center tw-justify-center tw-px-3 md:tw-w-1/4 lg:tw-w-1/6"
                                >
                                    {logoSrc ? (
                                        // Gold fill via the logo as a mask (exact brand color). The wrapper's
                                        // drop-shadow filter traces a red outline on hover (tw-partner-logo).
                                        <span className="tw-partner-logo tw-block tw-w-full tw-max-w-[140px]">
                                            <span
                                                role="img"
                                                aria-label={name || "logo"}
                                                className="tw-block tw-aspect-square tw-w-full tw-bg-gold"
                                                style={{
                                                    WebkitMaskImage: `url(${logoSrc})`,
                                                    maskImage: `url(${logoSrc})`,
                                                    WebkitMaskSize: "contain",
                                                    maskSize: "contain",
                                                    WebkitMaskRepeat: "no-repeat",
                                                    maskRepeat: "no-repeat",
                                                    WebkitMaskPosition: "center",
                                                    maskPosition: "center",
                                                }}
                                            />
                                        </span>
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
