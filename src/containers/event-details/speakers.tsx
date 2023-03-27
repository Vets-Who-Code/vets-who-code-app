import Swiper, { SwiperSlide } from "@ui/swiper";
import SpeakerCard from "@components/spearker-card";
import { ISpeaker } from "@utils/types";

const sliderOptions = {
    autoplay: false,
    slidesPerView: 1,
    breakpoints: {
        300: {
            slidesPerView: 1,
        },
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 5,
        },
    },
};

const Speakers = ({ speakers }: { speakers: ISpeaker[] }) => {
    return (
        <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-border-b tw-border-b-gray-650">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-text-center tw-mb-11">
                Our Speakers
            </h2>
            {speakers.length > 0 && (
                <Swiper options={sliderOptions}>
                    {speakers.map((item) => (
                        <SwiperSlide key={item.id}>
                            <SpeakerCard
                                name={item.name}
                                designation={item.designation}
                                image={item.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <p className="tw-text-lg tw-max-w-[630px] tw-text-center tw-mx-auto tw-mt-[54px]">
                Register online, get your ticket, meet up with our inspirational
                speakers and specialists in the field to share your ideas.
            </p>
        </div>
    );
};

export default Speakers;
