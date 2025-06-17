import { useMemo } from "react";
import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import QuoteItem from "@components/quote-item";
import { useUI } from "@contexts/ui-context";
import { ItemType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSwiperSlider = motion(SwiperSlider);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const QuoteArea = ({ data: { items }, space, bg }: TProps) => {
    const { trans1, trans2 } = useUI();
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            slidesPerGroup: 1,
            speed: 1000,
            spaceBetween: 0,
        };
    }, []);

    return (
        <Section className="quote-area" space={space} bg={bg}>
            <h2 className="tw-sr-only">Quote Section</h2>
            <div className="tw-container">
                {items && items.length > 0 && (
                    <AnimatedSwiperSlider
                        options={options}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <QuoteItem
                                    title={item.title}
                                    name={item.name}
                                    designation={item.designation}
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiperSlider>
                )}
                <motion.div
                    className="tw-absolute tw-left-1/2 tw-top-[-100px] tw-z-20"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-[35px] tw-w-[35px] tw-rounded-full tw-bg-primary-light" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-left-0 tw-top-[-35px] tw-z-20 lg:-tw-left-12"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block tw-h-[52px] tw-w-[52px] tw-rounded-full tw-border-[6px] tw-border-primary/50" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-left-[50px] tw-top-[100px] tw-z-20 lg:tw-left-[70px] lg:tw-top-[164px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-[35px] tw-w-[35px] tw-rounded-full tw-bg-orange-200" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-left-0 tw-top-[155px] tw-z-20 lg:tw-left-5 lg:tw-top-[300px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-[54px] tw-w-[54px] tw-rounded-full tw-bg-porsche" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-right-0 tw-top-[-100px] tw-z-20 lg:-tw-right-5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-[46px] tw-w-[46px] tw-rounded-full tw-bg-jagged" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-right-7.5 tw-top-0 tw-z-20"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-h-9 tw-w-9 tw-rounded-full tw-bg-blue-100/60" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-right-0 tw-top-[155px] tw-z-20 lg:tw-right-12 lg:tw-top-[233px]"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block tw-h-[38px] tw-w-[38px] tw-rounded-full tw-bg-mandy/70" />
                </motion.div>
            </div>
        </Section>
    );
};

QuoteArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default QuoteArea;
