import EventCard from "@components/event-card/event-01";
import SectionTitle from "@components/section-title";
import Section from "@components/ui/engagement-modal";
import MottoText from "@components/ui/motto-text";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import { IEvent, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedSwiper = motion(SwiperSlider);
const AnimatedMottoText = motion(MottoText);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        events: IEvent[];
    };
};

const options = {
    pagination: true,
    breakpoints: {
        300: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
};

const EventArea = ({ data: { section_title, motto, events }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="event-area" space={space} bg={bg}>
            <div className="tw-container">
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

                {events.length > 0 && (
                    <AnimatedSwiper
                        options={options}
                        shadowSize="small"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        {events.map((event) => (
                            <SwiperSlide key={event.path}>
                                <EventCard
                                    title={event.title}
                                    path={event.path}
                                    thumbnail={event.thumbnail}
                                    start_date={event.start_date}
                                    location={event.location}
                                    className="tw-mb-7.5"
                                />
                            </SwiperSlide>
                        ))}
                    </AnimatedSwiper>
                )}

                {motto && (
                    <AnimatedMottoText
                        {...motto}
                        className="tw-mx-auto tw-mt-10 tw-text-center lg:tw-w-7/12"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
            </div>
        </Section>
    );
};

export default EventArea;
