import { useMemo, useState } from "react";
import SwiperCore, { EffectFade } from "swiper";
import { motion } from "framer-motion";
import SwiperSlider, { SwiperSlide } from "@components/ui/swiper";
import { ItemType } from "@utils/types";
import { fadeInUp } from "@utils/variants";

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
                    <div className="tw-relative tw-z-1 tw-w-full tw-h-[450px] md:tw-h-[500px] lg:tw-h-[600px] xl:tw-h-[700px] tw-flex tw-items-end">
                        {images?.[0]?.src && (
                            <div className="tw-absolute tw-inset-0 tw-object-cover">
                                <img
                                    src={images[0].src}
                                    alt=""
                                    className="tw-w-full tw-h-full tw-object-cover"
                                />
                            </div>
                        )}
                        <div className="tw-container tw-relative tw-z-1 tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-7.5 tw-mb-[50px]">
                            {headings?.[0]?.content && (
                                <motion.h2
                                    initial="hidden"
                                    animate={
                                        idx === activeIdx ? "visible" : "exit"
                                    }
                                    exit="exit"
                                    variants={fadeInUp}
                                    className="tw-text-white tw-text-[32px] tw-uppercase tw-mb-0 tw-leading-[1.17] md:tw-text-4xl lg:tw-col-span-4 lg:tw-text-5xl lg:tw-text-right"
                                    dangerouslySetInnerHTML={{
                                        __html: headings[0].content,
                                    }}
                                />
                            )}
                            <div className="lg:tw-col-span-8">
                                {headings?.[1]?.content && (
                                    <motion.h3
                                        initial="hidden"
                                        animate={
                                            idx === activeIdx
                                                ? "visible"
                                                : "exit"
                                        }
                                        exit="exit"
                                        variants={fadeInUp}
                                        className="tw-text-lg -tw-tracking-tightest tw-text-white tw-uppercase tw-mb-[25px]"
                                    >
                                        <span className="tw-text-[34px] tw-leading-none tw-align-middle">
                                            {(idx + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>
                                        <span className="tw-hidden md:tw-inline-block tw-align-middle tw-w-15 tw-h-px tw-bg-white tw-mr-7.5 tw-ml-3.8" />{" "}
                                        {headings[1].content}
                                    </motion.h3>
                                )}
                                {texts?.map((text) => (
                                    <motion.p
                                        key={text.id}
                                        initial="hidden"
                                        animate={
                                            idx === activeIdx
                                                ? "visible"
                                                : "exit"
                                        }
                                        exit="exit"
                                        variants={fadeInUp}
                                        className="tw-text-[16px] md:tw-text-lg lg:tw-text-2xl lg:tw-leading-normal tw-font-medium tw-text-white"
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
