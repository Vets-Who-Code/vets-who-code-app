import clsx from "clsx";

export interface StatCell {
    label: string;
    value: string;
    sub?: string;
}

interface Props {
    cells: StatCell[];
    tone?: "light" | "dark";
    className?: string;
}

const StatStrip = ({ cells, tone = "dark", className }: Props) => {
    const cellLabelColor = tone === "dark" ? "tw-text-[#6C757D]" : "tw-text-[#495057]";
    const cellValueColor = tone === "dark" ? "tw-text-cream" : "tw-text-navy";
    const borderColor = tone === "dark" ? "tw-border-cream/10" : "tw-border-silver";
    const cols =
        cells.length === 4
            ? "md:tw-grid-cols-4"
            : cells.length === 3
              ? "md:tw-grid-cols-3"
              : cells.length === 2
                ? "md:tw-grid-cols-2"
                : "md:tw-grid-cols-5";

    return (
        <div className={clsx("tw-grid tw-grid-cols-2 tw-border-t", cols, borderColor, className)}>
            {cells.map((cell) => (
                <div
                    key={cell.label}
                    className={clsx(
                        "tw-flex tw-flex-col tw-gap-3 tw-px-6 tw-py-7 first:md:tw-border-l-0 md:tw-border-l",
                        borderColor
                    )}
                >
                    <span
                        className={clsx(
                            "tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em]",
                            cellLabelColor
                        )}
                    >
                        {cell.label}
                    </span>
                    <span
                        className={clsx(
                            "tw-font-heading tw-text-[30px] tw-font-semibold tw-leading-none",
                            cellValueColor
                        )}
                    >
                        {cell.value}
                    </span>
                    {cell.sub ? (
                        <span
                            className={clsx(
                                "tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.08em]",
                                cellLabelColor
                            )}
                        >
                            {cell.sub}
                        </span>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default StatStrip;
