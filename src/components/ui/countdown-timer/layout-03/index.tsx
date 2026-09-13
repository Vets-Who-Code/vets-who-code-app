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
        <div className={clsx("tw-flex", align === "center" && "tw-mx-auto", className)}>
            <DateTimeDisplay value={days} unit="d" label="days" />
            <DateTimeDisplay value={hours} unit="h" label="hours" />
            <DateTimeDisplay value={minutes} unit="m" label="minutes" />
            <DateTimeDisplay value={seconds} unit="s" label="seconds" />
        </div>
    );
};

CountdownTimer.defaultProps = {
    align: "center",
};

export default CountdownTimer;
