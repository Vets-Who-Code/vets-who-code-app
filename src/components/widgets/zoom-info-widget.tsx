import Button from "@ui/button";
import { IZoomMeeting } from "@utils/types";
import WidgetBox from "./widget-box";
import InfoItem from "./info-item";

type TProps = Pick<
    IZoomMeeting,
    "host" | "date" | "time" | "category" | "duration" | "timezone" | "links"
>;

const ZoomInfo = ({
    host,
    date,
    time,
    category,
    duration,
    timezone,
    links,
}: TProps) => {
    return (
        <WidgetBox>
            <h2 className="tw-text-h3">Details</h2>
            <InfoItem label="Hosted By" value={host} />
            <InfoItem label="Start" value={`${date} ${time}`} />
            <InfoItem label="Category" value={category} />
            <InfoItem label="Duration" value={`${duration} Minutes`} />
            <InfoItem label="Timezone" value={timezone} />

            <p className="tw-border-t tw-border-t-gray-500 tw-pt-5">
                <strong className="tw-text-heading">Note</strong>: Countdown
                time is shown based on your local timezone.
            </p>
            <div className="tw-mt-5">
                <Button fullwidth className="!tw-px-6" path={links[0]}>
                    Join Meeting via Zoom App
                </Button>
                <Button fullwidth className="tw-mt-2.5" path={links[1]}>
                    Join via Web Browser
                </Button>
            </div>
        </WidgetBox>
    );
};

export default ZoomInfo;
