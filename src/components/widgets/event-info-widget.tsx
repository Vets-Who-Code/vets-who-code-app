import { useState } from "react";
import dayjs from "dayjs";
import Button from "@ui/button";
import Alert from "@ui/alert";
import SocialShare from "@components/social-share/layout-02";
import MeetingBookingModal from "@components/modals/meeting-booking-modal";
import { IEvent } from "@utils/types";
import WidgetBox from "./widget-box";
import InfoPrice from "./info-price";
import InfoItem from "./info-item";

type TProps = Pick<
    IEvent,
    | "total_slot"
    | "total_booked"
    | "title"
    | "start_date"
    | "thumbnail"
    | "price"
    | "currency"
>;

const EventInfo = ({
    total_slot,
    total_booked,
    title,
    start_date,
    thumbnail,
    price,
    currency,
}: TProps) => {
    const [modal, setModal] = useState(false);
    const isExpired = dayjs().isAfter(dayjs(start_date));
    return (
        <>
            <WidgetBox>
                <InfoPrice title="Cost" price={price} currency={currency} />
                <InfoItem
                    icon="far fa-user-friends"
                    label="Total Slot:"
                    value={total_slot}
                />
                <InfoItem
                    icon="far fa-lock-alt"
                    label="Booked Slot:"
                    value={total_booked}
                />
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
                remain_slot={total_slot - total_booked}
            />
        </>
    );
};

EventInfo.defaultProps = {
    total_booked: 0,
};

export default EventInfo;
