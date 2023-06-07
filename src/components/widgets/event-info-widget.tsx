import { useState } from "react";
import dayjs from "dayjs";
import Button from "@ui/button";
import Alert from "@ui/alert";
import SocialShare from "@components/social-share/layout-02";
import MeetingBookingModal from "@components/modals/meeting-booking-modal";
import { IEvent } from "@utils/types";
import WidgetBox from "./widget-box";

type TProps = Pick<IEvent, "title" | "start_date" | "thumbnail">;

const EventInfo = ({ title, start_date, thumbnail }: TProps) => {
    const [modal, setModal] = useState(false);
    const isExpired = dayjs().isAfter(dayjs(start_date));
    return (
        <>
            <WidgetBox>
                {isExpired ? (
                    <Alert color="warning" className="tw-mt-5">
                        This event has expired
                    </Alert>
                ) : (
                    <Button
                        fullwidth
                        className="tw-mt-5"
                        onClick={() => setModal(true)}
                    >
                        Book Now
                    </Button>
                )}

                <SocialShare className="tw-mt-7 tw-justify-center" />
            </WidgetBox>
            <MeetingBookingModal
                show={modal}
                onClose={() => setModal(false)}
                title={title}
                date={start_date}
                thumbnail={thumbnail}
            />
        </>
    );
};

EventInfo.defaultProps = {
    total_booked: 0,
};

export default EventInfo;
