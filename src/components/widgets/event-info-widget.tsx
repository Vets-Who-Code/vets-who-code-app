import Button from "@ui/button";
import Alert from "@ui/alert";
import SocialShare from "@components/social-share/layout-02";
import { IEvent } from "@utils/types";
import { isDatePast } from "@utils/date";
import WidgetBox from "./widget-box";

type TProps = Pick<IEvent, "title" | "start_date">;

function EventInfo({ start_date }: TProps) {
    const isExpired = isDatePast(start_date);
    return (
        <WidgetBox>
            {isExpired ? (
                <Alert color="warning" className="tw-mt-5">
                    This event has expired
                </Alert>
            ) : (
                <Button fullwidth className="tw-mt-5">
                    Book Now
                </Button>
            )}

            <SocialShare className="tw-mt-7 tw-justify-center" />
        </WidgetBox>
    );
}

EventInfo.defaultProps = {
    total_booked: 0,
};

export default EventInfo;
