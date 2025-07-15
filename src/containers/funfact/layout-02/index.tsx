import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import FunFact from "@components/funfact/funfact-01";
import { scrollUpVariants } from "@utils/variants";
import { ItemType, TSection } from "@utils/types";

const AnimatedFunFact = motion(FunFact);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const FunfactArea = ({ data: { items }, space, bg }: TProps) => (
    <Section className="funfact-area" space={space} bg={bg}>
        <div className="tw:container tw:relative tw:z-20 tw:grid tw:gap-7.5 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
            {items?.map((item) => (
                <AnimatedFunFact
                    key={item.id}
                    counter={item.counter}
                    suffix={item.suffix}
                    title={item.title}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            ))}
        </div>
    </Section>
);

export default FunfactArea;
