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

    // Only the units that still mean something. Seconds ticking next to a date six
    // months out is noise, and "0h" beside "204d" reads like a bug.
    const segments =
        days > 0
            ? [{ value: days, label: days === 1 ? "day" : "days" }]
            : hours > 0
              ? [
                    { value: hours, label: "hr" },
                    { value: minutes, label: "min" },
                ]
              : [
                    { value: minutes, label: "min" },
                    { value: seconds, label: "sec" },
                ];

    return (
        <div className={clsx("tw-flex", align === "center" && "tw-mx-auto", className)}>
            {segments.map((segment) => (
                <DateTimeDisplay key={segment.label} {...segment} />
            ))}
        </div>
    );
};

CountdownTimer.defaultProps = {
    align: "center",
};

export default CountdownTimer;
