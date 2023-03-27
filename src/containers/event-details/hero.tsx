import dayjs from "dayjs";
import CountdownTimer from "@components/ui/countdown-timer/layout-01";
import { IEvent } from "@utils/types";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TProps = Pick<IEvent, "thumbnail" | "title" | "start_date" | "start_time">;

const HeroSection = ({ thumbnail, title, start_date, start_time }: TProps) => {
    return (
        <div className="tw-relative tw-bg-heading tw-py-[100px] md:tw-pt-[232px] md:tw-pb-[184px] tw-max-h-[760px]">
            <div className="tw-absolute tw-inset-0 after:tw-absolute after:tw-content-[''] after:tw-inset-0 after:tw-bg-black/40">
                {thumbnail?.src && (
                    <img
                        className="tw-w-full tw-h-full tw-object-cover"
                        src={thumbnail.src}
                        alt={thumbnail?.alt || title}
                        width="1920"
                    />
                )}
            </div>

            <div className="tw-container tw-relative tw-z-1 tw-text-white tw-text-center">
                <p className="tw-font-bold tw-uppercase tw-tracking-[4px] tw-mb-7">
                    {dayjs(start_date).format("MMMM YY")}{" "}
                </p>

                <h1 className="tw-text-[40px] md:tw-text-5xl lg:tw-text-[56px] tw-leading-[1.15] tw-text-white tw-mb-0">
                    {title}
                </h1>
                <CountdownTimer
                    className="tw-max-w-[470px] tw-mt-[54px]"
                    targetDate={`${start_date} ${start_time}`}
                />
            </div>
        </div>
    );
};

export default HeroSection;
