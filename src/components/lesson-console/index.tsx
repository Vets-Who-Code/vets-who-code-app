import clsx from "clsx";
import type { ConsoleEntry } from "@/lib/lesson-sandbox/messages";

type Props = {
    entries: ConsoleEntry[];
};

const LEVEL_CLASS: Record<ConsoleEntry["level"], string> = {
    log: "tw-text-cream",
    info: "tw-text-navy-sky",
    warn: "tw-text-gold-light",
    error: "tw-text-red-signal",
};

const LessonConsole = ({ entries }: Props) => {
    if (entries.length === 0) {
        return (
            <p className="tw-p-4 tw-font-mono tw-text-sm tw-text-gray-100">
                Console output appears here when you run your code.
            </p>
        );
    }

    return (
        <ul className="tw-m-0 tw-list-none tw-p-0 tw-font-mono tw-text-sm">
            {entries.map((entry, i) => (
                <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: console lines are append-only and never reordered
                    key={i}
                    className={clsx(
                        "tw-whitespace-pre-wrap tw-break-words tw-border-b tw-border-navy-deep tw-px-4 tw-py-1.5",
                        LEVEL_CLASS[entry.level]
                    )}
                >
                    {entry.args.join(" ")}
                </li>
            ))}
        </ul>
    );
};

export default LessonConsole;
