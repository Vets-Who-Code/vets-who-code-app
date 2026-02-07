import { useCountdown } from "@hooks";
import clsx from "clsx";
import dynamic from "next/dynamic";

const DateTimeDisplay = dynamic(() => import("./date-time-display"), {
    ssr: false,
});

type TProps = {
    targetDate: string;
    className?: string;
    align?: "left" | "center";
};

const CountdownTimer = ({ targetDate, className, align }: TProps) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    return (
        <div
            className={clsx(
                "tw-grid tw-grid-cols-2 sm:tw-grid-cols-4",
                align === "center" && "tw-mx-auto",
                className
            )}
        >
            <DateTimeDisplay value={days} type="days" />
            <DateTimeDisplay value={hours} type="hours" />
            <DateTimeDisplay value={minutes} type="minutes" />
            <DateTimeDisplay value={seconds} type="seconds" />
        </div>
    );
};

CountdownTimer.defaultProps = {
    align: "center",
};

export default CountdownTimer;
