import FunFact from "@components/funfact/funfact-01";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import MottoText from "@ui/motto-text";
import { ItemType, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        items?: ItemType[];
    };
};

const FunfactArea = ({ data: { section_title, motto, items }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="funfact-area" space={space} bg={bg}>
            <div className="tw-container">
                {/* Section label — Evil Rabbit pattern */}
                <div className="tw-mb-2" style={{
                    fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#091f40",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}>
                    <span style={{ width: "16px", height: "2px", background: "var(--red, #c5203e)", display: "inline-block" }} />
                    Our Impact
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-[50px] lg:tw-grid-cols-2 lg:tw-gap-7.5">
                    <motion.div
                        className="md:tw-max-w-[470px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {section_title && (
                            <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                        )}
                        {motto && <MottoText {...motto} size="md" className="tw-mt-5" />}
                    </motion.div>

                    {/* Stats grid — Evil Rabbit cell divider effect */}
                    <div
                        className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2"
                        style={{
                            gap: "1px",
                            background: "rgba(185, 214, 242, 0.08)",
                            border: "1px solid rgba(185, 214, 242, 0.08)",
                        }}
                    >
                        {items?.map((item) => (
                            <AnimatedFunFact
                                key={item.id}
                                counter={item.counter}
                                suffix={item.suffix}
                                title={item.title === "Validated Skills" ? "In-Demand Skills" : item.title}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={scrollUpVariants}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FunfactArea;
