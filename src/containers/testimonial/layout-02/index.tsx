import { useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Section from "@ui/section";
import { SwiperSlide } from "@ui/swiper";
import Testimonial from "@components/testimonial/testimonial-02";
import SectionTitle from "@components/section-title";
import { ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const SwiperSlider = dynamic(() => import("../../../components/ui/swiper"), {
    ssr: false,
});

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        items?: ItemType[];
        section_title?: SectionTitleType;
    };
};

const TestimonialArea = ({
    data: { items, section_title },
    space,
    bg,
    titleSize,
}: TProps) => {
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            speed: 1000,
            loop: true,
            autoplay: false,
            spaceBetween: 50,
            pagination: true,
            breakpoints: {
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 2,
                },
                1499: {
                    slidesPerView: 3,
                },
            },
        };
    }, []);
    return (
        <Section className="testimonial-area tw-px-3.8" space={space} bg={bg}>
            {section_title && (
                <AnimatedSectionTitle
                    {...section_title}
                    titleSize={titleSize}
                    className="tw-pb-7.5 md:tw-pb-15"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            )}
            {items && items.length > 0 && (
                <SwiperSlider options={options}>
                    {items.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="testimonial-slide"
                        >
                            <Testimonial
                                name={item.name}
                                designation={item.designation}
                                title={item.title}
                                description={item.description}
                                image={item.images?.[0]}
                                className="tw-mb-7.5"
                            />
                        </SwiperSlide>
                    ))}
                </SwiperSlider>
            )}
        </Section>
    );
};

TestimonialArea.defaultProps = {
    bg: "tw-bg-light-100",
};

export default TestimonialArea;
