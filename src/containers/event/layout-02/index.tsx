import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import MottoText from "@components/ui/motto-text";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import EventCard from "@components/event-card/event-01";
import { scrollUpVariants } from "@utils/variants";
import { IEvent, MottoType, SectionTitleType, TSection } from "@utils/types";

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

const EventArea = ({
    data: { section_title, motto, events },
    space,
    bg,
    titleSize,
}: TProps) => {
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
                        className="lg:tw-w-7/12 tw-mx-auto tw-text-center tw-mt-10"
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
