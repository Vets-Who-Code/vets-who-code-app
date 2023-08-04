import { useMemo } from "react";
import { motion } from "framer-motion";
import Section from "@ui/section";
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
                    className="tw-absolute tw-z-20 tw-top-[-100px] tw-left-1/2"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-w-[35px] tw-h-[35px] tw-bg-primary-light tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-[-35px] tw-left-0 lg:-tw-left-12"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block tw-w-[52px] tw-h-[52px] tw-border-[6px] tw-border-primary/50 tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-[100px] tw-left-[50px] lg:tw-top-[164px] lg:tw-left-[70px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-w-[35px] tw-h-[35px] tw-bg-orange-200 tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-[155px] tw-left-0 lg:tw-top-[300px] lg:tw-left-5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-w-[54px] tw-h-[54px] tw-bg-porsche tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-[-100px] tw-right-0 lg:-tw-right-5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-w-[46px] tw-h-[46px] tw-bg-jagged tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-0 tw-right-7.5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <span className="tw-block tw-w-9 tw-h-9 tw-bg-blue-100/60 tw-rounded-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-20 tw-top-[155px] tw-right-0 lg:tw-top-[233px] lg:tw-right-12"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block tw-w-[38px] tw-h-[38px] tw-bg-mandy/70 tw-rounded-full" />
                </motion.div>
            </div>
        </Section>
    );
};

QuoteArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default QuoteArea;
