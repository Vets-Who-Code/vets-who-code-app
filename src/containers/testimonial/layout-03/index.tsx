import { useMemo } from "react";
import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
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
            <div className="tw:container tw:grid tw:grid-cols-1 tw:gap-[50px] tw:lg:grid-cols-[41.67%_minmax(54%,1fr)] tw:lg:gap-7.5">
                <motion.div
                    className="tw:lg:max-w-[420px]"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle {...section_title} align="left" titleSize={titleSize} />
                    )}

                    {motto && <MottoText {...motto} size="md" className="tw:mt-4" />}
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
                                    className="!tw:bg-gray-200 tw:shadow-2lg"
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
