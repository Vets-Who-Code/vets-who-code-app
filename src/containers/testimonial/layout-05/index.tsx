import { useMemo } from "react";
import { motion } from "framer-motion";
import Section from "@ui/section";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import Testimonial from "@components/testimonial/testimonial-05";
import SectionTitle from "@components/section-title";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedSwiperSlider = motion(SwiperSlider);

type TProps = TSection & {
    data: {
        items?: ItemType[];
        section_title?: SectionTitleType;
    };
};

const TestimonialArea = ({
    data: { section_title, items },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            slidesPerGroup: 1,
            autoplay: false,
            speed: 1000,
            spaceBetween: 0,
        };
    }, []);
    return (
        <Section className="testimonial-area" space={space} bg={bg}>
            <div className="tw-container tw-relative tw-z-10">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                {items && items.length > 0 && (
                    <AnimatedSwiperSlider
                        options={options}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Testimonial
                                    description={item.description}
                                    name={item.name}
                                    designation={item.designation}
                                    image={item.images?.[0]}
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiperSlider>
                )}
                <motion.div
                    className="tw-absolute -tw-z-1 tw-top-24 tw-left-[100] tw-w-[166px] tw-h-[166px]"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <Shape2 className="tw-fill-tan tw-w-full tw-h-full" />
                </motion.div>
                <motion.div
                    className="tw-absolute -tw-z-1 tw-bottom-0 tw-left-44 tw-w-[124px]"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <img src="/images/shape-animation/shape-3.png" alt="" />
                </motion.div>
            </div>
        </Section>
    );
};

export default TestimonialArea;
