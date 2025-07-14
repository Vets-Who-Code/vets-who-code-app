import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import FunFact from "@components/funfact/funfact-02";
import { ItemType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const FunfactArea = ({ data: { items }, space, bg }: TProps) => {
    return (
        <Section className="funfact-area" space={space} bg={bg}>
            <div
                className="tw:container tw:grid tw:bg-position-[top_center] tw:pb-[52px] tw:pt-[99px] tw:sm:grid-cols-2 tw:md:bg-left tw:lg:grid-cols-4"
                style={{
                    backgroundImage: `url("/images/bg/background-pattern-grid-line-02.png")`,
                }}
            >
                {items?.map((item) => (
                    <AnimatedFunFact
                        key={item.title}
                        counter={item.counter}
                        title={item.title}
                        suffix={item.suffix}
                        description={item.description}
                        className="tw:mb-[50px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                ))}
            </div>
        </Section>
    );
};

FunfactArea.defaultProps = {
    space: "none",
};

export default FunfactArea;
