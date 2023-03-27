import { useMemo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@components/section-title";
import Swiper, { SwiperSlide } from "@ui/swiper";
import Testimonial from "@components/testimonial/testimonial-06";
import { ItemType, SectionTitleType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedSwiper = motion(Swiper);

type TProps = {
    data: {
        section_title?: SectionTitleType;
        items?: ItemType[];
    };
};

const TestimonialArea = ({ data: { section_title, items } }: TProps) => {
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            autoplay: false,
            autoHeight: true,
            pagination: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
            },
        };
    }, []);
    return (
        <section className="testimonial-area tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        className="tw-pb-7.5 md:tw-pb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                {items && items.length > 0 && (
                    <AnimatedSwiper
                        options={options}
                        shadowSize="small"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Testimonial
                                    name={item.name}
                                    designation={item.designation}
                                    review={item.description}
                                    image={item.images?.[0]}
                                    rating={item.rating}
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiper>
                )}
            </div>
        </section>
    );
};

export default TestimonialArea;
