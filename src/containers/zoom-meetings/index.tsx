import { motion } from "framer-motion";
import Section from "@ui/section";
import { IZoomMeeting } from "@utils/types";
import Pagination from "@components/pagination/pagination-01";
import ZoomCard from "@components/zoom-card";
import { scrollUpVariants } from "@utils/variants";

const AnimatedZoomCard = motion(ZoomCard);

type TProps = {
    data: {
        zoomMeetings: IZoomMeeting[];
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
        };
    };
};

const ZoomMeetingArea = ({ data: { zoomMeetings, pagiData } }: TProps) => {
    return (
        <Section className="zoom-meeting-area" space="bottom">
            <h2 className="tw-sr-only">Zoom Meetings Section</h2>
            <div className="tw-container">
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                    {zoomMeetings?.map((zoomMeeting) => (
                        <AnimatedZoomCard
                            key={zoomMeeting.path}
                            thumbnail={zoomMeeting.thumbnail}
                            title={zoomMeeting.title}
                            path={zoomMeeting.path}
                            meeting_id={zoomMeeting.meeting_id}
                            date={zoomMeeting.date}
                            time={zoomMeeting.time}
                            duration={zoomMeeting.duration}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>

                {pagiData && pagiData.numberOfPages > 1 && (
                    <Pagination
                        className="tw-mt-[50px]"
                        numberOfPages={pagiData.numberOfPages}
                        currentPage={pagiData.currentPage}
                        rootPage="zoom-meetings"
                    />
                )}
            </div>
        </Section>
    );
};

export default ZoomMeetingArea;
