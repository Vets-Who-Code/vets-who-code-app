import { useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SwiperSlide } from "@ui/swiper";
import Testimonial from "@components/testimonial/testimonial-02";
import SectionTitle from "@components/section-title";
import { ItemType, SectionTitleType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);

const SwiperSlider = dynamic(() => import("../../../components/ui/swiper"), {
    ssr: false,
});

type TProps = {
    data: {
        items?: ItemType[];
        section_title?: SectionTitleType;
    };
    titleSize?: "default" | "large";
};

const TestimonialArea = ({
    data: { items, section_title },
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
        <div className="tw-py-15 md:tw-py-20 lg:tw-py-[100px] tw-bg-light-100 tw-px-3.8">
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
        </div>
    );
};

export default TestimonialArea;
