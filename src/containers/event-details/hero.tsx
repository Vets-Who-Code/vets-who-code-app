import CountdownTimer from "@components/ui/countdown-timer/layout-01";
import { formatDate } from "@utils/date";
import { IEvent } from "@utils/types";

type TProps = Pick<IEvent, "thumbnail" | "title" | "start_date" | "start_time">;

function HeroSection({ thumbnail, title, start_date, start_time }: TProps) {
    return (
        <div className="tw-relative tw-max-h-[760px] tw-bg-heading tw-py-[100px] md:tw-pb-[184px] md:tw-pt-[232px]">
            <div className="tw-absolute tw-inset-0 after:tw-absolute after:tw-inset-0 after:tw-bg-black/40 after:tw-content-['']">
                {thumbnail?.src && (
                    <img
                        className="tw-h-full tw-w-full tw-object-cover"
                        src={thumbnail.src}
                        alt={thumbnail?.alt || title}
                        width="1920"
                    />
                )}
            </div>

            <div className="tw-container tw-relative tw-z-1 tw-text-center tw-text-white">
                <p className="tw-mb-7 tw-font-bold tw-uppercase tw-tracking-[4px]">
                    {formatDate(start_date, "MMMM yy")}{" "}
                </p>

                <h1 className="tw-mb-0 tw-text-[40px] tw-leading-[1.15] tw-text-white md:tw-text-5xl lg:tw-text-[56px]">
                    {title}
                </h1>
                <CountdownTimer
                    className="tw-mt-[54px] tw-max-w-[470px]"
                    targetDate={`${start_date} ${start_time}`}
                />
            </div>
        </div>
    );
}

export default HeroSection;
