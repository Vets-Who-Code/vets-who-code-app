import { motion } from "framer-motion";
import Section from "@ui/section";
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
        <div className="tw-container tw-grid tw-gap-7.5 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-relative tw-z-20">
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
