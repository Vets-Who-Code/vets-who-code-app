import { useMemo } from "react";
import Section from "@components/ui/engagement-modal";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import { motion } from "motion/react";
import { scrollUpVariants } from "@utils/variants";
import { ItemType, TSection } from "@utils/types";

const AnimatedSwiper = motion(SwiperSlider);

type TProps = TSection & {
    data: {
        items?: ItemType[];
    };
};

const BrandArea = ({ data: { items }, space, bg }: TProps) => {
    const options = useMemo(() => {
        return {
            slidesPerView: 1,
            autoplay: false,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 5,
                },
                992: {
                    slidesPerView: 6,
                },
            },
        };
    }, []);

    return (
        <Section className="brand-area" space={space} bg={bg}>
            <h2 className="tw:m-20 tw:flex tw:justify-center tw:text-primary">
                We Are Thankful for our Corporate Donors and Sponsors
            </h2>
            <div className="tw:container">
                {items && (
                    <AnimatedSwiper
                        options={options}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {items.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                className="tw:my-auto tw:flex tw:justify-center"
                            >
                                <img
                                    className="tw:opacity-50 tw:transition-opacity tw:hover:opacity-100"
                                    src={item.images?.[0]?.src}
                                    alt={item.images?.[0]?.alt || "logo"}
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiper>
                )}
            </div>
        </Section>
    );
};

BrandArea.defaultProps = {
    space: "top-bottom",
};

export default BrandArea;
