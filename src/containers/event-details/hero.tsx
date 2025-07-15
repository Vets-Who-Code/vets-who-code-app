import dayjs from "dayjs";
import CountdownTimer from "@components/ui/countdown-timer/layout-01";
import { IEvent } from "@utils/types";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TProps = Pick<IEvent, "thumbnail" | "title" | "start_date" | "start_time">;

const HeroSection = ({ thumbnail, title, start_date, start_time }: TProps) => {
    return (
        <div className="tw:relative tw:max-h-[760px] tw:bg-heading tw:py-[100px] tw:md:pb-[184px] tw:md:pt-[232px]">
            <div className="tw:absolute tw:inset-0 tw:after:absolute tw:after:inset-0 tw:after:bg-black/40 tw:after:content-['']">
                {thumbnail?.src && (
                    <img
                        className="tw:h-full tw:w-full tw:object-cover"
                        src={thumbnail.src}
                        alt={thumbnail?.alt || title}
                        width="1920"
                    />
                )}
            </div>

            <div className="tw:container tw:relative tw:z-1 tw:text-center tw:text-white">
                <p className="tw:mb-7 tw:font-bold tw:uppercase tw:tracking-[4px]">
                    {dayjs(start_date).format("MMMM YY")}{" "}
                </p>

                <h1 className="tw:mb-0 tw:text-[40px] tw:leading-[1.15] tw:text-white tw:md:text-5xl tw:lg:text-[56px]">
                    {title}
                </h1>
                <CountdownTimer
                    className="tw:mt-[54px] tw:max-w-[470px]"
                    targetDate={`${start_date} ${start_time}`}
                />
            </div>
        </div>
    );
};

export default HeroSection;
