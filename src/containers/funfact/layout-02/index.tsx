import FunFact from "@components/funfact/funfact-01";
import Section from "@components/ui/engagement-modal";
import { ItemType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const FunfactArea = ({ data: { items }, space, bg }: TProps) => (
    <Section className="funfact-area" space={space} bg={bg}>
        <div className="tw-container tw-relative tw-z-20 tw-grid tw-gap-7.5 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
            {items?.map((item, i) => (
                <AnimatedFunFact
                    key={item.id}
                    counter={item.counter}
                    suffix={item.suffix}
                    prefix={item.prefix}
                    index={i}
                    title={item.title}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
                    variants={scrollUpVariants}
                />
            ))}
        </div>
    </Section>
);

export default FunfactArea;
