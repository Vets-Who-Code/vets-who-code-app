import SafeHTML from "@components/safe-html";
import SwiperSlider, { SwiperSlide } from "@components/ui/swiper";
import { ItemType } from "@utils/types";
import { fadeInUp } from "@utils/variants";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import SwiperCore, { EffectFade } from "swiper";

type TProps = {
    data: {
        items?: Pick<ItemType, "id" | "images" | "headings" | "texts">[];
    };
};

const HeroArea = ({ data: { items } }: TProps) => {
    const [activeIdx, setActiveId] = useState(0);
    const onSlideChange = (swiper: SwiperCore) => {
        const { activeIndex } = swiper;
        setActiveId(activeIndex);
    };

    const onSlideChangeTransitionStart = () => {
        setActiveId(-1);
    };

    const onSlideChangeTransitionEnd = (swiper: SwiperCore) => {
        const { activeIndex } = swiper;
        setActiveId(activeIndex);
    };
    const options = useMemo(() => {
        return {
            modules: [EffectFade],
            effect: "fade" as const,
            slidesPerView: 1,
            autoplay: false,
            speed: 750,
            navigation: true,
            onSlideChange,
            onSlideChangeTransitionStart,
            onSlideChangeTransitionEnd,
        };
    }, []);

    if (!items || items.length === 0) return null;

    return (
        <SwiperSlider options={options} navClass="hero">
            {items.map(({ id, images, headings, texts }, idx) => (
                <SwiperSlide key={id}>
                    <div className="tw-relative tw-z-1 tw-flex tw-h-[450px] tw-w-full tw-items-end md:tw-h-[500px] lg:tw-h-[600px] xl:tw-h-[700px]">
                        {images?.[0]?.src && (
                            <div className="tw-absolute tw-inset-0 tw-object-cover">
                                <img
                                    src={images[0].src}
                                    alt=""
                                    className="tw-h-full tw-w-full tw-object-cover"
                                />
                                <div
                                    className="tw-absolute tw-inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(9, 31, 64, 0.90) 0%, rgba(6, 26, 64, 0.85) 100%)",
                                    }}
                                />
                            </div>
                        )}
                        <div className="tw-container tw-relative tw-z-1 tw-mb-[350px] tw-grid tw-grid-cols-1 tw-gap-7.5 lg:tw-grid-cols-12">
                            {headings?.[0]?.content && (
                                <SafeHTML
                                    content={headings[0].content}
                                    as="h2"
                                    className="tw-mb-0 tw-text-[32px] tw-uppercase tw-leading-[1.17] tw-text-white md:tw-text-4xl lg:tw-col-span-4 lg:tw-text-right lg:tw-text-5xl"
                                />
                            )}
                            <div className="lg:tw-col-span-8">
                                {headings?.[1]?.content && (
                                    <motion.h3
                                        initial="hidden"
                                        animate={idx === activeIdx ? "visible" : "exit"}
                                        exit="exit"
                                        variants={fadeInUp}
                                        className="tw-mb-[25px] tw-text-lg tw-uppercase -tw-tracking-tightest tw-text-white"
                                    >
                                        <span className="tw-align-middle tw-text-[34px] tw-leading-none">
                                            {(idx + 1).toString().padStart(2, "0")}
                                        </span>
                                        <span className="tw-ml-3.8 tw-mr-7.5 tw-hidden tw-h-px tw-w-15 tw-bg-white tw-align-middle md:tw-inline-block" />{" "}
                                        {headings[1].content}
                                    </motion.h3>
                                )}
                                {texts?.map((text) => (
                                    <motion.p
                                        key={text.id}
                                        initial="hidden"
                                        animate={idx === activeIdx ? "visible" : "exit"}
                                        exit="exit"
                                        variants={fadeInUp}
                                        className="tw-text-[16px] tw-font-medium tw-text-white md:tw-text-lg lg:tw-text-2xl lg:tw-leading-normal"
                                    >
                                        {text.content}
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </SwiperSlider>
    );
};

export default HeroArea;
