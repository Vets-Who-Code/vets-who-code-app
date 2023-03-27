import { useMemo } from "react";
import { motion } from "framer-motion";
import Section from "@ui/section";
import { EffectCoverflow } from "swiper";
import SectionTitle from "@components/section-title";
import Testimonial from "@components/testimonial/testimonial-02";
import Swiper, { SwiperSlide } from "@ui/swiper";
import MottoText from "@ui/motto-text";
import { ItemType, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSwiper = motion(Swiper);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        items?: ItemType[];
    };
};

const TestimonialArea = ({
    data: { section_title, motto, items },
    space,
    bg,
    titleSize,
}: TProps) => {
    const options = useMemo(() => {
        return {
            modules: [EffectCoverflow],
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: "coverflow" as const,
            loop: true,
            autoplay: false,
            autoHeight: false,
            speed: 1000,
            spaceBetween: 0,
            pagination: true,
        };
    }, []);
    return (
        <Section className="testimonial-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 lg:tw-grid-cols-[41.67%_minmax(54%,_1fr)] tw-gap-[50px] lg:tw-gap-7.5">
                <motion.div
                    className="lg:tw-max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                        />
                    )}

                    {motto && (
                        <MottoText {...motto} size="md" className="tw-mt-4" />
                    )}
                </motion.div>
                {items && items.length > 0 && (
                    <AnimatedSwiper
                        options={options}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Testimonial
                                    className="!tw-bg-gray-200 tw-shadow-[0_16px_40px_-40px]"
                                    name={item.name}
                                    designation={item.designation}
                                    title={item.title}
                                    description={item.description}
                                    image={item.images?.[0]}
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiper>
                )}
            </div>
        </Section>
    );
};

export default TestimonialArea;
