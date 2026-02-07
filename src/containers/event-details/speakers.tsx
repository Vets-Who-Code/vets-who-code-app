import SpeakerCard from "@components/spearker-card";
import Swiper, { SwiperSlide } from "@ui/swiper";
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
        <div className="tw-container tw-border-b tw-border-b-gray-650 tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]">
            <h2 className="tw-mb-11 tw-text-center tw-text-4xl lg:tw-text-5xl">Our Speaker</h2>
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

            <p className="tw-mx-auto tw-mt-[54px] tw-max-w-[630px] tw-text-center tw-text-lg">
                Register online, get your ticket, meet up with our inspirational speakers and
                specialists in the field to share your ideas.
            </p>
        </div>
    );
};

export default Speakers;
