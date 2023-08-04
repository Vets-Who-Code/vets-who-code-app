import { useMemo } from "react";
import Section from "@ui/section";
import Swiper, { SwiperSlide } from "@ui/swiper";
import Testimonial from "@components/testimonial/testimonial-01";
import { motion } from "framer-motion";
import { scrollUpVariants } from "@utils/variants";
import { ItemType, TSection } from "@utils/types";

const AnimatedSwiper = motion(Swiper);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const TestimonialArea = ({ data: { items }, space, bg }: TProps) => {
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            autoplay: false,
            autoHeight: true,
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
        <Section space={space} bg={bg} className="testimonial-area">
            <div className="tw-container">
                <AnimatedSwiper
                    options={options}
                    shadowSize="small"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {items?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Testimonial
                                name={item.name}
                                designation={item.designation}
                                review={item.description}
                                image={item.images?.[0]}
                            />
                        </SwiperSlide>
                    ))}
                </AnimatedSwiper>
            </div>
        </Section>
    );
};

TestimonialArea.defaultProps = {
    space: "top-bottom",
};

export default TestimonialArea;
