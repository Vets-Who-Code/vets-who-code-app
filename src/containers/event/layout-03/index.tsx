import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import EventCard from "@components/event-card/event-02";
import MottoText from "@ui/motto-text";
import BottomShape from "@ui/bottom-shape/shape-03";
import { IEvent, MottoType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedEventCard = motion(EventCard);
const AnimatedMottoText = motion(MottoText);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        events: IEvent[];
    };
};

const EventArea = ({ data: { section_title, motto, events }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="event-area tw-relative" space={space} bg={bg}>
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 lg:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw-grid tw-grid-cols-1 tw-gap-7.5 lg:tw-grid-cols-2">
                    {events.map((event) => (
                        <AnimatedEventCard
                            key={event.path}
                            title={event.title}
                            start_date={event.start_date}
                            location={event.location}
                            path={event.path}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
                {motto && (
                    <AnimatedMottoText
                        {...motto}
                        className="tw-mx-auto tw-mt-[50px] tw-text-center lg:tw-mt-[70px] lg:tw-w-7/12"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
            </div>
            <BottomShape />
        </Section>
    );
};

export default EventArea;
